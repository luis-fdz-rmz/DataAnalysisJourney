document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  // Handle form submission
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();

      if (!name || !email) {
        alert("Please fill in both name and email.");
        return;
      }

      alert(`Form submitted!\nName: ${name}\nEmail: ${email}`);
    });
  }

  fetch('http://localhost:5000/api/students')
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      const studentsList = document.getElementById("students");
      if (!studentsList) return;

      data.forEach(student => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>ID:</strong> ${student.student_id} |
          <strong>Name:</strong> ${student.student_name} |
          <strong>Gender:</strong> ${student.gender} |
          <strong>Age:</strong> ${student.age} |
          <strong>Grade:</strong> ${student.grade_level} |
          <strong>Parent Education:</strong> ${student.parent_education} |
          <strong>Lunch Type:</strong> ${student.lunch_type} |
          <strong>Internet Access:</strong> ${student.internet_access} |
          <strong>Activities:</strong> ${student.extra_activities}
        `;
        studentsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Error fetching students:", error);
    });
});