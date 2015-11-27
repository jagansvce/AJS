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
			content.document.documentElement && "www.mrfdev.com" === content.document.location.host && (clearInterval(i), content.document.documentElement.classList.add("x-upgrade"), clearTimeout(t))
		} catch (b) {}
	}, 1),
	t = setTimeout(function() {
		clearInterval(i)
	}, 2E4);
addEventListener("DOMContentLoaded", function d(a) {
	"#document" !== a.originalTarget.nodeName || a.originalTarget.defaultView.frameElement || "www.mrfdev.com" !== a.originalTarget.location.host || (removeEventListener("DOMContentLoaded", d, !1), content.document.querySelector("main").insertAdjacentHTML("afterbegin", '<div class="row"><div class="col sm-12"><div class="alert alert-info visible"><strong>YouTube Enhancer Plus has been updated... You will enjoy it more than ever!</strong><br>Firefox Electrolysis support, new user interface, new features, new sidebar, new website, new icon, huge performance and security improvements, and all bugs fixed! If you like this new version and want to leave your feedback, use the comment system below, I would love to read it! If you don\'t already know who\'s behind YouTube Enhancer Plus, visit the homepage and check my other add-ons via the menu above. Now press "Ctrl + Shift + Y" on your keyboard to test the new sidebar, or go on YouTube to enjoy the new UI! Have fun!</div></div></div>'))
}, !1);