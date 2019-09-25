import { ApiModelProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
  Matches,
} from "class-validator";

/**
 * Patch Profile Payload Class
 */
export class PatchProfilePayload {
  /**
   * Email field
   */
  @ApiModelProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Username field
   */
  @ApiModelProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  /**
   * Name field
   */
  @ApiModelProperty()
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  name: string;

  /**
   * Password field
   */
  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
