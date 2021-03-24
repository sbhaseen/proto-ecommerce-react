import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UserDocument, UserSchema } from "./schemas/user.schema";
import { saltAndHash } from "src/utilities/hashingHelpers";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<UserDocument>("save", async function (next) {
            if (!this.isModified("password")) return next();
            const hashedPassword = await saltAndHash(this.password);
            this.password = hashedPassword;
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
