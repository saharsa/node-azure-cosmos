import { addStudent, deleteStudent, updateStudent, getStudent, getAllStudents, queryStudents } from './db.js'
import Student from './student.js'
import { question } from 'readline-sync'

function getStudentData () {
    let ID = question("Please enter the student's document ID: ");
    let studentNumber = question("Enter the student's number: ");
    let firstname = question("Enter the student's forename: ");
    let lastname = question("Enter the student's last name: ");
    let student = new Student(ID, studentNumber, firstname, lastname);
    return student;
};

async function test() {
    /*process.stdout.write("\n\nTesting addStudent and getStudent\n\n");

    // Create a new student
    let student1 = getStudentData();
    await addStudent(student1).then(
        () => getStudent(student1.id, student1.StudentNumber)
    );

    process.stdout.write("\n\n");

    // Create another student
    let student2 = getStudentData();
    await addStudent(student2).then(
        () => getStudent(student2.id, student2.StudentNumber)
    );

    process.stdout.write("\n\n");

    // The first student got an A in Physics and a C in Chemistry
    process.stdout.write("\n\nTesting updateStudent\n\n");
    student1.addGrade("Physics", "A");
    student1.addGrade("Chemistry", "C");
    await updateStudent(student1).then(
        () => getStudent(student1.id, student1.StudentNumber)
    );

    process.stdout.write("\n");

    // The second student got a B in Physics and a D in Mathematics
    student2.addGrade("Physics", "B");
    student2.addGrade("Mathematics", "D");
    await updateStudent(student2).then(
        () => getStudent(student2.id, student2.StudentNumber)
    );

    process.stdout.write("\n\n");

    // Find all students that have taken Physics
    process.stdout.write("\n\nTesting queryStudents\n\n");
    process.stdout.write("Students who have taken Physics\n");
    await queryStudents("Physics");

    // Find all students that have taken Computer Science
    process.stdout.write("\n\nStudents who have taken Computer Science\n");
    await queryStudents("Computer Science");
    */

    // Delete the students created in the first exercise
    process.stdout.write("\n\nTesting deleteStudent\n\n");
    let oldStudent = await getStudent("S105", "S105");
    if (oldStudent) {
        await deleteStudent(oldStudent).then(
            () => getStudent(oldStudent.id, oldStudent.StudentNumber)
        );
    }

    process.stdout.write("\n");

    oldStudent = await getStudent("S106", "S106");
    if (oldStudent) {
        await deleteStudent(oldStudent).then(
            () => getStudent(oldStudent.id, oldStudent.StudentNumber)
        );
    }

    process.stdout.write("\n\nDone\n");
}

test();