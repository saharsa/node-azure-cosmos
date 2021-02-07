import { question } from 'readline-sync'
import Student from './student.js'

function getStudentData () {
    let ID = question("Please enter the student's document ID: ");
    let studentNumber = question("Enter the student's number: ");
    let firstname = question("Enter the student's first name: ");
    let lastname = question("Enter the student's last name: ");
    let student = new Student(ID, studentNumber, firstname, lastname);
    return student;
};

function test () {
    let student1 = getStudentData();
    student1.addGrade("Computer Science", "A");
    student1.addGrade("Applied Mathematics", "C");

    process.stdout.write(student1.toString());
    process.stdout.write(student1.getGrades());

    let student2 = getStudentData();
    student2.addGrade("Computer Science", "A");

    process.stdout.write(student2.toString());
    process.stdout.write(student2.getGrades());
}

export {
    getStudentData, 
    test
}