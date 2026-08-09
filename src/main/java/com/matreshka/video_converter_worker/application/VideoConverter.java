package com.matreshka.video_converter_worker.application;

import com.matreshka.video_converter_worker.application.port.IVideoConverter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class VideoConverter implements IVideoConverter {

    public File convert(File inputFile) {
        log.info("Начало конвертации: {}", inputFile.getName());
        File outputFile = new File(inputFile.getParent(), "output_" + inputFile.getName());

        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg", "-y", "-i", inputFile.getAbsolutePath(),
                "-c:v", "libx264", "-c:a", "aac", outputFile.getAbsolutePath()
        );

        try {
            Process process = pb.start();
            boolean finished = process.waitFor(10, TimeUnit.MINUTES);

            if (!finished || process.exitValue() != 0) {
                throw new RuntimeException("Ошибка FFmpeg при конвертации " + inputFile.getName());
            }

            log.info("Конвертация завершена: {}", outputFile.getName());
            return outputFile;
        } catch (Exception e) {
            log.error("Критическая ошибка конвертации", e);
            throw new RuntimeException(e);
        }
    }
}