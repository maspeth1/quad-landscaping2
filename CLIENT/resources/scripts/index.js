var account = null;

function indexLoad(){
    signedOutNav();
}

function accountLoad(){
    signedOutNav();
}

function forumLoad(account){
    if (account != null) {
        signedInNav();
    }
    else{
        signedOutNav();
    }
}

function maintenanceLoad(account){
    if (account != null) {
        signedInNav();
    }
    else{
        signedOutNav();
    }
    
}

function plantsLoad(){
    signedOutNav();
    const peopleUrl = "https://localhost:5001/api/plant";

    fetch(peopleUrl).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        displayPlants(json);
    }).catch(function(error){
        console.log(error);
    })

}

function signInLoad(){
    signedOutNav();
}

function signUpLoad(){
    signedOutNav();
}


function signedOutNav(){
    var nav = document.getElementById("nav");
    var html = `<div class="container d-flex flex-wrap" id="nav">
        <ul class="nav me-auto">
            <li class="nav-item"><a href="index.html" class="nav-link link-dark px-2 active" aria-current="page">Home</a></li>
            <li class="nav-item"><a href="plants.html" class="nav-link link-dark px-2">Plants</a></li>
            <li class="nav-item"><a href="maintenance.html" class="nav-link link-dark px-2">Garden Maintenance</a></li>
            <li class="nav-item"><a href="forum.html" class="nav-link link-dark px-2">Forum</a></li>
        </ul>
        <ul class="nav" >
            <li class="nav-item"><a href="signIn.html" class="nav-link link-dark px-2">Login</a></li>
            <li class="nav-item"><a href="signUp.html" class="nav-link link-dark px-2">Sign up</a></li>
        </ul></div>`
    nav.innerHTML = html;

}

function signedInNav(){
    var nav = document.getElementById("nav");
    var html = `<div class="container d-flex flex-wrap" id="nav">
        <ul class="nav me-auto">
            <li class="nav-item"><a href="index.html" class="nav-link link-dark px-2 active" aria-current="page">Home</a></li>
            <li class="nav-item"><a href="plants.html" class="nav-link link-dark px-2">Plants</a></li>
            <li class="nav-item"><a href="maintenance.html" class="nav-link link-dark px-2">Garden Maintenance</a></li>
            <li class="nav-item"><a href="forum.html" class="nav-link link-dark px-2">Forum</a></li>
        </ul>
        <ul class="nav" >
            <li class="nav-item"><a href="" class="nav-link link-dark px-2">Account</a></li>
        </ul></div>`
    nav.innerHTML = html;
}

function displayPlants(json){
    var plantTable = document.getElementById("plantTable");
    var html = "<div class=\"row\">";
    json.forEach(plant => {
        html += "<div class=\"col-4\" id=\"plantCol\">";
        html += "<img src=\"" + plant.plantPic + "\" id=\"plantImg\"/>"
        html += `<div class="containter"><div><b>${plant.plantName}</b></div>`
        html += "</div></div>";
    });
    html+="</div>";
    plantTable.innerHTML = html;
}