import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // login and generate the token when the user sign in
  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const payload = {
      username: user.email,
      sub: {
        name: user.username,
      },
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + 20 * 1000),
      },
    };
  }

  // validate the user if it exists with the email
  async validateUser(dto: AuthDto) {
    const user = await this.usersService.getUserByEmail(dto.email);

    if (user) {
      return user;
    }

    throw new UnauthorizedException();
  }

  // return the token in the response so that when we need to refresh the session we can use the refresh token
  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + 20 * 1000),
    };
  }
}
