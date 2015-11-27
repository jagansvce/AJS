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
(function() {
	function f() {
		if (content.document.querySelector("header.container-fluid.navbar-wrapper")) {
			if (0 < content.document.location.href.indexOf("/ffmpeg-command-generator")) {
				var a = content.document.querySelector("#audio"),
					b = content.document.querySelector("#audio-btn"),
					c = content.document.querySelector("#video"),
					d = content.document.querySelector("#video-btn"),
					e = content.document.querySelector("#output"),
					f = content.document.querySelector("#output-btn"),
					g = content.document.querySelector(".alert-info.visible span.hidden");
				a.parentNode.classList.add("md-9");
				b.parentNode.classList.remove("hidden");
				b.addEventListener("click", function() {
					sendAsyncMessage("youtubeenhancerplus:file-picker", {
						mode: "modeOpen",
						input: "#audio"
					})
				}, !1);
				c.parentNode.classList.add("md-9");
				d.parentNode.classList.remove("hidden");
				d.addEventListener("click", function() {
					sendAsyncMessage("youtubeenhancerplus:file-picker", {
						mode: "modeOpen",
						input: "#video"
					})
				}, !1);
				e.parentNode.classList.add("md-9");
				f.parentNode.classList.remove("hidden");
				f.addEventListener("click", function() {
					sendAsyncMessage("youtubeenhancerplus:file-picker", {
						mode: "modeSave",
						input: "#output"
					})
				}, !1)
				g && g.classList.remove("hidden");
			} else if (0 < content.document.location.href.indexOf("/youtube-enhancer-plus") || 0 < content.document.location.href.indexOf("/youtube-downloader-plus")) {
				if (a = content.document.querySelector("#audio-256")) a.dataset.dashManifestRetrieved = !0, sendAsyncMessage("youtubeenhancerplus:xmlhttprequest", {
					method: "GET",
					message: "audio-256",
					uri: a.dataset.dashManifest
				})
			}
			for (var j = content.document.querySelectorAll("header .nav li.hidden, .offcanvas-nav li.hidden"), i = j.length - 1; 0 <= i; i--) j[i].classList.remove("hidden");
		}
	}
	f();
	addMessageListener("youtubeenhancerplus:file-path", function(a) {
		content.document.querySelector(a.data.input).value = a.data.path
	});
	addMessageListener("youtubeenhancerplus:audio-256", function(a) {
		a = a.data.match(/<BaseURL.+>(http[^<]+itag=141[^<]+)<\/BaseURL>/i);
		var b = content.document.querySelector("#audio-256"),
			c = content.document.querySelectorAll("#download-links a");
		if (a && b && 0 < c.length) {
			for (var d = c[0], e = 0; e < c.length; e++)
				if (-1 !== c[e].textContent.indexOf("Audio M4A 128")) {
					d = c[e];
					break
				}
			d.parentNode.insertBefore(b, d.nextSibling);
			d.parentNode.insertBefore(content.document.createElement("br"), b);
			b.href = a[1].replace(/&amp;/g, "&");
			b.classList.remove("hidden")
		}
	});
	addEventListener("DOMContentLoaded", function(a) {
		"#document" === a.originalTarget.nodeName && (a.originalTarget.defaultView.frameElement || "www.mrfdev.com" === a.originalTarget.location.host && f())
	}, !1)
})();