import { env } from '@config';
import {
    FileStorageClientContract,
    GetPresignedUrl,
    GetPresignedUrlParams,
} from '../file-storage.contract';
import { v2 as cloudinary, SignApiOptions } from 'cloudinary';
import { v4 as uuid } from 'uuid';
export class CloudinaryService implements FileStorageClientContract {
    async getPresignedUrl(
        params: GetPresignedUrlParams,
    ): Promise<GetPresignedUrl> {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const public_id = uuid();
        const transformation = 'w_200,h_200,c_fill,g_auto';

        const options: SignApiOptions = {
            timestamp,
            folder: params.folderPath,
            public_id: public_id,
            transformation: transformation,
        };
        const imageUrl = cloudinary.utils.api_sign_request(
            options,
            env.CLOUDINARY_API_SECRET,
        );

        const cloudName = env.CLOUDINARY_CLOUD_NAME;
        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        return {
            fields: {
                signature: imageUrl,
                timestamp: timestamp.toString(),
                apiKey: env.CLOUDINARY_API_KEY,
                cloudName,
                folder: params.folderPath,
                public_id: public_id,
                transformation: transformation,
            },
            url: uploadUrl,
        };
    }
}
