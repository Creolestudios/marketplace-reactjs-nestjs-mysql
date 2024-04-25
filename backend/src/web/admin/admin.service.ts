import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { UserEntity } from '../../entities/user.entity';
import { MyAccountDto } from 'src/dto/admin.dto';
import { GlobalResponseType } from 'src/utils/types';
import {
  FILE_PATH,
  FILE_SIZE,
  FILE_TYPE,
  ResponseMap,
} from 'src/utils/constant';
import { FileNameDto } from 'src/dto/file.dto';
import { fileUpload } from 'src/utils/file-uploading.utils';
import { filter } from 'lodash';
@Injectable()
export class AdminService {
  constructor(private readonly i18n: I18nRequestScopeService) {}
  /**
   * @author Vaibhavi Rathod
   * @description Description: Get Admin my account Details
   * @Created June 04, 2021
   * @Updated June 04, 2021
   **/
  async myAccountDetails(admin: UserEntity): GlobalResponseType {
    try {
      return ResponseMap(
        {
          admin: admin,
        },
        await this.i18n.translate('success.success'),
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @author Vaibhavi Rathod
   * @param MyAccountDto name, password, confirm_password, profile_photo
   * @description Description: Admin my account
   * @Created June 04, 2021
   * @Updated June 07, 2021
   **/
  async updateMyAccount(
    admin: UserEntity,
    myAccountDto: MyAccountDto,
    media: Express.Multer.File[],
  ): GlobalResponseType {
    try {
      for (const data of media) {
        const file_type = data.mimetype.split('/');
        if (
          file_type[0] === FILE_TYPE.image &&
          +data.size > FILE_SIZE.profile_image
        ) {
          throw new BadGatewayException(
            `${data.originalname}: ${await this.i18n.translate(
              'file_error.big_image',
            )}`,
          );
        }
      }

      const fileResponse: Array<FileNameDto> = [];
      const profile_photo =
        admin.profile_photo && admin.profile_photo.length > 0
          ? admin.profile_photo.split('/')[5]
          : admin.profile_photo;
      if (media.length === 1 && media[0].originalname !== profile_photo) {
        const media_path = fileUpload(
          media[0].originalname,
          media[0],
          FILE_PATH.user_profile,
        );
        const file_type = media[0].mimetype.split('/');
        const fileNameObj: FileNameDto = {
          originalname: media[0].originalname,
          filename: media_path,
          mimetype: file_type[0],
          size: media[0].size,
        };
        fileResponse.push(fileNameObj);
      }
      admin.full_name = myAccountDto.name;
      admin.profile_photo = fileResponse[0]?.filename
        ? fileResponse[0].filename
        : admin.profile_photo;

      if (myAccountDto.confirm_password && myAccountDto.password) {
        if (myAccountDto.password === myAccountDto.confirm_password) {
          admin.password = await bcrypt.hash(myAccountDto.password, 10);
        } else {
          throw new BadRequestException(
            await this.i18n.translate('error.password_does_not_match'),
          );
        }
      } else if (myAccountDto.confirm_password || myAccountDto.password) {
        throw new BadRequestException(
          await this.i18n.translate('error.blank_password'),
        );
      }
      await admin.save();
      return ResponseMap(
        {
          admin: admin,
        },
        await this.i18n.translate('success.success'),
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
