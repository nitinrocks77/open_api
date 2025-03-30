import { IsInt, IsNotEmpty, IsString, Min, Max } from "class-validator";

export class CreateStudentRequest {
    @IsNotEmpty({ message: "First name is required" })
    @IsString({ message: "First name must be a string" })
    firstName: string;

    @IsNotEmpty({ message: "Last name is required" })
    @IsString({ message: "Last name must be a string" })
    lastName: string;

    @IsInt({ message: "Age must be a number" })
    @Min(18, { message: "Age must be at least 18" })
    @Max(60, { message: "Age must be at most 60" })
    age: number;

    @IsNotEmpty({ message: "Gender is required" })
    @IsString({ message: "Gender must be a string" })
    gender: string;

    standard: string;
}
