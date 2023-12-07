import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/SignupDto';
import { SigninDto } from './dto/SigninDto';
import { ResetPasswordDemandDto } from './dto/ResetPasswordDemandeDto';
import { AuthService } from './auth.service';
import { ResetPasswordConfirmationDto } from './dto/ResetPasswordConfirmationDto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DeleteAccountDto } from './dto/DeleteAccountDto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Get('get')
  getAll() {
    return this.authService.getAll();
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('reset-password')
  resetPasswordDemand(@Body() resetpasswordDemandDto: ResetPasswordDemandDto) {
    return this.authService.resetPasswordDemand(resetpasswordDemandDto);
  }

  @Post('reset-password-confirmation')
  resetPasswordConfirmation(
    @Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ) {
    return this.authService.resetPasswordConfirmation(
      resetPasswordConfirmationDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  deleteAccount(
    @Req() request: Request,
    @Body() deleteAccountDto: DeleteAccountDto,
  ) {
    const userId = request.user['userId'];

    return this.authService.deleteAccount(userId, deleteAccountDto);
  }
}
