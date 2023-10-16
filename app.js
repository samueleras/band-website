"use strict";

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'home.html';
            res.statusCode = 200;
            //TODO
            /* if(notLoggedIn){
                res.setHeader('Location', 'login');
                res.end();
            } */
            break;
        case '/login':
            path += 'login.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            /* res.write(data); */
            res.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log("Listening for requests on port 3000")
});

//TODO
//How to send images and css and frontend js files to browser... possible to not send them individually
//Read login file from app.js
//Where to redirect to login of not logged in? From frontend or backend? Form sends directly to backend? Or form submit event is interupted and frontend sends data to backend with post, backend answers, frontend redirects, or backend redirects if correct. Probably backend...
//Frontend checks with local storage if user is logged in, validates it with backend, otherwise backend redirects to login page if local storage userid doesnt exist in database (bzw file)
