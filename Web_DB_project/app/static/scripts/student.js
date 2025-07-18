import { logout } from './logout.js';

async function getAllStudents(){
    try {
        const response = await fetch('/api/students', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to submit');

        const result = await response.json();
        // console.log(result)

        let studentTableHTML = `
        <div class="js-student-titles">
            <div class="js-student-id" > ID </div>
            <div class="js-student-name" > Full Name</div>
            <div class="js-student-age" > Age </div>
            <div class="js-student-gender" > Gender</div>
            <div class="js-student-grade-level" > Grade Level</div>
            <div class="js-student-parent-education" > Parent Education</div>
            <div class="js-student-lunch-type" > Lunch Type</div>
            <div class="js-student-internet-access" > Internet Access</div>
            <div class="js-student-extra-activities" > Extra Activities</div>
        </div>
        ` 
        result.message.forEach(element => {
            studentTableHTML += `
            <div class="js-student-titles">
                <div class="js-student-id" > ${element.student_id}</div>
                <div class="js-student-name" > ${element.student_name}</div>
                <div class="js-student-age" > ${element.age}</div>
                <div class="js-student-gender" > ${element.gender}</div>
                <div class="js-student-grade-level" > ${element.grade_level}</div>
                <div class="js-student-parent-education" > ${element.parent_education}</div>
                <div class="js-student-lunch-type" > ${element.lunch_type}</div>
                <div class="js-student-internet-access" > ${element.internet_access}</div>
                <div class="js-student-extra-activities" > ${element.extra_activities}</div>
            </div>`
        });

        document.querySelector('.js-student-grid').innerHTML = studentTableHTML;
    } catch (err) {
        console.error(err);
        alert('fetch failed.');
    }

    let form = document.querySelector('.header')
    form.innerHTML = `header <button class = 'logout'> logout </button>`
    document.querySelector('.logout').addEventListener('click', ()=>{
        logout();
        console.log('logged out');
    })
}


getAllStudents();