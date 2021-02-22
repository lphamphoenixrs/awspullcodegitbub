/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.batchjob;
import com.phoenixrs.api.utils.Constants;
import com.phoenixrs.api.utils.FLLogger;
import com.phoenixrs.api.utils.Lib;
import com.phoenixrs.api.utils.SendMail;
import com.phoenixrs.api.utils.Translator;
import com.phoenixrs.api.services.BatchJobService;
import com.phoenixrs.api.entities.AlertEntity;
import com.phoenixrs.api.entities.BatchJobTableEntity;
import com.phoenixrs.api.entities.DeviceEntity;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;


public class BatchJob {
	protected final FLLogger log = FLLogger.getLogger("batchjob/" + this.getClass().getSimpleName());
	public void runCronJobGetAlert() {
		try {
			BatchJobService service = new BatchJobService();
			DeviceEntity entity = new DeviceEntity();

			List listDevice = service.getListDevice(entity);
			if (listDevice == null || listDevice.size() == 0) {
				return;
			}
			
			TimeZone timeZone = TimeZone.getTimeZone("UTC");
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss a", Locale.US);
			simpleDateFormat.setTimeZone(timeZone);
			Calendar t = Calendar.getInstance(timeZone);
			
			for (int i = 0; i < listDevice.size(); i++) {
				DeviceEntity obj = (DeviceEntity) listDevice.get(i);
				// get last row item by data table name 
				BatchJobTableEntity rowItem = service.getLastRowItem(obj.getDatatablename());
				AlertEntity alertItem = new AlertEntity();
				if(rowItem.getError() > 0) {
					// Push alert to database
					alertItem.setId_device(obj.getId());
					alertItem.setId_error(obj.getCode_prefix() + rowItem.getError());
					alertItem.setStart_date(rowItem.getTime());
					// Check error exits
					boolean checkAlertExist = service.checkAlertExist(alertItem);
					if(!checkAlertExist && alertItem.getId_device() > 0) {
						// Insert error
						service.insertAlert(alertItem);
					}
					
				} else {
					// Validate date for 15 minute and save alert to database
					Calendar c1 = Calendar.getInstance();
					c1.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(rowItem.getTime()));
					c1.add(Calendar.MINUTE, Constants.ADD_MINUTE );
					
					Calendar c2 = Calendar.getInstance(timeZone);
					
					if(c1.getTime().before(c2.getTime())) {
						// Insert alert
						alertItem.setId_device(obj.getId());
						alertItem.setId_error(Constants.DEAULT_ERROR_CODE);
						alertItem.setStart_date(rowItem.getTime());
						// Check error exits
						boolean checkAlertExist = service.checkAlertExist(alertItem);
						if(!checkAlertExist && alertItem.getId_device() > 0) {
							// Insert error
							service.insertAlert(alertItem);
						}
					}
				}
			}
			
			// Sent mail for admin system
			String mailFromContact = Lib.getReourcePropValue(Constants.mailConfigFileName, Constants.mailFromContact);
			String msgTemplate = Constants.getMailTempleteByState(11);
			String logoURL = Constants.logoURL;
			String body = String.format(msgTemplate, logoURL, "Admin", simpleDateFormat.format(t.getTime()), "");
			String mailTo = Lib.getReourcePropValue(Constants.mailConfigFileName, Constants.mailTo);
			String subject = Constants.getMailSubjectByState(11);

			String tags = "run_cron_job";
			boolean flagSent = SendMail.mailCritsend(mailFromContact, mailTo, subject, body, tags);
			if (!flagSent) {
				throw new Exception(Translator.toLocale(Constants.SEND_MAIL_ERROR_MSG));
			}
		} catch (Exception e) {
			log.error(e);
		}

	}
}
