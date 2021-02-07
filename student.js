class Student {
  constructor(ID, studentNumber, firstname, lastname) {
    this.id = ID;
    this.StudentNumber = studentNumber;
    this.Firstname = firstname;
    this.Lastname = lastname;
    this.CourseGrades = [];
    this.addGrade = function (coursename, grade) {
      this.CourseGrades.push({ Course: coursename, Grade: grade });
    };
    this.toString = function () {
      return `${this.StudentNumber}: ${this.Firstname}, ${this.Lastname}\n`;
    };
    this.getGrades = function () {
      let grades = "";
      this.CourseGrades.forEach(function (coursegrade) {
        grades = `${grades}${coursegrade.Course}:${coursegrade.Grade}\n`;
      });
      return grades;
    };
  }
}

export default Student;