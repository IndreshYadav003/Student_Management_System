const students = getStudents();


const totalStudents =
    document.getElementById("totalStudents");


const maleStudents =
    document.getElementById("maleStudents");


const femaleStudents =
    document.getElementById("femaleStudents");


const averageMarks =
    document.getElementById("averageMarks");


const recentStudents =
    document.getElementById("recentStudents");


// Total

totalStudents.textContent =
    students.length;


// Male

maleStudents.textContent =
    students.filter(
        student => student.gender === "Male"
    ).length;


// Female

femaleStudents.textContent =
    students.filter(
        student => student.gender === "Female"
    ).length;


// Average marks

if (students.length > 0) {

    const totalMarks =
        students.reduce(
            (sum, student) =>
                sum + Number(student.marks),
            0
        );


    const average =
        totalMarks / students.length;


    averageMarks.textContent =
        average.toFixed(2);

}


// Recent students

const recent =
    students.slice(-5).reverse();


recentStudents.innerHTML = "";


recent.forEach(student => {

    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>${student.id}</td>

        <td>${student.name}</td>

        <td>${student.email}</td>

        <td>${student.course}</td>

        <td>${student.marks}</td>

    `;


    recentStudents.appendChild(row);

});