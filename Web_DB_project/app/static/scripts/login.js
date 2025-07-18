async function login(){
    
    const formItems = {
        'username': document.querySelector('.js-login-username').value,
        'password': document.querySelector('.js-login-password').value
    };
    // alert(`LOGIN ${document.querySelector('.js-login-username').value} ${document.querySelector('.js-login-password').value}`)
    try {
        const response = await fetch('/api/login', {
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
                const data = await response.json();
                console.log('Success');
                alert('Login successful');
                // Redirect after successful login
                if (data.redirect) {
                    window.location.href = data.redirect;
                }
            }
        } catch (err) {
            console.error(err);
            alert('login caused error.');
        }
    }

function signup_html(){
    let form = document.querySelector('.js-user-login-signup-form');
    form.innerHTML = signup_html_string;

    document.querySelector('.js-signup-login-switch').addEventListener('click',() => {
      console.log('login-html');
      loging_html();
    });
    
    document.querySelector('.js-login-submit').addEventListener('click',() => {
      console.log('submit signup');
      signup();
    });
    document.querySelector('.js-signup-radio-student').addEventListener('change', ()=>{
      console.log("radio Student");
      document.querySelector('.js-signup-specific').innerHTML=student_html;
    });
    document.querySelector('.js-signup-radio-professor').addEventListener('change', ()=>{
      console.log('radio Professor')
      document.querySelector('.js-signup-specific').innerHTML=professor_html;
    });

}

async function signup(){
    
    const username = document.querySelector('.js-signup-username').value;
    const password = document.querySelector('.js-signup-password').value;
    const email = document.querySelector('.js-signup-email').value;
    const retypedPassword = document.querySelector('.js-signup-password1').value;
    const parent_education = document.querySelector('.js-student-parent-education').value;
    const lunch_type = document.querySelector('.js-student-lunch').value;
    const internet_access = document.querySelector('.js-student-internet-access').value;
    const extra_activities = document.querySelector('.js-student-extra-activities').value;
    const user_name = document.querySelector('.js-user-name').value;
    const user_birthday = document.querySelector('.js-user-birthday').value;
    const gender = document.querySelector('.js-user-gender').value;
    const department = null;
    let user_role = ""
    if (document.getElementById('js-user-type-student').checked){
      user_role = "STUDENT"; 
    } 
    else {
      user_role = "PROFESSOR";
    };

    let cont = true;
    console.log(5 <= username.length <= 30)

    if (password !== retypedPassword){
        alert("Passwords are different");
        console.log("different passwords");
        cont = false;
    };
    if (!(5 <= username.length && 30 >= username.length)) {
        console.log("username doesn't meet length requirement");
        cont = false;
    };
    if (!RegExp('^[A-Za-z0-9][A-Za-z0-9!?.]+$').test(username)){
        console.log("username doesn't fit criteria")
        cont = false;
    };
    if(!(password.length >= 8 && password.length <= 16)){
        console.log("password doesn't meet length requirement")
        cont = false;
    };
    if ((!RegExp('^[A-Za-z0-9!?.]+$').test(password)) ||
        !(RegExp('[A-za-z0-9]').test(password) && 
        RegExp('[!?@.,()]').test(password))) {
        console.log("Password doesn't meet criteria")
        cont = false;
    };  

    if (cont === false){
      console.log("ERROR")  
      console.log(cont)
      return;
    }
    const formItems = {
        'username': username,
        'password_hash': password,
        'email' : email,
        'parent_education':parent_education,
        'lunch_type':lunch_type,
        'internet_access':internet_access,
        'extra_activities':extra_activities,
        'user_name':user_name,
        'user_birthday':user_birthday,
        'gender':gender,
        'department':department,
        'user_role':user_role
    };
    // alert(`LOGIN ${document.querySelector('.js-login-username').value} ${document.querySelector('.js-login-password').value}`)
    try {
        const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formItems)
            });
            if (!response.ok) {
                console.log("fail");
                alert('Signup failed');
            }
            else{
                const data = await response.json();
                console.log('Success');
                alert('Signup successful');
                console.log(data)
            }
        } catch (err) {
            console.error(err);
            alert('login caused error.');
        }
}

function loging_html(){
    let form = document.querySelector('.js-user-login-signup-form');
    form.innerHTML = `
            <h2 >Login</h2>

            <div class= "js-user-login-signup-form">
                <label for="username">Username:</label>
                <input class="js-login-username" type="text" name="username" required><br>

                <label for="password">Password:</label>
                <input class="js-login-password" type="password" name="password" required><br>
                
            <div class="login-signup-buttons">
                <div class="js-login-signup-buttons">
                <input class ="js-login-submit" type="button" value="Log in">

                <button class="js-signup-login-switch" >Sign Up</button>
            </div>
        </div>

            <script type = "module" src="../static/scripts/login.js"></script>`;

    document.querySelector('.js-login-submit').addEventListener('click',() => {
      console.log('login');
      login();
    });

    document.querySelector('.js-signup-login-switch').addEventListener('click',() => {
      console.log('signup-html');
      signup_html();
    });
}





const student_html =`
        <!-- THIRD DIV -->
        <div class="signup-field-row">
          <label class="signup-row"> Student's Parent Education: </label>
          <select
            class="student-addition-dropdown js-student-form js-student-parent-education"
            name="student-addition-parent-education"
            id="parent_education"
          >
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <!-- THIRD DIV -->
        <div class="signup-field-row">
          <label class="student-portal-row"> Student's Lunch Type: </label>
          <select
            class="student-addition-dropdown js-student-form js-student-lunch"
            name="student-addition-lunch-type"
            ,
            id="lunch_type"
          >
            <option value="Free or Reduced">Free or Reduced</option>
            <option value="Standard">Standard</option>
          </select>
        </div>
        <!-- THIRD DIV -->
        <div class="signup-field-row">
          <label class="student-portal-row"> Student's Internet Access: </label>
          <select
            class="student-addition-dropdown js-student-form js-student-internet-access"
            name="student-addition-internet-access"
            ,
            id="internet_access"
          >
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        </div>
        <!-- THIRD DIV -->
        <div>
          <label class="student-portal-row">
            Student's Extra Activities:
          </label>
          <select
            class="student-addition-dropdown js-student-form js-student-extra-activities"
            name="student-addition-extra-activities"
            ,
            id="extra_activities"
          >
            <option value="True">True</option>
            <option value="False">False</option></select
          ><br />
        </div>`

const professor_html = ''

const signup_html_string = `    
      <h2>Sign up</h2>
      <!-- SECOND DIV for radios -->
      <div class="js-radio-buttons">
        <input
          class="js-signup-radio-student"
          type="radio"
          name="js-user-type"
          id="js-user-type-student"
        />
        <label for="js-user-type-student">Student</label>
        <input
          class="js-signup-radio-professor"
          type="radio"
          name="js-user-type"
          id="js-user-type-professor"
        />
        <label for="js-user-type-professor">Professor</label><br />
      </div>
      <!-- ---------------------------- -->
      <!-- SECOND DIV for common fields -->
      <!-- ---------------------------- -->
      <div class="js-signup-common-fields">
        <!-- THIRD DIV row field -->
        <div class="signup-field-row">
          <label for="username">Username:</label>
          <input
            class="js-signup-username"
            type="text"
            name="username"
            required
          /><br />
        </div>
        <!-- THIRD DIV row field -->
        <div class="signup-field-row">
          <label for="password">Password:</label>
          <input
            class="js-signup-password"
            type="password"
            name="password"
            required
          /><br />
        </div>
        <!-- THIRD DIV row field -->
        <div class="signup-field-row">
          <label for="password">Retype password:</label>
          <input
            class="js-signup-password1"
            type="password"
            name="password1"
            required
          /><br />
        </div>
        <!-- THIRD DIV row field -->
        <div class="signup-field-row">
          <label for="email">Email:</label>
          <input
            class="js-signup-email"
            type="email"
            name="email"
            required
          /><br />
        </div>
        <!-- THIRD DIV row field -->
        <div class="signup-field-row">
          <label for="name">Name: </label>
          <input
            class="js-student-form js-user-name"
            placeholder="Full Name"
            id="user_name"
          />
        </div>
        <!-- THIRD DIV row field -->
        <div class="signup-field-row">
          <label for="birthday"> Birthday: </label>
          <input
            class="js-user-form js-user-birthday"
            placeholder="Age"
            id="user_birthday"
            type='date'
          />
        </div>
        <!-- THIRD DIV row field -->
        <div class="signup-field-row">
          <label for="gender"> Gender: </label>
          <select
            class="js-user-form js-user-gender"
            name="user-addition-gender"
            ,
            id="gender"
          >
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div class="js-signup-specific"></div>
      <div class="login-signup-buttons">
        <div class="js-login-signup-buttons">
        <input
          class="js-login-submit"
          type="button"
          value="Sign up"
        />
        <button class="js-signup-login-switch">Login</button>
        </div>
      </div>`;

signup_html();