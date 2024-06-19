import "./style/theUser.less"
import "jquery-ui/themes/base/all.css"
import "jquery-ui/ui/widgets/dialog.js"
import "jquery-ui/ui/widgets/checkboxradio.js"

$(document).ready(() => {
    const url = "/getData" + window.location.href.slice(23);
    $.getJSON(url).done(data => initialisation(data));
});

function initialisation(data) {
    $("img").attr("src", data.photo);
    $("p.name").text(data.name);
    $("p.bday").text(data.birthday);
    $("p.email").text(data.email);
    $("p.role").text(data.role);
    $("p.status").text(data.status);
    $(".tofriends").attr("href", window.location.href.replace(/theUser/, "friends"));
    $(".tofriends").text("Друзья " + data.friends.length);
    $(".newsfriends").attr("href", window.location.href.replace(/theUser/, "friendsNews"));
    $(".newsfriends").text("Новости друзей");
}


$(function () {

    $(".dialog").dialog({
        autoOpen: false,
        modal: true,
        width: 365,
        height: 430,
        /*buttons: {
            "Сохранить": function () {
                *//*let formData = new FormData(document.getElementById("formEdit"));
                for (var p of formData) {
                    console.log(p);
                }
                var object = {};
                formData.forEach((value, key) => object[key] = value);
                var json = JSON.stringify(object);
                console.log(json)

                $.ajax({
                    url: window.location.href,
                    type: "POST",
                    data: json,
                    datatype: "json",
                    processData: false,
                    contentType: false,
                    error: function (XMLHttpRequest, textStatus, error) {
                        alert("Error while request" + error)
                    },
                })*//*
                $("form").submit();
                $(this).dialog("close");
                location.reload(true);
            }
        }*/
    })

    $("#edit").on("click", ()=> {
        $(".dialog").dialog("open");
    })

    $("#submit").on("click", () => {
        $(".dialog").dialog("close");
    })

    $("input[type=radio]").checkboxradio();
    $("input[type=checkbox]").checkboxradio();
})

//	button(type = 'submit', id = 'submit') Сохранить

//$(this).find("form").submit()