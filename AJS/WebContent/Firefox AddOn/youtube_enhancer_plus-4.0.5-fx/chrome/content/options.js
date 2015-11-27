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
	var a, l, x, D, E, F, G, H, I, J, K, f, pa, t, L, M, N, O, qa, W, P, Q, R, S, ra, X, Y, sa, Z, m, T, n, u, aa;
	function q() {
		if (x = content.document.querySelector("#youtube-enhancer-plus-options")) {
			var d = content.document.createElement("link");
			d.rel = "stylesheet";
			d.href = "resource://youtubeenhancerplus/youtube-enhancer-plus-options.css";
			content.document.head.appendChild(d);
			var b = content.document,
				d = b.querySelectorAll('input[name="theme"]'),
				ba = b.querySelector("#transparency"),
				ca = b.querySelector("#slide-effect"),
				p = b.querySelector("#tooltips"),
				da = b.querySelector("#sidebar-top-country"),
				r = b.querySelector("#remove-ads"),
				g = b.querySelector("#remove-annotations"),
				ea = b.querySelector("#wide-player"),
				fa = b.querySelector("#disable-autoplay"),
				ga = b.querySelector("#disable-preloading"),
				q = b.querySelector("#background-tabs-only"),
				w = b.querySelector("#ignore-playlists"),
				ha = b.querySelector("#select-quality"),
				y = b.querySelector("#quality-1"),
				z = b.querySelector("#quality-2"),
				A = b.querySelector("#quality-3"),
				B = b.querySelector("#quality-4"),
				ia = b.querySelector("#cinema-mode"),
				ja = b.querySelector("#cinema-mode-wide-player"),
				V = b.querySelector("#background-color"),
				ka = b.querySelector("#background-opacity"),
				la = b.querySelector("#background-opacity-output"),
				e = b.createElement("img"),
				h = b.createElement("img"),
				C = b.querySelectorAll('input[name="style"]'),
				ma = b.querySelector("#edit-styles-btn"),
				na = b.querySelector("#style-1-btn"),
				ta = b.querySelector("#style-2-btn"),
				ua = b.querySelector("#style-3-btn"),
				va = b.querySelector("#style-4-btn"),
				wa = b.querySelector("#style-5-btn"),
				xa = b.querySelector(".custom-styles-slider"),
				oa = b.querySelector("#translate-btn");
			D = b.querySelector("#clean-btn");
			E = b.querySelector("#cinema-btn");
			F = b.querySelector("#resize-btn");
			G = b.querySelector("#download-btn");
			H = b.querySelector("#loop-btn");
			I = b.querySelector("#sidebar-btn");
			J = b.querySelector("#favorite-btn");
			K = b.querySelector("#options-btn");
			f = b.querySelectorAll("input.sidebarqualities");
			pa = b.querySelector("#background-preview");
			t = b.createElement("img");
			L = b.querySelector("#manage-playlists-btn");
			M = b.querySelector("#sort-playlists-btn");
			N = b.querySelector("#export-playlists-btn");
			O = b.querySelector("#import-playlists-btn");
			qa = b.querySelector("#delete-playlists-modal-btn");
			W = b.querySelector("#delete-playlists-btn");
			P = b.querySelector("#manage-videos-btn");
			Q = b.querySelector("#sort-videos-btn");
			R = b.querySelector("#export-videos-btn");
			S = b.querySelector("#import-videos-btn");
			ra = b.querySelector("#delete-videos-modal-btn");
			X = b.querySelector("#delete-videos-btn");
			Y = b.querySelector("#edit-favorite-modal");
			sa = b.querySelector("#edit-favorite-modal-label");
			Z = b.querySelector("#favorite-title");
			m = b.querySelector("#favorite-position");
			T = b.querySelector("#favorite-index");
			n = b.querySelector("#favorite-start");
			u = b.querySelector("#edit-favorite-btn");
			aa = b.querySelector("#modal-backdrop");
			b.querySelector("#toolbar-btns").classList.remove("hidden");
			b.querySelector("#cinema-mode-preview").classList.remove("hidden");
			e.className = "img-responsive";
			e.src = "resource://youtubeenhancerplus/video.png";
			b.querySelector("#video").appendChild(e);
			h.src = "resource://youtubeenhancerplus/btn-sm-blue-spinner.gif";
			h.className = "btn-sm-spinner";
			t.src = "resource://youtubeenhancerplus/btn-sm-red-spinner.gif";
			t.className = "btn-sm-spinner";
			for (e = 0; e < d.length; e++) d[e].value === a.toolbartheme && (d[e].checked = !0), d[e].addEventListener("click", function() {
				if ("black" === this.value || "grey" === this.value || "white" === this.value) a.toolbartheme = this.value, c("toolbartheme", this.value)
			}, !1);
			ba.checked = a.transparency;
			ba.addEventListener("click", function() {
				a.transparency = this.checked ? !0 : !1;
				c("transparency", a.transparency)
			}, !1);
			ca.checked = a.slideeffect;
			ca.addEventListener("click", function() {
				a.slideeffect = this.checked ? !0 : !1;
				c("slideeffect", a.slideeffect)
			}, !1);
			p.checked = a.toolbartooltips;
			p.addEventListener("click", function() {
				a.toolbartooltips = this.checked ? !0 : !1;
				c("toolbartooltips", a.toolbartooltips)
			}, !1);
			D.checked = 0 <= a.toolbarbuttons.indexOf("clean") ? !0 : !1;
			D.addEventListener("click", function() {
				k()
			}, !1);
			E.checked = 0 <= a.toolbarbuttons.indexOf("cinema") ? !0 : !1;
			E.addEventListener("click", function() {
				k()
			}, !1);
			F.checked = 0 <= a.toolbarbuttons.indexOf("resize") ? !0 : !1;
			F.addEventListener("click", function() {
				k()
			}, !1);
			G.checked = 0 <= a.toolbarbuttons.indexOf("download") ? !0 : !1;
			G.addEventListener("click", function() {
				k()
			}, !1);
			H.checked = 0 <= a.toolbarbuttons.indexOf("loop") ? !0 : !1;
			H.addEventListener("click", function() {
				k()
			}, !1);
			I.checked = 0 <= a.toolbarbuttons.indexOf("sidebar") ? !0 : !1;
			I.addEventListener("click", function() {
				k()
			}, !1);
			J.checked = 0 <= a.toolbarbuttons.indexOf("favorite") ? !0 : !1;
			J.addEventListener("click", function() {
				k()
			}, !1);
			K.checked = 0 <= a.toolbarbuttons.indexOf("options") ? !0 : !1;
			K.addEventListener("click", function() {
				k()
			}, !1);
			da.value = a.sidebartopcountry;
			da.addEventListener("change", function() {
				/^[a-z\-]+$/.test(this.value) && (a.sidebartopcountry = this.value, c("sidebartopcountry", this.value))
			}, !1);
			r.checked = a.removeads;
			r.addEventListener("click", function() {
				a.removeads = this.checked ? !0 : !1;
				c("removeads", a.removeads)
			}, !1);
			g.checked = a.removeannotations;
			g.addEventListener("click", function() {
				a.removeannotations = this.checked ? !0 : !1;
				c("removeannotations", a.removeannotations)
			}, !1);
			ea.checked = a.wideplayer;
			ea.addEventListener("click", function() {
				a.wideplayer = this.checked ? !0 : !1;
				c("wideplayer", a.wideplayer)
			}, !1);
			fa.checked = a.disableautoplay;
			fa.addEventListener("click", function() {
				a.disableautoplay = this.checked ? !0 : !1;
				c("disableautoplay", a.disableautoplay)
			}, !1);
			ga.checked = a.disablepreloading;
			ga.addEventListener("click", function() {
				a.disablepreloading = this.checked ? !0 : !1;
				c("disablepreloading", a.disablepreloading)
			}, !1);
			q.checked = a.backgroundtabsonly;
			q.addEventListener("click", function() {
				a.backgroundtabsonly = this.checked ? !0 : !1;
				c("backgroundtabsonly", a.backgroundtabsonly)
			}, !1);
			w.checked = a.ignoreplaylists;
			w.addEventListener("click", function() {
				a.ignoreplaylists = this.checked ? !0 : !1;
				c("ignoreplaylists", a.ignoreplaylists)
			}, !1);
			for (e = 0; e < f.length; e++) f[e].checked = -1 !== a.sidebarqualities.indexOf(a["quality" + f[e].value]) ? !0 : !1, f[e].disabled = !a.selectquality, f[e].parentNode.classList[a.selectquality ? "remove" : "add"]("disabled"), f[e].addEventListener("click", function() {
				v()
			}, !1);
			ha.checked = a.selectquality;
			ha.addEventListener("click", function() {
				y.disabled = !this.checked;
				z.disabled = !this.checked;
				A.disabled = !this.checked;
				B.disabled = !this.checked;
				for (var b = f.length - 1; 0 <= b; b--) f[b].disabled = !this.checked, f[b].parentNode.classList[this.checked ? "remove" : "add"]("disabled");
				a.selectquality = this.checked ? !0 : !1;
				c("selectquality", a.selectquality)
			}, !1);
			y.value = a.quality1;
			y.disabled = !a.selectquality;
			y.addEventListener("change", function() {
				/^[a-z0-9]+$/.test(this.value) && (a.quality1 = this.value, c("quality1", this.value), v())
			}, !1);
			z.value = a.quality2;
			z.disabled = !a.selectquality;
			z.addEventListener("change", function() {
				/^[a-z0-9]+$/.test(this.value) && (a.quality2 = this.value, c("quality2", this.value), v())
			}, !1);
			A.value = a.quality3;
			A.disabled = !a.selectquality;
			A.addEventListener("change", function() {
				/^[a-z0-9]+$/.test(this.value) && (a.quality3 = this.value, c("quality3", this.value), v())
			}, !1);
			B.value = a.quality4;
			B.disabled = !a.selectquality;
			B.addEventListener("change", function() {
				/^[a-z0-9]+$/.test(this.value) && (a.quality4 = this.value, c("quality4", this.value), v())
			}, !1);
			ia.checked = a.cinemamode;
			ia.addEventListener("click", function() {
				a.cinemamode = this.checked ? !0 : !1;
				c("cinemamode", a.cinemamode)
			}, !1);
			ja.checked = a.cinemamodewideplayer;
			ja.addEventListener("click", function() {
				a.cinemamodewideplayer = this.checked ? !0 : !1;
				c("cinemamodewideplayer", a.cinemamodewideplayer)
			}, !1);
			V.value = a.backgroundcolor;
			V.addEventListener("input", function() {
				a.backgroundcolor = this.value;
				U()
			}, !1);
			V.addEventListener("change", function() {
				/^#[a-zA-Z0-9]{6}$/.test(this.value) && (a.backgroundcolor = this.value, U(), c("backgroundcolor", this.value))
			}, !1);
			ka.value = a.backgroundopacity;
			ka.addEventListener("input", function() {
				/^([5-9][0-9]|100)$/.test(this.value) && (a.backgroundopacity = parseInt(this.value, 10), la.textContent = this.value + "%", U(), c("backgroundopacity", a.backgroundopacity))
			}, !1);
			la.textContent = a.backgroundopacity + "%";
			U();
			for (e = 0; e < C.length; e++) C[e].value == a.customstyle && (C[e].checked = !0), C[e].addEventListener("click", function() {
				/^[0-5]$/.test(this.value) && (a.customstyle = parseInt(this.value, 10), c("customstyle", a.customstyle))
			}, !1);
			ma.appendChild(h);
			ma.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:custom-styles"))
			}, !1);
			na.classList.add("active");
			[na, ta, ua, va, wa].forEach(function(b, a, d) {
				b.addEventListener("click", function() {
					d.forEach(function(b) {
						b.classList.remove("active")
					});
					this.classList.add("active");
					xa.style.left = "-" + 100 * a + "%"
				}, !1)
			});
			[1, 2, 3, 4, 5].forEach(function(a) {
				var d = b.querySelector("#save-style-" + a + "-btn"),
					c = b.querySelector("#style-" + a);
				d.appendChild(h.cloneNode(!1));
				d.addEventListener("click", function() {
					this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:save-style", {
						id: a,
						css: c.value
					}))
				}, !1);
				c.setAttribute("placeholder", l.custom_style)
			});
			L.appendChild(h.cloneNode(!1));
			L.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:favorites", {
					list: "playlists"
				}))
			}, !1);
			M.appendChild(h.cloneNode(!1));
			M.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:sort-favorites", {
					list: "playlists"
				}))
			}, !1);
			N.appendChild(h.cloneNode(!1));
			N.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:export-favorites", {
					list: "playlists"
				}))
			}, !1);
			O.appendChild(h.cloneNode(!1));
			O.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:import-favorites", {
					list: "playlists"
				}))
			}, !1);
			W.appendChild(t);
			W.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:delete-favorites", {
					list: "playlists"
				}))
			}, !1);
			P.appendChild(h.cloneNode(!1));
			P.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:favorites", {
					list: "videos"
				}))
			}, !1);
			Q.appendChild(h.cloneNode(!1));
			Q.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:sort-favorites", {
					list: "videos"
				}))
			}, !1);
			R.appendChild(h.cloneNode(!1));
			R.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:export-favorites", {
					list: "videos"
				}))
			}, !1);
			S.appendChild(h.cloneNode(!1));
			S.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:import-favorites", {
					list: "videos"
				}))
			}, !1);
			X.appendChild(t.cloneNode(!1));
			X.addEventListener("click", function() {
				this.classList.contains("active") || (this.classList.add("active"), sendAsyncMessage("youtubeenhancerplus:delete-favorites", {
					list: "videos"
				}))
			}, !1);
			m.addEventListener("keyup", function() {
				this.value = this.value.replace(/[^\d]/g, "")
			}, !1);
			n.addEventListener("keyup", function() {
				this.value = this.value.replace(/[^0-9:]/g, "")
			}, !1);
			u.appendChild(h.cloneNode(!1));
			u.addEventListener("click", function() {
				if (!this.classList.contains("active")) {
					this.classList.add("active");
					var a = {
						list: this.dataset.list,
						action: "edit",
						title: Z.value.trim(),
						index: parseInt(T.value.trim(), 10),
						position: "" === m.value.trim() ? parseInt(T.value.trim(), 10) : parseInt(m.value.trim(), 10) - 1
					};
					if ("videos" === this.dataset.list)
						if (/^(\d{1,2}:)?\d{1,2}:\d{1,2}$/.test(n.value.trim())) {
							for (var b = n.value.trim().split(":"), d = 0, c = 1; 0 < b.length;) d += c * parseInt(b.pop(), 10), c *= 60;
							a.start = d
						} else /^\d+$/.test(n.value.trim()) ? a.start = parseInt(n.value.trim(), 10) : a.start = 0;
					sendAsyncMessage("youtubeenhancerplus:modify-favorites", a)
				}
			}, !1);
			x.lang !== l.locale_code && x.querySelector("fieldset").insertAdjacentHTML("beforebegin", '<div class="alert alert-info visible"><strong>' + l.info.replace(/[&"<>]/g, function(a) {
				return {
					"&": "&amp;",
					'"': "&quot;",
					"<": "&lt;",
					">": "&gt;"
				}[a]
			}) + '</strong> <a href="' + b.location.href.replace(/hl=[\w-]+/, "hl=" + l.locale_code.replace(/[&"<>]/g, "")) + '">' + l.page_available_in_your_language.replace(/[&"<>]/g, function(a) {
				return {
					"&": "&amp;",
					'"': "&quot;",
					"<": "&lt;",
					">": "&gt;"
				}[a]
			}) + "</a></div>");
			oa && oa.addEventListener("click", function() {
				sendAsyncMessage("youtubeenhancerplus:translate")
			})
		}
	}

	function c(a, b) {
		sendAsyncMessage("youtubeenhancerplus:change-preference", {
			name: a,
			value: b
		})
	}

	function k() {
		var d = [];
		D.checked && d.push("clean");
		E.checked && d.push("cinema");
		F.checked && d.push("resize");
		G.checked && d.push("download");
		H.checked && d.push("loop");
		I.checked && d.push("sidebar");
		J.checked && d.push("favorite");
		K.checked && d.push("options");
		a.toolbarbuttons = d.join(",");
		c("toolbarbuttons", a.toolbarbuttons)
	}

	function v() {
		for (var d = [], b = 0; b < f.length; b++) f[b].checked && d.push(a["quality" + f[b].value]);
		a.sidebarqualities = d.join(",");
		c("sidebarqualities", a.sidebarqualities)
	}

	function U() {
		var d = a.backgroundcolor.replace("#", ""),
			b = parseInt(d.substring(0, 2), 16),
			c = parseInt(d.substring(2, 4), 16),
			d = parseInt(d.substring(4, 6), 16);
		pa.style.backgroundColor = "rgba(" + b + "," + c + "," + d + "," + a.backgroundopacity / 100 + ")"
	}

	function w(a, b) {
		if (x) {
			"playlists" === a ? (L.classList.add("hidden"), M.classList.remove("hidden"), N.classList.remove("hidden"), O.classList.remove("hidden"), qa.classList.remove("hidden")) : "videos" === a && (P.classList.add("hidden"), Q.classList.remove("hidden"), R.classList.remove("hidden"), S.classList.remove("hidden"), ra.classList.remove("hidden"));
			var c = content.document.querySelector("#" + a + " tbody");
			try {
				c.textContent = "";
				var f = JSON.parse(b),
					p, k, r = 1,
					g = 0;
				if (0 === f.entries.length) c.insertAdjacentHTML("afterbegin", "<tr><td>" + l["playlists" === a ? "no_favorite_playlist" : "no_favorite_video"].replace(/[&"<>]/g, function(a) {
					return {
						"&": "&amp;",
						'"': "&quot;",
						"<": "&lt;",
						">": "&gt;"
					}[a]
				}) + "</td></tr>");
				else {
					for (; g < f.entries.length; g++, r++) f.entries[g].s ? (p = new Date(null), p.setSeconds(f.entries[g].s), k = p.toISOString().substr(11, 8)) : k = "00:00:00", c.insertAdjacentHTML("beforeend", '<tr><td><span class="position">' + (10 > r ? "0" + r : r) + "</span>" + f.entries[g].t.replace(/[&"<>]/g, function(a) {
						return {
							"&": "&amp;",
							'"': "&quot;",
							"<": "&lt;",
							">": "&gt;"
						}[a]
					}) + "</td>" + ("videos" === a ? "<td>" + k.replace(/[&"<>]/g, "") + "</td>" : "") + '<td><button class="btn btn-sm btn-default" data-action="edit" data-list="' + a.replace(/[&"<>]/g, "") + '" data-index="' + g + '" data-title="' + f.entries[g].t.replace(/[&"<>]/g, function(a) {
						return {
							"&": "&amp;",
							'"': "&quot;",
							"<": "&lt;",
							">": "&gt;"
						}[a]
					}) + '"' + ("videos" === a ? 'data-start="' + (f.entries[g].s ? parseInt(f.entries[g].s, 10) : "0") + '"' : "") + ">" + l.edit.replace(/[&"<>]/g, function(a) {
						return {
							"&": "&amp;",
							'"': "&quot;",
							"<": "&lt;",
							">": "&gt;"
						}[a]
					}) + '</button> <button class="btn btn-sm btn-red" data-action="delete" data-list="' + a.replace(/[&"<>]/g, "") + '" data-index="' + g + '">' + l["delete"].replace(/[&"<>]/g, function(a) {
						return {
							"&": "&amp;",
							'"': "&quot;",
							"<": "&lt;",
							">": "&gt;"
						}[a]
					}) + "</button></td></tr>");
					m.setAttribute("data-max-" + a, f.entries.length);
					for (var q = c.querySelectorAll("button"), g = q.length - 1; 0 <= g; g--) q[g].addEventListener("click", function(a) {
						"edit" === this.dataset.action ? (sa.textContent = l["playlists" === this.dataset.list ? "edit_playlist" : "edit_video"], Z.value = this.dataset.title, T.value = this.dataset.index, m.value = parseInt(this.dataset.index, 10) + 1, u.dataset.list = this.dataset.list, this.dataset.start ? (m.setAttribute("max", m.dataset.maxVideos), 0 < parseInt(this.dataset.start, 10) ? (p = new Date(null), p.setSeconds(parseInt(this.dataset.start, 10)), n.value = p.toISOString().substr(11, 8)) : n.value = "", n.parentNode.classList.remove("hidden")) : (m.setAttribute("max", m.dataset.maxPlaylists), n.parentNode.classList.add("hidden")), content.document.body.classList.add("overflow-hidden"), aa.style.display = "block", a = setTimeout(function() {
							Y.style.display = "block";
							Y.scrollTop = 0;
							aa.classList.add("in");
							var a = setTimeout(function() {
								content.document.body.classList.add("modal-open")
							}, 300)
						}, 250)) : "delete" !== this.dataset.action || this.classList.contains("active") || (this.textContent = "", this.classList.add("active"), this.appendChild(t.cloneNode(!1)), sendAsyncMessage("youtubeenhancerplus:modify-favorites", {
							list: this.dataset.list,
							action: "delete",
							index: parseInt(this.dataset.index, 10)
						}))
					})
				}
			} catch (v) {
				c.textContent = "", c.parentNode.parentNode.insertAdjacentHTML("beforeend", '<div class="alert alert-error visible"><strong>' + l.error.replace(/[&"<>]/g, function(a) {
					return {
						"&": "&amp;",
						'"': "&quot;",
						"<": "&lt;",
						">": "&gt;"
					}[a]
				}) + "</strong> " + l["retrieve_" + a + "_error"].replace(/[&"<>]/g, function(a) {
					return {
						"&": "&amp;",
						'"': "&quot;",
						"<": "&lt;",
						">": "&gt;"
					}[a]
				}) + "</div>")
			}
			content.document.querySelector("#" + a).classList.remove("hidden")
		}
	}
	addMessageListener("youtubeenhancerplus:reset-button", function(a) {
		content.document.querySelector(a.data).classList.remove("active");
		/#delete-[playlists|videos]+/.test(a.data) && content.document.querySelector(a.data).parentNode.querySelector(".close-modal").click()
	});
	addMessageListener("youtubeenhancerplus:style", function(a) {
		content.document.querySelector("#style-" + a.data.id).value = a.data.css
	});
	addMessageListener("youtubeenhancerplus:custom-styles-completed", function() {
		content.document.querySelector("#edit-styles-btn").classList.add("hidden");
		[1, 2, 3, 4, 5].forEach(function(a) {
			content.document.querySelector("#style-" + a + "-btn").classList.remove("hidden")
		});
		content.document.querySelector("#custom-styles").classList.remove("hidden")
	});
	addMessageListener("youtubeenhancerplus:favorites", function(a) {
		w(a.data.list, a.data.json)
	});
	addMessageListener("youtubeenhancerplus:favorite-added", function(a) {
		content.document.querySelector("#youtube-enhancer-plus-options") && !content.document.querySelector("#" + a.data).classList.contains("hidden") && sendAsyncMessage("youtubeenhancerplus:favorites", {
			list: a.data
		})
	});
	addMessageListener("youtubeenhancerplus:edition-completed", function(a) {
		w(a.data.list, a.data.json);
		u.classList.remove("active");
		u.parentNode.querySelector(".close-modal").click()
	});
	addMessageListener("youtubeenhancerplus:init", function(d) {
		a = d.data.prefs;
		l = d.data.strings;
		q()
	});
	sendAsyncMessage("youtubeenhancerplus:options");
	addEventListener("DOMContentLoaded", function(a) {
		"#document" === a.originalTarget.nodeName && (a.originalTarget.defaultView.frameElement || "www.mrfdev.com" === a.originalTarget.location.host && 0 < a.originalTarget.location.href.indexOf("/youtube-enhancer-plus-options") && q())
	}, !1)
})();