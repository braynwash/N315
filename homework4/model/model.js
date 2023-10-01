export function changePage(hashTag, pageID) {
    if (pageID == "" || pageID == "home") {
        $.get(`pages/home.html`, (data) => {
            $("#app").html(data);
        })
    } else {
        $.get(`pages/${pageID}.html`, (data) => {
            $("#app").html(data);
    })
}
}