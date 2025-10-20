import { ValidationError } from 'yup';
import {
    FileStorageClientContract,
    FileStorageServiceContract,
    GetPresignedUrl,
} from './file-storage.contract';

export class FileStorageService implements FileStorageServiceContract {
    readonly client;
    constructor(client: FileStorageClientContract) {
        this.client = client;
    }

    async generateUploadUrl({
        fileType,
        folderPath,
    }: {
        fileType: string;
        folderPath: string;
    }): Promise<GetPresignedUrl> {
        if (fileType !== 'image/jpeg' && fileType !== 'image/png')
            throw new ValidationError('Invalid file type');
        return this.client.getPresignedUrl({ folderPath });
    }
}
