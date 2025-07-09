async function getAllGrades(){
    try {
        const response = await fetch('/api/grades', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to fetch');

        const result = await response.json();
        // console.log(result)

        let studentTableHTML = `
        <div class="js-student-titles">
            <div class="js-grade-id" > ID </div>
            <div class="js-grade-student-name" > Full Name</div>
            <div class="js-grade-subject" > Subject </div>
            <div class="js-grade-task" > Task </div>
            <div class="js-grade-type" > Type </div>
            <div class="js-grade" > Grade </div>
            <div class="js-grade-date-assigned" > Date Assigned </div>
            <div class="js-grade-deadline" > Deadline </div>
            <div class="js-grade-date-submitted" > Date Submitted </div>
        </div>
        ` 
        result.message.forEach(element => {
            studentTableHTML += `
                <div class="js-student-titles">
                <div class="js-grade-id" > ${element.grade_id}</div>
                <div class="js-grade-student-name" > ${element.student_name}</div>
                <div class="js-grade-subject" > ${element.grade_subject}</div>
                <div class="js-grade-task" > ${element.grade_task}</div>
                <div class="js-grade-type" > ${element.grade_type}</div>
                <div class="js-grade" > ${element.grade}</div>
                <div class="js-grade-date-assigned" > ${element.date_assigned}</div>
                <div class="js-grade-deadline" > ${element.deadline}</div>
                <div class="js-grade-date-submitted" > ${element.date_submitted}</div>
            </div>`
        });

        document.querySelector('.js-student-grid').innerHTML = studentTableHTML 
    } catch (err) {
        console.error(err);
        alert('fetch failed.');
    }

}

getAllGrades();