var users = []; 

document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Паролі не співпадають. Будь ласка, перевірте їх.");
    return;
  }


  users.push({
    email: email,
    password: password
  });

 
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";


  updateUsersList();

  alert(`Користувач ${email} зареєстрований успішно!`);



  
  console.log(users[0].email);
});
let btnLogin = document.getElementById('flip-card_btnLogin');


  btnLogin.addEventListener('click', function (ev) {
    ev.preventDefault()
    console.log(users[password]);
  let loginInput = document.getElementById('flip-card_emailLogin').value;
  let passwodLogin = document.getElementById('flip-card_passLogin').value;
  console.log(users.length);
  let p=0;
    for (let i = 0; i < users.length; i++) {
        console.log(loginInput);
        if (loginInput === users[i].email && passwodLogin === users[i].password) {
          p++
        } 
      }
        console.log(p);
        if(p>0){
          alert(`Користувач ${loginInput} війшов успішно!`);
          p=0;
        }else {
          alert(`Користувач ${loginInput} не існує, або  не правильно введені дані!`);
          p=0;
        }
     
  
});

function updateUsersList() {
  var userList = document.getElementById("userList");

  userList.innerHTML = "";

  users.forEach(function (user) {
    var listItem = document.createElement("li");
    listItem.textContent = user.email;

  });
  console.log(users);
}





updateUsersList();