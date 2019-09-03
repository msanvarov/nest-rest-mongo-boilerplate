import { ApiModelProperty } from "@nestjs/swagger";
import { IsAlpha, IsNotEmpty, MinLength } from "class-validator";

export class LoginPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsAlpha()
  username: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
