import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Request,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.usersService.findOne(createUserDto.email);
    if (existingUser) throw new BadRequestException("User already exists.");

    try {
      await this.usersService.create(createUserDto);
      return { msg: "User successfully created." };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findOne(@Request() req): Promise<User> {
  //   console.log(req.user.id);
  //   return this.usersService.findOne(req.user.id);
  // }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<User> {
    const updatedUser = await this.usersService.update(
      req.user.id,
      updateUserDto,
    );
    if (!updatedUser) throw new NotFoundException();
    return updatedUser;
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.usersService.remove(id);
  // }
}
