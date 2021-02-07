import cosmos from '@azure/cosmos'
import Student from './student.js'

let config = {
    connectionString: "",
    database: "SchoolDB",
    container: "StudentCourseGrades"
}

const client = new cosmos.CosmosClient(config.connectionString);
const containerref = client.database(config.database).container(config.container);
const containerdata = containerref.items;

function isOK(statusCode) {
    return statusCode >= 200 && statusCode <= 299;
}

/*
To add a new document to a container, use the create function of the container, and provide the document as the parameter. 
If the create operation is successful, like the read function, it returns an object containing a copy of the new document, and the HTTP status code of the request
*/
const addStudent = async (student) => {
    const { item, statusCode } = await containerdata.create(student).catch();
    isOK(statusCode) && process.stdout.write(`Added student with id: ${item.id}\n`);
}

/*
You can use the upsert or replace functions to update a document. Strictly speaking, Azure Databases extension doesn't actually do an update operation. 
Rather, it deletes a document and replaces it with a new one that has the same ID. You'll have to supply the entire document as a parameter
The syntax for the replace function is similar. The main difference between upsert and replace concerns the case where a document with the specified 
ID doesn't already exist in the container. 
In this situation, the replace function will throw an exception, but upsert will just insert the new document.
*/
const updateStudent = async (student) => {
    const { item, statusCode } = await containerdata.upsert(student).catch();;
    isOK(statusCode) && process.stdout.write(`Updated student with id: ${item.id}\n`);
}

/*
Use the delete function to remove a document. As with read, you must provide the ID and the partition key of the document as parameters
*/
const deleteStudent = async (student) => {
    const { item, statusCode } = await containerref.item(student.id).delete().catch();
    isOK(statusCode) && process.stdout.write(`Deleted student with id: ${item.id}\n`);
}

/*
If you know the ID of a document, the quickest way to retrieve it is by reading directly from the container. 
You use the read function to do this. The parameters to read are the ID and the partition key of the document.
The value returned by the read function is an object containing a copy of the document in the resource property and an HTTP status code.
*/
const getStudent = async (ID, studentNumber) => {
    const { resource, statusCode } = await containerref.item(ID).read().catch();;
    if (isOK(statusCode)) {
        process.stdout.write(`Student data: ${resource.StudentNumber}: ${resource.Firstname}, ${resource.Lastname}\n`);
        resource.CourseGrades.forEach (function(coursegrade) {
            process.stdout.write(`${coursegrade.Course}:${coursegrade.Grade}\n`);
        });
        return new Student(resource.id, resource.StudentNumber, resource.Firstname, resource.Lastname);
    }
    return null;
}

const queryStudents = async (courseName) => {
    const studentquery = {
        query: "SELECT s.StudentNumber, s.Firstname, s.Lastname, c.Course, c.Grade \
                FROM students s JOIN c IN s.CourseGrades \
                WHERE c.Course = @coursename",
        parameters: [
            {
                name: "@coursename",
                value: courseName
            }
        ]
    };

    const { resources } = await containerdata.query(studentquery).fetchAll();
    for (let queryResult of resources) {
        let resultString = JSON.stringify(queryResult);
        process.stdout.write(`\nQuery returned ${resultString}\n`);
    }
}

const getAllStudents = async () => {
    const studentquery = {
        query: "SELECT s.id, s.Name.FirstName, s.Name.Lastname \
                FROM students s "
    };
    
    const { resources } = await containerdata.query(studentquery).fetchAll();
    for (let queryResult of resources) {
        let resultString = JSON.stringify(queryResult);
        process.stdout.write(`\nQuery returned ${resultString}\n`);
    }
}

export {
    addStudent, updateStudent, deleteStudent, getAllStudents, getStudent, queryStudents
}