import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, MinLength, IsString } from "class-validator";

export class RegisterPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsString()
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
  @MinLength(6)
  password: string;
}
