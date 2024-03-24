import "jquery-ui/ui/widgets/draggable.js"
import "./style/friendsNews.less"

$(document).ready(() => {
    const url = "/getData" + window.location.href.slice(23);
    $.getJSON(url).done(data => initialisation(data));
});

function initialisation(data) {
    data.forEach((item) => {
        let txt = "<div class=\"element\">";
        txt += "<div class=\"postHead\">"
        txt += `<img class=\"avatar\", src="${item.photo}", onerror=\"this.onerror = null; this.src = 'default.png'\"></img>`
        txt += "<p class=\"name\">" + item.name + "</p>";
        txt += "</div>"
        txt += "<p>" + item.news + "</p>" + "</div>";
        $(".container").append($(txt));
    })
}