"use strict";function initialisation(e){e.forEach(function(e){var i='<div class="element">',i=(i=(i=(i=(i+='<img class="avatar", src="'.concat(e.photo,'", onerror="this.onerror = null; this.src = \'default.png\'"></img>'))+'<div class="blockInfo">'+('<p class="name">'+e.name+"</p>"))+("<p>"+e.email+"</p>"))+('<p class="role">'+e.role+"</p>"))+("<p>"+e.status+"</p></div>")+"</div>";$(".container").append($(i)),$(".element").last().on("click",function(){window.location.replace("/?type=theUser&id=".concat(e.id))})})}require("jquery-ui/ui/widgets/draggable.js"),require("./style/users.less"),$(document).ready(function(){var e="/getData"+window.location.href.slice(23);$.getJSON(e).done(function(e){return initialisation(e)})});