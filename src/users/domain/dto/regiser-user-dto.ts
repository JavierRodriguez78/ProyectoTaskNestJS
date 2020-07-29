import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
    @ApiProperty()
    email:string;
    @ApiProperty()
    password: string;
}
