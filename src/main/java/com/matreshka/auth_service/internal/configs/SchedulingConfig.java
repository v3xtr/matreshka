package com.matreshka.auth_service.internal.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

@Configuration
public class SchedulingConfig implements SchedulingConfigurer {

    @Bean(destroyMethod = "shutdown")
    public ThreadPoolTaskScheduler outboxTaskScheduler() {
        ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
        taskScheduler.setPoolSize(5);
        taskScheduler.setThreadNamePrefix("outbox-sched-");

        taskScheduler.setWaitForTasksToCompleteOnShutdown(true);
        taskScheduler.setAwaitTerminationSeconds(20);

        return taskScheduler;
    }

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        taskRegistrar.setTaskScheduler(outboxTaskScheduler());
    }
}