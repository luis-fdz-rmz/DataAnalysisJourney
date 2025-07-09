

async function submit(){
    
    const button = document.querySelector('.submit-button');
    if (button.innerText === 'Submit'){
        button.innerText = 'Submitted';
        button.classList.add("submitted-button");
        // alert("TEST");


        const formItems = getStudentObject();
        resetSubmitionsForm();
        // console.log(formItems)

        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formItems)
            });

            if (!response.ok) throw new Error('Failed to submit');

            const result = await response.json();
            console.log(result)
            alert('User submitted successfully: ' + result.message.student_id);
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

function getStudentObject(){
    const formObject = {
        student_name : document.querySelector('.js-student-name').value, 
        gender : document.querySelector('.js-student-gender').value, 
        age : document.querySelector('.js-student-age').value,
        grade_level : document.querySelector('.js-student-grade').value, 
        parent_education : document.querySelector('.js-student-parent-education').value, 
        lunch_type : document.querySelector('.js-student-lunch').value, 
        internet_access: document.querySelector('.js-student-internet-access').value,
        extra_activities : document.querySelector('.js-student-extra-activities').value
    };
    return formObject
}