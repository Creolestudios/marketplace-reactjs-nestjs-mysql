import { extname, join } from 'path';
import * as fs from 'fs';
import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { FileNameDto } from 'src/dto/file.dto';
import { FILE_ERROR } from './constant';

export const taskUploadFileFilter = (
  req,
  file: Express.Multer.File,
  callback,
) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg|mp3|mp4|mov)$/i)) {
    return callback(
      new BadRequestException(FILE_ERROR.invalid_task_media_extension),
      false,
    );
  }
  callback(null, true);
};

export const profileUploadFileFilter = (
  req,
  file: Express.Multer.File,
  callback,
) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg)$/i)) {
    return callback(
      new BadRequestException(FILE_ERROR.invalid_profile_extension),
      false,
    );
  }
  callback(null, true);
};

export const reportProfileFileFilter = (
  req,
  file: Express.Multer.File,
  callback,
) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg|mp4|mov)$/i)) {
    return callback(
      new BadRequestException(FILE_ERROR.invalid_task_media_extension),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (file: Express.Multer.File) => {
  try {
    const name = file.originalname.split('.')[0];
    const filteredName = name.replace(/ /g, '_');
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${filteredName}-${randomName}${fileExtName}`;
  } catch (error) {
    throw new BadGatewayException(FILE_ERROR.edit_file_name);
  }
};

export const fileUpload = (
  newName: string,
  file: Express.Multer.File,
  path: string,
): string => {
  const filePath = `public/${path}/${newName}`;
  if (!fs.existsSync(`public/${path}`)) {
    fs.mkdirSync(`public/${path}`, { recursive: true });
  }
  fs.writeFile(filePath, file.buffer, (error) => {
    if (error) {
      console.log(error);
      return new BadGatewayException(FILE_ERROR.file_upload);
    }
  });
  return `${process.env.IMAGE_SITE_URL}${path}/${newName}`;
};

export const fileDelete = (filePath: string) => {
  if (fs.existsSync(`public/${filePath}`)) {
    fs.unlink(`public/${filePath}`, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
};

export const fileRemovalFromSystem = (
  files: Array<FileNameDto>,
  path: string,
) => {
  files.map((file) => {
    fileDelete(`upload${file.filename.split('upload')[1]}`);
    // fs.unlinkSync(`${path}/${file.filename}`);
  });
};

export const chatFileFilter = (fileName: string) => {
  // this function used for validate chat media files
  if (!fileName.match(/\.(jpg|png|jpeg|mp4|mov|PDF|doc|xls|xlsx|csv)$/i)) {
    throw new BadRequestException(
      `${fileName}: ${FILE_ERROR.invalid_extension_chat}`,
    );
  } else {
    return true;
  }
};

export const editChatFileName = (fileName: string): string => {
  try {
    const name = fileName.split('.')[0];
    const filteredName = name.replace(/ /g, '_');
    const fileExtName = extname(fileName);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${filteredName}-${randomName}${fileExtName}`;
  } catch (error) {
    throw new BadGatewayException(FILE_ERROR.edit_file_name);
  }
};

export const chatFileUpload = async (
  // this function used to upload chat media files
  newName: string,
  fileBuffer: ArrayBuffer | SharedArrayBuffer,
  path: string,
): Promise<string> => {
  const filePath = `public/${path}/${newName}`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
  const fileData = Buffer.from(fileBuffer);
  fs.writeFile(filePath, fileData, (error) => {
    if (error) {
      console.log(error);
      return new BadGatewayException(FILE_ERROR.file_upload);
    }
  });
  return `${process.env.IMAGE_SITE_URL}${path}/${newName}`;
};

// In future if we want to get extension
// export const getExtension = (req, file) => {
//   const name = file.originalname.split('.')[0];
//   return extname(file.originalname);
// };
