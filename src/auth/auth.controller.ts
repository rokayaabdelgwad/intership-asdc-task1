import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

// import { GoogleDto } from './dto/google.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @Post('login')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  // @Get('google-login')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Body() dto: GoogleDto) {
  //   const data = await this.authService.googleLogin(dto);

  //   return data;

  @Get('google-login')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
