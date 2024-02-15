import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString,IsNumber, IsPositive, IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

	@IsString()
    @IsNotEmpty()
    readonly password:String


    @ApiProperty({ example: 36 })
    @Transform(({ value }) => parseInt(value))
    readonly firstName: string;


}
