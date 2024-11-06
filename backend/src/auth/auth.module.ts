import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Asegúrate de tener un módulo de usuarios
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Usa una clave secreta para firmar los tokens
      signOptions: { expiresIn: '1h' }, // Configura la expiración del token
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
