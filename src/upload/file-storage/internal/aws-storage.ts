import * as S3 from 'aws-sdk/clients/s3';
import { FileStorage, FileStorageOption, UploadedFile } from '../index';

export default class AwsStorage implements FileStorage {
  /**
   * Uploads a single file to AWS S3 bucket.

   * TODO: Model a file upload failed error.
   * @throws Generals exception when the upload failed.
   */
  async add(option: FileStorageOption): Promise<UploadedFile> {

    // Keep an instance of AWS S3 in a variable.
    // We will use this to manage file uploads.
    // Read more about S3: https://docs.aws.amazon.com/s3/index.html
    const storage = new S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const rootDir = '/photos';
    const fileRelativePath = `${rootDir}/${option.name}`;
    await storage
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileRelativePath,
        Body: option.stream,
      })
      .promise();

    /*
     * When the upload succeeds, the URL of the uploaded file without a `base_url`
     * is the same as the `fileRelativePath` above.
     *
     * For example: https://<aws_base_url>/photos/5080d54e44ba44c68002a3c626541974.png
     *
     * The image cannot the access using the `base_url` but through a dedicated CDN so no need
     * to return the whole location URL.
     */
    return {
      path: fileRelativePath,
    };
  }
}
