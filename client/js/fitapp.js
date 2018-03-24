window.onload=function(){
  downloadResources();
  document.querySelector('#login').addEventListener('click', login);
  document.querySelector('#logout').addEventListener('click', logout);
}

function putData(data){
  let events = [];
  for(let i=0; i<data.length; i++){
    events[i] = {
      title: data[i].name,
      start: data[i].date,
      end: data[i].date,
      className: data[i].type
    }
  };
  return events;
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
    localStorage.setItem('token', token);
  }else{
    console.log(this.status);
  }
})
xhr.send(JSON.stringify({
  'username': user,
  'password': password
}));
}

function logout() {
localStorage.removeItem('token');
}

function downloadResources() {
const xhr = new XMLHttpRequest();
const token = localStorage.getItem('token');

xhr.open('GET', 'https://fitcalendar.herokuapp.com/api/activities', true);

xhr.setRequestHeader('Authorization', token);

xhr.addEventListener('load', function(){
  const wynik = JSON.parse(this.responseText);
  if(this.status === 200){
    $('#calendar').fullCalendar({
      // put your options and callbacks here
      events: putData(wynik),
      timeformat: 'H(:mm)',
      editable: true
    })
  }else{
    console.log(this.status);
  }
})
xhr.send();
}