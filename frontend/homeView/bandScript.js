
//Redirect to Login if no Session
( async () => {

    const sessionId = sessionStorage.getItem('sessionId');
    
    //Hier check if session Id auch wirklich stimmt, call an browser -> Check Session
        if(sessionId == null){
            location.href = '/login';
            return;
        }

        let response = await fetch('/login/checkLogin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "session": sessionId })
        })
    
        response = await response.json();
        
        if(response.login == "false"){
            location.href = '/login';
        }
    
    })();



let x = 0;
(function changeHeaderImage() {
    x++;
    if (x == 4) {
        x = 1;
    }
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`headerIMG${i}`).style.display = 'none';
    }
    document.getElementById(`headerIMG${x}`).style.display = 'inline';
    setTimeout(changeHeaderImage, 2000); 

})();

const menuButton = document.querySelector(".menu-button");
const xButton = document.querySelector(".x-button");
const searchButton = document.querySelector(".search-button");
const flexContainerNav = document.querySelector(".flexcontainer-navbar");

menuButton.addEventListener("click", toggleMenu);
xButton.addEventListener("click", toggleMenu);
window.addEventListener("resize", resetMenu);
searchButton.addEventListener("click", () => alert("Feature not available"));

function toggleMenu() {

    const visibility = flexContainerNav.getAttribute('data-visible');

    if(visibility === "false"){
        flexContainerNav.setAttribute("data-visible", true)
        menuButton.style.display = 'none';
        xButton.style.display = 'flex';
    } else {
        flexContainerNav.setAttribute("data-visible", false)
        menuButton.style.display = 'flex';
        xButton.style.display = 'none';
    }
}

function resetMenu() {
    flexContainerNav.setAttribute("data-visible", false)
    menuButton.style.display = '';
    xButton.style.display = '';
  };
  


