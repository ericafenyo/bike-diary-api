import { ReadStream } from 'fs';
import AwsStorage from './internal/aws-storage';

export interface UploadedFile {
  /**
   * The location of the uploaded file without the base URL of the file server.
   * For example: /images/5080d54e44ba44c68002a3c626541974.png
   */
  path: string;
}

/**
 *
 */
export interface FileStorageOption {
  name: string;
  stream: ReadStream;
}

/**
 * We created this interface to support the implementation of custom file storage.
 * The default implementation uses AWS S3. You can replace it with your implementation.
 *
 * @see {@link AwsStorage}
 */
export interface FileStorage {
  add(option: FileStorageOption): Promise<UploadedFile>;
}

export const fileStorage: FileStorage = new AwsStorage();
