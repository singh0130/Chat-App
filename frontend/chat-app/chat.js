const token= localStorage.getItem('token');
const userDetails_JSON= localStorage.getItem('userDetails');
const userDetails= JSON.parse(userDetails_JSON);

function sendmessage(e)
{
    e.preventDefault();

    const message= document.getElementById('message');

    const messageDetails= {
        sender: userDetails.name,
        message: message.value
    }
    axios.post('http://localhost:3000/user/sendmessage', messageDetails)
    .then((res) => {
        if(res.status === 201)
        {
            addMessage(res.data.message);
        }
    })
    .catch(err => {
        alert(err.response.data.message);
    });
}

window.addEventListener('load', () => {
    axios.get('http://localhost:3000/getmessage',)
    .then(res => {
        if(res.status===200)
        {
            res.data.message.forEach(message => {
                addMessage(message);
            });
        }
    })
    .catch(err => console.log(err));
});

function addMessage(message)
{
    const parent= document.getElementById('chat-window');
    parent.innerHTML += `${userDetails.name} : ${message}`;
}