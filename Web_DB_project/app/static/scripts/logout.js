export async function logout(){
    try {
        const response = await fetch('/api/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
        }});
        if (!response.ok) {
            console.log("fail");
            alert('Signup failed');
        }
        else{
            const data = await response.json();
            console.log('Success');
            alert('logout successful');
            if (data.redirect) {
                window.location.href = data.redirect;
            }  
        }
    } catch (err) {
        console.error(err);
        alert('login caused error.');
    }
}