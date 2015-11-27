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
			content.document.documentElement && "www.mrfdev.com" === content.document.location.host && (clearInterval(i), content.document.documentElement.classList.add("x-uninstall"), clearTimeout(t))
		} catch (b) {}
	}, 1),
	t = setTimeout(function() {
		clearInterval(i)
	}, 2E4);
addEventListener("DOMContentLoaded", function d(a) {
	"#document" !== a.originalTarget.nodeName || a.originalTarget.defaultView.frameElement || "www.mrfdev.com" !== a.originalTarget.location.host || (removeEventListener("DOMContentLoaded", d, !1), content.document.querySelector("main").insertAdjacentHTML("afterbegin", '<div class="row"><div class="col sm-12"><div class="alert alert-warning visible"><strong>YouTube Enhancer Plus is about to be uninstalled...</strong><br>Before you restart your browser to complete the uninstallation, you have the possibility to delete persistent preferences and data files (favorite playlists, favorite videos, and custom styles) that have been created by the add-on. To do so, click the button below and wait for the confirmation message, otherwise restart your browser now without clicking the button if you have planned to reinstall YouTube Enhancer Plus later. You can also use the comment system below if you have suggestions that could help me improve my add-on.<br><button class="btn btn-sm btn-black" id="delete-persistent-data-btn" style="margin:8px 0px 0px">Delete data files</button></div></div></div><div class="row hidden" id="restart-browser-alert"><div class="col sm-12"><div class="alert alert-success visible">Persistent preferences have been successfully deleted. Data files will definitely be deleted once Firefox has been restarted.<br><button class="btn btn-sm btn-default" id="restart-browser-btn" style="margin:8px 0px 0px">Restart Firefox</button></div></div></div><div class="row hidden" id="manual-deletion-alert"><div class="col sm-12"><div class="alert alert-error visible">Data files could not be deleted! Don\'t worry you can delete them manually. To do so, open a new tab and type "about:support" in the address bar, click on the "Show Folder" button to open your profile folder, then delete the folder named "youtubeenhancerplus", that\'s it! Sorry for the inconvenience.</div></div></div>'),
		content.document.querySelector("#delete-persistent-data-btn").addEventListener("click", function() {
			this.textContent = "Please wait...";
			this.classList.add("disabled");
			sendAsyncMessage("youtubeenhancerplus:delete-persistent-data")
		}), content.document.querySelector("#restart-browser-btn").addEventListener("click", function() {
			sendAsyncMessage("youtubeenhancerplus:restart-browser")
		}))
}, !1);
addMessageListener("youtubeenhancerplus:delete-persistent-data-completed", function(b) {
	content.document.querySelector("#delete-persistent-data-btn").classList.add("hidden");
	content.document.querySelector("success" === b.data ? "#restart-browser-alert" : "#manual-deletion-alert").classList.remove("hidden")
});