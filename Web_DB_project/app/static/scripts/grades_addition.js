

async function submit(){
    
    const button = document.querySelector('.submit-button');
    if (button.innerText === 'Submit'){
        button.innerText = 'Submitted';
        button.classList.add("submitted-button");
        // alert("TEST");


        const formItems = getGradesObject();
        resetSubmitionsForm();
        // console.log(formItems)

        try {
            const response = await fetch('/api/grades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formItems)
            });

            if (!response.ok) throw new Error('Failed to submit');

            const result = await response.json();
            console.log(result)
            alert('Grade submitted successfully: ' + result.message.student_id);
        } catch (err) {
            console.error(err);
            alert('Submission failed.');
        }

        // alert("submitted");
    }
    else{
        button.innerHTML = 'Submit';
        button.classList.remove("submitted-button");
    }

}

function resetSubmitionsForm(){
    document.querySelectorAll('.js-student-form').forEach(function(element){
        if (element.classList.contains('student-addition-portal-section-input'))
        {
            element.value = '';
        }
        else{
            element.options[0].selected = true;
        }
    });
    submit();
}

function getGradesObject(){
    const formObject = {
        student_id : document.querySelector('.js-grade-student-name').value, 
        grade_subject : document.querySelector('.js-grade-subject').value, 
        grade_task : document.querySelector('.js-grade-task').value,
        grade_type : document.querySelector('.js-grade-type').value, 
        grade : document.querySelector('.js-grade').value, 
        date_assigned : document.querySelector('.js-grade-date-assigned').value, 
        deadline: document.querySelector('.js-grade-deadline').value,
        date_submitted : document.querySelector('.js-grade-date-submitted').value
    };
    return formObject
}