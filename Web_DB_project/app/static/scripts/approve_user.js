import { logout } from './logout.js';

async function getAllApprovalUsers(){
    try {
        const response = await fetch('/api/approveUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to fetch');

        const result = await response.json();
        // console.log(result)

        let studentTableHTML = `
        <div class="js-approval-user-titles">
            <div class = "js-user-approve-id"> approve-id </div>
            <div class = "js-user-username"> username </div>
            <div class = "js-user-email"> email </div>
            <div class = "js-user-user-name"> user-name </div>
            <div class = "js-user-user-role"> user-role </div>
            <div class = "js-user-gender"> gender </div>
            <div class = "js-user-birthday"> birthday </div>
            <div class = "js-user-grade-level"> grade-level </div>
            <div class = "js-user-parent-education"> parent-education </div>
            <div class = "js-user-lunch-type"> lunch-type </div>
            <div class = "js-user-internet-access"> internet-access </div>
            <div class = "js-user-extra-activities"> extra-activities </div>
            <div class = "js-user-department"> department </div>
            <div class = "js-approve-user"> Approve </div>
        </div>
        ` 
        console.log(result)
        if (Array.isArray(result.message)){
            result.message.forEach(element => {
                studentTableHTML += `
                <div class="js-approval-user js-row-${element.approve_id}">
                    <div class = "js-user-approve_id"> ${element.approve_id} </div>
                    <div class = "js-user-username"> ${element.username} </div>
                    <div class = "js-user-user_name"> ${element.user_name} </div>
                    <div class = "js-user-email"> ${element.email} </div>
                    <div class = "js-user-user_role"> ${element.user_role} </div>
                    <div class = "js-user-gender"> ${element.gender} </div>
                    <div class = "js-user-birthday"> ${element.birthday} </div>
                    <div class = "js-user-grade_level"> ${element.grade_level} </div>
                    <div class = "js-user-parent_education"> ${element.parent_education} </div>
                    <div class = "js-user-lunch_type"> ${element.lunch_type} </div>
                    <div class = "js-user-internet_access"> ${element.internet_access} </div>
                    <div class = "js-user-extra_activities"> ${element.extra_activities} </div>
                    <div class = "js-user-department"> ${element.department} </div>
                    <div class = "js-approve-user"> 
                        <button class= "js-approve-user-no"  id="${element.approve_id}"> no  </button>
                        <button class= "js-approve-user-yes" id="${element.approve_id}"> yes </button>
                    </div>
                </div>`
            });
        }
        document.querySelector('.js-approval-user-grid').innerHTML = studentTableHTML;
        document.querySelectorAll(".js-approve-user-yes").forEach(button =>{
            button.addEventListener("click", () => {
                console.log(button.id);
                approveUserRequest(button.id)
            })
        });
        document.querySelectorAll(".js-approve-user-no").forEach(button =>{
            button.addEventListener("click", () => {
                console.log(button.id);
                removeUserRequest(button.id)
            })
        });

    } catch (err) {
        console.error(err);
        alert('fetch failed.');
    }

    let form = document.querySelector('.header')
    form.innerHTML = `
    <button class = 'logout'> logout </button>
    <div class="js-user-profile"></div>
    `
    document.querySelector('.logout').addEventListener('click', ()=>{
        logout();
        console.log('logged out');
    })
}


async function approveUserRequest(id){
    const formItems = {
        'approve_id': id
    };
    // alert(`LOGIN ${document.querySelector('.js-login-username').value} ${document.querySelector('.js-login-password').value}`)
    try {
        const response = await fetch('/api/approveUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formItems)
            });
            if (!response.ok) {
                console.log("fail");
                alert('login failed');
            }
            else{
                console.log('Success');
                alert('user approved');
            }
            await getAllApprovalUsers();
        } catch (err) {
            console.error(err);
            alert('Error fetching list for users to approve.');
        }
}

async function removeUserRequest(id){
    const formItems = {
        'approve_id': id
    };
    // alert(`LOGIN ${document.querySelector('.js-login-username').value} ${document.querySelector('.js-login-password').value}`)
    try {
        const response = await fetch('/api/removeUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formItems)
            });
            if (!response.ok) {
                console.log("fail");
                alert('failed to remove user');
            }
            else{
                console.log('Success');
                alert('successfully removed user');
            }
            await getAllApprovalUsers();
        } catch (err) {
            console.error(err);
            alert('Error fetching list for users to approve.');
        }
}

getAllApprovalUsers();