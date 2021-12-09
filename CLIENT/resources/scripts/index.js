const indexUrl = "home.html";
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

function forumPostLoad(){
    navLoad();
    var clickedId = location.search.substring(1);
    // sessionStorage.setItem("currPlantId", clickedId.toString());

    fetch(forumPostAPI).then(function(response){
        return response.json();
    }).then(function(json){
        displayPlantInfo(json, clickedId);
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

    if(sessionStorage.getItem("accAdmStatus") == "1"){
        var buttons = document.getElementById("plantAddButtons");
        var html = `<form>
            <div class="row">
                <div class="form-group col-3">
                    <label for="plantName">Plant Name</label>
                    <input class="form-control" id="plantName" >
                </div>
                <div class="form-group col-3">
                    <label for="speciesName">Species Name</label>
                    <input class="form-control" id="speciesName" >
                </div>
                <div class="form-group col-2">
                    <label for="typeOfPlant">Type of Plant</label>
                    <input class="form-control" id="typeOfPlant" >
                </div>
                <div class="form-group col-2">
                    <label for="difficultyLevel">Difficulty Level</label>
                    <input class="form-control" id="difficultyLevel" placeholder="1-10">
                </div>
                <div class="form-group col-2">
                    <label for="pictureLink">Picture Link</label>
                    <input class="form-control" id="pictureLink" >
                </div>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" rows="5"></textarea>
            </div>
        </form>
        <button type="button"  onclick="makePlant()" style="opacity: 1; margin-top: 10px;" class="btn btn-success" id="makePlant">Post</button>`;
        buttons.innerHTML = html;
    }
}

function plantPageLoad(){
    navLoad();

    var clickedId = location.search.substring(1);
    sessionStorage.setItem("currPlantId", clickedId.toString());

    fetch(plantAPI).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        displayPlantInfo(json, clickedId);
    }).catch(function(error){
        console.log(error);
    })

    console.log(sessionStorage.getItem("accAdmStatus"));

    if(sessionStorage.getItem("accAdmStatus") == "1"){
        var buttons = document.getElementById("plantEditButtons");
        var html = `<button type="button" onclick="editPlantPage()" style="opacity: 1;" class="btn btn-warning" id="editPlantPage">Edit</button>
        <a href="${plantsUrl}" type="button" onclick="deletePlantPage()" style="opacity: 1;" class="btn btn-danger" id="deletePlant">Delete</a>
        <button type="button" onclick="savePlantChanges()" style="opacity: 0;" class="btn btn-success" id="savePlantChanges">Save Changes</button>`;
        buttons.innerHTML = html;
    }
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
        <li class="nav-item"><a href="home.html" class="nav-link link-dark px-2 active" aria-current="page">Home</a></li>
        <li class="nav-item"><a href="plants.html" class="nav-link link-dark px-2">Garden Maintenance</a></li>
        <li class="nav-item"><a href="startingG.html" class="nav-link link-dark px-2">Starting a Garden</a></li>
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
            <li class="nav-item"><a href="home.html" class="nav-link link-dark px-2 active" aria-current="page">Home</a></li>
            <li class="nav-item"><a href="plants.html" class="nav-link link-dark px-2">Garden Maintenance</a></li>
            <li class="nav-item"><a href="staringG.html" class="nav-link link-dark px-2">Starting a Garden</a></li>
            <li class="nav-item"><a href="forum.html" class="nav-link link-dark px-2">Forum</a></li>
        </ul>
        <ul class="nav" >
            <li class="nav-item"><a href="" class="nav-link link-dark px-2">` + sessionStorage.getItem("accUser") + `</a></li>
        </ul></div>`
    nav.innerHTML = html;
}

function displayPlants(json){
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
            // var html = `<div class="col-12" style="margin-left: 100px;">
            //             <button type="button" class="btn btn-info">Info</button>
            //             </div>`;
            var html = `<div class = \"col-7\" >`;
            html += `<h1 style=\"font-size: 70px; margin-bottom: 15px;\" id=\"plantName\">${plant.plantName}</h1>`;
            html += `<h2 style=\"margin-bottom: 20px;\" id=\"plantSpeciesName\">Species Name : ${plant.plantSpeciesName}</h2>`;
            html += `<h3 id=\"plantDiffLevel\">Difficuly : ${plant.plantDifficultyLevel}</h3>`;
            html += `<h3 id=\"plantType\">Type : ${plant.plantType}</h3></div>`;
            html += `<div class="col-5"><img src="${plant.plantPic}" class=\"rounded\" style="margin-left:20px; width: 350px; height: 300px; object-fit: cover;"></div>`;
            html += `<h5 class="col-12" style="margin-top: 30px;" id=\"plantDesc\">${plant.plantDescription}</h5>`;

            plantInfo.innerHTML = html;   
        }
    })
}

function editPlantPage(){
    let savePlantChanges = document.getElementById("savePlantChanges");
    if (savePlantChanges.style.opacity === '0'){
        savePlantChanges.style.opacity = 1;}
    else{
        savePlantChanges.style.opacity = 0;}

    document.getElementById("plantName").contentEditable = true;
    document.getElementById("plantSpeciesName").contentEditable = true;
    document.getElementById("plantDiffLevel").contentEditable = true;
    document.getElementById("plantType").contentEditable = true;
    document.getElementById("plantDesc").contentEditable = true;
}

function savePlantChanges(){
    let savePlantChanges = document.getElementById("savePlantChanges");
    savePlantChanges.style.opacity = 0;

    var plant = {
        PlantId : parseInt(sessionStorage.getItem("currPlantId")),
        PlantName : document.getElementById("plantName").innerText,
        PlantSpeciesName : document.getElementById("plantSpeciesName").innerText,
        PlantDifficultyLevel : parseInt(document.getElementById("plantDiffLevel").innerText),
        PlantDescription : document.getElementById("plantDesc").innerText,
        PlantType : document.getElementById("plantType").innerText
    }

    putPlant(plant, plant.PlantId);

    document.getElementById("plantName").contentEditable = false;
    document.getElementById("plantSpeciesName").contentEditable = false;
    document.getElementById("plantDiffLevel").contentEditable = false;
    document.getElementById("plantType").contentEditable = false;
    document.getElementById("plantDesc").contentEditable = false;

}

function deletePlantPage(){
    console.log("Here");
    var plant = {
        PlantId : parseInt(sessionStorage.getItem("currPlantId"))
    }

    deletePlant(plant);
}



function displayForum(json){

    var forum = document.getElementById("forum");
    var html = ``;
    json.forEach(post => {
        html += `<div class="border border-dark rounded" id="forumPost">
                        <div class="row">
                            <div class="col-3" id="forumPostText">
                                <div>${post.postAccountId}</div>
                                <div>${post.postTimeStamp}</div>
                                <a href="forumPost.html?${post.postId}">Look At Post Here</a>
                            </div>
                            <div class="col-8" id="forumPostText"><b>${post.postSubject}</b>&nbsp;&nbsp;&nbsp;${post.postText}</div>
                        </div>
                    </div>`
    });
    
    forum.innerHTML = html;
}

// function displayForumPost(json, clickedId){
//     json.forEach(plant => {
//         if(plant.plantId == clickedId){ 
//             var plantInfo = document.getElementById("plantInfo");
//             // var html = `<div class="col-12" style="margin-left: 100px;">
//             //             <button type="button" class="btn btn-info">Info</button>
//             //             </div>`;
//             var html = `<div class = \"col-7\" >`;
//             html += `<h1 style=\"font-size: 70px; margin-bottom: 15px;\" id=\"plantName\">${plant.plantName}</h1>`;
//             html += `<h2 style=\"margin-bottom: 20px;\" id=\"plantSpeciesName\">Species Name : ${plant.plantSpeciesName}</h2>`;
//             html += `<h3 id=\"plantDiffLevel\">Difficuly : ${plant.plantDifficultyLevel}</h3>`;
//             html += `<h3 id=\"plantType\">Type : ${plant.plantType}</h3></div>`;
//             html += `<div class="col-5"><img src="${plant.plantPic}" class=\"rounded\" style="margin-left:20px; width: 350px; height: 300px; object-fit: cover;"></div>`;
//             html += `<h5 class="col-12" style="margin-top: 30px;" id=\"plantDesc\">${plant.plantDescription}</h5>`;

//             plantInfo.innerHTML = html;   
//         }
//     })
// }

function handleSignInSubmit() {
    attemptSignIn(document.getElementById("username").value, document.getElementById("password").value);
}

function handleSignUpSubmit() {

    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var confirmPass = document.getElementById("confirmPassword").value;
    var adminPass = document.getElementById("adminPass").value;

    var account;

    if (sessionStorage.getItem("attemptAdmin") != "y") {
        if (user != "" && pass != "" && confirmPass != "" && pass == confirmPass) {
            account = {
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
    else if (sessionStorage.getItem("attemptAdmin") == "y" && adminPass == "annetheamazing") {
        if (user != "" && pass != "" && confirmPass != "" && pass == confirmPass) {
            account = {
                AccountUsername : user,
                AccountFName : "N/A",
                AccountLName : "N/A",
                AccountPassword : pass,
                AccountAdminStatus : 1,
                AccountBio : "N/A",
                AccountProfilePic : "N/A",
                AccountCreatedSessionId : 0
            }
        postAccount(account);
        }
        else if (user == "") {alert("Username must not be empty. Please enter a username.");}
        else if (pass == "") {alert("Password must not be empty. Please enter a password.");}
        else if (confirmPass == "") {alert("Please confirm your password.");}
        else {alert("Passwords do not match. Please try again.");}
    }
    else if (adminPass != "annetheamazing") {
        alert("Incorrect admin password. Please try again.")
    }
}

function handleSignUpAsAdmin() {
    var adminPassBox = document.getElementById("adminPassBox");
    // console.log(signIn.innerHTML);

    var html = `        
            <div class="col-6">
            <label for="password">Admin Password</label>
            <input type="password" class="form-control" id="adminPass" placeholder="Admin Password">
        `
    adminPassBox.innerHTML += html;

    var adminButton = document.getElementById("attemptAdmin");
    adminButton.innerHTML = "";

    sessionStorage.setItem("attemptAdmin", "y");
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
            if (account.accountUsername==user) {
                    alert("Successfully signed in! Welcome, " + account.accountUsername);
                    var account = {
                        AccountId : account.accountId.toString(),
                        AccountUsername : account.accountUsername,
                        AccountFName : account.accountFName,
                        AccountLName : account.accountLName,
                        AccountAdminStatus : account.accountAdminStatus,
                        AccountBio : account.accountBio,
                        AccountProfilePic : account.accountProfilePic,
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
    sessionStorage.setItem("accFName", account.AccountFName);
    sessionStorage.setItem("accLName", account.AccountLName);
    sessionStorage.setItem("accAdmStatus", account.AccountAdminStatus);
    sessionStorage.setItem("accBio", account.AccountBio);
    sessionStorage.setItem("accPFP", account.AccountProfilePic);
    sessionStorage.setItem("accSeshID", account.AccountCreatedSessionId);
}

function makePlant(){
    
    var plantName = document.getElementById("plantName").value;
    var speciesName = document.getElementById("speciesName").value;
    var typeOfPlant = document.getElementById("typeOfPlant").value;
    var difficulty = document.getElementById("difficultyLevel").value;
    var picLink = document.getElementById("pictureLink").value;
    var description = document.getElementById("description").value;

    if (plantName != "" && speciesName != "" && typeOfPlant != "" && difficulty != "" && picLink != "" && description != "") {
        var plant = {
            PlantName : plantName,
            PlantSpeciesName : speciesName,
            PlantType : typeOfPlant,
            PlantDifficultyLevel : parseInt(difficulty),
            PlantPic : picLink,
            PlantDescription : description,
            PlantViews : 1,
            CreatedByAccountID : parseInt(sessionStorage.getItem("accId"))
        
        }
        postPlant(plant);
    }
    else if (plantName == "") {alert("Name must not be empty. Please enter a plant name.");}
    else if (speciesName == "") {alert("Species name must not be empty. Please enter a species name.");}
    else if (typeOfPlant == "") {alert("Plant type must not be empty. Please enter a plant type.");}
    else if (difficulty == "") {alert("Difficulty must not be empty. Please enter a difficulty.");}
    else if (picLink == "") {alert("Picture link must not be empty. Please enter a link.");}
    else if (description == "") {alert("Description must not be empty. Please enter a description.");}
    

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


function postPlantcomment(pcomment) {
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


function postPlant(plant) {
        fetch(plantAPI, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(plant)
        }).then((response)=>{
            alert("Successfully added " + plant.PlantName);
            window.location.href = plantsUrl;
        })
    }

function postSession(session) {
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


function putAccount(account, id) {
    const url = accountAPI + "/" + id;
    
        fetch(url, {
            method: "PUT",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(account)
        }).then((response)=>{
            console.log("Successfully changed!");
        })
}

function putPlant(plant, id) {
    const url = plantAPI + "/" + id;
    
        fetch(url, {
            method: "PUT",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(plant)
        }).then((response)=>{
            console.log("Successfully changed!");
        })
}

function putFPost(fpost, id) {
    const url = forumPostAPI + "/" + id;
    
        fetch(url, {
            method: "PUT",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(fpost)
        }).then((response)=>{
            console.log("Successfully changed!");
        })
}

function putFComment(fcomment, id) {
    const url = forumComAPI + "/" + id;
    
        fetch(url, {
            method: "PUT",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(fcomment)
        }).then((response)=>{
            console.log("Successfully changed!");
        })
}

function putPlantComment(pcomment, id) {
    const url = plantComAPI + "/" + id;
    
        fetch(url, {
            method: "PUT",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(pcomment)
        }).then((response)=>{
            console.log("Successfully changed!");
        })
}

function putSession(session, id) {
    const url = sessionAPI + "/" + id;
    
        fetch(url, {
            method: "PUT",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(session)
        }).then((response)=>{
            console.log("Successfully changed!");
        })
}

function deletePlant(plant) {
    const url = plantAPI;
    console.log("Made it here");
    
        fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": url
            },
            body: JSON.stringify(plant)
        }).then((response)=>{
            console.log("Successfully deleted!");
        })
}