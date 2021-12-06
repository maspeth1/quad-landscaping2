function indexLoad(){
    navLoad();
}

function accountLoad(){
    navLoad();
}

function forumLoad(account){
    navLoad();
}

function maintenanceLoad(account){
    navLoad();
    
}

async function plantsLoad(){
    navLoad();
    
    const Url = "https://localhost:5001/api/plant";
    console.log("Getting from " + Url);

    fetch(Url).then(function(response){
        return response.json();
    }).then(function(json){
        //perform action with json
        displayPlants(json);
    }).catch(function(error){
        console.log(error);
    })

}

function signInLoad(){
    navLoad();
}

function signUpLoad(){
    navLoad();
}

function navLoad(){
    if (sessionStorage.getItem("loginStatus")=="y") {
        console.log("Showing signed in");
        signedInNav();
    }
    else {
        console.log("Showing signed out");
        signedOutNav();
    }
}

// async function getFromAPI(API) {
//     const Url = "https://localhost:5001/api/" + API;
//     console.log("Getting from " + Url);

//     fetch(Url).then(function(response){
//         return response.json();
//     }).then(function(json){
//         //perform action with json
//         console.log(json);
//     }).catch(function(error){
//         console.log(error);
//     })

// }

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

function displayPlants(plantjson){
    var plantTable = document.getElementById("plantTable");
    var html = "<div class=\"row\">";
    plantjson.forEach(plant => {
        html += "<div class=\"col-4\" id=\"plantCol\">";
        html += "<img src=\"" + plant.plantPic + "\" id=\"plantImg\"/>"
        html += `<div class="containter"><div><b>${plant.plantName}</b></div>`
        html += "</div></div>";
    });
    html+="</div>";
    plantTable.innerHTML = html;
}

function handleSignInSubmit() {

const accountUrl = "https://localhost:5001/api/accounts";

    fetch(accountUrl).then(function(response){
        return response.json();
    }).then(function(json){
        checkSignedIn(json, document.getElementById("username").value, document.getElementById("password").value);
        
    }).catch(function(error){
        console.log(error);
    })

}

function checkSignedIn(accountjson, user, pass) {
    console.log(accountjson);
    accountjson.forEach(account => {
        console.log("Looping for account: " + account);
        console.log(account.accountUsername + " " + account.accountPassword);
        if (account.accountUsername==user) {
            console.log("Correct user: " + account.accountUsername);
            if (account.accountPassword==pass) {
                console.log("Correct pass: " + account.accountPassword);
                sessionStorage.setItem("loginStatus", "y");
                alert("Successfully signed in! Welcome, " + account.accountFName + " " + account.accountLName);
                window.location.href = "file:///C:/Users/Jackson/Desktop/School/Semester%202/CS100/groupProject/quad-landscaping2/CLIENT/pages/index.html";
            }
        }
    });
}