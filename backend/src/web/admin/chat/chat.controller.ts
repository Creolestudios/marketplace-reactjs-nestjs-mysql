import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ChatFilterDto } from 'src/dto/admin.dto';
import { UserEntity } from 'src/entities/user.entity';
import { SentryInterceptor } from 'src/interceptors/sentry.interceptor';
import { ChatService } from './chat.service';

@Controller('admin')
@UseInterceptors(SentryInterceptor)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * Author: Abhee Hudani
   * Description: Admin chat listing API
   * Created At: Jul 12, 2021
   * Update At: Jul 12, 2021
   **/
  @Post('chat/list')
  // @UseGuards(JwtAdminAuthGuard)
  async viewRecentChats(
    // @User() user: UserEntity,
    @Body(ValidationPipe) chatFilterDto: ChatFilterDto, // task filter in chat listing
    @I18n() i18n: I18nContext,
  ) {
    return this.chatService.viewChatList(user, chatFilterDto, i18n);
  }
}
