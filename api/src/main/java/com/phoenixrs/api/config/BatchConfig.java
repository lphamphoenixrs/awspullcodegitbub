/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.config;


import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.phoenixrs.api.batchjob.BatchJob;
@Configuration
@EnableBatchProcessing
@EnableScheduling
public class BatchConfig {
	
	/**
	 * @description batch job get alert for all device
	 * @author long.pham
	 * @since 2021-02-17
	 */
//	@Scheduled(cron = "* * * * * *")
//	@Scheduled(cron = "0 */1 * * * *")
	@Scheduled(cron = "0 */15 * * * *")
	public void startBatchJobGetAlert() throws Exception {
		BatchJob job =new BatchJob(); 
//		System.out.println("Start job Batch Review Product "+new Date().toString());
		job.runCronJobGetAlert();
	}
}
