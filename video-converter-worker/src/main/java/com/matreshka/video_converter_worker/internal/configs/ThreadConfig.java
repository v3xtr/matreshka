package com.matreshka.video_converter_worker.internal.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Configuration
public class ThreadConfig {

    @Bean(name = "videoCpuExecutor")
    public ThreadPoolTaskExecutor videoCpuExecutor() {
        int cores = Runtime.getRuntime().availableProcessors();
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(cores);
        executor.setMaxPoolSize(cores);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("VideoCPU-");
        executor.initialize();
        return executor;
    }

    @Bean(name = "ioExecutor")
    public Executor ioExecutor() {
        return Executors.newVirtualThreadPerTaskExecutor();
    }
}
