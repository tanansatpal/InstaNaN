import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '@users/dto/register.dto';
import { LoginStatus, RegistrationStatus } from './interfaces';
import { LoginDto } from '@users/dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  public async register(@Body() createUserDto: RegisterDto): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(createUserDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}
