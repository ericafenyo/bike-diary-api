import { Injectable } from '@nestjs/common';
import { v4 as generateUUID } from 'uuid';
import { ReadStream } from 'fs';
import { fileStorage } from './file-storage';

@Injectable()
export class UploadService {
  
  /**
   * Uploads a file into the given {@link fileStorage}.
   *
   * The file name is automatically generated. Meaning the uploaded file
   * will have a different name from the original's.
   *
   * We only have support for ReadStream for the mean time. We will support other
   * types when the need arrives in the future.
   *
   * @param {ReadStream} stream a ReadStream object.
   */
  async upload(stream: ReadStream) {
    const filename = `${generateUUID().replace("-", "")}.jpg`;
    return await fileStorage.add({ name: filename, stream: stream });
  }
}
