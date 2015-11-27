/*
##
##	YouTube Enhancer Plus | Firefox Add-on
##	======================================
##
##	Author: Maxime RF <https://mrfdev.com>
##
##	This file is protected by copyright laws and international copyright
##	treaties, as well as other intellectual property laws and treaties.
##
##	All rights not expressly granted to you are retained by the author.
##	Read the license.txt file for more details.
##
##	If it's not enough clear for you Baris, you have no rights to use my work,
##	neither as-is nor modified! Improve your coding logic instead of using others work!
##
##	© MRFDev.com - All Rights Reserved
##
*/
Components.utils.import("chrome://youtubeenhancerplus/content/modules/Timer.jsm");
var i = setInterval(function() {
		try {
			content.document.documentElement && "www.mrfdev.com" === content.document.location.host && (clearInterval(i), content.document.documentElement.classList.add("x-install"), clearTimeout(t))
		} catch (b) {}
	}, 1),
	t = setTimeout(function() {
		clearInterval(i)
	}, 2E4);
addEventListener("DOMContentLoaded", function d(a) {
	"#document" !== a.originalTarget.nodeName || a.originalTarget.defaultView.frameElement || "www.mrfdev.com" !== a.originalTarget.location.host || (removeEventListener("DOMContentLoaded", d, !1), content.document.querySelector("main").insertAdjacentHTML("afterbegin", '<div class="row"><div class="col sm-12"><div class="alert alert-success visible"><strong>YouTube Enhancer Plus has been successfully installed, thank you for giving it a try!</strong><br>If you need help to figure out how it works, or if you want to leave your feedback, use the comment system below or contact me.<br>Now go on YouTube to enjoy all the features this add-on brings, open the options page to configure it, or simply press "Ctrl + Shift + Y" on your keyboard to embed YouTube in your browser! Have fun!</div></div></div>'))
}, !1);