// ==UserScript==
// @name         auto_solver     what could went wrong???? ..2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       axzxc1236
// @match        https://gremlins-api.reddit.com/results?prev_result=WIN&platform=desktop
// @match        https://gremlins-api.reddit.com/results?prev_result=LOSE&platform=desktop
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if (window.location.href == "https://gremlins-api.reddit.com/results?prev_result=WIN&platform=desktop") {
        httpGet("http://127.0.0.1:34563/correct");
    } else {
        httpGet("http://127.0.0.1:34563/incorrect");
    }
    setTimeout(() => {
        if (document.querySelector("gremlin-action a").href == "https://gremlins-api.reddit.com/room")
            document.querySelector("gremlin-action a").click();
    }, Math.floor(Math.random()*2000));
})();

function httpGet(theUrl)
{
    GM_xmlhttpRequest({
        method: "GET",
        url: theUrl,
        onload: function(res) {
            console.log(res.response);
        }
    });
}