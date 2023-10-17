"use strict";

const http = require('http');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "text/html",
    });

    let path = './frontend/';
    switch (req.url) {

        //HOME SEITE
        case '/':                                       //HTML
            path += 'homeView/home.html';
            break;
        case '/style':                                  //CSS
            res.writeHead(200, {
                "Content-Type": "text/css",
            });
            path += 'homeView/homeStyle.css';
            break;
        case '/bandScript':                             //FrontendJS
            res.writeHead(200, {
                "Content-Type": "text/javascript",
            });
            path += 'homeView/bandScript.js';
            break;
        case '/images/chicago':                         //Images
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
            });
            path += 'homeView/images/chicago.jpg';
            break;
        case '/images/ny':
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
            });
            path += 'homeView/images/ny.jpg';
            break;
        case '/images/la':
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
            });
            path += 'homeView/images/la.jpg';
            break;
        case '/images/bandmember':
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
            });
            path += 'homeView/images/bandmember.jpg';
            break;
        case '/images/ny1':
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
            });
            path += 'homeView/images/ny1.jpg';
            break;
        case '/images/paris1':
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
            });
            path += 'homeView/images/paris1.jpg';
            break;
        case '/images/sf1':
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
            });
            path += 'homeView/images/sf1.jpg';
            break;
        case '/images/map':
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
            });
            path += 'homeView/images/map.jpg';
            break;

        //LOGIN SEITE
        case '/login':
            path += 'loginView/login.html';
            break;
        case '/login/style':
            res.writeHead(200, {
                "Content-Type": "text/css",
            });
            path += 'loginView/loginStyle.css';
            break;
        case '/login/loginScript':
            res.writeHead(200, {
                "Content-Type": "text/javascript",
            });
            path += 'loginView/loginScript.js';
            break;

        //Check if login credentials are valid or if the sessionId of a running session is valid
        case '/login/checkLogin':
            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            req.on('data', (postData) => {
                postData = JSON.parse(postData);

                try {
                    let text = readFile("login.txt");
                    let data = "";

                    if (typeof postData.user !== 'undefined') {
                        if (checkCredentials(text, postData)) {
                            let id = uuid();
                            data = JSON.stringify({ "id": id, "login": "true" });
                            fs.appendFile('./uuids.txt', `${id}\n`, (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("uuid written into file");
                                }
                            });
                        } else {
                            data = JSON.stringify({ "login": "false" });
                        }
                    } else if (typeof postData.session !== 'undefined') {
                        if (checkSession(postData)) {
                            data = JSON.stringify({ "login": "true" });
                        } else {
                            data = JSON.stringify({ "login": "false" });
                        };
                    }

                    res.end(data);
                } catch (err) {
                    console.log(err);
                }
            });
            return;

        //Check if username is available for registration
        case '/login/checkUsername':
            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            req.on('data', (postData) => {
                postData = JSON.parse(postData);

                try {
                    let text = readFile("login.txt");
                    let data = "";

                    const rowData = text.split('\n');

                    for (let row = 1; row < rowData.length; row++) {

                        const rowColData = rowData[row].split(',');

                        if (rowColData[0].trim() == postData.username) {
                            data = JSON.stringify({ "user": "false" });
                            res.end(data);
                            console.log("Username vergeben!");
                            return;
                        }
                    }
                    data = JSON.stringify({ "user": "true" });
                    res.end(data);
                    console.log("Username frei!");

                } catch (err) {
                    console.log(err);
                }
            });
            return;

        //Create User with valid Signup Credentials
        case '/login/createUser':

            req.on('data', (postData) => {
                postData = JSON.parse(postData);

                fs.appendFile('./login.txt', `${postData.username},${postData.password}\n`, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`New user ${postData.username} created and saved to file`);
                    }
                });
            });

            res.end();
            return;

        //404 SEITE
        default:
            path += '404View/404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log("Listening for requests on port 3000")
});

const readFile = (path) => {
    try {
        return fs.readFileSync(path, 'utf8');
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const checkCredentials = (text, postData) => {
    const rowData = text.split('\n');

    for (let row = 1; row < rowData.length; row++) {

        const rowColData = rowData[row].split(',');

        if (rowColData[0].trim() == postData.user && rowColData[1].trim() == postData.password) {
            console.log("login successfull");
            return true;
        }

    }
    console.log("login failed");
    return false;
}

const checkSession = (postData) => {

    const ids = readFile("./uuids.txt");
    const rowData = ids.split('\n');

    for (let row = 0; row < rowData.length; row++) {
        if (rowData[row] == postData.session) {
            return true;
        }
    }
    return false;
}