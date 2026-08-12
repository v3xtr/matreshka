package com.matreshka.video_converter_worker.application.port;

import java.io.File;

public interface IVideoConverter {
    File convert(File inputFile);
}
