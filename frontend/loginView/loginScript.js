"use strict";

//Get Formulars
const formlogin = document.querySelector('#formlogin');
const formsignup = document.querySelector('#formsignup');


//TOGGLE BETWEEN LOGIN AND SIGNUP
const switchLoginSignup = document.querySelector('#switchLoginSignup');

switchLoginSignup.addEventListener("click", toggleLoginSignup);

function toggleLoginSignup() {

    const loginvisibility = formlogin.getAttribute('data-visible');

    if (loginvisibility === "false") {
        formlogin.setAttribute("data-visible", true);
        formsignup.setAttribute("data-visible", false);
        switchLoginSignup.innerHTML = "Sign Up";
    } else {
        formlogin.setAttribute("data-visible", false)
        formsignup.setAttribute("data-visible", true);
        switchLoginSignup.innerHTML = "Login";
    }
}



//------------------------//
//---------SIGNUP---------//
//------------------------//
const newuser = document.querySelector('#newuser');
const newpassword = document.querySelector('#newpassword');
const newpassword2 = document.querySelector('#newpassword2');
let newusernameValue = "";
let newpasswordValue = "";
let newpasswordValue2 = "";

formsignup.addEventListener("submit", async (e) => {

    e.preventDefault();



    if (await validateInputsSignUp()) {
        //Schreibe in login.csv
        location.href = '/login';
    }

});

//Prüfe INPUTS Signup
const validateInputsSignUp = async () => {

    newusernameValue = newuser.value.trim();
    newpasswordValue = newpassword.value.trim();
    newpasswordValue2 = newpassword2.value.trim();
    let state = { wrongInputs: false };

    if (newusernameValue === "") {
        formError('Username is missing', newuser);
        state = { wrongInputs: true };
    } else {
        if (await checkNameSignup()) {
            formSucess(newuser);
        } else {
            formError('Username is already taken', newuser);
            state = { wrongInputs: true };
        }
    }

    if (newpasswordValue === "") {
        formError('Password is missing', newpassword);
        state = { wrongInputs: true };
    } else if (newpasswordValue.length < 8) {
        formError('Password is too short', newpassword);
        state = { wrongInputs: true };
    }
    else {
        formSucess(newpassword);
    }

    if (newpasswordValue2 === "") {
        formError('Password is missing', newpassword2);
        state = { wrongInputs: true };
    } else if (newpasswordValue !== newpasswordValue2) {
        formError('Passwords don´t match', newpassword2);
        state = { wrongInputs: true };
    }
    else {
        formSucess(newpassword2);
    }

    return !state.wrongInputs;

}

//Prüfe Name bei Signup
async function checkNameSignup() {

    let text = await readLoginFile();

    const rowData = text.split('\n');

    for (let row = 1; row < rowData.length; row++) {

        const rowColData = rowData[row].split(',');

        if (rowColData[0].trim() == newusernameValue) {
            return false;
        }
    }

    return true;

}



//-----------------------//
//---------LOGIN---------//
//-----------------------//
const user = document.querySelector('#user');
const password = document.querySelector('#password');
let usernameValue = ""
let passwordValue = "";

//Automatischer Login durch Session
(() => {

    const sessionId = sessionStorage.getItem('sessionId');

    if (sessionId > 1000000000000000 && sessionId < 9999999999999999) {
        location.href = '/';
    }

})();


formlogin.addEventListener("submit", async (e) => {

    usernameValue = user.value.trim();
    passwordValue = password.value.trim();
    e.preventDefault();



    if (await checkLogin()) {
        let session = Math.floor(Math.random() * 9999999999999999) + 1000000000000000;
        sessionStorage.setItem('sessionId', session);
        location.href = '/';
    }

    validateInputsLogin();


});

//Prüfe INPUTS Login
const validateInputsLogin = () => {
    //Login
    if (usernameValue === "") {
        formError('Username is missing', user);
    } else {
        formSucess(user);
    }

    if (passwordValue === "") {
        formError('Password is missing', password);
    } else {
        formError('Password or Username is wrong', password);
    }
}

//Prüfe Login Credentials
async function checkLogin() {

        return true;
/*     let text = await readLoginFile();

    const rowData = text.split('\n');

    for (let row = 1; row < rowData.length; row++) {

        const rowColData = rowData[row].split(',');

        if (rowColData[0].trim() == usernameValue && rowColData[1].trim() == passwordValue) {
            console.log("login successfull");
            return true;
        }

    }
    console.log("login failed");
    return false; */

}

async function readLoginFile() {

    let datei = await fetch("login.txt");
    let text = await datei.text();

    return text;

}





//Error/Success Functions
function formError(message, element) {
    element.parentElement.classList.add("error");
    element.parentElement.classList.remove("success");
    element.parentElement.querySelector('.errormessage').innerHTML = message;
}
function formSucess(element) {
    element.parentElement.classList.add("success");
    element.parentElement.classList.remove("error");
    element.parentElement.querySelector('.errormessage').innerHTML = "";
}


