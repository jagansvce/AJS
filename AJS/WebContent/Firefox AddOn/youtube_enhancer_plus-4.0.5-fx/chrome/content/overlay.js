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
Components.utils.import("resource://gre/modules/AddonManager.jsm");
Components.utils.import("resource://gre/modules/osfile.jsm");
var YouTubeEnhancerPlus = {
	globalMM: null,
	windowMM: null,
	decoder: null,
	encoder: null,
	dataDir: null,
	dataFiles: null,
	prefs: {},
	prefsBranch: null,
	strings: null,
	install: !1,
	upgrade: !1,
	playlists: null,
	videos: null,
	notificationTime: 0,
	init: function() {
		var a = this;
		this.prefsBranch = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.youtubeenhancerplus.");
		this.prefsBranch.getPrefType("version") ? (this.dataDir = OS.Path.join(OS.Constants.Path.profileDir, "youtubeenhancerplus"), OS.File.exists(this.dataDir).then(function(b) {
			b || (a.dataDir = null, a.a())
		}).catch(function() {})) : (this.install = !0, this.a());
		this.prefs.backgroundcolor = this.prefsBranch.getCharPref("backgroundcolor");
		this.prefs.backgroundopacity = this.prefsBranch.getIntPref("backgroundopacity");
		this.prefs.backgroundtabsonly = this.prefsBranch.getBoolPref("backgroundtabsonly");
		this.prefs.cinemamode = this.prefsBranch.getBoolPref("cinemamode");
		this.prefs.cinemamodewideplayer = this.prefsBranch.getBoolPref("cinemamodewideplayer");
		this.prefs.customstyle = this.prefsBranch.getIntPref("customstyle");
		this.prefs.disableautoplay = this.prefsBranch.getBoolPref("disableautoplay");
		this.prefs.disablepreloading = this.prefsBranch.getBoolPref("disablepreloading");
		this.prefs.ignoreplaylists = this.prefsBranch.getBoolPref("ignoreplaylists");
		this.prefs.quality1 = this.prefsBranch.getCharPref("quality1");
		this.prefs.quality2 = this.prefsBranch.getCharPref("quality2");
		this.prefs.quality3 = this.prefsBranch.getCharPref("quality3");
		this.prefs.quality4 = this.prefsBranch.getCharPref("quality4");
		this.prefs.removeads = this.prefsBranch.getBoolPref("removeads");
		this.prefs.removeannotations = this.prefsBranch.getBoolPref("removeannotations");
		this.prefs.selectquality = this.prefsBranch.getBoolPref("selectquality");
		this.prefs.sidebarqualities = this.prefsBranch.getCharPref("sidebarqualities");
		this.prefs.sidebartopcountry = this.prefsBranch.getCharPref("sidebartopcountry");
		this.prefs.slideeffect = this.prefsBranch.getBoolPref("slideeffect");
		this.prefs.toolbarbuttons = this.prefsBranch.getCharPref("toolbarbuttons");
		this.prefs.toolbartheme = this.prefsBranch.getCharPref("toolbartheme");
		this.prefs.toolbartooltips = this.prefsBranch.getBoolPref("toolbartooltips");
		this.prefs.transparency = this.prefsBranch.getBoolPref("transparency");
		this.prefs.wideplayer = this.prefsBranch.getBoolPref("wideplayer");
		var b = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("");
		if (b.getPrefType("extensions.youtubeenhancerdotcom.installedversion")) {
			this.install = !1;
			this.upgrade = !0;
			var c;
			b.getPrefType("extensions.youtubeenhancerdotcom.playlists") && (c = b.getCharPref("extensions.youtubeenhancerdotcom.playlists"), "" !== c && '{"items":[]}' !== c && this.c("favorite-playlists.txt", c.replace('{"items":', '{"entries":').replace(/"id":/g, '"#":').replace(/"title":/g, '"t":')));
			b.getPrefType("extensions.youtubeenhancerdotcom.videos") && (c = b.getCharPref("extensions.youtubeenhancerdotcom.videos"), "" !== c && '{"items":[]}' !== c && this.c("favorite-videos.txt", c.replace('{"items":', '{"entries":').replace(/"id":/g, '"#":').replace(/"title":/g, '"t":')));
			b.getPrefType("extensions.youtubeenhancerdotcom.customstyle1") && (c = b.getCharPref("extensions.youtubeenhancerdotcom.customstyle1"), "" !== c && this.c("custom-style-1.css", c, !0));
			b.getPrefType("extensions.youtubeenhancerdotcom.customstyle2") && (c = b.getCharPref("extensions.youtubeenhancerdotcom.customstyle2"), "" !== c && this.c("custom-style-2.css", c, !0));
			b.getPrefType("extensions.youtubeenhancerdotcom.customstyle3") && (c = b.getCharPref("extensions.youtubeenhancerdotcom.customstyle3"), "" !== c && this.c("custom-style-3.css", c, !0));
			b.getPrefType("extensions.youtubeenhancerdotcom.customstyle4") && (c = b.getCharPref("extensions.youtubeenhancerdotcom.customstyle4"), "" !== c && this.c("custom-style-4.css", c, !0));
			b.getPrefType("extensions.youtubeenhancerdotcom.customstyle5") && (c = b.getCharPref("extensions.youtubeenhancerdotcom.customstyle5"), "" !== c && this.c("custom-style-5.css", c, !0));
			b.getPrefType("extensions.youtubeenhancerdotcom.adremover") && (this.prefs.removeads = "automatic" === b.getCharPref("extensions.youtubeenhancerdotcom.adremover") ? !0 : !1, this.prefsBranch.setBoolPref("removeads", this.prefs.removeads));
			b.getPrefType("extensions.youtubeenhancerdotcom.autoplay") && (this.prefs.disableautoplay = 0 === b.getIntPref("extensions.youtubeenhancerdotcom.autoplay") ? !0 : !1, this.prefsBranch.setBoolPref("disableautoplay", this.prefs.disableautoplay));
			b.getPrefType("extensions.youtubeenhancerdotcom.stopbuffering") && (this.prefs.disablepreloading = b.getBoolPref("extensions.youtubeenhancerdotcom.stopbuffering"), this.prefsBranch.setBoolPref("disablepreloading", this.prefs.disablepreloading));
			b.getPrefType("extensions.youtubeenhancerdotcom.backgroundtabsonly") && (this.prefs.backgroundtabsonly = b.getBoolPref("extensions.youtubeenhancerdotcom.backgroundtabsonly"), this.prefsBranch.setBoolPref("backgroundtabsonly", this.prefs.backgroundtabsonly));
			b.getPrefType("extensions.youtubeenhancerdotcom.ignoreplaylists") && (this.prefs.ignoreplaylists = b.getBoolPref("extensions.youtubeenhancerdotcom.ignoreplaylists"), this.prefsBranch.setBoolPref("ignoreplaylists", this.prefs.ignoreplaylists));
			b.getPrefType("extensions.youtubeenhancerdotcom.visualeffects") && (this.prefs.cinemamode = "automatic" === b.getCharPref("extensions.youtubeenhancerdotcom.visualeffects") ? !0 : !1, this.prefsBranch.setBoolPref("cinemamode", this.prefs.cinemamode));
			b.getPrefType("extensions.youtubeenhancerdotcom.widescreen") && (this.prefs.wideplayer = b.getBoolPref("extensions.youtubeenhancerdotcom.widescreen"), this.prefsBranch.setBoolPref("wideplayer", this.prefs.wideplayer));
			b.getPrefType("extensions.youtubeenhancerdotcom.widenwhenlightsdim") && (this.prefs.cinemamodewideplayer = b.getBoolPref("extensions.youtubeenhancerdotcom.widenwhenlightsdim"), this.prefsBranch.setBoolPref("cinemamodewideplayer", this.prefs.cinemamodewideplayer));
			b.getPrefType("extensions.youtubeenhancerdotcom.color") && (this.prefs.backgroundcolor = b.getCharPref("extensions.youtubeenhancerdotcom.color"), this.prefsBranch.setCharPref("backgroundcolor", this.prefs.backgroundcolor));
			b.getPrefType("extensions.youtubeenhancerdotcom.opacity") && (this.prefs.backgroundopacity = b.getIntPref("extensions.youtubeenhancerdotcom.opacity"), 50 > this.prefs.backgroundopacity && (this.prefs.backgroundopacity = 50), this.prefsBranch.setIntPref("backgroundopacity", this.prefs.backgroundopacity));
			b.getPrefType("extensions.youtubeenhancerdotcom.qualityselection") && (this.prefs.selectquality = "automatic" === b.getCharPref("extensions.youtubeenhancerdotcom.qualityselection") ? !0 : !1, this.prefsBranch.setBoolPref("selectquality", this.prefs.selectquality));
			b.getPrefType("extensions.youtubeenhancerdotcom.preferredquality") && (this.prefs.quality1 = b.getCharPref("extensions.youtubeenhancerdotcom.preferredquality"), this.prefsBranch.setCharPref("quality1", this.prefs.quality1));
			b.getPrefType("extensions.youtubeenhancerdotcom.secondaryquality") && (this.prefs.quality2 = b.getCharPref("extensions.youtubeenhancerdotcom.secondaryquality"), this.prefsBranch.setCharPref("quality2", this.prefs.quality2));
			b.getPrefType("extensions.youtubeenhancerdotcom.thirdquality") && (this.prefs.quality3 = b.getCharPref("extensions.youtubeenhancerdotcom.thirdquality"), this.prefsBranch.setCharPref("quality3", this.prefs.quality3));
			b.getPrefType("extensions.youtubeenhancerdotcom.fourthquality") && (this.prefs.quality4 = b.getCharPref("extensions.youtubeenhancerdotcom.fourthquality"), this.prefsBranch.setCharPref("quality4", this.prefs.quality4));
			b.getPrefType("extensions.youtubeenhancerdotcom.sidebarqualities") && (this.prefs.sidebarqualities = b.getCharPref("extensions.youtubeenhancerdotcom.sidebarqualities"), this.prefsBranch.setCharPref("sidebarqualities", this.prefs.sidebarqualities));
			b.clearUserPref("extensions.youtubeenhancerdotcom.installedversion");
			try {
				Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).deleteBranch("extensions.youtubeenhancerdotcom")
			} catch (d) {}
		}
		this.strings = document.querySelector("#youtube-enhancer-plus-strings");
		this.globalMM = Components.classes["@mozilla.org/globalmessagemanager;1"].getService(Components.interfaces.nsIMessageListenerManager);
		this.windowMM = window.messageManager;
		this.windowMM.loadFrameScript("chrome://youtubeenhancerplus/content/global.js", !0);
		this.windowMM.addMessageListener("youtubeenhancerplus:load-frame-script", function(a) {
			a.target.messageManager && a.target.messageManager.loadFrameScript("chrome://youtubeenhancerplus/content/" + a.data, !1)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:youtube", function(b) {
			b.target.messageManager.sendAsyncMessage("youtubeenhancerplus:init", {
				prefs: a.prefs,
				strings: {
					add_to_favorites: a.strings.getString("add_to_favorites"),
					cinema_mode: a.strings.getString("cinema_mode"),
					download_video: a.strings.getString("download_video"),
					loop_video: a.strings.getString("loop_video"),
					options: a.strings.getString("options"),
					remove_ads: a.strings.getString("remove_ads"),
					resize_player: a.strings.getString("resize_player"),
					watch_in_sidebar: a.strings.getString("watch_in_sidebar")
				}
			})
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:options", function(b) {
			b.target.messageManager.sendAsyncMessage("youtubeenhancerplus:init", {
				prefs: a.prefs,
				strings: {
					custom_style: a.strings.getString("custom_style"),
					"delete": a.strings.getString("delete"),
					edit: a.strings.getString("edit"),
					edit_playlist: a.strings.getString("edit_playlist"),
					edit_video: a.strings.getString("edit_video"),
					error: a.strings.getString("error"),
					info: a.strings.getString("info"),
					locale_code: a.strings.getString("locale_code"),
					no_favorite_playlist: a.strings.getString("no_favorite_playlist"),
					no_favorite_video: a.strings.getString("no_favorite_video"),
					page_available_in_your_language: a.strings.getString("page_available_in_your_language"),
					retrieve_playlists_error: a.strings.getString("retrieve_playlists_error"),
					retrieve_videos_error: a.strings.getString("retrieve_videos_error")
				}
			})
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:show-options", function() {
			a.l()
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:custom-styles", function(b) {
			a.u(b)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:save-style", function(b) {
			a.c("custom-style-" + b.data.id + ".css", b.data.css, !0, null, b.target)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:favorites", function(b) {
			a.o(b)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:modify-favorites", function(b) {
			a.p(b)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:sort-favorites", function(b) {
			a.q(b)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:export-favorites", function(b) {
			a.r(b)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:import-favorites", function(b) {
			a.s(b)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:delete-favorites", function(b) {
			a.t(b)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:download", function(b) {
			a.m(b)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:xmlhttprequest", function(b) {
			a.n(b)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:watch-in-sidebar", function(b) {
			a.i(!0);
			var c = setInterval(function() {
				a.g() && (clearInterval(c), document.querySelector("#sidebar").contentWindow.YouTubeEnhancerPlusSidebar.l(b.data.type, b.data.id, b.data.x, b.data.title))
			}, 20)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:change-preference", function(b) {
			"string" === typeof b.data.value ? a.prefsBranch.setCharPref(b.data.name, b.data.value) : "boolean" === typeof b.data.value ? a.prefsBranch.setBoolPref(b.data.name, b.data.value) : "number" === typeof b.data.value && a.prefsBranch.setIntPref(b.data.name, b.data.value)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:translate", function() {
			a.j("chrome://youtubeenhancerplus/content/i18n.html")
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:file-picker", function(b) {
			a.x(b)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:delete-persistent-data", function(b) {
			"backgroundcolor backgroundopacity backgroundtabsonly cinemamode cinemamodewideplayer customstyle disableautoplay disablepreloading ignoreplaylists quality1 quality2 quality3 quality4 removeads removeannotations selectquality sidebarqualities sidebartopcountry slideeffect toolbarbuttons toolbartheme toolbartooltips transparency wideplayer".split(" ").forEach(function(b) {
				a.prefsBranch.clearUserPref(b)
			});
			a.b(b.target)
		});
		this.globalMM.addMessageListener("youtubeenhancerplus:update-cookie", function(a) {
			setTimeout(function() {
				Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager2).add(".youtube.com", "/", "wide", a.data.wide, !1, !1, !0, Math.round((new Date).getTime() / 1E3) + 3600)
			}, 1E3)
		});
		this.windowMM.addMessageListener("youtubeenhancerplus:restart-browser", function() {
			Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup).quit(Components.interfaces.nsIAppStartup.eAttemptQuit | Components.interfaces.nsIAppStartup.eRestart)
		});
		AddonManager.getAddonByID("firefoxaddon@youtubeenhancer.com", function(b) {
			setTimeout(function() {
				if (a.install) {
					if (a.prefsBranch.setCharPref("version", b.version), a.prefsBranch.getCharPref("version") === b.version) a.d("install")
				} else {
					var c = Components.classes["@mozilla.org/xpcom/version-comparator;1"].getService(Components.interfaces.nsIVersionComparator);
					(a.upgrade || 0 > c.compare(a.prefsBranch.getCharPref("version"), b.version)) && a.prefsBranch.setCharPref("version", b.version)
				}
			}, 1500)
		});
		(a.install || a.upgrade) && setTimeout(function() {
			["playlists", "videos"].forEach(function(b) {
				OS.File.exists(OS.Path.join(OS.Constants.Path.profileDir, "youtubeenhancerplus", "favorite-" + b + ".txt")).then(function(c) {
					c || a.c("favorite-" + b + ".txt", '{"entries":[]}')
				}).catch(function() {})
			});
			[1, 2, 3, 4, 5].forEach(function(b) {
				OS.File.exists(OS.Path.join(OS.Constants.Path.profileDir, "youtubeenhancerplus", "custom-style-" + b + ".css")).then(function(c) {
					c || a.c("custom-style-" + b + ".css", "", !0)
				}).catch(function() {})
			})
		}, 1E4);
		AddonManager.addAddonListener({
			onUninstalling: function(b) {
				if ("firefoxaddon@youtubeenhancer.com" === b.id) a.d("uninstall")
			},
			onOperationCancelled: function(b) {
				"firefoxaddon@youtubeenhancer.com" === b.id && 0 === (b.pendingOperations & AddonManager.PENDING_UNINSTALL) && (a.prefsBranch.setCharPref("version", b.version), a.e(), Array.isArray(a.dataFiles) && 0 < a.dataFiles.length && a.dataFiles.forEach(function(a) {
					OS.File.move(OS.Path.join(OS.Constants.Path.tmpDir, OS.Path.basename(a)), a).catch(function() {})
				}))
			}
		});
		this.prefsBranch.QueryInterface(Components.interfaces.nsIPrefBranch);
		this.prefsBranch.addObserver("", this, !1);
		this.e()
	},
	observe: function(a, b, c) {
		if ("nsPref:changed" === b) {
			var d = this,
				e;
			switch (c) {
				case "backgroundopacity":
				case "customstyle":
					e = this.prefsBranch.getIntPref(c);
					break;
				case "backgroundtabsonly":
				case "cinemamode":
				case "cinemamodewideplayer":
				case "disableautoplay":
				case "disablepreloading":
				case "ignoreplaylists":
				case "removeads":
				case "removeannotations":
				case "selectquality":
				case "slideeffect":
				case "toolbartooltips":
				case "transparency":
				case "wideplayer":
					e = this.prefsBranch.getBoolPref(c);
					break;
				case "backgroundcolor":
				case "quality1":
				case "quality2":
				case "quality3":
				case "quality4":
				case "sidebarqualities":
				case "sidebartopcountry":
				case "toolbarbuttons":
				case "toolbartheme":
					e = this.prefsBranch.getCharPref(c)
			}
			this.prefs[c] = e;
			this.windowMM.broadcastAsyncMessage("youtubeenhancerplus:preference-changed", {
				name: c,
				value: e
			});
			if (this.f()) var f = setInterval(function() {
				d.g() && (clearInterval(f), document.querySelector("#sidebar").contentWindow.YouTubeEnhancerPlusSidebar.o(c, e))
			}, 20)
		}
	},
	a: function(a, b) {
		var c = this,
			d = OS.Path.join(OS.Constants.Path.profileDir, "youtubeenhancerplus");
		OS.File.makeDir(d).then(function() {
			c.dataDir = d;
			a && a.apply(c, b)
		}, function() {
			c.k("error", c.strings.getString("critical_error"), c.strings.getFormattedString("data_folder_not_created", [d]))
		})
	},
	b: function(a) {
		this.dataFiles = [];
		var b = this,
			c = new OS.File.DirectoryIterator(this.dataDir);
		c.forEach(function(a) {
			a.isDir || (b.dataFiles.push(a.path), OS.File.move(a.path, OS.Path.join(OS.Constants.Path.tmpDir, a.name)).catch(function() {}))
		}).then(function() {
			c.close();
			a.messageManager.sendAsyncMessage("youtubeenhancerplus:delete-persistent-data-completed", "success")
		}, function() {
			c.close();
			a.messageManager.sendAsyncMessage("youtubeenhancerplus:delete-persistent-data-completed", "error")
		})
	},
	c: function(a, b, c, d, e) {
		var f = this;
		if (null === this.dataDir) this.a(this.c, [a, b, c, d, e]);
		else {
			null === this.encoder && (this.encoder = new TextEncoder);
			var h = OS.Path.join(this.dataDir, a);
			OS.File.writeAtomic(h, this.encoder.encode(b), {
				tmpPath: OS.Path.join(OS.Constants.Path.tmpDir, a)
			}).then(function() {
				if (0 === a.indexOf("favorite")) {
					for (var g = 0 < a.indexOf("playlists") ? "playlists" : "videos", k = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getEnumerator("navigator:browser"); k.hasMoreElements();) k.getNext().YouTubeEnhancerPlus.y({
						list: g,
						json: b
					});
					"add" === d ? setTimeout(function() {
						f.k("success", f.strings.getString("request_completed"), f.strings.getString("playlists" === g ? "playlist_added_to_favorites" : "video_added_to_favorites"));
						e && e.messageManager.sendAsyncMessage("youtubeenhancerplus:reset-button", "favorite");
						f.globalMM.broadcastAsyncMessage("youtubeenhancerplus:favorite-added", g);
						if (f.f()) var a = setInterval(function() {
							f.g() && (clearInterval(a), document.querySelector("#sidebar").contentWindow.YouTubeEnhancerPlusSidebar.n("#add-to-" + g))
						}, 20)
					}, 500) : "edit" !== d && "delete" !== d && "sort" !== d && "delete-favorites" !== d || setTimeout(function() {
						"edit" === d ? (f.k("success", f.strings.getString("request_completed"), f.strings.getString("playlists" === g ? "playlist_edited" : "video_edited")), e.messageManager.sendAsyncMessage("youtubeenhancerplus:edition-completed", {
							list: g,
							json: b
						})) : "delete" === d ? (f.k("success", f.strings.getString("request_completed"), f.strings.getString("playlists" === g ? "playlist_deleted" : "video_deleted")), e.messageManager.sendAsyncMessage("youtubeenhancerplus:favorites", {
							list: g,
							json: b
						})) : "sort" === d ? (f.k("success", f.strings.getString("request_completed"), f.strings.getString("favorite_" + g + "_sorted")), e.messageManager.sendAsyncMessage("youtubeenhancerplus:favorites", {
							list: g,
							json: b
						}), e.messageManager.sendAsyncMessage("youtubeenhancerplus:reset-button", "#sort-" + g + "-btn")) : "delete-favorites" === d && (f.k("success", f.strings.getString("request_completed"), f.strings.getString("favorite_" + g + "_deleted")), e.messageManager.sendAsyncMessage("youtubeenhancerplus:favorites", {
							list: g,
							json: b
						}), e.messageManager.sendAsyncMessage("youtubeenhancerplus:reset-button", "#delete-" + g + "-btn"))
					}, 500)
				}
				c && OS.File.copy(h, OS.Path.join(OS.Constants.Path.profileDir, "extensions", "firefoxaddon@youtubeenhancer.com", "chrome", "resources", a)).then(function() {
					setTimeout(function() {
						f.globalMM.broadcastAsyncMessage("youtubeenhancerplus:custom-style-changed");
						e && e.messageManager.sendAsyncMessage("youtubeenhancerplus:reset-button", "#save-style-" + a.match(/\d/)[0] + "-btn")
					}, 500)
				}, function(b) {
					f.k("error", f.strings.getString("error"), f.strings.getFormattedString("data_file_not_copied", [a, b]));
					e && e.messageManager.sendAsyncMessage("youtubeenhancerplus:reset-button", "#save-style-" + a.match(/\d/)[0] + "-btn")
				})
			}, function(b) {
				f.k("error", f.strings.getString("critical_error"), f.strings.getFormattedString("data_file_not_created", [a, b]))
			})
		}
	},
	d: function(a) {
		"uninstall" === a && (this.prefsBranch.clearUserPref("version"), CustomizableUI.destroyWidget("youtube-enhancer-plus-button"));
		window.document.hasFocus() && this.j("https://www.mrfdev.com/youtube-enhancer-plus", a)
	},
	e: function() {
		try {
			CustomizableUI.createWidget({
				type: "button",
				defaultArea: CustomizableUI.AREA_NAVBAR,
				id: "youtube-enhancer-plus-button",
				label: "YouTube Enhancer Plus",
				tooltiptext: "YouTube Enhancer Plus",
				onCommand: function(a) {
					a.target.ownerDocument.defaultView.YouTubeEnhancerPlus.i(!1)
				}
			})
		} catch (a) {}
	},
	f: function() {
		return document.querySelector("#viewYouTubeEnhancerPlusSidebar").getAttribute("checked") ? !0 : !1
	},
	g: function() {
		try {
			var a = document.querySelector("#sidebar").contentWindow;
			if ("chrome://youtubeenhancerplus/content/sidebar.xul" === a.location.href && "object" === typeof a.YouTubeEnhancerPlusSidebar && a.YouTubeEnhancerPlusSidebar.ready) return !0
		} catch (b) {}
		return !1
	},
	h: function() {
		var a = this,
			b = setInterval(function() {
				a.g() && (clearInterval(b), document.querySelector("#sidebar").contentWindow.YouTubeEnhancerPlusSidebar.e())
			}, 20)
	},
	i: function(a) {
		"undefined" !== typeof SidebarUI ? a ? SidebarUI.show("viewYouTubeEnhancerPlusSidebar") : SidebarUI.toggle("viewYouTubeEnhancerPlusSidebar") : toggleSidebar("viewYouTubeEnhancerPlusSidebar", a)
	},
	j: function(a, b) {
		var c = gBrowser.addTab(null, {
				relatedToCurrent: !0
			}),
			d = gBrowser.getBrowserForTab(c);
		b && d.messageManager.loadFrameScript("chrome://youtubeenhancerplus/content/" + b + ".js", !1);
		gBrowser.selectedTab = c;
		d.webNavigation.loadURI(a, Components.interfaces.nsIWebNavigation.LOAD_FLAGS_NONE, Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI("https://www.mrfdev.com", "UTF-8", null), null, null)
	},
	k: function(a, b, c) {
		var d = (new Date).getTime(),
			e = d - this.notificationTime;
		this.notificationTime = d;
		setTimeout(function() {
			try {
				Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService).showAlertNotification("chrome://youtubeenhancerplus/skin/notification-" + a + "-48.png", b, c, !1, "", null, "")
			} catch (d) {
				Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher).openWindow(null, "chrome://global/content/alerts/alert.xul", "_blank", "chrome,titlebar=no,popup=yes", null).arguments = ["chrome://youtubeenhancerplus/skin/notification-" + a + "-48.png", b, c, !1, ""]
			}
		}, 4500 > e ? 4500 - e : 0)
	},
	l: function() {
		for (var a = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getEnumerator("navigator:browser"); a.hasMoreElements();)
			for (var b = a.getNext(), c = b.gBrowser, d = c.browsers.length, e = 0; e < d; e++)
				if (0 < c.getBrowserAtIndex(e).currentURI.spec.indexOf("/youtube-enhancer-plus-options")) {
					c.selectedTab = c.tabContainer.childNodes[e];
					b.focus();
					return
				}
		this.j("https://www.mrfdev.com/youtube-enhancer-plus-options?hl=" + this.strings.getString("locale_code"))
	},
	m: function(a) {
		var b = this,
			c = new FormData,
			d = new XMLHttpRequest,
			e = !0,
			f = !1,
			h = setTimeout(function() {
				e && (f = !0, d.abort(), a.target ? b.w(a.target, "download") : b.v("#download"), b.k("error", b.strings.getString("request_failed"), b.strings.getString("website_unreachable")))
			}, 3E4);
		d.onreadystatechange = function() {
			4 === d.readyState && (e = !1, a.target ? b.w(a.target, "download") : b.v("#download"), 200 === d.status && "ready" === d.responseText ? (clearTimeout(h), b.j("https://www.mrfdev.com/youtube-enhancer-plus")) : f || b.k("error", b.strings.getString("request_failed"), b.strings.getString("server_failed")))
		};
		d.open("POST", "http://api.mrfdev.com/ytdwnld", !0);
		c.append("ytplayer-config", JSON.stringify(a.data.ytplayer_config));
		d.send(c)
	},
	n: function(a) {
		var b = new XMLHttpRequest,
			c = "POST" === a.data.method ? new FormData : null;
		b.onreadystatechange = function() {
			4 === b.readyState && 200 === b.status && b.responseText && a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:" + a.data.message, b.responseText)
		};
		b.open(a.data.method, a.data.uri, !0);
		"POST" === a.data.method && c.append(a.data.input, a.data.value);
		b.send(c)
	},
	o: function(a) {
		var b = this,
			c = function() {
				setTimeout(function() {
					a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:favorites", {
						list: a.data.list,
						json: b[a.data.list]
					})
				}, 500)
			};
		if (null !== this[a.data.list]) c();
		else {
			var d = OS.Path.join(this.dataDir, "favorite-" + a.data.list + ".txt");
			OS.File.read(d).then(function(d) {
				null === b.decoder && (b.decoder = new TextDecoder);
				b[a.data.list] = b.decoder.decode(d);
				c()
			}, function() {
				a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:reset-button", "#manage-" + a.data.list + "-btn");
				b.k("error", b.strings.getString("critical_error"), b.strings.getFormattedString("favorite_" + a.data.list + "_not_found", [d]))
			})
		}
	},
	p: function(a) {
		var b = this,
			c = OS.Path.join(this.dataDir, "favorite-" + a.data.list + ".txt");
		if (null === this[a.data.list]) OS.File.read(c).then(function(c) {
			null === b.decoder && (b.decoder = new TextDecoder);
			b[a.data.list] = b.decoder.decode(c);
			b.p(a)
		}, function() {
			a.target ? b.w(a.target, "favorite") : b.v("#add-to-" + a.data.list);
			b.k("error", b.strings.getString("critical_error"), b.strings.getFormattedString("favorite_" + a.data.list + "_not_found", [c]))
		});
		else {
			if ("add" === a.data.action) {
				if (0 < this[a.data.list].indexOf(a.data.id)) {
					a.target ? this.w(a.target, "favorite") : this.v("#add-to-" + a.data.list);
					this.k("info", this.strings.getString("info"), this.strings.getString("playlists" === a.data.list ? "playlist_already_added" : "video_already_added"));
					return
				}
				try {
					JSON.parse(JSON.stringify({
						"#": a.data.id,
						t: a.data.title
					}))
				} catch (e) {
					a.target ? this.w(a.target, "favorite") : this.v("#add-to-" + a.data.list);
					this.k("error", this.strings.getString("request_failed"), this.strings.getString("add_to_favorite_" + a.data.list + "_error"));
					return
				}
			}
			try {
				var d = JSON.parse(this[a.data.list])
			} catch (e) {
				a.target ? this.w(a.target, "favorite") : this.v("#add-to-" + a.data.list);
				this.k("error", this.strings.getString("critical_error"), this.strings.getString("retrieve_" + a.data.list + "_error"));
				return
			}
			if ("add" === a.data.action) d.entries.push({
				"#": a.data.id,
				t: a.data.title
			});
			else if ("edit" === a.data.action || "delete" === a.data.action) "edit" === a.data.action ? (d.entries[a.data.index].t = a.data.title, "videos" === a.data.list && (0 < a.data.start ? d.entries[a.data.index].s = a.data.start : delete d.entries[a.data.index].s), a.data.index !== a.data.position && d.entries.splice(a.data.position, 0, d.entries.splice(a.data.index, 1)[0])) : d.entries.splice(a.data.index, 1);
			this[a.data.list] = JSON.stringify(d);
			this.c("favorite-" + a.data.list + ".txt", this[a.data.list], !1, a.data.action, a.target ? a.target : !1)
		}
	},
	q: function(a) {
		function b() {
			a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:reset-button", "#sort-" + a.data.list + "-btn")
		}
		try {
			var c = JSON.parse(this[a.data.list]);
			2 > c.entries.length ? b() : (c.entries.sort(function(a, b) {
				return a.t.localeCompare(b.t)
			}), this[a.data.list] = JSON.stringify(c), this.c("favorite-" + a.data.list + ".txt", this[a.data.list], !1, "sort", a.target))
		} catch (d) {
			b(), this.k("error", this.strings.getString("critical_error"), this.strings.getString("sort_" + a.data.list + "_error"))
		}
	},
	r: function(a) {
		var b = this,
			c = Components.interfaces.nsIFilePicker,
			d = Components.classes["@mozilla.org/filepicker;1"].createInstance(c),
			e = function() {
				a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:reset-button", "#export-" + a.data.list + "-btn")
			};
		d.init(window, null, c.modeSave);
		d.appendFilters(c.filterText);
		d.addToRecentDocs = !0;
		d.defaultExtension = "txt";
		d.defaultString = this.strings.getString("favorite_" + a.data.list + "_backup") + ".txt";
		d.open(function(f) {
			if (f !== c.returnCancel) {
				var h = OS.Path.join(b.dataDir, "favorite-" + a.data.list + ".txt");
				OS.File.copy(h, d.file.path).then(function(c) {
					setTimeout(function() {
						e();
						b.k("success", b.strings.getString("request_completed"), b.strings.getString("favorite_" + a.data.list + "_exported"))
					}, 500)
				}, function() {
					e();
					b.k("error", b.strings.getString("critical_error"), b.strings.getFormattedString("favorite_" + a.data.list + "_not_found", [h]))
				})
			} else e()
		})
	},
	s: function(a) {
		var b = this,
			c = Components.interfaces.nsIFilePicker,
			d = Components.classes["@mozilla.org/filepicker;1"].createInstance(c),
			e = function() {
				a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:reset-button", "#import-" + a.data.list + "-btn")
			};
		d.init(window, null, c.modeOpen);
		d.appendFilters(c.filterText);
		d.open(function(f) {
			f === c.returnOK ? OS.File.read(d.file.path).then(function(c) {
				null === b.decoder && (b.decoder = new TextDecoder);
				var d = b.decoder.decode(c);
				0 > d.indexOf('{"entries":') && (d = d.replace('{"items":', '{"entries":').replace(/"id":/g, '"#":').replace(/"title":/g, '"t":'));
				try {
					JSON.parse(d)
				} catch (f) {
					e();
					b.k("error", b.strings.getString("critical_error"), b.strings.getString("backup_file_not_valid"));
					return
				}
				null === b.encoder && (b.encoder = new TextEncoder);
				OS.File.writeAtomic(OS.Path.join(b.dataDir, "favorite-" + a.data.list + ".txt"), b.encoder.encode(d), {
					tmpPath: OS.Path.join(OS.Constants.Path.tmpDir, "favorite-" + a.data.list + ".txt")
				}).then(function(c) {
					setTimeout(function() {
						b[a.data.list] = d;
						a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:favorites", {
							list: a.data.list,
							json: d
						});
						e();
						b.k("success", b.strings.getString("request_completed"), b.strings.getString("favorite_" + a.data.list + "_imported"));
						for (var c = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getEnumerator("navigator:browser"); c.hasMoreElements();) c.getNext().YouTubeEnhancerPlus.y({
							list: a.data.list,
							json: d
						})
					}, 500)
				}, function() {
					e();
					b.k("error", b.strings.getString("critical_error"), b.strings.getString("import_favorite_" + a.data.list + "_error"))
				})
			}, function() {
				e();
				b.k("error", b.strings.getString("critical_error"), b.strings.getString("import_favorite_" + a.data.list + "_error"))
			}) : e()
		})
	},
	t: function(a) {
		this[a.data.list] = '{"entries":[]}';
		this.c("favorite-" + a.data.list + ".txt", this[a.data.list], !1, "delete-favorites", a.target)
	},
	u: function(a) {
		var b = this;
		[1, 2, 3, 4, 5].forEach(function(c) {
			var d = OS.Path.join(b.dataDir, "custom-style-" + c + ".css");
			OS.File.read(d).then(function(d) {
				null === b.decoder && (b.decoder = new TextDecoder);
				a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:style", {
					id: c,
					css: b.decoder.decode(d)
				});
				5 === c && setTimeout(function() {
					a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:custom-styles-completed")
				}, 500)
			}, function() {
				5 === c && a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:custom-styles-completed");
				b.k("error", b.strings.getString("critical_error"), b.strings.getFormattedString("data_file_not_found", ["custom-style-" + c + ".css", d]))
			})
		})
	},
	v: function(a) {
		if (this.f()) var b = this,
			c = setInterval(function() {
				b.g() && (clearInterval(c), document.querySelector("#sidebar").contentWindow.YouTubeEnhancerPlusSidebar.n(a))
			}, 20)
	},
	w: function(a, b) {
		a.messageManager.sendAsyncMessage("youtubeenhancerplus:reset-button", b)
	},
	x: function(a) {
		var b = Components.interfaces.nsIFilePicker,
			c = Components.classes["@mozilla.org/filepicker;1"].createInstance(b);
		c.init(window, null, b[a.data.mode]);
		"#audio" === a.data.input ? c.appendFilters(b.filterAudio | b.filterAll) : "#video" === a.data.input ? c.appendFilters(b.filterVideo | b.filterAll) : "#output" === a.data.input && c.appendFilters(b.filterAudio | b.filterVideo | b.filterAll);
		c.open(function(d) {
			d !== b.returnCancel && a.target.messageManager.sendAsyncMessage("youtubeenhancerplus:file-path", {
				input: a.data.input,
				path: c.file.path
			})
		})
	},
	y: function(a) {
		null !== this[a.list] && (this[a.list] = a.json);
		if (this.f()) var b = this,
			c = setInterval(function() {
				b.g() && (clearInterval(c), document.querySelector("#sidebar").contentWindow.YouTubeEnhancerPlusSidebar.o(a.list))
			}, 20)
	}
};
window.addEventListener("load", function load() {
	window.removeEventListener("load", load, !1);
	YouTubeEnhancerPlus.init()
}, !1);
window.addEventListener("resize", function() {
	YouTubeEnhancerPlus.f() && YouTubeEnhancerPlus.h()
}, !1);