import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Profile } from "./profile.model";
import { ProfileController } from "./profile.controller";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Profile", schema: Profile }]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  providers: [ProfileService],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
