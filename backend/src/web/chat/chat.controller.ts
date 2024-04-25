import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { User } from '../auth/user.decorator';
import { JwtCommonAuthGuard } from '../auth/jwt-auth.guard';
import { SentryInterceptor } from 'src/interceptors/sentry.interceptor';
import {
  MarkChatReadDto,
  MarkChatRoomTrashDto,
  ViewChatAttachmentsDto,
  ViewChatHistoryDto,
  ViewRecentChatsDto,
} from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { ChatService } from './chat.service';

@Controller('chat')
@UseInterceptors(SentryInterceptor)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * Author: Abhee Hudani
   * Description: User chat listing API
   * Created At: Jul 6, 2021
   * Update At: Jul 12, 2021
   **/
  @Post('list')
  @UseGuards(JwtCommonAuthGuard)
  async viewRecentChats(
    @User() user: UserEntity,
    @Body(ValidationPipe) viewRecentChatsDto: ViewRecentChatsDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.chatService.viewRecentChats(user, viewRecentChatsDto, i18n);
  }

  /**
   * Author: Abhee Hudani
   * Description: User chat history for single chat room
   * Created At: Jul 7, 2021
   * Update At: Jul 8, 2021
   **/
  @Post('history')
  @UseGuards(JwtCommonAuthGuard)
  async viewChatHistory(
    @User() user: UserEntity,
    @Body(ValidationPipe) viewChatDetailsDto: ViewChatHistoryDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.chatService.viewChatHistory(user, viewChatDetailsDto, i18n);
  }

  /**
   * Author: Abhee Hudani
   * Description: delete or permanent delete single chat room
   * Created At: Jul 8, 2021
   * Update At: Jul 8, 2021
   **/
  @Patch('move/trash')
  @UseGuards(JwtCommonAuthGuard)
  async markChatHistoryTrash(
    @User() user: UserEntity,
    @Body(ValidationPipe) markChatRoomTrash: MarkChatRoomTrashDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.chatService.markChatHistoryTrash(user, markChatRoomTrash, i18n);
  }

  /**
   * Author: Abhee Hudani
   * Description: mark chat messages as read
   * Created At: Jul 8, 2021
   * Update At: Jul 8, 2021
   **/
  @Patch('mark/read')
  @UseGuards(JwtCommonAuthGuard)
  async markChatRead(
    @User() user: UserEntity,
    @Body(ValidationPipe) markChatRead: MarkChatReadDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.chatService.markChatRead(user, markChatRead, i18n);
  }

  /**
   * Author: Abhee Hudani
   * Description: view past attachments of a chat room
   * Created At: Jul 8, 2021
   * Update At: Jul 8, 2021
   **/
  @Post('view/attachments')
  @UseGuards(JwtCommonAuthGuard)
  async viewChatAttachments(
    @User() user: UserEntity,
    @Body(ValidationPipe) viewChatAttachments: ViewChatAttachmentsDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.chatService.viewChatAttachments(
      user,
      viewChatAttachments,
      i18n,
    );
  }
}
