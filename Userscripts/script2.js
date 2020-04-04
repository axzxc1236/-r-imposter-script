// ==UserScript==
// @name         auto_solver     what could went wrong???? ..3
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://gremlins-api.reddit.com/room?platform=desktop
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if (document.querySelector("gremlin-prompt h1") &&
       document.querySelector("gremlin-prompt h1").textContent == "Something went wrong...")
        window.location.reload();
    else {
        httpGet("http://127.0.0.1:34563/clear");
        setTimeout(() => {
            const options = document.querySelectorAll("gremlin-note");
            for (let i = 0; i<options.length; i++)
                httpGet("http://127.0.0.1:34563/read_options?index=" + i + "&value=" + options[i].innerText);
        }, 500);
    }

    setTimeout(() => {
        //get choice from server;
        console.log("pick option");
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://127.0.0.1:34563/pick_option",
            onload: function(res) {
                console.log("response = " + res.response);
                document.querySelectorAll("gremlin-note")[JSON.parse(res.response)].click();
            }
        });
    }, 1800);

    //In case any error happened.
    setTimeout(window.location.reload, 60000);
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