import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createduser = new this.userModel(createUserDto);
    return await createduser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find({}).exec();
  }

  async findOne(email: string): Promise<User> {
    // lean() method is used to obtain a plain object instead of a Query object
    return await this.userModel
      .findOne({ email: email })
      .select("+password")
      .lean()
      .exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    if (updateUserDto.password) {
      const userToUpdate = await this.userModel
        .findById(id)
        .select("+password");
      userToUpdate.password = updateUserDto.password;
      userToUpdate.save();
    }

    const { password, ...rest } = updateUserDto;

    return await this.userModel.findByIdAndUpdate(id, rest, {
      new: true,
      omitUndefined: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
