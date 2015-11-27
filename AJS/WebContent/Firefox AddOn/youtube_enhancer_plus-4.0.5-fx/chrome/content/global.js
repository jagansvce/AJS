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
var s = {
	youtube: !1,
	mrfdev: !1,
	options: !1
};
addEventListener("DOMContentLoaded", function(a) {
	if ("#document" !== a.originalTarget.nodeName || a.originalTarget.defaultView.frameElement)
		return;
	if ("www.youtube.com" === a.originalTarget.location.host && !s.youtube) {
		s.youtube = !0;
		sendAsyncMessage("youtubeenhancerplus:load-frame-script", "youtube.js")
	}
	else if ("www.mrfdev.com" === a.originalTarget.location.host) {
		if (0 < a.originalTarget.location.href.indexOf("/youtube-enhancer-plus-sidebar"))
			return;
		if (!s.mrfdev) {
			s.mrfdev = !0;
			sendAsyncMessage("youtubeenhancerplus:load-frame-script", "mrfdev.js")
		}
		if (0 < a.originalTarget.location.href.indexOf("/youtube-enhancer-plus-options") && !s.options) {
			s.options = !0;
			sendAsyncMessage("youtubeenhancerplus:load-frame-script", "options.js")
		}
	}
}, !1);