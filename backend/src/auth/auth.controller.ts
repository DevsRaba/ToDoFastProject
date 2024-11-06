import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    // Llama al método `register` en AuthService con los datos del usuario
    return this.authService.register(body.email, body.password);
  }
}
