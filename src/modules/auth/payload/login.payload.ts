import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, MinLength } from "class-validator";

/**
 * Login Paylaod Class
 */
export class LoginPayload {
  /**
   * Username field
   */
  @ApiProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  /**
   * Password field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
