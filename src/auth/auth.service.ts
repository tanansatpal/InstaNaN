import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '@users/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '@users/dto/register.dto';
import { LoginDto } from '@users/dto/login.dto';
import { UserDto } from '@users/dto/user.dto';
import { JwtPayload, LoginStatus, RegistrationStatus } from './interfaces';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {
  }

  public async register(userDto: RegisterDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    await this.usersService.createUser(userDto).catch(err => {
      status = {
        success: false,
        message: err,
      };
    });
    return status;
  }

  public async login(loginUserDto: LoginDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      username: user.username, ...token,
    };
  }

  public async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findOne(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ username }: UserDto): any {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }
}
