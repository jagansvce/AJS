/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

/**
 * JS module implementation of nsIDOMJSWindow.setTimeout, setInterval, clearTimeout, and clearInterval.
 *
 * Important: Users of instances of nsITimer should keep a reference to the timer until it is no
 * longer needed in order to assure the timer is fired.
 * https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsITimer
 */

this.EXPORTED_SYMBOLS = ["setTimeout", "clearTimeout", "setInterval", "clearInterval"];

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://gre/modules/XPCOMUtils.jsm");

// This gives us >=2^30 unique timer IDs, enough for 1 per ms for 12.4 days.
let gNextId = 1; // setTimeout and setInterval must return a positive integer

let gTimerTable = new Map(); // int -> nsITimer

this.setTimeout = function setTimeout(aCallback, aMilliseconds) {
	let id = gNextId++;
	let args = Array.slice(arguments, 2);
	let timer = Cc["@mozilla.org/timer;1"].createInstance(Ci.nsITimer);
	timer.initWithCallback(function setTimeout_timer() {
		gTimerTable.delete(id);
		aCallback.apply(null, args);
	}, aMilliseconds, timer.TYPE_ONE_SHOT);

	gTimerTable.set(id, timer);
	return id;
}

this.setInterval = function setInterval(aCallback, aMilliseconds) {
	let id = gNextId++;
	let args = Array.slice(arguments, 2);
	let timer = Cc["@mozilla.org/timer;1"].createInstance(Ci.nsITimer);
	timer.initWithCallback(function setInterval_timer() {
		aCallback.apply(null, args);
	// }, aMilliseconds, timer.TYPE_REPEATING_SLACK);
	}, aMilliseconds, timer.TYPE_REPEATING_PRECISE_CAN_SKIP);

	gTimerTable.set(id, timer);
	return id;
}

this.clearInterval = this.clearTimeout = function clearTimeout(aId) {
	if (gTimerTable.has(aId)) {
		gTimerTable.get(aId).cancel();
		gTimerTable.delete(aId);
	}
}