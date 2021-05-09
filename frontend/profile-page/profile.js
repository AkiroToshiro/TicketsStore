function fetchData() {
    token = "JWT " + JSON.parse(localStorage.getItem("token"))['access']
    fetch('http://127.0.0.1:8000/user/userinfo/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    })
        .then(response => {
            if(!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            const html = `
                        <div class="input-form">
                          <input name="form-control" class="form-control" placeholder="First name: ${data.first_name}" type="name" id="newFirstName">
                          <input name="form-control" class="form-control" placeholder="Last name: ${data.last_name}" type="lastName" id="newSecondName">
                          <input name="form-control" class="form-control" placeholder="Email: ${data.email}" type="email" id="newEmail">
                          <input name="form-control" class="form-control" placeholder="Username: ${data.username}" type="numbePhone" id="newUsername">
                        </div>
                            <div class="form-group">
                                 <button type="submit" class="btn btn-primary btn-block" id="save"> Save </button>
                            </div>
            `
            document
                .querySelector('#app')
                .insertAdjacentHTML("afterbegin", html)
        })
        .catch(error => {
            console.log(error);
        })
}

fetchData();


document.querySelector("#changePassword").addEventListener("submit", function(e){
    e.preventDefault();
    let password1 = document.getElementById("password1").value
    let password2 = document.getElementById("password1").value
    let password3 = document.getElementById("password1").value
    token = "JWT " + JSON.parse(localStorage.getItem("token"))['access']
    fetch('http://127.0.0.1:8000/user/changepassword/', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            password1: password1,
            password2: password2,
            password3: password3
        })
    })
        .then(response => {
            return response.json();
        })
        .then(data=>{
            console.log(data)
            alert(data.statusMsg);
        })
});


document.querySelector("#changeUser").addEventListener("submit", function(e){
    e.preventDefault();
    let newFirstName = document.getElementById("newFirstName").value
    console.log(newFirstName)
    token = "JWT " + JSON.parse(localStorage.getItem("token"))['access']
    fetch('http://127.0.0.1:8000/user/userUpdate/', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            newFirstName: newFirstName,
            newSecondName: document.getElementById("newSecondName").value,
            newEmail: document.getElementById("newEmail").value,
            newUsername: document.getElementById("newUsername").value
        })
    })
        .then(response => {
            return response.json();
        })
        .then(data=>{
            alert(data.statusMsg);
        })
});

function tokenVerify(){
    token = JSON.parse(localStorage.getItem("token"));
    try{
        fetch("http://127.0.0.1:8000/user/token/verify/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token['access']
            })
        })
            .then(data => {

                if (data.status == 200) {
                    const html = `
                          <div class="navbar-info">
                               <a href="../main-page/main.html" class="btn btn-outline-info"> Event list </a>
                               <a href="../yourTickets-page/youtTickets.html" class="btn btn-outline-info"> Your tickets </a>
                               <a href="../profile-page/profile.html" class="btn btn-outline-info"> Profile </a>
                               <button type="submit" class="btn btn-outline-info"> Log out </button>
                          </div>
                    `
                    document
                        .querySelector('#header')
                        .insertAdjacentHTML("afterbegin", html)
                }
                else{
                    const html = `
                          <div class="navbar-info">
                               <a href="../main-page/main.html" class="btn btn-outline-info"> Event list </a>
                               <a href="../login-page/login.html" class="btn btn-outline-info"> Login </a>
                          </div>
                    `
                    document
                        .querySelector('#header')
                        .insertAdjacentHTML("afterbegin", html)
                }
            })
    }
    catch {
        const html = `
                          <div class="navbar-info">
                               <a href="../main-page/main.html" class="btn btn-outline-info"> Event list </a>
                               <a href="../login-page/login.html" class="btn btn-outline-info"> Login </a>
                          </div>
                    `
        document
            .querySelector('#header')
            .insertAdjacentHTML("afterbegin", html)
    }
}

tokenVerify();

document.querySelector("#head").addEventListener("submit", function(e){
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = '../main-page/main.html';
});