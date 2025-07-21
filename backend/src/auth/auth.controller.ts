import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post('register')
  async register(@Body() body: { fullName: string; email: string; password: string }) {
    return this.authService.register(body.fullName, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.authService.login(body.email, body.password);
    if (result && result.user && result.user.id) {
      const { id, email, fullname } = result.user;
      const payload = { sub: id, email, fullname };
      const token = this.jwtService.sign(payload);
      return { token, user: result.user };
    }
    return result;
  }

  @Post('change-password')
  async changePassword(@Body() body: { email: string; newPassword: string }) {
    return this.authService.changePassword(body.email, body.newPassword);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }
}
