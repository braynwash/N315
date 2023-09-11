var loggedInOut = false;
var homeContent = `<h1>Home Page</h1>`;
var aboutContent = `<h1>About Page</h1>`;
var servicesContent = `<h1>Services Page</h1>`;
var contactContent = `<h1>Contact Page</h1>`;

export function addPageContent(pageName) {
    let pageContentName = pageName + "Content";
    $("#app").html(eval(pageContentName));
}

export function setLoggedInOut() {
    if (loggedInOut == true) {
        loggedInOut = false;
        $("nav .log span").html("Log In");
    } else {
        loggedInOut = true;
        $("nav .log span").html("Log Out");
    }
}

export function getLoggedInOut() {
    return loggedIn;
}

