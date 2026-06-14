class Person {
  constructor(name, startYear) {
    this.name = name;
    this.startYear = startYear;
    this.courses = [];
  }

  addCourse(course) {
    this.courses.push(course);
  }
}

class Student extends Person {
  constructor(name, startYear) {
    super(name, startYear);
    this.grades = [];
  }

  receiveGrade(courseName, finalGrade) {
    this.grades.push({ course: courseName, grade: finalGrade });
  }

  addCourse(course) {
    if (!this.courses.includes(course)) {
      super.addCourse(course);
    }
  }
}

class Teacher extends Person {
  constructor(name, startYear, salary) {
    super(name, startYear);
    this.salary = salary;
  }

  giveGrade(student, courseName, finalGrade) {
    student.receiveGrade(courseName, finalGrade);
  }
}

class TeachingAssistant extends Teacher {
  constructor(name, startYear, salary) {
    super(name, startYear, salary);
  }
}

class Principal extends Person {
  constructor(name, startYear) {
    super(name, startYear);
    this.teachers = [];
    this.students = [];
  }

  hireTeacher(teacher) {
    this.teachers.push(teacher);
    console.log(`${this.name} just hired ${teacher.name}`);
  }

  recruitStudent(student) {
    this.students.push(student);
  }

  expelStudent(student) {
    this.students = this.students.filter(s => s.name !== student.name);
  }

  transferStudent(student, principal) {
    this.expelStudent(student);
    principal.students.push(student);
  }
}

module.exports = { Person, Student, Teacher, TeachingAssistant, Principal };
