function fetchData() {
    event_id = JSON.parse((localStorage.getItem("event")))
    fetch('http://127.0.0.1:8000/tickets/event/' + event_id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            if(!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            var img = "../../ticketsStoreBackEnd" + data.afishaimg
            const html = `
                  <section class="main-img">
                    <img src="${img}">
                  </section>
                  <section class="description">
                    <h5 class="event-title">${data.name}</h5>
                    <a class="time">${data.date}</a>
                    <div class="about-event">
                      <h5 class="about-event-title"> About event </h5>
                      <div class="about-event-description">${data.about_event}</div>
                      <h5 class="about-event-title">${data.afisha_name}</h5>
                      <div class="about-event-description">${data.afisha_info}</div>
                    </div>
                  </section>
                  <section class="buy">
                    <div class="event-tickets-item">
                      <div class="description">
                        <h6 class="buy-title">${data.name}</h6>
                        <div class="buy-time">${data.date}</div>
                        <div class="buy-place">${data.place.place}</div>
                        <div class="but-price">${data.price} EUR</div>
                        <button type="submit" class="btn btn-primary" type="button" data-id = ${data.id} id="addButton">Buy</button>
                      </div>
                    </div>
                  </section>
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

document.querySelector("#event").addEventListener("submit", function(e){
    e.preventDefault();
    token = "JWT " + JSON.parse(localStorage.getItem("token"))['access']
    var el = document.getElementById('addButton')
    fetch("http://127.0.0.1:8000/tickets/buy/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            event: el.dataset.id
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
