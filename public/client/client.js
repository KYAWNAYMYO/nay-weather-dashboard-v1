const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    console.log('Location: ' + location);
   fetch('/weather?address=' + location).then(response => {
        //console.log(response);
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
            }
            else if(response.status === 200) {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcastData;
            }
        })
    })
})