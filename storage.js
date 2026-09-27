const STORAGE_KEY = "students";


function getStudents() {

    const students =
        localStorage.getItem(STORAGE_KEY);

    return students
        ? JSON.parse(students)
        : [];

}


function saveStudents(students) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );

}


function addStudent(student) {

    const students = getStudents();

    students.push(student);

    saveStudents(students);

}


function updateStudent(id, updatedStudent) {

    const students = getStudents();

    const index = students.findIndex(
        student => student.id === id
    );

    if (index !== -1) {

        students[index] = updatedStudent;

        saveStudents(students);

    }

}


function deleteStudent(id) {

    const students = getStudents();

    const filteredStudents =
        students.filter(
            student => student.id !== id
        );

    saveStudents(filteredStudents);

}


function getStudentById(id) {

    const students = getStudents();

    return students.find(
        student => student.id === id
    );

}