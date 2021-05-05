import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './rooms/room.module';
import { DB } from './config/keys.config';
import { ProfileModule } from './profiles/profile.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    ProfileModule,
    RoomModule,
    MongooseModule.forRoot(DB.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
