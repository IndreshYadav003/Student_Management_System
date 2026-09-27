const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");
const courseFilter = document.getElementById("courseFilter");
const sortStudents = document.getElementById("sortStudents");
if (form) {
  const urlParams = new URLSearchParams(window.location.search);

  const editId = urlParams.get("edit");

  // Edit mode

  if (editId) {
    const student = getStudentById(editId);

    if (student) {
      document.getElementById("formTitle").textContent = "Edit Student";

      document.getElementById("studentId").value = student.id;

      document.getElementById("studentId").disabled = true;

      document.getElementById("name").value = student.name;

      document.getElementById("email").value = student.email;

      document.getElementById("phone").value = student.phone;

      document.getElementById("course").value = student.course;

      document.getElementById("semester").value = student.semester;

      document.getElementById("gender").value = student.gender;

      document.getElementById("marks").value = student.marks;
    }
  }

  // Form submit

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("studentId").value.trim();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const course = document.getElementById("course").value;

    const semester = document.getElementById("semester").value;

    const gender = document.getElementById("gender").value;

    const marks = Number(document.getElementById("marks").value);

    // Validation

    if (!id || !name || !email || !phone || !course || !semester || !gender) {
      alert("Please fill all fields.");

      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must contain 10 digits.");

      return;
    }

    if (marks < 0 || marks > 100) {
      alert("Marks must be between 0 and 100.");

      return;
    }

    const student = {
      id,
      name,
      email,
      phone,
      course,
      semester,
      gender,
      marks,
    };

    // Update

    if (editId) {
      updateStudent(editId, student);

      alert("Student updated successfully!");
    }

    // Add
    else {
      const existingStudent = getStudentById(id);

      if (existingStudent) {
        alert("Student ID already exists.");

        return;
      }

      addStudent(student);

      alert("Student added successfully!");
    }

    window.location.href = "students.html";
  });
}

// =============================
// DISPLAY STUDENTS
// =============================

function displayStudents() {
  if (!tableBody) return;

  let students = getStudents();

  const search = searchInput ? searchInput.value.toLowerCase() : "";

  const course = courseFilter ? courseFilter.value : "";

  // Search

  students = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(search) ||
      student.id.toLowerCase().includes(search)
    );
  });

  // Course filter

  if (course) {
    students = students.filter((student) => student.course === course);
  }

  // Sorting

  if (sortStudents) {
    if (sortStudents.value === "name") {
      students.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortStudents.value === "marks") {
      students.sort((a, b) => b.marks - a.marks);
    }
  }

  tableBody.innerHTML = "";

  if (students.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No students found.
                </td>
            </tr>
        `;

    return;
  }

  students.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.course}</td>

            <td>${student.semester}</td>

            <td>${student.marks}</td>

            <td>

                <button
                    class="action-btn view-btn"
                    onclick="viewStudent('${student.id}')">

                    View

                </button>


                <button
                    class="action-btn edit-btn"
                    onclick="editStudent('${student.id}')">

                    Edit

                </button>


                <button
                    class="action-btn delete-btn"
                    onclick="removeStudent('${student.id}')">

                    Delete

                </button>

            </td>

        `;

    tableBody.appendChild(row);
  });
}

// =============================
// VIEW
// =============================

function viewStudent(id) {
  window.location.href = `student-details.html?id=${id}`;
}

// =============================
// EDIT
// =============================

function editStudent(id) {
  window.location.href = `add-student.html?edit=${id}`;
}

// =============================
// DELETE
// =============================

function removeStudent(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this student?",
  );

  if (confirmDelete) {
    deleteStudent(id);

    displayStudents();
  }
}

// =============================
// EVENTS
// =============================

if (searchInput) {
  searchInput.addEventListener("input", displayStudents);
}

if (courseFilter) {
  courseFilter.addEventListener("change", displayStudents);
}

if (sortStudents) {
  sortStudents.addEventListener("change", displayStudents);
}

// Initial display

displayStudents();
