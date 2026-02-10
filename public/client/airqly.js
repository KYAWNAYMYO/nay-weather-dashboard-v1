const airQualityForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

airQualityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/getairquality?address=' + location).then(response => {
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
            }
            else if(response.status === 200) {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.airqualityData;
            }
        })
    })
})