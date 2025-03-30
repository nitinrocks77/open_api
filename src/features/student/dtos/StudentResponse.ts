export class StudentResponse {
    id: number;
    fullName: string;
    age: number;
    gender: string;

    constructor(id: number, fullName: string, age: number, gender: string) {
        this.id = id;
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
    }
}
