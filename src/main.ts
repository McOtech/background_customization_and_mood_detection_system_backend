import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { DB } from './config/keys.config';

const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: DB.sessionSecret,
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.use(express.static(path.join(__dirname, 'public')));
  // app.useStaticAssets(join(__dirname, '..', 'static'));
  // socketHandler(app);
  await app.listen(PORT);
}
bootstrap();

// function socketHandler(io: any): void {
//   io.on('connection', (socket: any) => {
//     let room = null;
//     socket.on('join-room', ({ roomId }: any) => {
//       //join room
//       socket.join(roomId);
//       room = roomId;
//       socket.emit('join-room-status', true);
//     });

//     socket.on('network-configuration', ({ candidate, description }) => {
//       //handle network configuration

//       if (!room) {
//         console.log(`room id not set...!`);
//         return;
//       }
//       socket
//         .to(room)
//         .broadcast.emit('remote-configuration', { candidate, description });
//     });

//     socket.on('mood', (mood: MoodInterface) => {
//       // roomMood[EXPRESSIONS.neutral] = {
//       //   emoji: mood.emoji,
//       //   expression: mood.expression,
//       //   index: average(
//       //     Number(roomMood[EXPRESSIONS.neutral].index),
//       //     Number(mood.index),
//       //   ).toString(),
//       // } as MoodInterface;

//       if (!room) {
//         console.log(`room id not set...!`);
//         return;
//       }
//       socket.to(room).broadcast.emit('remote-mood', mood);
//     });

//     socket.on('disconnect', () => {
//       room = null;
//     });
//   });
// }

// function average(num1: number, num2: number): number {
//   const n1 = num1 ? num1 : 0;
//   const n2 = num2 ? num2 : 0;
//   return (n1 + n2) / 2;
// }
