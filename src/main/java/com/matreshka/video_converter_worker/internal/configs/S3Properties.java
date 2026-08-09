package com.matreshka.video_converter_worker.internal.configs;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "aws.s3")
public class S3Properties {
    private String region;
    private String accessKey;
    private String secretKey;
    private String endpoint;
    private String bucketName;
}