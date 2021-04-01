import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { isMatch } from "src/utilities/hashingHelpers";
import { UsersService } from "../users/users.service";
import { JwtPayload } from "./dto/jwt-payload.dto";
import { UserLogin } from "./dto/user-login.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    const isVerified = await isMatch(pass, user.password);

    if (user && isVerified) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: UserLogin) {
    const payload: JwtPayload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
