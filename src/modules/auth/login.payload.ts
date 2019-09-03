import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsString()
  username: string;

  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
