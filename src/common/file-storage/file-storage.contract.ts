export interface GetPresignedUrl {
    url: string;
    fields: { [key: string]: string };
}

export interface GetPresignedUrlParams {
    folderPath: string;
}

export interface FileStorageClientContract {
    getPresignedUrl(params: GetPresignedUrlParams): Promise<GetPresignedUrl>;
}

export interface FileStorageServiceContract {
    generateUploadUrl(params: {
        fileType: string;
        folderPath: string;
    }): Promise<GetPresignedUrl>;
}
