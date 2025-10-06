import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { ChatGateway } from './chat/chat.gateway';
import { UserModule } from './user/user.module';
import { CasteModule } from './caste/caste.module';
import { CommunityModule } from './community/community.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RegisterationModule } from './registeration/registeration.module';
import { UploadModule } from './upload/upload.module';
import { MailModule } from './mail/mail.module';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { SubCasteModule } from './sub-caste/sub-caste.module';
import { KulamModule } from './kulam/kulam.module';
import { KothiramModule } from './kothiram/kothiram.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    PrismaModule,
    AdminModule,
    DashboardModule,
    UserModule,
    CasteModule,
    CommunityModule,
    RegisterationModule,
    UploadModule,
    MailModule,
    SubCasteModule,
    KulamModule,
    KothiramModule,
    WishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
