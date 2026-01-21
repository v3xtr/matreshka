export interface IMediaRepo {
    create(data: Media): Promise<Media>
}