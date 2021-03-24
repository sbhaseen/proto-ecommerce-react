import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./dto/jwt-payload.dto";
import { JwtTokenLogin } from "./dto/jwt-token-login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req): Promise<JwtTokenLogin> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req): Promise<JwtPayload> {
    return req.user;
  }
}
