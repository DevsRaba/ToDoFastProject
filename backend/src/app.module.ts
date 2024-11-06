import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Usuario de la base de datos
      password: 'admin123', // Contraseña de la base de datos
      database: 'gestion_tareas',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path de tus entidades
      synchronize: true, // Solo para desarrollo. En producción es mejor usar migraciones
    }),
    AuthModule, 
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
