import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, IsAlpha } from "class-validator";

export class RegisterPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsAlpha()
  username: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
