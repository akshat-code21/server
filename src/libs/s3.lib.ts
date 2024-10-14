import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class S3 {
  #s3: S3Client;
  #bucketName: string;

  constructor(AWS_ACCESS_KEY_ID: string, AWS_SECRET_ACCESS_KEY: string, AWS_S3_BUCKET_NAME: string, AWS_S3_BUCKET_REGION: string) {
    this.#s3 = new S3Client({
      region: AWS_S3_BUCKET_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    this.#bucketName = AWS_S3_BUCKET_NAME;
  }

  async uploadFile(fileBuffer: Buffer, fileName: string) {
    const params = {
      Bucket: this.#bucketName,
      Key: fileName,
      Body: fileBuffer,
    };

    try {
      await this.#s3.send(new PutObjectCommand(params));
      console.log('File uploaded Successfully');
    } catch (error) {
      console.error('Error uploading file: ', error);
      throw error;
    }
  }

  async retrieveFile(fileKey: string) {
    const params = {
      Bucket: this.#bucketName,
      Key: fileKey,
    };

    try {
      const { Body } = await this.#s3.send(new GetObjectCommand(params));
      return Body;
    } catch (error) {
      console.error('Error retreiving file: ', error);
      throw error;
    }
  }

  async getPresignedUrl(fileKey: string): Promise<string> {
    const params = {
      Bucket: this.#bucketName,
      Key: fileKey,
    };

    try {
      // The URL will be valid for 60 minutes
      return await getSignedUrl(this.#s3, new GetObjectCommand(params), { expiresIn: 3600 });
    } catch (error) {
      console.error('Error creating pre-signed url: ', error);
      throw error;
    }
  }

  async deleteFile(fileKey: string) {
    const params = {
      Bucket: this.#bucketName,
      Key: fileKey,
    };

    try {
      await this.#s3.send(new DeleteObjectCommand(params));
      console.log('File deleted successfully: ', fileKey);
    } catch (error) {
      console.error('Error deleting file: ', error);
      throw error;
    }
  }
}

export default S3;
