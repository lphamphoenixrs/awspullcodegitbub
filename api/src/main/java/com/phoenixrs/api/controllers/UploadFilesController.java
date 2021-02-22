/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phoenixrs.api.utils.Constants;
import com.phoenixrs.api.utils.Lib;

import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.zip.GZIPInputStream;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import com.google.common.base.Splitter;
import com.google.common.collect.Lists;

import com.phoenixrs.api.services.DeviceService;
import com.phoenixrs.api.services.ModelShark100Service;
import com.phoenixrs.api.services.ModelRT1Class30000Service;
import com.phoenixrs.api.services.ModelIVTSolaronEXTService;
import com.phoenixrs.api.services.ModelIMTSolarClass8000Service;
import com.phoenixrs.api.services.ModelAdvancedEnergySolaronService;
import com.phoenixrs.api.services.ModelPVPInverterService;
import com.phoenixrs.api.services.AlertService;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.nio.file.Path;

import com.phoenixrs.api.entities.DeviceEntity;
import com.phoenixrs.api.entities.ModelShark100Entity;
import com.phoenixrs.api.entities.ModelRT1Class30000Entity;
import com.phoenixrs.api.entities.ModelIVTSolaronEXTEntity;
import com.phoenixrs.api.entities.ModelIMTSolarClass8000Entity;
import com.phoenixrs.api.entities.ModelAdvancedEnergySolaronEntity;
import com.phoenixrs.api.entities.ModelPVPInverterEntity;

@RestController
@ApiIgnore
@RequestMapping("/files")
public class UploadFilesController extends BaseController {
	/**
	 * @description upload files datalogger and insert datalogger to database
	 * @author long.pham
	 * @since 2020-08-19
	 * @params RequestParam, files
	 */

	@SuppressWarnings("unchecked")
	@PostMapping("/upload")
	@ResponseBody
//	@RequestParam("LOGFILE") MultipartFile[] files,
//	@RequestParam("SENDDATATRACE") String senddatatrace, @RequestParam("MODE") String mode,
//	@RequestParam("SERIALNUMBER") String serialnumber, @RequestParam("PASSWORD") String password,
//	@RequestParam("LOOPNAME") String koopname, @RequestParam("MODBUSIP") String modbusip,
//	@RequestParam("MODBUSPORT") String modbusport, @RequestParam("MODBUSDEVICE") String modbusdevice,
//	@RequestParam("MODBUSDEVICENAME") String modbusdevicename,
//	@RequestParam("MODBUSDEVICETYPE") String modbusdevicetype,
//	@RequestParam("MODBUSDEVICETYPENUMBER") String modbusdevicetypenumber,
//	@RequestParam("MODBUSDEVICECLASS") String modbusdeviceclass,
//	@RequestParam("MD5CHECKSUM") String md5checksum, @RequestParam("FILESIZE") String filesize,
//	@RequestParam("FILETIME") String filetime

	public String uploadFiles(@RequestParam(name = "LOGFILE", required = false) MultipartFile files[],
			@RequestParam(name = "SENDDATATRACE", required = false) String senddatatrace,
			@RequestParam(name = "MODE", required = false) String mode,
			@RequestParam(name = "SERIALNUMBER", required = true) String serialnumber,
			@RequestParam(name = "PASSWORD", required = false) String password,
			@RequestParam(name = "LOOPNAME", required = false) String koopname,
			@RequestParam(name = "MODBUSIP", required = false) String modbusip,
			@RequestParam(name = "MODBUSPORT", required = false) String modbusport,
			@RequestParam(name = "MODBUSDEVICE", required = false) String modbusdevice,
			@RequestParam(name = "MODBUSDEVICENAME", required = false) String modbusdevicename,
			@RequestParam(name = "MODBUSDEVICETYPE", required = false) String modbusdevicetype,
			@RequestParam(name = "MODBUSDEVICETYPENUMBER", required = false) String modbusdevicetypenumber,
			@RequestParam(name = "MODBUSDEVICECLASS", required = false) String modbusdeviceclass,
			@RequestParam(name = "MD5CHECKSUM", required = false) String md5checksum,
			@RequestParam(name = "FILESIZE", required = false) String filesize,
			@RequestParam(name = "FILETIME", required = false) String filetime) {

		String message = "";
		System.out.println("---------------------------------start------------------------------");
		System.out.println("SENDDATATRACE: " + senddatatrace);
		System.out.println("MODE: " + mode);
		System.out.println("SERIALNUMBER: " + serialnumber);
		System.out.println("PASSWORD: " + password);
		System.out.println("LOOPNAME: " + koopname);
		System.out.println("MODBUSIP: " + modbusip);
		System.out.println("MODBUSPORT: " + modbusport);
		System.out.println("MODBUSDEVICE: " + modbusdevice);
		System.out.println("MODBUSDEVICENAME: " + modbusdevicename);
		System.out.println("MODBUSDEVICETYPE: " + modbusdevicetype);
		System.out.println("MODBUSDEVICETYPENUMBER: " + modbusdevicetypenumber);
		System.out.println("MODBUSDEVICECLASS: " + modbusdeviceclass);
		System.out.println("-------------------------------end--------------------------------");
		try {

			String LOGFILEUPLOAD = "LOGFILEUPLOAD";
			List<String> fileNames = new ArrayList<>();

			if (mode.equals(LOGFILEUPLOAD) && files.length > 0) {
				Arrays.asList(files).stream().forEach(file -> {

					String fileName = file.getOriginalFilename();
					String ext = fileName.substring(fileName.lastIndexOf(".") + 1);
					fileNames.add(file.getOriginalFilename());

					Path root = Paths.get(
							Lib.getReourcePropValue(Constants.appConfigFileName, Constants.uploadRootPathConfigKey));
					String timeStamp = new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());
					byte[] bytes;
					try {
						bytes = file.getBytes();
						switch (ext) {
						case "gz":

							Path path = Paths.get(Lib.getReourcePropValue(Constants.appConfigFileName,
									Constants.uploadRootPathConfigKey) + "/" + "bm-" + modbusdevice + "." + timeStamp
									+ ".log.gz");
							Files.write(path, bytes);

							InputStream fis = file.getInputStream();
							GZIPInputStream gis = new GZIPInputStream(fis);

							fileName = "bm-" + modbusdevice + "." + timeStamp + ".log";
							FileOutputStream fos = new FileOutputStream(root.resolve(fileName).toString());
							byte[] buffer = new byte[10000];
							int len = 0;
							while ((len = gis.read(buffer)) != -1) {
								fos.write(buffer, 0, len);
							}
							// close resources
							fos.close();
							gis.close();
							break;
						case "log":
							// code block
							Path pathLogUplad = Paths.get(Lib.getReourcePropValue(Constants.appConfigFileName,
									Constants.uploadRootPathConfigKey) + "/" + "bm-" + modbusdevice + "." + timeStamp
									+ ".log");
							Files.write(pathLogUplad, bytes);
							fileName = "bm-" + modbusdevice + "." + timeStamp + ".log";
							break;
						}

						boolean exists = new File(root.resolve(fileName).toString()).isFile();
						
						// Get list device by SERIALNUMBER
						if (!serialnumber.isEmpty() && exists) {
							boolean statusInsert = false;
							File readFile = new File(root.resolve(fileName).toString());
							FileReader fr = new FileReader(readFile); // reads the file
							BufferedReader br = new BufferedReader(fr); // creates a buffering character input stream
							StringBuffer sb = new StringBuffer(); // constructs a string buffer with no characters
							String line;

							DeviceService serviceD = new DeviceService();
							AlertService alertService = new AlertService();
							
							DeviceEntity deviceE = new DeviceEntity();
							deviceE.setSerial_number(serialnumber);
							List<DeviceEntity> dataDevice = serviceD.getDeviceListBySerialNumber(deviceE);
							if (dataDevice.size() > 0) {
								for (int i = 0; i < dataDevice.size(); i++) {
									DeviceEntity item = dataDevice.get(i);
									if(item.getModbusdevicenumber() == Integer.parseInt(modbusdevice)) {
										
										switch (item.getDatatablename()) {
										case "model_shark100":
											ModelShark100Service serviceModelShark100 = new ModelShark100Service();
											// Check insert database status
											while ((line = br.readLine()) != null) {
												sb.append(line); // appends line to string buffer
												sb.append("\n"); // line feed
												// Convert string to array
												List<String> words = Lists.newArrayList(Splitter.on(',').split(line));
												if (words.size() > 0) {
													ModelShark100Entity dataModelShark100 = new ModelShark100Entity();
													
													dataModelShark100.setTime(words.get(0).replace("'", ""));
													dataModelShark100.setError(Integer.parseInt(!Lib.isBlank(words.get(1)) ? words.get(1) : "0"));
													dataModelShark100.setId_device(item.getId());
													dataModelShark100.setLow_alarm(Integer.parseInt(!Lib.isBlank(words.get(2)) ? words.get(2) : "0"));
													dataModelShark100.setHigh_alarm(Integer.parseInt(!Lib.isBlank(words.get(3)) ? words.get(3) : "0"));
													dataModelShark100.setVolts_a_b(Double.parseDouble(!Lib.isBlank(words.get(4)) ? words.get(4) : "0"));
													dataModelShark100.setVolts_b_n(Double.parseDouble(!Lib.isBlank(words.get(5)) ? words.get(5) : "0"));
													dataModelShark100.setVolts_c_n(Double.parseDouble(!Lib.isBlank(words.get(6)) ? words.get(6) : "0"));
													dataModelShark100.setVolts_a_b(Double.parseDouble(!Lib.isBlank(words.get(7)) ? words.get(7) : "0"));
													dataModelShark100.setVolts_b_c(Double.parseDouble(!Lib.isBlank(words.get(8)) ? words.get(8) : "0"));
													dataModelShark100.setVolts_c_a(Double.parseDouble(!Lib.isBlank(words.get(9)) ? words.get(9) : "0"));
													dataModelShark100.setAmps_a(Float.parseFloat(!Lib.isBlank(words.get(10)) ? words.get(10) : "0"));
													
													dataModelShark100.setAmps_b(Float.parseFloat(!Lib.isBlank(words.get(11)) ? words.get(11) : "0"));
													dataModelShark100.setAmps_c(Float.parseFloat(!Lib.isBlank(words.get(12)) ? words.get(12) : "0"));
													dataModelShark100.setWatts_3ph_total(Float.parseFloat(!Lib.isBlank(words.get(13)) ? words.get(13) : "0"));
													dataModelShark100.setVars_3ph_total(Float.parseFloat(!Lib.isBlank(words.get(14)) ? words.get(14) : "0"));
													dataModelShark100.setVas_3ph_total(Float.parseFloat(!Lib.isBlank(words.get(15)) ? words.get(15) : "0"));
													dataModelShark100.setPower_factor_3ph_total(Float.parseFloat(!Lib.isBlank(words.get(16)) ? words.get(16) : "0"));
													dataModelShark100.setFrequency(Float.parseFloat(!Lib.isBlank(words.get(17)) ? words.get(17) : "0"));
													dataModelShark100.setNeutral_current(Float.parseFloat(!Lib.isBlank(words.get(18)) ? words.get(18) : "0"));
													dataModelShark100.setW_hours_received(Double.parseDouble(!Lib.isBlank(words.get(19)) ? words.get(19) : "0"));
													dataModelShark100.setW_hours_delivered(Double.parseDouble(!Lib.isBlank(words.get(20)) ? words.get(20) : "0"));
													
													dataModelShark100.setW_hours_net(Double.parseDouble(!Lib.isBlank(words.get(21)) ? words.get(21) : "0"));
													dataModelShark100.setW_hours_total(Double.parseDouble(!Lib.isBlank(words.get(22)) ? words.get(22) : "0"));
													dataModelShark100.setVar_hours_positive(Double.parseDouble(!Lib.isBlank(words.get(23)) ? words.get(23) : "0"));
													dataModelShark100.setVar_hours_negative(Double.parseDouble(!Lib.isBlank(words.get(24)) ? words.get(24) : "0"));
													dataModelShark100.setVar_hours_net(Double.parseDouble(!Lib.isBlank(words.get(25)) ? words.get(25) : "0"));
													dataModelShark100.setVar_hours_total(Double.parseDouble(!Lib.isBlank(words.get(26)) ? words.get(26) : "0"));
													dataModelShark100.setVa_hours_total(Double.parseDouble(!Lib.isBlank(words.get(27)) ? words.get(27) : "0"));
													dataModelShark100.setAmps_a_average(Float.parseFloat(!Lib.isBlank(words.get(28)) ? words.get(28) : "0"));
													dataModelShark100.setAmps_b_average(Float.parseFloat(!Lib.isBlank(words.get(29)) ? words.get(29) : "0"));
													dataModelShark100.setAmps_c_average(Float.parseFloat(!Lib.isBlank(words.get(30)) ? words.get(30) : "0"));
													
													dataModelShark100.setPositive_watts_3ph_average(Float.parseFloat(!Lib.isBlank(words.get(31)) ? words.get(31) : "0"));
													dataModelShark100.setPositive_vars_3ph_average(Float.parseFloat(!Lib.isBlank(words.get(32)) ? words.get(32) : "0"));
													dataModelShark100.setNegative_watts_3ph_average(Float.parseFloat(!Lib.isBlank(words.get(33)) ? words.get(33) : "0"));
													dataModelShark100.setNegative_vars_3ph_average(Float.parseFloat(!Lib.isBlank(words.get(34)) ? words.get(34) : "0"));
													dataModelShark100.setVas_3ph_average(Float.parseFloat(!Lib.isBlank(words.get(35)) ? words.get(35) : "0"));
													dataModelShark100.setPositive_pf_3ph_average(Float.parseFloat(!Lib.isBlank(words.get(36)) ? words.get(36) : "0"));
													dataModelShark100.setNegative_pf_3ph_average(Float.parseFloat(!Lib.isBlank(words.get(37)) ? words.get(37) : "0"));
													dataModelShark100.setVolts_a_n_min(Float.parseFloat(!Lib.isBlank(words.get(38)) ? words.get(38) : "0"));
													dataModelShark100.setVolts_b_n_min(Float.parseFloat(!Lib.isBlank(words.get(39)) ? words.get(39) : "0"));
													dataModelShark100.setVolts_c_n_min(Float.parseFloat(!Lib.isBlank(words.get(40)) ? words.get(40) : "0"));
													
													dataModelShark100.setVolts_a_b_min(Float.parseFloat(!Lib.isBlank(words.get(41)) ? words.get(41) : "0"));
													dataModelShark100.setVolts_b_c_min(Float.parseFloat(!Lib.isBlank(words.get(42)) ? words.get(42) : "0"));
													dataModelShark100.setVolts_c_a_min(Float.parseFloat(!Lib.isBlank(words.get(43)) ? words.get(43) : "0"));
													dataModelShark100.setAmps_a_min_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(44)) ? words.get(44) : "0"));
													dataModelShark100.setAmps_b_min_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(45)) ? words.get(45) : "0"));
													dataModelShark100.setAmps_c_min_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(46)) ? words.get(46) : "0"));
													dataModelShark100.setPositive_watts_3ph_min_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(47)) ? words.get(47) : "0"));
													dataModelShark100.setPositive_vars_3ph_min_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(48)) ? words.get(48) : "0"));
													dataModelShark100.setNegative_watts_3ph_min_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(49)) ? words.get(49) : "0"));
													dataModelShark100.setNegative_vars_3ph_min_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(50)) ? words.get(50) : "0"));
													
													dataModelShark100.setVas_3ph_min_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(51)) ? words.get(51) : "0"));
													dataModelShark100.setPositive_pf_3ph_min_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(52)) ? words.get(52) : "0"));
													dataModelShark100.setNegative_pf_3ph_min_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(53)) ? words.get(53) : "0"));
													dataModelShark100.setFrequency_min(Float.parseFloat(!Lib.isBlank(words.get(54)) ? words.get(54) : "0"));
													dataModelShark100.setVolts_a_n_max(Double.parseDouble(!Lib.isBlank(words.get(55)) ? words.get(55) : "0"));
													dataModelShark100.setVolts_b_n_max(Double.parseDouble(!Lib.isBlank(words.get(56)) ? words.get(56) : "0"));
													dataModelShark100.setVolts_c_n_max(Double.parseDouble(!Lib.isBlank(words.get(57)) ? words.get(57) : "0"));
													dataModelShark100.setVolts_a_b_max(Double.parseDouble(!Lib.isBlank(words.get(58)) ? words.get(58) : "0"));
													dataModelShark100.setVolts_b_c_max(Double.parseDouble(!Lib.isBlank(words.get(59)) ? words.get(59) : "0"));
													dataModelShark100.setVolts_c_a_max(Double.parseDouble(!Lib.isBlank(words.get(60)) ? words.get(60) : "0"));
													
													dataModelShark100.setAmps_a_max_avg_demand(Double.parseDouble(!Lib.isBlank(words.get(61)) ? words.get(61) : "0"));
													dataModelShark100.setAmps_b_max_avg_demand(Double.parseDouble(!Lib.isBlank(words.get(62)) ? words.get(62) : "0"));
													dataModelShark100.setAmps_c_max_avg_demand(Double.parseDouble(!Lib.isBlank(words.get(63)) ? words.get(63) : "0"));
													dataModelShark100.setPositive_watts_3ph_max_avg_demand(Double.parseDouble(!Lib.isBlank(words.get(64)) ? words.get(64) : "0"));
													dataModelShark100.setPositive_vars_3ph_max_avg_demand(Double.parseDouble(!Lib.isBlank(words.get(65)) ? words.get(65) : "0"));
													dataModelShark100.setNegative_watts_3ph_max_avg_demand(Double.parseDouble(!Lib.isBlank(words.get(66)) ? words.get(66) : "0"));
													dataModelShark100.setNegative_vars_3ph_max_avg_demand(Double.parseDouble(!Lib.isBlank(words.get(67)) ? words.get(67) : "0"));
													dataModelShark100.setVas_3ph_max_avg_demand(Double.parseDouble(!Lib.isBlank(words.get(68)) ? words.get(68) : "0"));
													dataModelShark100.setPositive_pf_3ph_max_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(69)) ? words.get(69) : "0"));
													dataModelShark100.setNegative_pf_3ph_max_avg_demand(Float.parseFloat(!Lib.isBlank(words.get(70)) ? words.get(70) : "0"));
													
													dataModelShark100.setFrequency_max(Float.parseFloat(!Lib.isBlank(words.get(71)) ? words.get(71) : "0"));
													dataModelShark100.setVolts_a_n_thd(Float.parseFloat(!Lib.isBlank(words.get(72)) ? words.get(72) : "0"));
													dataModelShark100.setVolts_b_n_thd(Float.parseFloat(!Lib.isBlank(words.get(73)) ? words.get(73) : "0"));
													dataModelShark100.setVolts_c_n_thd(Float.parseFloat(!Lib.isBlank(words.get(74)) ? words.get(74) : "0"));
													dataModelShark100.setAmps_a_thd(Float.parseFloat(!Lib.isBlank(words.get(75)) ? words.get(75) : "0"));
													dataModelShark100.setAmps_b_thd(Float.parseFloat(!Lib.isBlank(words.get(76)) ? words.get(76) : "0"));
													dataModelShark100.setAmps_c_thd(Float.parseFloat(!Lib.isBlank(words.get(77)) ? words.get(77) : "0"));
													dataModelShark100.setPhase_a_current_0th(Float.parseFloat(!Lib.isBlank(words.get(78)) ? words.get(78) : "0"));
													dataModelShark100.setPhase_a_current_1st(Float.parseFloat(!Lib.isBlank(words.get(79)) ? words.get(79) : "0"));
													dataModelShark100.setPhase_a_current_2nd(Float.parseFloat(!Lib.isBlank(words.get(80)) ? words.get(80) : "0"));
													
													dataModelShark100.setPhase_a_current_3rd(Float.parseFloat(!Lib.isBlank(words.get(81)) ? words.get(81) : "0"));
													dataModelShark100.setPhase_a_current_4th(Float.parseFloat(!Lib.isBlank(words.get(82)) ? words.get(82) : "0"));
													dataModelShark100.setPhase_a_current_5th(Float.parseFloat(!Lib.isBlank(words.get(83)) ? words.get(83) : "0"));
													dataModelShark100.setPhase_a_current_6th(Float.parseFloat(!Lib.isBlank(words.get(84)) ? words.get(84) : "0"));
													dataModelShark100.setPhase_a_current_7th(Float.parseFloat(!Lib.isBlank(words.get(85)) ? words.get(85) : "0"));
													dataModelShark100.setPhase_a_voltage_0th(Float.parseFloat(!Lib.isBlank(words.get(86)) ? words.get(86) : "0"));
													dataModelShark100.setPhase_a_voltage_1st(Float.parseFloat(!Lib.isBlank(words.get(87)) ? words.get(87) : "0"));
													dataModelShark100.setPhase_a_voltage_2nd(Float.parseFloat(!Lib.isBlank(words.get(88)) ? words.get(88) : "0"));
													dataModelShark100.setPhase_a_voltage_3rd(Float.parseFloat(!Lib.isBlank(words.get(89)) ? words.get(89) : "0"));
													dataModelShark100.setPhase_b_current_0th(Float.parseFloat(!Lib.isBlank(words.get(90)) ? words.get(90) : "0"));
													
													dataModelShark100.setPhase_b_current_1st(Float.parseFloat(!Lib.isBlank(words.get(91)) ? words.get(91) : "0"));
													dataModelShark100.setPhase_b_current_2nd(Float.parseFloat(!Lib.isBlank(words.get(92)) ? words.get(92) : "0"));
													dataModelShark100.setPhase_b_current_3rd(Float.parseFloat(!Lib.isBlank(words.get(93)) ? words.get(93) : "0"));
													dataModelShark100.setPhase_b_current_4th(Float.parseFloat(!Lib.isBlank(words.get(94)) ? words.get(94) : "0"));
													dataModelShark100.setPhase_b_current_5th(Float.parseFloat(!Lib.isBlank(words.get(95)) ? words.get(95) : "0"));
													dataModelShark100.setPhase_b_current_6th(Float.parseFloat(!Lib.isBlank(words.get(96)) ? words.get(96) : "0"));
													dataModelShark100.setPhase_b_current_7th(Float.parseFloat(!Lib.isBlank(words.get(97)) ? words.get(97) : "0"));
													dataModelShark100.setPhase_b_voltage_0th(Float.parseFloat(!Lib.isBlank(words.get(98)) ? words.get(98) : "0"));
													dataModelShark100.setPhase_b_voltage_1st(Float.parseFloat(!Lib.isBlank(words.get(99)) ? words.get(99) : "0"));
													dataModelShark100.setPhase_b_voltage_2nd(Float.parseFloat(!Lib.isBlank(words.get(100)) ? words.get(100) : "0"));
													
													dataModelShark100.setPhase_b_voltage_3rd(Float.parseFloat(!Lib.isBlank(words.get(101)) ? words.get(101) : "0"));
													dataModelShark100.setPhase_c_current_0th(Float.parseFloat(!Lib.isBlank(words.get(102)) ? words.get(102) : "0"));
													dataModelShark100.setPhase_c_current_1st(Float.parseFloat(!Lib.isBlank(words.get(103)) ? words.get(103) : "0"));
													dataModelShark100.setPhase_c_current_2nd(Float.parseFloat(!Lib.isBlank(words.get(104)) ? words.get(104) : "0"));
													dataModelShark100.setPhase_c_current_3rd(Float.parseFloat(!Lib.isBlank(words.get(105)) ? words.get(105) : "0"));
													dataModelShark100.setPhase_c_current_4th(Float.parseFloat(!Lib.isBlank(words.get(106)) ? words.get(106) : "0"));
													dataModelShark100.setPhase_c_current_5th(Float.parseFloat(!Lib.isBlank(words.get(107)) ? words.get(107) : "0"));
													dataModelShark100.setPhase_c_current_6th(Float.parseFloat(!Lib.isBlank(words.get(108)) ? words.get(108) : "0"));
													dataModelShark100.setPhase_c_current_7th(Float.parseFloat(!Lib.isBlank(words.get(109)) ? words.get(109) : "0"));
													dataModelShark100.setPhase_c_voltage_0th(Float.parseFloat(!Lib.isBlank(words.get(110)) ? words.get(110) : "0"));
													
													dataModelShark100.setPhase_c_voltage_1st(Float.parseFloat(!Lib.isBlank(words.get(111)) ? words.get(111) : "0"));
													dataModelShark100.setPhase_c_voltage_2nd(Float.parseFloat(!Lib.isBlank(words.get(112)) ? words.get(112) : "0"));
													dataModelShark100.setPhase_c_voltage_3rd(Float.parseFloat(!Lib.isBlank(words.get(113)) ? words.get(113) : "0"));
													dataModelShark100.setAngle_phase_a_current(Float.parseFloat(!Lib.isBlank(words.get(114)) ? words.get(114) : "0"));
													dataModelShark100.setAngle_phase_b_current(Float.parseFloat(!Lib.isBlank(words.get(115)) ? words.get(115) : "0"));
													dataModelShark100.setAngle_phase_c_current(Float.parseFloat(!Lib.isBlank(words.get(116)) ? words.get(116) : "0"));
													dataModelShark100.setAngle_volts_a_b(Float.parseFloat(!Lib.isBlank(words.get(117)) ? words.get(117) : "0"));
													dataModelShark100.setAngle_volts_b_c(Float.parseFloat(!Lib.isBlank(words.get(118)) ? words.get(118) : "0"));
													dataModelShark100.setAngle_volts_c_a(Float.parseFloat(!Lib.isBlank(words.get(119)) ? words.get(119) : "0"));
													
													boolean dataInsert = serviceModelShark100.insertModelShark100(dataModelShark100);
													if (!dataInsert) {
														statusInsert = true;
													}
												}
											}
											
											fr.close(); // closes the stream and release the resources
											
											break;
										case "model_rt1_class30000":
											
											ModelRT1Class30000Service serviceModelRT1Class30000 = new ModelRT1Class30000Service();
											// Check insert database status
											while ((line = br.readLine()) != null) {
												sb.append(line); // appends line to string buffer
												sb.append("\n"); // line feed
												// Convert string to array
												List<String> words = Lists.newArrayList(Splitter.on(',').split(line));
												if (words.size() > 0) {
													ModelRT1Class30000Entity dataModelRTC30000 = new ModelRT1Class30000Entity();
													
													dataModelRTC30000.setTime(words.get(0).replace("'", ""));
													dataModelRTC30000.setError(Integer.parseInt(!Lib.isBlank(words.get(1)) ? words.get(1) : "0"));
													dataModelRTC30000.setId_device(item.getId());
													dataModelRTC30000.setLow_alarm(Integer.parseInt(!Lib.isBlank(words.get(2)) ? words.get(2) : "0"));
													dataModelRTC30000.setHigh_alarm(Integer.parseInt(!Lib.isBlank(words.get(3)) ? words.get(3) : "0"));
													dataModelRTC30000.setDevice_type(Float.parseFloat(!Lib.isBlank(words.get(4)) ? words.get(4) : "0"));
													dataModelRTC30000.setData_model_version(Float.parseFloat(!Lib.isBlank(words.get(5)) ? words.get(5) : "0"));
													dataModelRTC30000.setOperational_mode(Float.parseFloat(!Lib.isBlank(words.get(6)) ? words.get(6) : "0"));
													dataModelRTC30000.setStatus_flags(Float.parseFloat(!Lib.isBlank(words.get(7)) ? words.get(7) : "0"));
													dataModelRTC30000.setSensor1_data(Float.parseFloat(!Lib.isBlank(words.get(8)) ? words.get(8) : "0"));
													dataModelRTC30000.setPanel_temperature(Float.parseFloat(!Lib.isBlank(words.get(9)) ? words.get(9) : "0"));
													dataModelRTC30000.setExternal_power_sensor(Float.parseFloat(!Lib.isBlank(words.get(10)) ? words.get(10) : "0"));
													dataModelRTC30000.setCalibration_date(Double.parseDouble(!Lib.isBlank(words.get(11)) ? words.get(11) : "0"));
													dataModelRTC30000.setError_code(Float.parseFloat(!Lib.isBlank(words.get(12)) ? words.get(12) : "0"));
													dataModelRTC30000.setProtocol_error(Float.parseFloat(!Lib.isBlank(words.get(13)) ? words.get(13) : "0"));
													dataModelRTC30000.setBatch_number(Float.parseFloat(!Lib.isBlank(words.get(14)) ? words.get(14) : "0"));
													dataModelRTC30000.setSerial_number(Float.parseFloat(!Lib.isBlank(words.get(15)) ? words.get(15) : "0"));
													dataModelRTC30000.setSoftware_version(Float.parseFloat(!Lib.isBlank(words.get(16)) ? words.get(16) : "0"));
													dataModelRTC30000.setHardware_version(Float.parseFloat(!Lib.isBlank(words.get(17)) ? words.get(17) : "0"));
													dataModelRTC30000.setNode_id(Float.parseFloat(!Lib.isBlank(words.get(18)) ? words.get(18) : "0"));
													
													boolean dataInsert = serviceModelRT1Class30000.insertModelRT1Class30000(dataModelRTC30000);
													if (!dataInsert) {
														statusInsert = true;
													}
												}
											}
											
											fr.close(); // closes the stream and release the resources
											
											break;

										case "model_ivt_solaron_ext":
											ModelIVTSolaronEXTService serviceModelIVTSolaronEXT = new ModelIVTSolaronEXTService();
											// Check insert database status
											while ((line = br.readLine()) != null) {
												sb.append(line); // appends line to string buffer
												sb.append("\n"); // line feed
												// Convert string to array
												List<String> words = Lists.newArrayList(Splitter.on(',').split(line));
												if (words.size() > 0) {
													ModelIVTSolaronEXTEntity dataModelIVTSolaronEXT = new ModelIVTSolaronEXTEntity();
													
													dataModelIVTSolaronEXT.setTime(words.get(0).replace("'", ""));
													dataModelIVTSolaronEXT.setError(Integer.parseInt(!Lib.isBlank(words.get(1)) ? words.get(1) : "0"));
													dataModelIVTSolaronEXT.setId_device(item.getId());
													dataModelIVTSolaronEXT.setLow_alarm(Integer.parseInt(!Lib.isBlank(words.get(2)) ? words.get(2) : "0"));
													dataModelIVTSolaronEXT.setHigh_alarm(Integer.parseInt(!Lib.isBlank(words.get(3)) ? words.get(3) : "0"));
													dataModelIVTSolaronEXT.setToday_kwh(Double.parseDouble(!Lib.isBlank(words.get(4)) ? words.get(4) : "0"));
													
													dataModelIVTSolaronEXT.setYtd_kwh_total(Double.parseDouble(!Lib.isBlank(words.get(5)) ? words.get(5) : "0"));
													dataModelIVTSolaronEXT.setLife_kwh_total(Double.parseDouble(!Lib.isBlank(words.get(6)) ? words.get(6) : "0"));
													dataModelIVTSolaronEXT.setYtd_kwh(Double.parseDouble(!Lib.isBlank(words.get(7)) ? words.get(7) : "0"));
													dataModelIVTSolaronEXT.setLife_kwh(Double.parseDouble(!Lib.isBlank(words.get(8)) ? words.get(8) : "0"));
													dataModelIVTSolaronEXT.setLast_15min_kwh(Double.parseDouble(!Lib.isBlank(words.get(9)) ? words.get(9) : "0"));
													dataModelIVTSolaronEXT.setTimestamp_15minutes(Double.parseDouble(!Lib.isBlank(words.get(10)) ? words.get(10) : "0"));
													dataModelIVTSolaronEXT.setLast_restart(Double.parseDouble(!Lib.isBlank(words.get(11)) ? words.get(11) : "0"));
													
													dataModelIVTSolaronEXT.setUptime(Double.parseDouble(!Lib.isBlank(words.get(12)) ? words.get(12) : "0"));
													dataModelIVTSolaronEXT.setAc_power(Double.parseDouble(!Lib.isBlank(words.get(13)) ? words.get(13) : "0"));
													dataModelIVTSolaronEXT.setAc_frequency(Float.parseFloat(!Lib.isBlank(words.get(14)) ? words.get(14) : "0"));
													dataModelIVTSolaronEXT.setPv_voltage(Float.parseFloat(!Lib.isBlank(words.get(15)) ? words.get(15) : "0"));
													dataModelIVTSolaronEXT.setPv_current(Float.parseFloat(!Lib.isBlank(words.get(16)) ? words.get(16) : "0"));
													dataModelIVTSolaronEXT.setCommon_mode(Float.parseFloat(!Lib.isBlank(words.get(17)) ? words.get(17) : "0"));
													dataModelIVTSolaronEXT.setAmbient_temperature(Float.parseFloat(!Lib.isBlank(words.get(18)) ? words.get(18) : "0"));
													dataModelIVTSolaronEXT.setCoolant_temperature(Float.parseFloat(!Lib.isBlank(words.get(19)) ? words.get(19) : "0"));
													dataModelIVTSolaronEXT.setReactor_temperature(Float.parseFloat(!Lib.isBlank(words.get(20)) ? words.get(20) : "0"));
													dataModelIVTSolaronEXT.setCabinet_temperature(Float.parseFloat(!Lib.isBlank(words.get(21)) ? words.get(21) : "0"));
													
													dataModelIVTSolaronEXT.setBus_voltage(Float.parseFloat(!Lib.isBlank(words.get(22)) ? words.get(22) : "0"));
													dataModelIVTSolaronEXT.setGround_current(Float.parseFloat(!Lib.isBlank(words.get(23)) ? words.get(23) : "0"));
													dataModelIVTSolaronEXT.setReactive_power(Float.parseFloat(!Lib.isBlank(words.get(24)) ? words.get(24) : "0"));
													dataModelIVTSolaronEXT.setActive_faults1(Float.parseFloat(!Lib.isBlank(words.get(25)) ? words.get(25) : "0"));
													dataModelIVTSolaronEXT.setActive_faults2(Float.parseFloat(!Lib.isBlank(words.get(26)) ? words.get(26) : "0"));
													dataModelIVTSolaronEXT.setActive_faults3(Float.parseFloat(!Lib.isBlank(words.get(27)) ? words.get(27) : "0"));
													dataModelIVTSolaronEXT.setStatus(Float.parseFloat(!Lib.isBlank(words.get(28)) ? words.get(28) : "0"));
													dataModelIVTSolaronEXT.setWarnings1(Float.parseFloat(!Lib.isBlank(words.get(29)) ? words.get(29) : "0"));
													dataModelIVTSolaronEXT.setWarnings2_reserved(Float.parseFloat(!Lib.isBlank(words.get(30)) ? words.get(30) : "0"));
													dataModelIVTSolaronEXT.setWarnings3_reserved(Float.parseFloat(!Lib.isBlank(words.get(31)) ? words.get(31) : "0"));
													
													dataModelIVTSolaronEXT.setLimits(Float.parseFloat(!Lib.isBlank(words.get(32)) ? words.get(32) : "0"));
													dataModelIVTSolaronEXT.setYear(Float.parseFloat(!Lib.isBlank(words.get(33)) ? words.get(33) : "0"));
													dataModelIVTSolaronEXT.setMonth(Float.parseFloat(!Lib.isBlank(words.get(34)) ? words.get(34) : "0"));
													dataModelIVTSolaronEXT.setDay(Float.parseFloat(!Lib.isBlank(words.get(35)) ? words.get(35) : "0"));
													dataModelIVTSolaronEXT.setHour(Float.parseFloat(!Lib.isBlank(words.get(36)) ? words.get(36) : "0"));
													dataModelIVTSolaronEXT.setMinutes(Float.parseFloat(!Lib.isBlank(words.get(37)) ? words.get(37) : "0"));
													dataModelIVTSolaronEXT.setSeconds(Float.parseFloat(!Lib.isBlank(words.get(38)) ? words.get(38) : "0"));
													dataModelIVTSolaronEXT.setCurrent_time(Double.parseDouble(!Lib.isBlank(words.get(39)) ? words.get(39) : "0"));
													dataModelIVTSolaronEXT.setAc_current(Double.parseDouble(!Lib.isBlank(words.get(40)) ? words.get(40) : "0"));
													dataModelIVTSolaronEXT.setRequset_set_ac_power_limit(Float.parseFloat(!Lib.isBlank(words.get(41)) ? words.get(41) : "0"));
													
													dataModelIVTSolaronEXT.setRequest_set_instantaneous_reactive_power_set_point(Float.parseFloat(!Lib.isBlank(words.get(42)) ? words.get(42) : "0"));
													dataModelIVTSolaronEXT.setAutostart_status(Float.parseFloat(!Lib.isBlank(words.get(43)) ? words.get(43) : "0"));
													dataModelIVTSolaronEXT.setSet_read_reactive_power_mode(Float.parseFloat(!Lib.isBlank(words.get(44)) ? words.get(44) : "0"));
													dataModelIVTSolaronEXT.setSet_read_p_ac_limit(Float.parseFloat(!Lib.isBlank(words.get(45)) ? words.get(45) : "0"));
													dataModelIVTSolaronEXT.setSet_read_instantaneous_reactive_power_set_point(Float.parseFloat(!Lib.isBlank(words.get(46)) ? words.get(46) : "0"));
													dataModelIVTSolaronEXT.setSet_read_power_factor_set_point(Float.parseFloat(!Lib.isBlank(words.get(47)) ? words.get(47) : "0"));
													dataModelIVTSolaronEXT.setAc_power_ramp_rate(Float.parseFloat(!Lib.isBlank(words.get(48)) ? words.get(48) : "0"));
													dataModelIVTSolaronEXT.setReactive_power_ramp_rate(Float.parseFloat(!Lib.isBlank(words.get(49)) ? words.get(49) : "0"));
													dataModelIVTSolaronEXT.setPower_factor_ramp_rate(Float.parseFloat(!Lib.isBlank(words.get(50)) ? words.get(50) : "0"));
													
													boolean dataInsert = serviceModelIVTSolaronEXT.insertModelIVTSolaronEXT(dataModelIVTSolaronEXT);
													if (!dataInsert) {
														statusInsert = true;
													}
												}
											}
											
											fr.close(); // closes the stream and release the resources
											break;
											
										case "model_imtsolar_class8000":
											ModelIMTSolarClass8000Service serviceModelIMTSolarClass8000 = new ModelIMTSolarClass8000Service();
											// Check insert database status
											while ((line = br.readLine()) != null) {
												sb.append(line); // appends line to string buffer
												sb.append("\n"); // line feed
												// Convert string to array
												List<String> words = Lists.newArrayList(Splitter.on(',').split(line));
												if (words.size() > 0) {
													ModelIMTSolarClass8000Entity dataModelIMTSolarClass = new ModelIMTSolarClass8000Entity();
													
													dataModelIMTSolarClass.setTime(words.get(0).replace("'", ""));
													dataModelIMTSolarClass.setError(Integer.parseInt(!Lib.isBlank(words.get(1)) ? words.get(1) : "0"));
													dataModelIMTSolarClass.setId_device(item.getId());
													dataModelIMTSolarClass.setLow_alarm(Integer.parseInt(!Lib.isBlank(words.get(2)) ? words.get(2) : "0"));
													dataModelIMTSolarClass.setHigh_alarm(Integer.parseInt(!Lib.isBlank(words.get(3)) ? words.get(3) : "0"));
													dataModelIMTSolarClass.setIrradiance(Double.parseDouble(!Lib.isBlank(words.get(4)) ? words.get(4) : "0"));
													dataModelIMTSolarClass.setTcell(Double.parseDouble(!Lib.isBlank(words.get(5)) ? words.get(5) : "0"));
													
													boolean dataInsert = serviceModelIMTSolarClass8000.insertModelIMTSolarClass8000(dataModelIMTSolarClass);
													if (!dataInsert) {
														statusInsert = true;
													}
												}
											}
											
											fr.close(); // closes the stream and release the resources
											break;
										case "model_advanced_energy_solaron":
											ModelAdvancedEnergySolaronService serviceModelAdvancedEnergySolaron = new ModelAdvancedEnergySolaronService();
											// Check insert database status
											while ((line = br.readLine()) != null) {
												sb.append(line); // appends line to string buffer
												sb.append("\n"); // line feed
												// Convert string to array
												List<String> words = Lists.newArrayList(Splitter.on(',').split(line));
												if (words.size() > 0) {
													ModelAdvancedEnergySolaronEntity dataModelAdvancedEnergySolaron = new ModelAdvancedEnergySolaronEntity();
													
													dataModelAdvancedEnergySolaron.setTime(words.get(0).replace("'", ""));
													dataModelAdvancedEnergySolaron.setError(Integer.parseInt(!Lib.isBlank(words.get(1)) ? words.get(1) : "0"));
													dataModelAdvancedEnergySolaron.setId_device(item.getId());
													dataModelAdvancedEnergySolaron.setLow_alarm(Integer.parseInt(!Lib.isBlank(words.get(2)) ? words.get(2) : "0"));
													dataModelAdvancedEnergySolaron.setHigh_alarm(Integer.parseInt(!Lib.isBlank(words.get(3)) ? words.get(3) : "0"));
													dataModelAdvancedEnergySolaron.setToday_kwh(Double.parseDouble(!Lib.isBlank(words.get(4)) ? words.get(4) : "0"));
													
													dataModelAdvancedEnergySolaron.setYtd_kwh_total(Double.parseDouble(!Lib.isBlank(words.get(5)) ? words.get(5) : "0"));
													dataModelAdvancedEnergySolaron.setLife_kwh_total(Double.parseDouble(!Lib.isBlank(words.get(6)) ? words.get(6) : "0"));
													dataModelAdvancedEnergySolaron.setYtd_kwh(Double.parseDouble(!Lib.isBlank(words.get(7)) ? words.get(7) : "0"));
													dataModelAdvancedEnergySolaron.setLife_kwh(Double.parseDouble(!Lib.isBlank(words.get(8)) ? words.get(8) : "0"));
													dataModelAdvancedEnergySolaron.setLast_15min_kwh(Double.parseDouble(!Lib.isBlank(words.get(9)) ? words.get(9) : "0"));
													dataModelAdvancedEnergySolaron.setTimestamp_15minutes(Double.parseDouble(!Lib.isBlank(words.get(10)) ? words.get(10) : "0"));
													dataModelAdvancedEnergySolaron.setLast_restart(Double.parseDouble(!Lib.isBlank(words.get(11)) ? words.get(11) : "0"));
													
													dataModelAdvancedEnergySolaron.setUptime(Double.parseDouble(!Lib.isBlank(words.get(12)) ? words.get(12) : "0"));
													dataModelAdvancedEnergySolaron.setAc_power(Double.parseDouble(!Lib.isBlank(words.get(13)) ? words.get(13) : "0"));
													dataModelAdvancedEnergySolaron.setAc_frequency(Float.parseFloat(!Lib.isBlank(words.get(14)) ? words.get(14) : "0"));
													dataModelAdvancedEnergySolaron.setPv_voltage(Float.parseFloat(!Lib.isBlank(words.get(15)) ? words.get(15) : "0"));
													dataModelAdvancedEnergySolaron.setPv_current(Float.parseFloat(!Lib.isBlank(words.get(16)) ? words.get(16) : "0"));
													dataModelAdvancedEnergySolaron.setCommon_mode(Float.parseFloat(!Lib.isBlank(words.get(17)) ? words.get(17) : "0"));
													dataModelAdvancedEnergySolaron.setAmbient_temperature(Float.parseFloat(!Lib.isBlank(words.get(18)) ? words.get(18) : "0"));
													dataModelAdvancedEnergySolaron.setCoolant_temperature(Float.parseFloat(!Lib.isBlank(words.get(19)) ? words.get(19) : "0"));
													dataModelAdvancedEnergySolaron.setReactor_temperature(Float.parseFloat(!Lib.isBlank(words.get(20)) ? words.get(20) : "0"));
													dataModelAdvancedEnergySolaron.setCabinet_temperature(Float.parseFloat(!Lib.isBlank(words.get(21)) ? words.get(21) : "0"));
													
													dataModelAdvancedEnergySolaron.setBus_voltage(Float.parseFloat(!Lib.isBlank(words.get(22)) ? words.get(22) : "0"));
													dataModelAdvancedEnergySolaron.setGround_current(Float.parseFloat(!Lib.isBlank(words.get(23)) ? words.get(23) : "0"));
													dataModelAdvancedEnergySolaron.setReactive_power(Float.parseFloat(!Lib.isBlank(words.get(24)) ? words.get(24) : "0"));
													dataModelAdvancedEnergySolaron.setActive_faults1(Float.parseFloat(!Lib.isBlank(words.get(25)) ? words.get(25) : "0"));
													dataModelAdvancedEnergySolaron.setActive_faults2(Float.parseFloat(!Lib.isBlank(words.get(26)) ? words.get(26) : "0"));
													dataModelAdvancedEnergySolaron.setActive_faults3(Float.parseFloat(!Lib.isBlank(words.get(27)) ? words.get(27) : "0"));
													dataModelAdvancedEnergySolaron.setStatus(Float.parseFloat(!Lib.isBlank(words.get(28)) ? words.get(28) : "0"));
													dataModelAdvancedEnergySolaron.setWarnings1(Float.parseFloat(!Lib.isBlank(words.get(29)) ? words.get(29) : "0"));
													dataModelAdvancedEnergySolaron.setWarnings2_reserved(Float.parseFloat(!Lib.isBlank(words.get(30)) ? words.get(30) : "0"));
													dataModelAdvancedEnergySolaron.setWarnings3_reserved(Float.parseFloat(!Lib.isBlank(words.get(31)) ? words.get(31) : "0"));
													
													dataModelAdvancedEnergySolaron.setLimits(Float.parseFloat(!Lib.isBlank(words.get(32)) ? words.get(32) : "0"));
													dataModelAdvancedEnergySolaron.setYear(Float.parseFloat(!Lib.isBlank(words.get(33)) ? words.get(33) : "0"));
													dataModelAdvancedEnergySolaron.setMonth(Float.parseFloat(!Lib.isBlank(words.get(34)) ? words.get(34) : "0"));
													dataModelAdvancedEnergySolaron.setDay(Float.parseFloat(!Lib.isBlank(words.get(35)) ? words.get(35) : "0"));
													dataModelAdvancedEnergySolaron.setHour(Float.parseFloat(!Lib.isBlank(words.get(36)) ? words.get(36) : "0"));
													dataModelAdvancedEnergySolaron.setMinutes(Float.parseFloat(!Lib.isBlank(words.get(37)) ? words.get(37) : "0"));
													dataModelAdvancedEnergySolaron.setSeconds(Float.parseFloat(!Lib.isBlank(words.get(38)) ? words.get(38) : "0"));
													dataModelAdvancedEnergySolaron.setCurrent_time(Double.parseDouble(!Lib.isBlank(words.get(39)) ? words.get(39) : "0"));
													
													boolean dataInsert = serviceModelAdvancedEnergySolaron.insertModelAdvancedEnergySolaron(dataModelAdvancedEnergySolaron);
													if (!dataInsert) {
														statusInsert = true;
													}
												}
											}
											
											fr.close(); // closes the stream and release the resources
											break;
											
										case "model_pvp_inverter":
											ModelPVPInverterService serviceModelPVPInverter = new ModelPVPInverterService();
											// Check insert database status
											while ((line = br.readLine()) != null) {
												sb.append(line); // appends line to string buffer
												sb.append("\n"); // line feed
												// Convert string to array
												List<String> words = Lists.newArrayList(Splitter.on(',').split(line));
												if (words.size() > 0) {
													ModelPVPInverterEntity dataModelPVPInverter = new ModelPVPInverterEntity();
													
													dataModelPVPInverter.setTime(words.get(0).replace("'", ""));
													dataModelPVPInverter.setError(Integer.parseInt(!Lib.isBlank(words.get(1)) ? words.get(1) : "0"));
													dataModelPVPInverter.setId_device(item.getId());
													dataModelPVPInverter.setLow_alarm(Integer.parseInt(!Lib.isBlank(words.get(2)) ? words.get(2) : "0"));
													dataModelPVPInverter.setHigh_alarm(Integer.parseInt(!Lib.isBlank(words.get(3)) ? words.get(3) : "0"));
													dataModelPVPInverter.setTotal_kwh_delivered(Double.parseDouble(!Lib.isBlank(words.get(4)) ? words.get(4) : "0"));
													
													dataModelPVPInverter.setVolts_a_l_n(Float.parseFloat(!Lib.isBlank(words.get(5)) ? words.get(5) : "0"));
													dataModelPVPInverter.setVolts_b_l_n(Float.parseFloat(!Lib.isBlank(words.get(6)) ? words.get(6) : "0"));
													dataModelPVPInverter.setVolts_c_l_n(Float.parseFloat(!Lib.isBlank(words.get(7)) ? words.get(7) : "0"));
													dataModelPVPInverter.setCurrent_a(Float.parseFloat(!Lib.isBlank(words.get(8)) ? words.get(8) : "0"));
													dataModelPVPInverter.setCurrent_b(Float.parseFloat(!Lib.isBlank(words.get(9)) ? words.get(9) : "0"));
													dataModelPVPInverter.setCurrent_c(Float.parseFloat(!Lib.isBlank(words.get(10)) ? words.get(10) : "0"));
													dataModelPVPInverter.setDc_output_voltage(Float.parseFloat(!Lib.isBlank(words.get(11)) ? words.get(11) : "0"));
													
													dataModelPVPInverter.setDc_output_current(Float.parseFloat(!Lib.isBlank(words.get(12)) ? words.get(12) : "0"));
													dataModelPVPInverter.setLine_frenquency(Float.parseFloat(!Lib.isBlank(words.get(13)) ? words.get(13) : "0"));
													dataModelPVPInverter.setLine_kw(Float.parseFloat(!Lib.isBlank(words.get(14)) ? words.get(14) : "0"));
													dataModelPVPInverter.setInverter_operating_status(!Lib.isBlank(words.get(15)) ? words.get(15) : "0");
													dataModelPVPInverter.setInverter_fault_word0(Float.parseFloat(!Lib.isBlank(words.get(16)) ? words.get(16) : "0"));
													dataModelPVPInverter.setInverter_fault_word1(Float.parseFloat(!Lib.isBlank(words.get(17)) ? words.get(17) : "0"));
													dataModelPVPInverter.setInverter_fault_word2(Float.parseFloat(!Lib.isBlank(words.get(18)) ? words.get(18) : "0"));
													dataModelPVPInverter.setData_comm_status(!Lib.isBlank(words.get(19)) ? words.get(19) : "0");
													
													boolean dataInsert = serviceModelPVPInverter.insertModelPVPInverter(dataModelPVPInverter);
													if (!dataInsert) {
														statusInsert = true;
													}
												}
											}
											
											fr.close(); // closes the stream and release the resources
											break;
										}
									}
									
									
								}
							}
							
							// Delete file log and file tmp
							if (!statusInsert) {
								File logFile = new File(root.resolve(fileName).toString());
								logFile.delete();

								Path path = Paths.get(Lib.getReourcePropValue(Constants.appConfigFileName,
										Constants.uploadRootPathConfigKey) + "/" + "bm-" + modbusdevice + "."
										+ timeStamp + ".log.gz");
								File logGzFile = new File(path.toString());
								logGzFile.delete();
							}
						}
						
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

				});
				message = "\nSUCCESS\n";
			} else {
				message = "Mode type test " + mode + " not supported by this sample script.";
				
			}

			// return ResponseEntity.status(HttpStatus.OK).body(new
			// ResponseMessage(message));
			return message;

		} catch (Exception e) {
			message = "\nFAILURE!\n";
			// return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new
			// ResponseMessage(message));
			return message;
		}
	}

}
