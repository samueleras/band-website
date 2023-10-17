"use strict";

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "text/html",
    });

    let path = './frontend/';
    switch (req.url) {

        //HOME SEITE
        case '/':                                       //HTML
            path += 'homeView/home.html';
            //TODO
            /* if(notLoggedIn){
                res.setHeader('Location', 'login');
                res.end();
            } */
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

//TODO
//Read login file from app.js
//Where to redirect to login of not logged in? From frontend or backend? Form sends directly to backend? Or form submit event is interupted and frontend sends data to backend with post, backend answers, frontend redirects, or backend redirects if correct. Probably backend...
//Frontend checks with local storage if user is logged in, validates it with backend, otherwise backend redirects to login page if local storage userid doesnt exist in database (bzw file)
