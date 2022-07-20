import { Prop} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Photo extends Document {

  /**
   * The path to the file on the storage server or database.
   */
  @Prop()
  path: string;
}
