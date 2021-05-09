function fetchData() {
    token = "JWT " + JSON.parse(localStorage.getItem("token"))['access']
    fetch('http://127.0.0.1:8000/tickets/ticketslist', {
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
        console.log(data)
            const html = data.map(el => {
                return `
                    <section class="tickets-list">
                       <div class ="ticket-item">
                         <h6 class="buy-title">${el.event.name}</h6>
                         <div class="buy-time">${el.event.date}</div>
                         <div class="buy-place">${el.event.place.place}</div>
                         <div class="buy-price">${el.event.price} EUR</div>
                         <button type="button" class="btn btn-light">Print ticket</button>
                       </div>
                      </section>
                      <br>
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