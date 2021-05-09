function fetchData() {
    fetch('http://127.0.0.1:8000/tickets/eventlist/')
        .then(response => {
            if(!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {

            const html = data.map(event => {
                var img = "../../ticketsStoreBackEnd" + event.frontimg
                return `
                    <div class="card">
                    <img src="${img}" class="card-img-top">
                    <div class="card-body">
                        <a class="time">${event.date}</a>
                        <h5 class="card-title">${event.name}</h5>
                        <a class="place">${event.place.place} </a>
                        <div class="buy-link">
                        <button type="submit" class="btn btn-primary btn-block" data-id = ${event.id} id="addButton"> Add info  </button>
                        </div>
                    </div>
                </div>
            `}).join("");
            document
                .querySelector('#app')
                .insertAdjacentHTML("afterbegin", html)
        })
        .catch(error => {
            console.log(error);
        })
}

fetchData();

document.querySelector("#myForm").addEventListener("submit", function(e){
    e.preventDefault();
    var el = document.getElementById('addButton')
    localStorage.setItem("event", JSON.stringify(el.dataset.id));
    window.location.href = '../event-page/event.html';
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