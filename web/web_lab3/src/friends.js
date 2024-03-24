import "jquery-ui/ui/widgets/draggable.js"
import "./style/friends.less"

$(document).ready(() => {
    const url = "/getData" + window.location.href.slice(23);
    $.getJSON(url).done(data => initialisation(data));
});

function initialisation(data) {
    data.forEach((item) => {
        let txt = "<div class=\"element\">";
        txt += `<img class=\"avatar\", src="${item.photo}", onerror=\"this.onerror = null; this.src = 'default.png'\"></img>`
        txt += "<div class=\"blockInfo\">"
        txt += "<p class=\"name\">" + item.name + "</p>";
        txt += "<p>" + item.email + "</p>";
        txt += "<p class=\"role\">" + item.role + "</p>";
        txt += "<p>" + item.status + "</p>" + "</div>";
        txt += "</div>";
        $(".container").append($(txt));
        $(".element").last().on("click", () => {
            window.location.replace(`/?type=theUser&id=${item.id}`)
        })
    })
}