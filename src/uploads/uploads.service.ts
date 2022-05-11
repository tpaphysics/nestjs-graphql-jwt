import {
  Injectable,
  InternalServerErrorException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import cuid from 'cuid';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class UploadsService {
  async teste(file: FileUpload): Promise<any> {
    const { createReadStream, mimetype } = file;

    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype)) {
      throw new UnsupportedMediaTypeException(
        'Only use jpg jpeg or png files!',
      );
    }

    const [, extension] = mimetype.split('/', 2);
    const fileHashName = randomBytes(16).toString('hex');
    const name = `${fileHashName}.${extension}`;

    const result = await createReadStream().pipe(
      createWriteStream(`./uploads/${name}`),
    );
    if (!result) {
      throw new InternalServerErrorException('Problem at save file!');
    }
    return name;
  }
  async upload(fileInput: FileUpload): Promise<string> {
    const { createReadStream, mimetype, filename } = fileInput;

    /*
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype)) {
      throw new UnsupportedMediaTypeException(
        'Only use jpg jpeg or png files!',
      );
    } 
    const [, extension] = mimetype.split('/', 2);
    const fileHashName = randomBytes(16).toString('hex');
    const name = `${fileHashName}.${extension}`;
    */

    return new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolve(filename))
        .on('error', () => reject('no'));
    });
  }
}
