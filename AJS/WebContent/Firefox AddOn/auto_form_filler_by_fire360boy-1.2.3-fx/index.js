// Programming By Fire360Boy
// Email : Fire360Boy@gmail.com

var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');

var button = buttons.ActionButton({
    id: "filler_Fire360Boy",
    label: "Fill Current Form , Fire360Boy",
    icon: {
        "16": "./16.png",
        "32": "./32.png",
        "64": "./64.png"
    },
    onClick: attach
});
function attach(state) {
    require("sdk/tabs").activeTab.attach({
        contentScriptFile: self.data.url("./filler.js")
    });
}

