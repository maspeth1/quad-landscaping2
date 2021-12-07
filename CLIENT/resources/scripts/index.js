const indexUrl = "index.html";
const accountUrl = "account.html";
const forumUrl = "forum.html";
const maintenanceUrl = "maintenance.html";
const plantsUrl = "plants.html";
const signinUrl = "signIn.html";
const signUpUrl = "signUp.html";

const accountAPI = "https://localhost:5001/api/accounts";
const forumComAPI = "https://localhost:5001/api/forumcomments";
const forumPostAPI = "https://localhost:5001/api/forumposts";
const plantComAPI = "https://localhost:5001/api/plantcomments";
const plantAPI = "https://localhost:5001/api/plant";
const sessionAPI = "https://localhost:5001/api/sessions";

function indexLoad(){
    navLoad();
}

function accountLoad(){
    navLoad();
}

function forumLoad(){
    navLoad();
    
    fetch(forumPostAPI).then(function(response){
        return response.json();
    }).then(function(json){
        displayForum(json);
    }).catch(function(error){
        console.log(error);
    })
    
}

function maintenanceLoad(){
    navLoad();
    
}

async function plantsLoad(){
    navLoad();

    fetch(plantAPI).then(function(response){
        return response.json();
    }).then(function(json){
        displayPlants(json);
    }).catch(function(error){
        console.log(error);
    })

}

function plantPageLoad(){
    navLoad();
    
    var clickedId = location.search.substring(1);

    fetch(plantAPI).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        displayPlantInfo(json, clickedId);
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
        signedInNav();
    }
    else {
        signedOutNav();
    }
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
            <li class="nav-item"><a href="" class="nav-link link-dark px-2">` + sessionStorage.getItem("accUser") + `</a></li>
        </ul></div>`
    nav.innerHTML = html;
}

function displayPlants(plantjson){
    var plantTable = document.getElementById("plantTable");
    var html = "<div class=\"row\">";
    json.forEach(plant => {
        html += "<div class=\"col-4\" id=\"plantCol\">";
        html += "<a href=\"plantPage.html?" + plant.plantId + "\"><img src=\"" + plant.plantPic + "\"  class=\"rounded\"  id=\"plantImg\"/></a>"
        html += `<div class="containter"><div><b>${plant.plantName}</b></div>`
        html += "</div></div>";
    });
    html+="</div>";
    plantTable.innerHTML = html;
}

function displayPlantInfo(json, clickedId){
    json.forEach(plant => {
        if(plant.plantId == clickedId){ 
            var plantInfo = document.getElementById("plantInfo");
            var html = `<div class = \"col-7\">`;
            html += `<h1 style=\"font-size: 70px; margin-bottom: 15px; margin-top: 20px;\">${plant.plantName}</h1>`;
            html += `<h2 style=\"margin-bottom: 20px;\">Species Name : ${plant.plantSpeciesName}</h2>`;
            html += `<h3>Difficuly : ${plant.plantDifficultyLevel}</h3>`;
            html += `<h3>Type : ${plant.plantType}</h3></div>`;
            html += `<div class="col-5"><img src="${plant.plantPic}" style="width: 350px; height: 300px; object-fit: cover;"></div>`;
            html += `<h5 class="col-12" style="margin-top: 30px;">${plant.plantDescription}</h5>`;

            plantInfo.innerHTML = html;   
        }
    })
}

function displayForum(forumPostsjson) {
    forumPostsjson.forEach(post => {
        //HTML goes here
        console.log(post.postId);
        console.log(post.postTimeStamp);
        console.log(post.postText);
    })
}

function handleSignInSubmit() {
    attemptSignIn(document.getElementById("username").value, document.getElementById("password").value);
}

function handleSignUpSubmit() {

    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var confirmPass = document.getElementById("confirmPassword").value;

    if (user != "" && pass != "" && confirmPass != "" && pass == confirmPass) {
        var account = {
            AccountUsername : user,
            AccountFName : "N/A",
            AccountLName : "N/A",
            AccountPassword : pass,
            AccountAdminStatus : 0,
            AccountBio : "N/A",
            AccountProfilePic : "N/A",
            AccountCreatedSessionId : 0
        
        }
        postAccount(account);
    }
    else if (user == "") {alert("Username must not be empty. Please enter a username.");}
    else if (pass == "") {alert("Password must not be empty. Please enter a password.");}
    else if (confirmPass == "") {alert("Please confirm your password.");}
    else {alert("Passwords do not match. Please try again");}
}

function attemptSignIn(user, pass) {
    var logged = 0;

    fetch(accountAPI).then(function(response){
        return response.json();
    }).then(function(json){
        json.forEach(account => {
            if (account.accountUsername==user) {
                if (account.accountPassword==pass) {
                    logged = 1;
                    login(account.accountUsername);
                }
            }
        })
        if (logged==0) alert("Incorrect username or password. Please try again.");
    }).catch(function(error){
        console.log(error);
    })
}

function login(user) {
    fetch(accountAPI).then(function(response){
        return response.json();
    }).then(function(json){
        json.forEach(account => {
            console.log(account.accountUsername + "=" + user);
            if (account.accountUsername==user) {
                    alert("Successfully signed in! Welcome, " + account.accountUsername);
                    var account = {
                        AccountId : account.accountId.toString(),
                        AccountUsername : account.accountUsername,
                        AccountFName : account.accountFName,
                        AccountLName : account.accountLName,
                        AccountAdminStatus : account.AccountAdminStatus,
                        AccountBio : account.AccountBio,
                        AccountProfilePic : account.AccountProfilePic,
                        AccountCreatedSessionId : account.accountCreatedSessionId.toString()
                    
                    }
                    sessionStorage.setItem("loginStatus", "y");
                    storeAccount(account);
                    window.location.href = indexUrl;
            }
        });
    }).catch(function(error){
        console.log(error);
    })
}

function logout() {
    if (sessionStorage.getItem("loginStatus")=="y") {
        sessionStorage.removeItem("loginStatus");
        sessionStorage.removeItem("accId");
        sessionStorage.removeItem("accUser");
        sessionStorage.removeItem("accFName");
        sessionStorage.removeItem("accLName");
        sessionStorage.removeItem("accAdmStatus");
        sessionStorage.removeItem("accBio");
        sessionStorage.removeItem("accPFP");
        sessionStorage.removeItem("accSeshID");
    }
    else {
        console.log("No account logged in!");
    }
}

function storeAccount(account) {
    sessionStorage.setItem("accId", account.AccountId);
    sessionStorage.setItem("accUser", account.AccountUsername);
    sessionStorage.setItem("accFName", account.accountFName);
    sessionStorage.setItem("accLName", account.accountLName);
    sessionStorage.setItem("accAdmStatus", account.AccountAdminStatus);
    sessionStorage.setItem("accBio", account.AccountBio);
    sessionStorage.setItem("accPFP", account.AccountProfilePic);
    sessionStorage.setItem("accSeshID", account.AccountCreatedSessionId);
}

// function createSession() {
//     var session {
//         sessionStartTime : ,

//     }
//     postSession(session);
// }

function postAccount(account) {
    fetch(accountAPI, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(account)
    }).then((response)=>{
        login(account.AccountUsername);
    })
}

function postForumpost(post) {
    fetch(forumPostAPI, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(post)
    }).then((response)=>{
        
    })
}

function postForumcomment(fcomment) {
    function postForumpost(fcomment) {
        fetch(forumComAPI, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(fcomment)
        }).then((response)=>{
            
        })
    }
}

function postPlantcomment(pcomment) {
    function postForumpost(pcomment) {
        fetch(plantComAPI, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(pcomment)
        }).then((response)=>{
            
        })
    }
}

function postPlant(plant) {
    function postForumpost(plant) {
        fetch(plantAPI, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(plant)
        }).then((response)=>{
            
        })
    }
}

function postSession(session) {
    function postForumpost(session) {
        fetch(sessionAPI, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(session)
        }).then((response)=>{
            
        })
    }
}