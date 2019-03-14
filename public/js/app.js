


  const form = document.querySelector('form');
  const search = document.querySelector('input');
  const mess1 = document.querySelector('#m-1');
  const mess2 = document.querySelector('#m-2');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    //Clear the text content:
    mess1.textContent = 'Loading...';
    mess2.textContent = '';
    
    //get the search input:
    const address = search.value;
    fetch(`/weather?address=${address}`).then((response) => {
      response.json().then((data) => {
        if(data.error)
        {
            mess1.textContent = data.error;
        }
        else
        {
           mess1.textContent = data.location;
           mess2.textContent = data.forecast;
        }
  })}).catch((err) => console.log('no data found!', err));

  });