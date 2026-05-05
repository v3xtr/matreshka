package com.matreshka.thumbnail_service.application.port;

import java.io.IOException;
import java.nio.file.Path;

public interface IThumbnailService {
    void generateThumbnail(String inputPath, String outputPath);
    Path downloadVideo(String s3Key) throws IOException;
    String uploadFile(String s3Key, Path filePath);
}
