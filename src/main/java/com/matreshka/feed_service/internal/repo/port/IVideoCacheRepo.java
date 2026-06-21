package com.matreshka.feed_service.internal.repo.port;

public interface IVideoCacheRepo {
    void like(String videoId);

    void unlike(String videoId);

    long getDelta(String videoId);

    void addView(String videoId);
}
