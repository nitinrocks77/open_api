export class Student {
    public id: number;
    public firstName: string;
    public lastName: string;
    public age: number;
    public gender: string;
    public standard: string;
    public createdAt: Date;

    constructor(id: number, firstName: string, lastName: string, age: number, gender: string, standard: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.standard = standard;
        this.createdAt = new Date();
    }

    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    private isAdult(): boolean {
        return this.age >= 18;
    }

    public update(firstName: string, lastName: string, age: number, standard: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.standard = standard;    }
}