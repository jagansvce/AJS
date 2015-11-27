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
(function() {
	var d, l, x, g, q, z, A, D, f, y, E, t, h, c = {
			sm: {
				w: "426px",
				h: "240px",
				cbw: "402px",
				cbl: "12px",
				smw: "426px",
				smh: "240px",
				smcbw: "402px",
				smcbl: "12px"
			},
			md: {
				w: "640px",
				h: "360px",
				cbw: "616px",
				cbl: "12px",
				smw: "854px",
				smh: "480px",
				smcbw: "830px",
				smcbl: "12px"
			},
			lg: {
				w: "854px",
				h: "480px",
				cbw: "830px",
				cbl: "12px",
				smw: "854px",
				smh: "480px",
				smcbw: "830px",
				smcbl: "12px"
			},
			xl: {
				w: "1280px",
				h: "720px",
				cbw: "1256px",
				cbl: "12px",
				smw: "1280px",
				smh: "720px",
				smcbw: "1256px",
				smcbl: "12px"
			}
		},
		F = "ad_module ad2_module ad3_module ad_channel_code_instream ad_channel_code_overlay ad_device ad_eurl ad_flags ad_host ad_host_tier ad_logging_flag ad_preroll ad_slots ad_tag ad_type ad_video_pub_id adsense_video_doc_id aftv afv afv_ad_tag afv_ad_tag_restricted_to_instream afv_invideo_ad_tag afv_inslate_ad_tag afv_instream_max afv_video_min_cpm allow_html5_ads allowed_ads as_launched_in_country baseUrl dynamic_allocation_ad_tag max_dynamic_allocation_ad_tag_length max_ad_duration prefetch_ad_live_stream use_meta_ad_player".split(" ");
	function L() {
		var b = content.document.querySelector("#page"),
			a = content.document.querySelector("#content"),
			p = content.document.querySelector("#player-api");
		b && (new content.MutationObserver(function(a) {
			a.forEach(function(a) {
				try {
					!a.target.classList.contains("watch-non-stage-mode") || a.target.classList.contains("watch-wide") || a.target.classList.contains("watch-stage-mode") || (content.document.documentElement.removeAttribute("data-youtube-enhancer-plus-wide-player"), content.document.body.classList.remove("youtube-enhancer-plus-wide-player"))
				} catch (b) {}
			})
		})).observe(b, {
			attributes: !0,
			attributeFilter: ["class"]
		});
		a && (new content.MutationObserver(function(a) {
			a.forEach(function(a) {
				if (null !== a.addedNodes)
					for (var b = 0; b < a.addedNodes.length; b++)
						if (a.addedNodes[b].id && "watch7-container" === a.addedNodes[b].id || a.addedNodes[b].id && "watch8-container" === a.addedNodes[b].id || a.addedNodes[b].classList && a.addedNodes[b].classList.contains("branded-page-v2-container")) {
							clearInterval(y);
							clearInterval(t);
							p && (p.textContent = "");
							G();
							break
						}
			})
		})).observe(a, {
			childList: !0
		});
		if (p) {
			var c = new content.MutationObserver(function(a) {
				a.forEach(function(a) {
					if (null !== a.addedNodes)
						for (var b = 0; b < a.addedNodes.length; b++) try {
							if ("EMBED" === a.addedNodes[b].nodeName) {
								c.disconnect();
								for (var e = content.document.querySelectorAll("a.spf-link"), b = 0; b < e.length; b++) e[b].addEventListener("click", function() {
									content.document.location.href = this.href
								}, !1);
								/^https:\/\/www\.youtube\.com\/watch\?(.*&)?v=.*/.test(content.document.location.href) && (d.removeads ? H() : d.selectquality ? C() : d.disableautoplay && B());
								break
							}
						} catch (p) {}
				})
			});
			c.observe(p, {
				childList: !0
			})
		}
		D = 0;
		f = z = A = null;
		a && G()
	}
	function G(b) {
		clearInterval(y);
		clearInterval(E);
		clearInterval(t);
		content.document.documentElement.dataset.youtubeEnhancerPlusWidePlayer && content.document.body.classList.add("youtube-enhancer-plus-wide-player");
		content.document.querySelector("head #youtube-enhancer-plus-stylesheet") || (b = content.document.createElement("link"), b.rel = "stylesheet", b.id = "youtube-enhancer-plus-stylesheet", b.href = "resource://youtubeenhancerplus/youtube-enhancer-plus.css", content.document.head.appendChild(b));
		b = content.document.createElement("style");
		b.type = "text/css";
		b.textContent = "#youtube-enhancer-plus-background{background-color:" + d.backgroundcolor + "}body.youtube-enhancer-plus-cinema-mode #youtube-enhancer-plus-background{opacity:" + d.backgroundopacity / 100 + ";visibility:visible}";
		content.document.head.appendChild(b);
		0 < d.customstyle && I();
		f = null;
		if (/^https:\/\/www\.youtube\.com\/watch\?(.*&)?v=/.test(content.document.location.href)) f = "video", d.removeads || M();
		else if (/^https:\/\/www\.youtube\.com\/user\/[^\/]+\/videos/.test(content.document.location.href)) f = "user_uploads";
		else if (/^https:\/\/www\.youtube\.com\/playlist\?(.*&)?list=/.test(content.document.location.href)) f = "playlist";
		else if (/^https:\/\/www\.youtube\.com\/channel\//.test(content.document.location.href) || /^https:\/\/www\.youtube\.com\/user\/[^\/]+\/featured/.test(content.document.location.href)) f = "channel";
		if (null !== f)
			if ("video" === f && !content.document.querySelector("#movie_player") || "channel" === f && !content.document.querySelector("#c4-player")) D++, 20 >= D ? b = setTimeout(function() {
				G()
			}, 500) : D = 0;
			else {
				if ("video" === f) {
					if (d.removeads ? H() : d.selectquality ? C() : d.disableautoplay && B(), d.cinemamode ? J() : d.wideplayer && u("large"), 0 < content.document.location.href.indexOf("list=")) {
						var a;
						E = setInterval(function() {
							try {
								if (a && "function" === typeof a.getPlayerState || (a = content.wrappedJSObject.document.querySelector("#movie_player")), 0 === a.getPlayerState() || a.hasAttribute("flashvars") && 0 < a.getDuration() && 3 > a.getDuration() - a.getCurrentTime())
									if (clearInterval(E), !g.querySelector("li.loop").classList.contains("active"))
										if (a.hasAttribute("flashvars")) {
											var b = content.document.querySelector(".playlist-videos-container .playlist-videos-list li.currently-playing");
											if (b) {
												var e = b.nextElementSibling;
												e && (content.document.location.href = e.querySelector("a.playlist-video").href)
											}
										} else a.nextVideo()
							} catch (d) {
								content || clearInterval(E), a = !1
							}
						}, 1E3)
					}
				} else if ("channel" === f) {
					d.disableautoplay && P();
					return
				}
				x = content.document.createElement("div");
				g = content.document.createElement("div");
				q = content.document.createElement("div");
				b = content.document.createDocumentFragment();
				var p = content.document.createElement("div"),
					c = content.document.createElement("ul"),
					e = content.document.createElement("li"),
					h = content.document.querySelector("#content");
				x.id = "youtube-enhancer-plus-toolbar-wrapper";
				q.id = "youtube-enhancer-plus-tooltip";
				b.appendChild(q);
				p.id = "youtube-enhancer-plus-background";
				p.style.visibility = "hidden";
				p.addEventListener("click", function() {
					K()
				}, !1);
				b.appendChild(p);
				g.id = "youtube-enhancer-plus-toolbar";
				g.style.visibility = "hidden";
				g.className = "toolbar-" + d.toolbartheme + (d.transparencyeffect ? " transparency-effect" : "") + (d.slideeffect ? " slide-effect" : "");
				e.className = "clean" + ("video" !== f || 0 > d.toolbarbuttons.indexOf("clean") ? " hidden" : "");
				e.dataset.name = "clean";
				e.addEventListener("click", function() {
					H()
				}, !1);
				e.addEventListener("mouseenter", function(a) {
					n(a.target, l.remove_ads)
				}, !1);
				e.addEventListener("mouseleave", function() {
					v()
				}, !1);
				c.appendChild(e);
				e = content.document.createElement("li");
				e.className = "cinema" + ("video" !== f || 0 > d.toolbarbuttons.indexOf("cinema") ? " hidden" : "");
				e.dataset.name = "cinema";
				e.addEventListener("click", function() {
					content.document.body.classList.contains("youtube-enhancer-plus-cinema-mode") ? K() : J()
				}, !1);
				e.addEventListener("mouseenter", function(a) {
					n(a.target, l.cinema_mode)
				}, !1);
				e.addEventListener("mouseleave", function() {
					v()
				}, !1);
				c.appendChild(e);
				e = content.document.createElement("li");
				e.className = "resize" + ("video" !== f || 0 > d.toolbarbuttons.indexOf("resize") ? " hidden" : "");
				e.dataset.name = "resize";
				e.addEventListener("click", function() {
					u()
				}, !1);
				e.addEventListener("mouseenter", function(a) {
					n(a.target, l.resize_player)
				}, !1);
				e.addEventListener("mouseleave", function() {
					v()
				}, !1);
				c.appendChild(e);
				e = content.document.createElement("li");
				e.className = "download" + ("video" !== f || 0 > d.toolbarbuttons.indexOf("download") ? " hidden" : "");
				e.dataset.name = "download";
				e.addEventListener("click", function() {
					g.classList.contains("download-active") || (g.classList.add("download-active"), sendAsyncMessage("youtubeenhancerplus:download", {
						ytplayer_config: "undefined" !== typeof content.wrappedJSObject.ytplayer && content.wrappedJSObject.ytplayer.config ? content.wrappedJSObject.ytplayer.config : {}
					}))
				}, !1);
				e.addEventListener("mouseenter", function(a) {
					n(a.target, l.download_video)
				}, !1);
				e.addEventListener("mouseleave", function() {
					v()
				}, !1);
				c.appendChild(e);
				e = content.document.createElement("li");
				e.className = "loop" + ("video" !== f || 0 > d.toolbarbuttons.indexOf("loop") ? " hidden" : "");
				e.dataset.name = "loop";
				e.addEventListener("click", function() {
					Q(this)
				}, !1);
				e.addEventListener("mouseenter", function(a) {
					n(a.target, l.loop_video)
				}, !1);
				e.addEventListener("mouseleave", function() {
					v()
				}, !1);
				c.appendChild(e);
				e = content.document.createElement("li");
				e.className = "sidebar" + (0 > d.toolbarbuttons.indexOf("sidebar") ? " hidden" : "");
				e.dataset.name = "sidebar";
				e.addEventListener("click", function() {
					var a = {},
						b = content.document.location.href.replace(content.document.location.hash, "");
					if ("video" === f) {
						var e = 0,
							d = content.wrappedJSObject.document.querySelector("#movie_player");
						d && "function" === typeof d.getCurrentTime && (e = parseInt(d.getCurrentTime(), 10), d.pauseVideo());
						a.type = f;
						a.id = b.match(/v=([^&]+)/)[1];
						a.x = e;
						try {
							a.title = content.document.querySelector("h1.watch-title-container").textContent.trim()
						} catch (p) {}
					} else if ("playlist" === f) {
						a.type = f;
						a.id = b.match(/list=([^&]+)/)[1];
						a.x = 0;
						try {
							a.title = content.document.querySelector("h1.pl-header-title").textContent.trim()
						} catch (p) {}
					} else "user_uploads" === f && (a.type = f, a.id = b.match(/\/user\/(.+)\/videos/)[1], a.x = 0, a.title = "");
					a.title || (a.title = content.document.title.replace(/^\u25b6\s/, "").replace(/\s\-\sYouTube$/, ""));
					sendAsyncMessage("youtubeenhancerplus:watch-in-sidebar", a)
				}, !1);
				e.addEventListener("mouseenter", function(a) {
					n(a.target, l.watch_in_sidebar)
				}, !1);
				e.addEventListener("mouseleave", function() {
					v()
				}, !1);
				c.appendChild(e);
				e = content.document.createElement("li");
				e.className = "favorite" + ("user_uploads" === f || 0 > d.toolbarbuttons.indexOf("favorite") ? " hidden" : "");
				e.dataset.name = "favorite";
				e.addEventListener("click", function() {
					g.classList.add("favorite-active");
					var a = {
							action: "add"
						},
						b = content.document.location.href.replace(content.document.location.hash, "");
					if ("video" === f) {
						a.list = "videos";
						a.id = b.match(/v=([^&]+)/)[1];
						try {
							a.title = content.document.querySelector("h1.watch-title-container").textContent.trim()
						} catch (e) {}
					} else if ("playlist" === f) {
						a.list = "playlists";
						a.id = b.match(/list=([^&]+)/)[1];
						try {
							a.title = content.document.querySelector("h1.pl-header-title").textContent.trim()
						} catch (e) {}
					}
					a.title || (a.title = content.document.title.replace(/^\u25B6\s/, "").replace(/\s\-\sYouTube$/, ""));
					sendAsyncMessage("youtubeenhancerplus:modify-favorites", a)
				}, !1);
				e.addEventListener("mouseenter", function(a) {
					n(a.target, l.add_to_favorites)
				}, !1);
				e.addEventListener("mouseleave", function() {
					v()
				}, !1);
				c.appendChild(e);
				e = content.document.createElement("li");
				e.className = "options" + (0 > d.toolbarbuttons.indexOf("options") ? " hidden" : "");
				e.dataset.name = "options";
				e.addEventListener("click", function() {
					sendAsyncMessage("youtubeenhancerplus:show-options")
				}, !1);
				e.addEventListener("mouseenter", function(a) {
					n(a.target, l.options)
				}, !1);
				e.addEventListener("mouseleave", function() {
					v()
				}, !1);
				c.appendChild(e);
				g.appendChild(c);
				x.appendChild(g);
				b.appendChild(x);
				h.appendChild(b);
				var t = setTimeout(function() {
					p.style.visibility = "";
					N();
					g.style.visibility = ""
				}, 500);
				"object" === typeof content.wrappedJSObject.yt && content.wrappedJSObject.yt.msgs_ && (z = content.wrappedJSObject.yt.msgs_.YTP_DEFAULT_VIEW, A = content.wrappedJSObject.yt.msgs_.YTP_THEATER_MODE)
			}
	}
	function O() {
		var b = content.document.documentElement.clientWidth,
			a = content.document.documentElement.clientHeight;
		1920 === b && 1080 === a ? (h = "xl", c.xl.smw = "1520px", c.xl.smh = "855px", c.xl.smcbl = "132px") : 1720 <= b && 980 <= a ? h = "xl" : 1294 <= b && 630 <= a ? (h = "lg", 1320 <= b && 870 <= a ? (c.lg.smw = "1280px", c.lg.smh = "720px", c.lg.smcbw = "1256px") : 630 < a && 870 > a && (c.lg.smw = "1014px", c.lg.smh = "570px", c.lg.smcbl = "92px")) : 1024 < b && 630 < a && 870 > a ? (h = "md", c.md.smw = "1014px", c.md.smh = "570px", c.md.smcbw = "830px", c.md.smcbl = "92px") : h = 640 < b ? "md" : "sm"
	}
	function M() {
		var b = content.document.querySelector("video.html5-main-video"),
			a = content.document.querySelector(".html5-video-content");
		b && a && (new content.MutationObserver(function(d) {
			d.forEach(function(d) {
				try {
					content.document.body.classList.contains("youtube-enhancer-plus-wide-player") && d.target.style.width !== c[h].smw && (b.style.width = c[h].smw, b.style.height = c[h].smh, a.style.width = c[h].smw, a.style.height = c[h].smh)
				} catch (e) {}
			})
		})).observe(b, {
			attributes: !0,
			attributeFilter: ["style"]
		})
	}
	function I(b) {
		try {
			var a = content.document.querySelector("head #youtube-enhancer-plus-custom-style");
			0 < d.customstyle ? a ? a.href = b ? "resource://youtubeenhancerplus/custom-style-" + d.customstyle + ".css?t=" + (new Date).getTime() : "resource://youtubeenhancerplus/custom-style-" + d.customstyle + ".css" : (a = content.document.createElement("link"), a.rel = "stylesheet", a.id = "youtube-enhancer-plus-custom-style", a.href = "resource://youtubeenhancerplus/custom-style-" + d.customstyle + ".css", content.document.head.appendChild(a)) : a && a.parentNode.removeChild(a)
		} catch (c) {}
	}
	function N() {
		x.style.marginLeft = "-" + parseInt(content.getComputedStyle(g, null).getPropertyValue("width"), 10) / 2 + "px"
	}
	function n(b, a) {
		d.toolbartooltips && (q.textContent = a, q.style.left = 4 + parseInt(b.getBoundingClientRect().left, 10) - parseInt(content.getComputedStyle(q, null).getPropertyValue("width"), 10) / 2 + "px", q.classList.add("visible"))
	}
	function B() {
		var b, a, c = 0,
			f = "undefined" !== typeof content.document.hidden ? "hidden" : "mozHidden";
		d.backgroundtabsonly && !content.document[f] || d.ignoreplaylists && 0 < content.document.location.href.indexOf("list=") || (t = setInterval(function() {
			try {
				b && "function" === typeof b.getPlayerState || (c++, b = content.wrappedJSObject.document.querySelector("#movie_player")), a = b.getPlayerState(), content.document[f] ? -1 !== a && d.disablepreloading ? b.stopVideo() : 2 === a || d.disablepreloading || b.pauseVideo() : -1 !== a && 5 !== a && !d.backgroundtabsonly && d.disablepreloading ? b.stopVideo() : 2 === a || d.backgroundtabsonly || d.disablepreloading ? clearInterval(t) : (-1 !== a && 5 !== a || b.playVideo(), 3 !== a && b.pauseVideo())
			} catch (e) {
				(!content || 15 < c) && clearInterval(t), b = !1
			}
		}, 1E3))
	}
	function v() {
		q.classList.remove("visible")
	}
	function R(b) {
		for (var a = 0; a < F.length; a++)
			if (b === F[a]) return !0;
		return !1
	}
	function u(b) {
		try {
			var a = content.document.documentElement,
				d = content.document.body,
				f = content.document.querySelector("#page"),
				e = content.document.querySelector("video.html5-main-video"),
				g = content.document.querySelector(".html5-video-content"),
				r = content.document.querySelector(".ytp-chrome-bottom"),
				m = content.document.querySelector(".ytp-size-button") || content.document.querySelector('.html5-player-chrome div[class*="ytp-size-toggle-"]'),
				k = d.classList.contains("youtube-enhancer-plus-wide-player");
			if ("large" === b || !b && !k) a.dataset.youtubeEnhancerPlusWidePlayer = !0, d.classList.add("youtube-enhancer-plus-wide-player"), e && g && (m && (A && m.title && m.title === A || m.classList.contains("ytp-size-toggle-large")) && m.click(), e.style.width = c[h].smw, e.style.height = c[h].smh, g.style.width = c[h].smw, g.style.height = c[h].smh, r && (r.style.width = c[h].smcbw, r.style.left = c[h].smcbl)), f.classList.add("watch-wide"), f.classList.add("watch-stage-mode"), f.classList.remove("watch-non-stage-mode"), sendAsyncMessage("youtubeenhancerplus:update-cookie", {
				wide: 1
			});
			else if ("small" === b || !b && k) a.removeAttribute("data-youtube-enhancer-plus-wide-player"), d.classList.remove("youtube-enhancer-plus-wide-player"), e && g && (m && (z && m.title && m.title === z || m.classList.contains("ytp-size-toggle-small")) && m.click(), e.style.width = c[h].w, e.style.height = c[h].h, g.style.width = c[h].w, g.style.height = c[h].h, r && (r.style.width = c[h].cbw, r.style.left = c[h].cbl)), f.classList.add("watch-non-stage-mode"), f.classList.remove("watch-wide"), f.classList.remove("watch-stage-mode"), sendAsyncMessage("youtubeenhancerplus:update-cookie", {
				wide: 0
			})
		} catch (w) {}
	}
	function H() {
		try {
			clearInterval(y);
			clearInterval(t);
			g && g.querySelector(".loop").classList.remove("active");
			var b = content.wrappedJSObject.document.querySelector("#movie_player");
			if (b && b.hasAttribute("flashvars")) {
				for (var a = b.getAttribute("flashvars"), c = b.cloneNode(!0), f = b.parentNode, e = a.split("&"), b = [], h, r, m, k, w = 0; w < e.length; w++) h = e[w].split("="), r = h[0], m = h[1], R(r) || b.push(r + "=" + m);
				k = b.join("&");
				0 > k.indexOf("enablejsapi") && (k += "&enablejsapi=1");
				0 > k.indexOf("iv_load_policy") && (k += "&iv_load_policy=1");
				0 > k.indexOf("autoplay") && (k += "&autoplay=1");
				d.removeannotations && (k = k.replace("iv_load_policy=1", "iv_load_policy=3"));
				c.setAttribute("flashvars", k);
				f.textContent = "";
				f.appendChild(c)
			} else if (b && b.classList.contains("html5-video-player")) {
				if ("undefined" !== typeof content.wrappedJSObject.ytplayer && content.wrappedJSObject.ytplayer.config && content.wrappedJSObject.ytplayer.config.args && content.wrappedJSObject.ytplayer.load) {
					for (w = 0; w < F.length; w++) delete content.wrappedJSObject.ytplayer.config.args[F[w]];
					content.wrappedJSObject.ytplayer.config.args.iv_load_policy = d.removeannotations ? 3 : 1;
					b.pauseVideo();
					b.stopVideo();
					b.destroy();
					content.wrappedJSObject.ytplayer.load()
				}
				M();
				var l = content.document.querySelector("#page"),
					q = content.document.querySelector(".ytp-size-button") || content.document.querySelector('.html5-player-chrome div[class*="ytp-size-toggle-"]'),
					n = content.document.querySelector(".ytp-tooltip-text");
				l && q && q.addEventListener("click", function() {
					if (A && n && n.textContent === A || this.classList.contains("ytp-size-toggle-large")) l.classList.add("watch-non-stage-mode"), l.classList.remove("watch-wide"), l.classList.remove("watch-stage-mode");
					else if (z && n && n.textContent === z || this.classList.contains("ytp-size-toggle-small")) l.classList.add("watch-wide"), l.classList.add("watch-stage-mode"), l.classList.remove("watch-non-stage-mode")
				}, !1);
				content.document.body.classList.contains("youtube-enhancer-plus-wide-player") && u("large")
			}
			d.selectquality ? C() : d.disableautoplay && B()
		} catch (v) {}
	}
	function P() {
		var b, a, c = 0,
			f = "undefined" !== typeof content.document.hidden ? "hidden" : "mozHidden";
		if (!d.backgroundtabsonly || content.document[f]) t = setInterval(function() {
			try {
				b && "function" === typeof b.getPlayerState || (c++, b = content.wrappedJSObject.document.querySelector("#c4-player")), a = b.getPlayerState(), content.document[f] ? 2 !== b.getPlayerState() && b.pauseVideo() : 2 === a || d.backgroundtabsonly ? clearInterval(t) : (-1 !== a && 5 !== a || b.playVideo(), 3 !== a && b.pauseVideo())
			} catch (e) {
				(!content || 15 < c) && clearInterval(t), b = !1
			}
		}, 1E3)
	}
	function C(b) {
		var a, c = !1,
			f = [d.quality1, d.quality2, d.quality3, d.quality4],
			e = setInterval(function() {
				try {
					if (a && "function" === typeof a.getPlayerState || (a = content.wrappedJSObject.document.querySelector("#movie_player")), -1 !== a.getPlayerState()) {
						for (var g = 0, m = !1, k, l = a.getAvailableQualityLevels(); g < f.length && !m; g++)
							for (var n in l)
								if (f[g] === l[n]) {
									m = f[g];
									break
								}
						k = m ? m : "auto";
						k !== a.getPlaybackQuality() ? c || (c = !0, a.hasAttribute("flashvars") ? (a.pauseVideo(), a.setPlaybackQuality(k), a.playVideo()) : a.setPlaybackQuality(k), d.disableautoplay && !b && B()) : k === a.getPlaybackQuality() && (clearInterval(e), clearTimeout(h), c || !d.disableautoplay || b || B())
					}
				} catch (q) {
					content || clearInterval(e), a = !1
				}
			}, 750),
			h = setTimeout(function() {
				clearInterval(e)
			}, 45E3)
	}
	function K() {
		content.document.body.classList.remove("youtube-enhancer-plus-cinema-mode");
		!d.widescreen && d.cinemamodewideplayer && u("small")
	}
	function J() {
		content.document.body.classList.add("youtube-enhancer-plus-cinema-mode");
		d.cinemamodewideplayer && u("large")
	}
	function Q(b) {
		if (b.classList.contains("active")) clearInterval(y), b.classList.remove("active");
		else {
			b.classList.add("active");
			var a, d = 0,
				c = 0 < content.document.location.href.indexOf("list=") ? !0 : !1;
			y = setInterval(function() {
				try {
					(a && "function" === typeof a.getPlayerState || (d++, a = content.wrappedJSObject.document.querySelector("#movie_player")), c || 0 !== a.getPlayerState()) ? c && 0 < a.getDuration() && 3 > a.getDuration() - a.getCurrentTime() && (a.pauseVideo(), a.seekTo(0), a.playVideo()): a.playVideo()
				} catch (b) {
					(!content || 15 < d) && clearInterval(y), a = !1
				}
			}, 1E3)
		}
	}
	addMessageListener("youtubeenhancerplus:reset-button", function(b) {
		g.classList.remove(b.data + "-active")
	});
	addMessageListener("youtubeenhancerplus:custom-style-changed", function() {
		I(!0)
	});
	addMessageListener("youtubeenhancerplus:preference-changed", function(b) {
		var a = b.data.value,
			c = !1;
		try {
			"www.youtube.com" === content.document.location.host && (c = !0)
		} catch (h) {}
		switch (b.data.name) {
			case "backgroundtabsonly":
			case "disableautoplay":
			case "disablepreloading":
			case "ignoreplaylists":
			case "removeads":
			case "removeannotations":
			case "toolbartooltips":
				d[b.data.name] = a;
				break;
			case "backgroundcolor":
				d.backgroundcolor = a;
				c && "video" === f && (content.document.querySelector("#youtube-enhancer-plus-background").style.backgroundColor = a);
				break;
			case "backgroundopacity":
				d.backgroundopacity = a;
				c && "video" === f && (content.document.querySelector("#youtube-enhancer-plus-background").style.opacity = a / 100);
				break;
			case "cinemamode":
				d.cinemamode = a;
				c && "video" === f && (a ? J() : K());
				break;
			case "customstyle":
				d.customstyle = a;
				c && I(!0);
				break;
			case "wideplayer":
				d.wideplayer = a;
				c && "video" === f && (a ? u("large") : u("small"));
				break;
			case "cinemamodewideplayer":
				d.cinemamodewideplayer = a;
				c && "video" === f && content.document.body.classList.contains("youtube-enhancer-plus-cinema-mode") && (a ? u("large") : u("small"));
				break;
			case "quality1":
			case "quality2":
			case "quality3":
			case "quality4":
			case "selectquality":
				d[b.data.name] = a;
				c && "video" === f && d.selectquality && C(!0);
				break;
			case "slideeffect":
				d.slideeffect = a;
				if (c && f && "channel" !== f) g.classList[a ? "add" : "remove"]("slide-effect");
				break;
			case "toolbarbuttons":
				d.toolbarbuttons = a;
				if (c && f && "channel" !== f && "channel" !== f) {
					b = g.querySelectorAll("li");
					for (a = b.length - 1; 0 <= a; a--) c = b[a].dataset.name, 0 <= d.toolbarbuttons.indexOf(c) && ("video" === f || "user_uploads" === f && ("sidebar" === c || "options" === c) || "playlist" === f && ("sidebar" === c || "favorite" === c || "options" === c)) ? b[a].classList.remove("hidden") : b[a].classList.add("hidden");
					"" === d.toolbarbuttons ? x.classList.add("hidden") : (x.classList.remove("hidden"), N())
				}
				break;
			case "toolbartheme":
				c && f && "channel" !== f && (g.classList.add("toolbar-" + a), g.classList.remove("toolbar-" + d.toolbartheme));
				d.toolbartheme = a;
				break;
			case "transparency":
				if (d.transparency = a, c && f && "channel" !== f) g.classList[a ? "add" : "remove"]("transparency")
		}
	});
	addMessageListener("youtubeenhancerplus:init", function(b) {
		d = b.data.prefs;
		l = b.data.strings;
		O();
		L()
	});
	sendAsyncMessage("youtubeenhancerplus:youtube");
	addEventListener("DOMContentLoaded", function(b) {
		"#document" === b.originalTarget.nodeName && (b.originalTarget.defaultView.frameElement || "www.youtube.com" === b.originalTarget.location.host && L())
	}, !1);
	addEventListener("load", function(b) {
		if ("#document" === b.originalTarget.nodeName && !b.originalTarget.defaultView.frameElement && "www.youtube.com" === b.originalTarget.location.host) try {
			content.document.querySelector("#youtube-enhancer-plus-background").style.visibility = "", content.document.querySelector("#youtube-enhancer-plus-toolbar").style.visibility = ""
		} catch (a) {}
	}, !1);
	addEventListener("resize", function() {
		c.xl.smw = "1280px";
		c.xl.smh = "720px";
		c.xl.smcbl = "12px";
		c.lg.smw = "854px";
		c.lg.smh = "480px";
		c.lg.smcbw = "830px";
		c.lg.smcbl = "12px";
		c.md.smw = "854px";
		c.md.smh = "480px";
		c.md.smcbw = "830px";
		c.md.smcbl = "12px";
		O()
	}, !1)
})();