import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty({
        description:"Este es el titulo  de la tarea."
    })
    title:string;
    @ApiProperty({
        description:"Este es la descripción  de la tarea."
    })
    description: string;
}
