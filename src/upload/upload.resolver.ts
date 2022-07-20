import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload';
import { UploadService } from './upload.service';
import { UploadedFile } from './upload.types';
import { ReadStream } from 'fs';

@Resolver()
export class UploadResolver {
  constructor(private uploadService: UploadService) {}

  @Mutation(() => UploadedFile)
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<UploadedFile> {
    const stream: ReadStream = file.createReadStream();
    return await this.uploadService.upload(stream);
  }
}
