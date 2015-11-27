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
Components.utils.import("resource://gre/modules/osfile.jsm");
var YouTubeEnhancerPlusSidebar = {
	ready: !1,
	decoder: null,
	prefs: {},
	prefsBranch: null,
	strings: null,
	mainWindow: null,
	sidebar: null,
	iframe: null,
	contentWindow: null,
	youtubeSearchIframe: null,
	youtubeDownloadIframe: null,
	playlists: null,
	videos: null,
	spinner: null,
	results: null,
	process: null,
	a: function() {
		var a = this;
		this.prefsBranch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.youtubeenhancerplus.");
		this.prefs.removeads = this.prefsBranch.getBoolPref("removeads");
		this.prefs.selectquality = this.prefsBranch.getBoolPref("selectquality");
		this.prefs.sidebarqualities = this.prefsBranch.getCharPref("sidebarqualities");
		this.prefs.sidebartopcountry = this.prefsBranch.getCharPref("sidebartopcountry");
		this.sidebar = document.querySelector("#youtube-enhancer-plus-sidebar");
		this.iframe = document.querySelector("#youtube-enhancer-plus-iframe");
		this.contentWindow = this.iframe.contentWindow;
		this.youtubeSearchIframe = document.querySelector("#youtube-enhancer-plus-youtube-search-iframe");
		this.youtubeDownloadIframe = document.querySelector("#youtube-enhancer-plus-youtube-download-iframe");
		this.strings = document.querySelector("#youtube-enhancer-plus-sidebar-strings");
		this.iframe.addEventListener("DOMContentLoaded", function b(e) {
			if (e.originalTarget.defaultView.frameElement && 0 < e.originalTarget.location.href.indexOf("www.youtube.com/embed")) {
				this.removeEventListener("DOMContentLoaded", b, !1);
				e = e.originalTarget.defaultView.frameElement.contentWindow;
				var d = e.document.createElement("style");
				d.type = "text/css";
				d.textContent = ".html5-progress-bar.white .ytp-play-progress,.ytp-volume-slider-foreground:before{background-color:#00a8e6}";
				e.document.head.appendChild(d);
				!e.document.body.classList.contains("exp-watch-controls-overlay") && e.document.querySelector(".html5-play-progress") || a.contentWindow.document.querySelector("#video-container").classList.add("new-player")
			} else document.querySelector("#youtube-enhancer-plus-spinner").setAttribute("hidden", "true"), a.iframe.removeAttribute("hidden"), a.spinner = a.contentWindow.document.querySelector(".spinner"), a.results = a.contentWindow.document.querySelector("#results"), a.process = a.contentWindow.document.querySelector("#process"), null !== a.process && (a.b(), a.h(), a.j("playlists"), a.j("videos"), a.k("top-music"), a.d(), a.e(), a.ready = !0)
		}, !1);
		this.iframe.setAttribute("src", "https://www.mrfdev.com/youtube-enhancer-plus-sidebar?hl=" + this.strings.getString("locale_code") + (this.prefsBranch.getPrefType("version") ? "&v=" + this.prefsBranch.getCharPref("version") : ""));
		this.youtubeSearchIframe.addEventListener("DOMContentLoaded", function(b) {
			if (!b.originalTarget.defaultView.frameElement && "www.youtube.com" === b.originalTarget.location.host) {
				b = 0;
				var e = this.contentWindow.document.querySelector(".filter-top .num-results"),
					d = this.contentWindow.document.querySelectorAll("#results .item-section > li"),
					f = this.contentWindow.document.querySelectorAll(".search-pager > a"),
					h = this.getAttribute("src").match(/filters=(\w+)&?/)[1];
				for (e && a.results.insertAdjacentHTML("afterbegin", '<div class="yt-total">' + e.textContent.trim().replace(/[&"<>]/g, "") + "</div>"); b < d.length; b++) try {
					var g = d[b].querySelector(".yt-thumb img"),
						k = d[b].querySelector(".video-time"),
						l = d[b].querySelector(".watched-badge"),
						m = d[b].querySelector(".formatted-video-count-label"),
						n = d[b].querySelector(".yt-lockup-title a"),
						p = d[b].querySelector(".yt-lockup-byline").textContent.trim(),
						q = d[b].querySelector(".yt-lockup-byline a").textContent.trim(),
						r = d[b].querySelector(".yt-lockup-byline a").href,
						t = d[b].querySelector(".yt-lockup-meta-info li:first-child"),
						u = d[b].querySelector(".yt-lockup-meta-info li:nth-child(2)"),
						v = d[b].querySelector(".yt-lockup-description");
					a.results.insertAdjacentHTML("beforeend", '<div class="row"><div class="col sm-3' + (l ? " watched" : "") + '"><img class="img-responsive img-smart-load" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-src="' + ("undefined" !== typeof g.dataset.thumb ? g.dataset.thumb : g.src).replace(/[&"<>]/g, "") + '" alt="">' + (k ? '<span class="yt-time hidden">' + k.textContent.trim().replace(/[&"<>]/g, "") + "</span>" : "") + (l ? '<span class="yt-watched">' + l.textContent.trim().replace(/[&"<>]/g, "") + "</span>" : "") + (m ? '<div class="yt-sidebar"><span class="yt-videos-count">' + m.textContent.trim().replace(/[&"<>]/g, "") + "</span></div>" : "") + '</div><div class="col sm-9' + ("movie" === h ? " yt-movie" : "") + '"><a class="yt-title" href="javascript:void(0)" data-item-id="' + n.href.match(new RegExp("(?:[\\?|&]+)" + ("playlist" === h ? "list" : "v") + "=([\\w_-]+)&?"))[1] + '" data-item-type="' + h.replace(/[&"<>]/g, "") + '">' + n.textContent.trim().replace(/[&"<>]/g, function(a) {
						return {
							"&": "&amp;",
							'"': "&quot;",
							"<": "&lt;",
							">": "&gt;"
						}[a]
					}) + '</a><span class="yt-byline">' + (/^https:\/\/www\.youtube\.com\/(user|channel)\/[a-zA-Z0-9_-]+/.test(r) ? p.replace(q, '<a class="newtab" href="' + r.replace(/["<>]/g, "") + '">' + q.replace(/[&"<>]/g, function(a) {
						return {
							"&": "&amp;",
							'"': "&quot;",
							"<": "&lt;",
							">": "&gt;"
						}[a]
					}) + "</a>") : p.replace(/[&"<>]/g, function(a) {
						return {
							"&": "&amp;",
							'"': "&quot;",
							"<": "&lt;",
							">": "&gt;"
						}[a]
					})) + "</span>" + ("playlist" !== h ? '<ul class="yt-meta">' + (t ? '<li class="yt-meta-date">' + t.textContent.trim().replace(/[&"<>]/g, "") + "</li> " : "") + (u ? '<li class="yt-meta-views">' + u.textContent.trim().replace(/[&"<>]/g, "") + "</li>" : "") + "</ul>" : "") + (v ? '<div class="yt-description">' + v.textContent.trim().replace(/[&"<>]/g, function(a) {
						return {
							"&": "&amp;",
							'"': "&quot;",
							"<": "&lt;",
							">": "&gt;"
						}[a]
					}) + "</div>" : "") + "</div></div>")
				} catch (w) {}
				if (0 < f.length) {
					g = "";
					for (b = 0; b < f.length; b++) g += '<a class="btn btn-sm btn-default' + (f[b].classList.contains("yt-uix-button-toggled") ? " active" : "") + '" href="javascript:void(0)" data-uri="' + f[b].href.replace(/["<>]/g, "").replace(/&amp;/g, "&").replace(/%20/g, "+") + '">' + f[b].textContent.replace(/[&"<>]/g, "") + "</a> ";
					a.results.insertAdjacentHTML("beforeend", '<div class="yt-pager" role="navigation">' + g + "</div>")
				}
				f = a.contentWindow.document.querySelectorAll("#results a.yt-title");
				for (b = 0; b < f.length; b++) f[b].addEventListener("click", function() {
					"video" === this.dataset.itemType || "movie" === this.dataset.itemType ? (a.c("watch|video|" + this.dataset.itemId + "|0"), a.process.dataset.videoId = this.dataset.itemId, a.process.dataset.videoTitle = this.textContent) : (a.c("watch|playlist|" + this.dataset.itemId + "|0"), a.process.dataset.playlistTitle = this.textContent)
				});
				f = a.contentWindow.document.querySelectorAll("#results .yt-pager a.btn");
				for (b = 0; b < f.length; b++) f[b].addEventListener("click", function() {
					a.results.classList.add("hidden");
					a.results.textContent = "";
					a.spinner.classList.remove("hidden");
					a.youtubeSearchIframe.setAttribute("src", this.dataset.uri)
				});
				a.i(a.results);
				a.spinner.classList.add("hidden");
				a.results.classList.remove("hidden");
				a.c("thumbs");
				this.setAttribute("src", "about:blank")
			}
		}, !1);
		this.youtubeDownloadIframe.addEventListener("DOMContentLoaded", function(b) {
			b.originalTarget.defaultView.frameElement || "www.youtube.com" !== b.originalTarget.location.host || (a.mainWindow.YouTubeEnhancerPlus.m({
				data: {
					ytplayer_config: "undefined" !== typeof this.contentWindow.wrappedJSObject.ytplayer && this.contentWindow.wrappedJSObject.ytplayer.config ? this.contentWindow.wrappedJSObject.ytplayer.config : {}
				}
			}), this.setAttribute("src", "about:blank"))
		}, !1)
	},
	b: function() {
		this.mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation).QueryInterface(Components.interfaces.nsIDocShellTreeItem).rootTreeItem.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIDOMWindow)
	},
	c: function(a) {
		this.contentWindow.document.querySelector("#command").value = a;
		this.process.reset()
	},
	d: function(a) {
		this.process.dataset.selectQuality = this.prefs.selectquality;
		this.process.dataset.preferredQualities = this.prefs.sidebarqualities;
		a && this.c("quality")
	},
	e: function() {
		var a = this.sidebar.clientHeight;
		this.iframe.setAttribute("style", "height:" + a + "px;");
		this.contentWindow.document.body.style.height = a - 25 + "px";
		this.contentWindow.document.querySelector("#top-music-dropdown").style.maxHeight = a - 200 + "px";
		this.contentWindow.document.querySelector("#playlists-dropdown").style.maxHeight = a - 200 + "px";
		this.contentWindow.document.querySelector("#videos-dropdown").style.maxHeight = a - 200 + "px"
	},
	f: function(a) {
		try {
			this.mainWindow.document.querySelector("#sidebar-box").width = a
		} catch (c) {}
	},
	g: function() {
		try {
			return parseInt(this.mainWindow.document.querySelector("#sidebar-box").width, 10)
		} catch (a) {}
	},
	h: function() {
		var a = this,
			c = this.contentWindow.document.querySelector("#download"),
			b = this.contentWindow.document.querySelector("#add-to-videos"),
			e = this.contentWindow.document.querySelector("#add-to-playlists"),
			d = this.contentWindow.document.createElement("img");
		d.src = "resource://youtubeenhancerplus/btn-sm-blue-spinner.gif";
		d.className = "btn-sm-spinner";
		this.contentWindow.document.querySelector("#options").addEventListener("click", function() {
			a.mainWindow.YouTubeEnhancerPlus.l()
		}, !1);
		c.appendChild(d);
		c.addEventListener("click", function() {
			if (!this.classList.contains("active")) {
				this.classList.add("active");
				var b = "https://www.youtube.com/watch?v=" + a.process.dataset.videoUrl.match(/v=([^&]+)/)[1];
				a.youtubeDownloadIframe.setAttribute("src", b)
			}
		}, !1);
		b.appendChild(d.cloneNode(!1));
		b.addEventListener("click", function() {
			if (!this.classList.contains("active")) {
				var b = a.process.dataset.videoUrl.match(/v=([^&]+)/)[1],
					c = a.strings.getFormattedString("title_undefined", [b]);
				if (0 < a.videos.indexOf(b)) a.mainWindow.YouTubeEnhancerPlus.k("info", a.strings.getString("info"), a.strings.getString("video_already_added"));
				else {
					this.classList.add("active");
					try {
						c = a.contentWindow.document.querySelector("#player").contentWindow.document.querySelector("a.html5-title-text").textContent
					} catch (e) {
						b === a.process.dataset.videoId && (c = a.process.dataset.videoTitle)
					}
					a.mainWindow.YouTubeEnhancerPlus.p({
						data: {
							list: "videos",
							action: "add",
							id: b,
							title: c
						}
					})
				}
				this.blur()
			}
		}, !1);
		e.appendChild(d.cloneNode(!1));
		e.addEventListener("click", function() {
			if (!this.classList.contains("active")) {
				var b = a.process.dataset.playlistId;
				0 < a.playlists.indexOf(b) ? a.mainWindow.YouTubeEnhancerPlus.k("info", a.strings.getString("info"), a.strings.getString("playlist_already_added")) : (this.classList.add("active"), a.mainWindow.YouTubeEnhancerPlus.p({
					data: {
						list: "playlists",
						action: "add",
						id: b,
						title: a.process.dataset.playlistTitle
					}
				}));
				this.blur()
			}
		}, !1);
		this.contentWindow.document.querySelector("#search-btn").addEventListener("click", function(b) {
			b.preventDefault();
			b = a.contentWindow.document.querySelector("#search").value.trim();
			var c = a.contentWindow.document.querySelector("#filters").value,
				c = "https://www.youtube.com/results?filters=" + encodeURIComponent(c) + "&search_query=" + encodeURIComponent(b).replace(/%20/g, "+");
			"" !== b && (a.results.classList.add("hidden"), a.results.textContent = "", a.spinner.classList.remove("hidden"), a.youtubeSearchIframe.setAttribute("src", c))
		}, !1);
		this.contentWindow.document.querySelector("#newlinks").addEventListener("reset", function() {
			a.i()
		}, !1);
		this.i();
		this.contentWindow.document.querySelector("#hide-ads").addEventListener("reset", function() {
			try {
				for (var b = a.contentWindow.document.querySelector("#player").contentWindow.document.querySelectorAll(".video-ads, .ytp-ad-progress"), c = b.length - 1; 0 <= c; c--) b[c].style.visibility = a.prefs.removeads ? "hidden" : "visible"
			} catch (e) {}
		})
	},
	i: function(a) {
		var c = this,
			b = (a || this.contentWindow.document).querySelectorAll(".extend-sidebar"),
			e = (a || this.contentWindow.document).querySelectorAll(".newtab");
		a = 0;
		if (0 < b.length)
			for (; a < b.length; a++)(function(a) {
				b[a].addEventListener("click", function() {
					try {
						450 > c.g() && c.f(450)
					} catch (a) {}
				}, !1)
			})(a);
		if (0 < e.length)
			for (a = 0; a < e.length; a++) {
				var d = e[a].getAttribute("href");
				(function(a, b) {
					e[a].addEventListener("click", function(a) {
						a.preventDefault();
						c.p(b)
					}, !1)
				})(a, d)
			}
	},
	j: function(a) {
		var c = this;
		OS.File.read(OS.Path.join(OS.Constants.Path.profileDir, "youtubeenhancerplus", "favorite-" + a + ".txt")).then(function(b) {
			null === c.decoder && (c.decoder = new TextDecoder);
			c[a] = c.decoder.decode(b);
			c.k(a)
		}, function() {
			c[a] = '{"entries":[]}';
			c.k(a)
		})
	},
	k: function(a) {
		var c = this,
			b = this.contentWindow.document.getElementById(a + "-dropdown"),
			e = this.contentWindow.document.createDocumentFragment();
		if ("top-music" === a) {
			b.textContent = "";
			for (var d in YouTubeEnhancerPlusPlaylists[this.prefs.sidebartopcountry])
				if (YouTubeEnhancerPlusPlaylists[this.prefs.sidebartopcountry].hasOwnProperty(d)) {
					var f = this.contentWindow.document.createElement("li"),
						h = this.contentWindow.document.createElement("a");
					h.href = "javascript:void(0)";
					(function(a) {
						h.addEventListener("click", function() {
							c.contentWindow.document.querySelector("#top-music").click();
							c.process.dataset.playlistTitle = YouTubeEnhancerPlusPlaylists.genres[a];
							c.c("watch|playlist|" + YouTubeEnhancerPlusPlaylists[c.prefs.sidebartopcountry][a] + "|0")
						}, !1)
					})(d);
					h.appendChild(this.contentWindow.document.createTextNode(YouTubeEnhancerPlusPlaylists.genres[d]));
					f.appendChild(h);
					e.appendChild(f)
				}
			b.appendChild(e);
			b.style.maxHeight = this.sidebar.clientHeight - 200 + "px"
		} else try {
			b.textContent = "";
			var g = JSON.parse(c[a]);
			if (0 === g.entries.length) b.insertAdjacentHTML("afterbegin", '<li><a href="javascript:void(0)">' + this.strings.getString("playlists" === a ? "no_favorite_playlist" : "no_favorite_video").replace(/[&"<>]/g, function(a) {
				return {
					"&": "&amp;",
					'"': "&quot;",
					"<": "&lt;",
					">": "&gt;"
				}[a]
			}) + "</a></li>");
			else if (0 < g.entries.length) {
				"videos" === a && 1 < g.entries.length && (f = this.contentWindow.document.createElement("li"), h = this.contentWindow.document.createElement("a"), h.href = "javascript:void(0)", h.addEventListener("click", function() {
					for (var a = [], b = 0; b < g.entries.length; b++) a.push(g.entries[b]["#"]);
					c.c("watch|videos|" + a.join())
				}, !1), h.appendChild(this.contentWindow.document.createTextNode(this.strings.getString("watch_all_videos"))), f.appendChild(h), e.appendChild(f));
				for (d = 0; d < g.entries.length; d++) f = this.contentWindow.document.createElement("li"), h = this.contentWindow.document.createElement("a"), h.href = "javascript:void(0)",
					function(b) {
						h.addEventListener("click", function() {
							"playlists" === a ? (c.process.dataset.playlistTitle = g.entries[b].t, c.c("watch|playlist|" + g.entries[b]["#"] + "|0")) : "videos" === a && (c.process.dataset.videoTitle = g.entries[b].t, c.c("watch|video|" + g.entries[b]["#"] + "|" + (g.entries[b].s ? g.entries[b].s : 0)))
						}, !1)
					}(d), h.appendChild(this.contentWindow.document.createTextNode(g.entries[d].t)), f.appendChild(h), e.appendChild(f);
				b.appendChild(e);
				b.style.maxHeight = this.sidebar.clientHeight - 200 + "px"
			}
		} catch (k) {
			e = this.strings.getString("critical_error"), f = this.strings.getString("retrieve_" + a + "_error"), this.mainWindow.YouTubeEnhancerPlus.k("error", e, f), b.insertAdjacentHTML("afterbegin", '<li><a href="javascript:void(0)"><span style="color:#ff0000">' + e.replace(/[&"<>]/g, function(a) {
				return {
					"&": "&amp;",
					'"': "&quot;",
					"<": "&lt;",
					">": "&gt;"
				}[a]
			}) + "</span> " + f.replace(/[&"<>]/g, function(a) {
				return {
					"&": "&amp;",
					'"': "&quot;",
					"<": "&lt;",
					">": "&gt;"
				}[a]
			}) + "</a></li>")
		}
	},
	l: function(a, c, b, e) {
		"video" === a && (this.process.dataset.videoId = c);
		this.process.setAttribute("data-" + ("video" === a ? "video" : "playlist") + "-title", e);
		this.c("watch|" + a + "|" + c + "|" + b);
		this.m()
	},
	m: function() {
		try {
			var a = this,
				c = setInterval(function() {
					var b = a.g();
					"undefined" !== typeof b && (450 > b ? a.f(450) : clearInterval(c))
				}, 25)
		} catch (b) {}
	},
	n: function(a) {
		this.contentWindow.document.querySelector(a).classList.remove("active")
	},
	o: function(a, c) {
		switch (a) {
			case "removeads":
				this.prefs.removeads = c;
				break;
			case "selectquality":
				this.prefs.selectquality = c;
				this.d(!0);
				break;
			case "sidebarqualities":
				this.prefs.sidebarqualities = c;
				this.prefs.selectquality && this.d(!0);
				break;
			case "sidebartopcountry":
				this.prefs.sidebartopcountry = c;
				this.k("top-music");
				break;
			case "playlists":
				this.j("playlists");
				break;
			case "videos":
				this.j("videos")
		}
	},
	p: function(a) {
		this.mainWindow.gBrowser.selectedTab = this.mainWindow.gBrowser.addTab(a)
	}
};
window.addEventListener("load", function load(c) {
	window.removeEventListener("load", load, !1);
	YouTubeEnhancerPlusSidebar.a()
}, !1);
window.addEventListener("beforeunload", function() {
	try {
		YouTubeEnhancerPlusSidebar.contentWindow.document.querySelector("#main").textContent = ""
	} catch (a) {}
}, !1);
window.addEventListener("unload", function() {
	YouTubeEnhancerPlusSidebar.f(450)
}, !1);