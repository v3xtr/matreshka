package com.matreshka.video_converter_worker.application.port;

import java.io.File;

public interface IS3Service {
    File download(String s3Key);
    String upload(File file);
}
