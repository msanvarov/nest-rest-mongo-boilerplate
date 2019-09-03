import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, MinLength, IsString, IsAlpha } from "class-validator";

export class RegisterPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsAlpha()
  username: string;

  @ApiModelProperty({
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiModelProperty({
    required: true,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
