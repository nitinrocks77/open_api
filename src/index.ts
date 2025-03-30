import express, { Application, Request, Response } from "express";
import { Student } from "./features/student/models/Student";
import { CreateStudentRequest } from "./features/student/dtos/CreateStudentRequest";
import { StudentResponse } from "./features/student/dtos/StudentResponse";
import { validateRequest } from "./core/middlewares/validate_request";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, default: 18 },
    gender: { type: String, required: true },
    standard: { type: String, required: true }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);



const app: Application = express();
const port = 3000;

// Middleware
app.use(express.json());

const listOfStudents: Student[] = [];

listOfStudents.push(
    new Student(1, "Mahesh", "Gupta", 29, "Male", "XII"));

// Routes
app.get("/users", (req: Request, res: Response) => {
    const studentResponses = listOfStudents.map(student =>
        new StudentResponse(student.id, student.getFullName(), student.age, student.gender)
    );
    res.json(studentResponses);
});

app.post("/users", validateRequest(CreateStudentRequest), (req: Request, res: Response) => {
    const { firstName, lastName, age, gender, standard } = req.body;
    const lastStudent = listOfStudents[listOfStudents.length - 1];
    const newId = lastStudent ? lastStudent.id + 1 : 1;
    const newStudent = new Student(newId, firstName, lastName, age, gender, standard);
    listOfStudents.push(newStudent);
    const response = new StudentResponse(newStudent.id, newStudent.getFullName(), newStudent.age, newStudent.gender);
    res.status(201).json(response);
});

app.get("/users/:id", (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const studentIndex = listOfStudents.findIndex(student => student.id === studentId);
    const student = listOfStudents[studentIndex];
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

app.put("/users/:id", (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const studentIndex = listOfStudents.findIndex(student => student.id === studentId);
    const student = listOfStudents[studentIndex];
    if (student) {
        student.update(req.body.firstName, req.body.lastName, req.body.age, req.body.standard);
        res.json(student);

    } else {
        res.status(404).json({ message: "Student not found" });
    }
});


console.log("Connecting to Database...");
console.log(process.env.DB_CONNECTION_STRING);
mongoose.connect(process.env.DB_CONNECTION_STRING as string)
    .then(() => {
        console.log('Database connected successfully!');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => console.error('Database connection error:', err));