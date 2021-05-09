function login(password, username){
    fetch("http://127.0.0.1:8000/user/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response =>{
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            let token = localStorage.setItem("token", JSON.stringify(data));
            window.location.href = '../main-page/main.html';
        })
        .catch(error => {
            console.log(error);
        });
}

document.querySelector("#myForm").addEventListener("submit", function(e){
    e.preventDefault();
    let password = document.getElementById("password").value
    let username = document.getElementById("email").value
    login(password, username);
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

