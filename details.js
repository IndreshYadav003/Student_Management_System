const params =
    new URLSearchParams(window.location.search);


const id =
    params.get("id");


const student =
    getStudentById(id);


if (!student) {

    alert("Student not found.");

    window.location.href =
        "students.html";

}


// Display data

document.getElementById("detailName")
    .textContent = student.name;


document.getElementById("detailCourse")
    .textContent = student.course;


document.getElementById("detailId")
    .textContent = student.id;


document.getElementById("detailEmail")
    .textContent = student.email;


document.getElementById("detailPhone")
    .textContent = student.phone;


document.getElementById("detailGender")
    .textContent = student.gender;


document.getElementById("detailSemester")
    .textContent = student.semester;


document.getElementById("detailMarks")
    .textContent = student.marks;


document.getElementById("avatar")
    .textContent =
        student.name.charAt(0).toUpperCase();