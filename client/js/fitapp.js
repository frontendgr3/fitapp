window.onload=function(){
    document.querySelector('#login').addEventListener('click', login);
    $('#calendar').fullCalendar({
        // put your options and callbacks here
  })
}

function login() {
  const xhr = new XMLHttpRequest();  
  const user = 'user';
  const password = '123456';
  
  xhr.open('POST', 'https://fitcalendar.herokuapp.com/api/auth/login', true);
  
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.addEventListener('load', function() {
    if(this.status === 200){
      const token = JSON.parse(this.responseText).token;
      console.log(token);
    }else{
      console.log(this.status);
    }
  })
  xhr.send(JSON.stringify({
    'username': user,
    'password': password
  }));
}