function signup(e)
{
    e.preventDefault();
    const form= new FormData(e.target);
    const signupDetails= {
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        password: form.get("password")
    }
    console.log(signupDetails);

    axios.post('http://localhost:3000/user/signup', signupDetails)
    .then(response => {
        if(response.status === 201)
        {
            alert('Signup Successfull! Login Now!');
            window.location.href= "../login/login.html";
        }
        else 
        {
            throw new Error('Failed to login');
        }
    })
    .catch((err) => {
        alert(err.response.data.message);
    });
}