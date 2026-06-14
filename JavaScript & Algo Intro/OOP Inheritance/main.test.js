const { Person, Student, Teacher, TeachingAssistant, Principal } = require('./main');

describe('Person', () => {
  it('should store name and startYear', () => {
    const p = new Person('Alice', 2020);
    expect(p.name).toBe('Alice');
    expect(p.startYear).toBe(2020);
  });

  it('should start with courses as an empty array', () => {
    const p = new Person('Alice', 2020);
    expect(p.courses).toEqual([]);
  });

  it('addCourse() should push a course into courses', () => {
    const p = new Person('Alice', 2020);
    p.addCourse('Math');
    p.addCourse('Science');
    expect(p.courses).toEqual(['Math', 'Science']);
  });
});

describe('Student', () => {
  it('should be an instance of Student and Person', () => {
    const s = new Student('Bob', 2021);
    expect(s).toBeInstanceOf(Student);
    expect(s).toBeInstanceOf(Person);
  });

  it('should start with grades as an empty array', () => {
    const s = new Student('Bob', 2021);
    expect(s.grades).toEqual([]);
  });

  it('receiveGrade() should push a { course, grade } object into grades', () => {
    const s = new Student('Bob', 2021);
    s.receiveGrade('Math', 95);
    expect(s.grades).toEqual([{ course: 'Math', grade: 95 }]);
  });

  it('addCourse() should not add duplicate courses', () => {
    const s = new Student('Bob', 2021);
    s.addCourse('Math');
    s.addCourse('Math');
    s.addCourse('Science');
    expect(s.courses).toEqual(['Math', 'Science']);
  });
});

describe('Teacher', () => {
  it('should be an instance of Teacher and Person', () => {
    const t = new Teacher('Cassandra', 2018, 50000);
    expect(t).toBeInstanceOf(Teacher);
    expect(t).toBeInstanceOf(Person);
  });

  it('should store salary', () => {
    const t = new Teacher('Cassandra', 2018, 50000);
    expect(t.salary).toBe(50000);
  });

  it('giveGrade() should call receiveGrade on the student', () => {
    const t = new Teacher('Cassandra', 2018, 50000);
    const s = new Student('Bob', 2021);
    t.giveGrade(s, 'Math', 88);
    expect(s.grades).toEqual([{ course: 'Math', grade: 88 }]);
  });
});

describe('TeachingAssistant', () => {
  it('should be an instance of TeachingAssistant, Teacher, and Person', () => {
    const ta = new TeachingAssistant('Dave', 2022, 30000);
    expect(ta).toBeInstanceOf(TeachingAssistant);
    expect(ta).toBeInstanceOf(Teacher);
    expect(ta).toBeInstanceOf(Person);
  });
});

describe('Principal', () => {
  it('should be an instance of Principal and Person', () => {
    const pr = new Principal('Martin', 2010);
    expect(pr).toBeInstanceOf(Principal);
    expect(pr).toBeInstanceOf(Person);
  });

  it('should start with teachers and students as empty arrays', () => {
    const pr = new Principal('Martin', 2010);
    expect(pr.teachers).toEqual([]);
    expect(pr.students).toEqual([]);
  });

  it('hireTeacher() should push the teacher and log the message', () => {
    const pr = new Principal('Martin', 2010);
    const t = new Teacher('Cassandra', 2018, 50000);
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    pr.hireTeacher(t);
    expect(pr.teachers).toContain(t);
    expect(spy).toHaveBeenCalledWith('Martin just hired Cassandra');
    spy.mockRestore();
  });

  it('recruitStudent() should push the student into students', () => {
    const pr = new Principal('Martin', 2010);
    const s = new Student('Bob', 2021);
    pr.recruitStudent(s);
    expect(pr.students).toContain(s);
  });

  it('expelStudent() should remove the student by name', () => {
    const pr = new Principal('Martin', 2010);
    const s1 = new Student('Bob', 2021);
    const s2 = new Student('Eve', 2021);
    pr.recruitStudent(s1);
    pr.recruitStudent(s2);
    pr.expelStudent(s1);
    expect(pr.students).not.toContain(s1);
    expect(pr.students).toContain(s2);
  });

  it('transferStudent() should remove the student from this principal and add to the other', () => {
    const pr1 = new Principal('Martin', 2010);
    const pr2 = new Principal('Sandra', 2012);
    const s = new Student('Bob', 2021);
    pr1.recruitStudent(s);
    pr1.transferStudent(s, pr2);
    expect(pr1.students).not.toContain(s);
    expect(pr2.students).toContain(s);
  });
});
