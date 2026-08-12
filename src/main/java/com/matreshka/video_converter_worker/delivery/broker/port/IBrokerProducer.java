package com.matreshka.video_converter_worker.delivery.broker.port;

public interface IBrokerProducer {
    void sendSuccess(String videoId, String resultUrl, String advertId);
    void sendError(String videoId, String error);
}
