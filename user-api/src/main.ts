import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const initialize = async () => {
  await prisma.user.upsert({
    where: {
      id: 'cea07d0e-55d5-41bb-9c48-3e4f92161015',
    },
    create: {
      name: 'Icaro',
      birthDate: '1997-11-22T13:37:00Z',
      city: 'Salvador',
      state: 'Bahia',
      lastName: 'Santos',
      maritalStatus: 'CASADO',
      id: 'cea07d0e-55d5-41bb-9c48-3e4f92161015',
    },
  
    update: {
      name: 'Icaro',
      birthDate: '1997-11-22T13:37:00Z',
      city: 'Salvador',
      state: 'Bahia',
      lastName: 'Santos',
      maritalStatus: 'CASADO',
      id: 'cea07d0e-55d5-41bb-9c48-3e4f92161015',
    },
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*"
  });
  await initialize();
  await app.listen(3000);
}

bootstrap();
