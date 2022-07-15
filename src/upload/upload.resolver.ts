import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload';

@Resolver()
export class UploadResolver {

  @Mutation(() => Boolean)
  async uploadFile(@Args('file', { type: () => GraphQLUpload }) file: FileUpload): Promise<boolean> {
    console.log(file);

    return true;
  }
}
