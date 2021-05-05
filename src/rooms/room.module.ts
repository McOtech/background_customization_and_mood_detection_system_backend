import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { MulterModule } from '@nestjs/platform-express/multer';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room, RoomSchema } from './schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MulterModule.register({
      dest: './public/uploads/images/companies',
    }),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
