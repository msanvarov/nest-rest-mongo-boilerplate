import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Profile } from "./profile.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Profile", schema: Profile }])],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
