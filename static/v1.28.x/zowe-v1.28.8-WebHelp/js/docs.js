"use strict";
/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/
// Array.from polyfill for IE11 support
function arrayFrom(items) {
    if (typeof Array.from === "function") {
        return Array.from(items);
    }
    var tempArray = [];
    for (var i = 0; i < items.length; i++) {
        tempArray.push(items[i]);
    }
    return tempArray;
}
var isInIframe = window.location !== window.parent.location;
var links = arrayFrom(document.getElementsByTagName("a"));
var sameOrigin = window.location.protocol !== "file:" ? window.location.origin : "*";
// Process all <a> tags on page
links.forEach(function (link) {
    var url = link.getAttribute("href");
    if (!url) {
        // Ignore links with no href
    }
    else if (url.indexOf("://") > 0 || url.indexOf("//") === 0) {
        // If link is absolute, assume it points to external site and open it in new tab
        link.setAttribute("target", "_blank");
    }
    else if (isInIframe) {
        // If link is relative and page is inside an iframe, then send signal to command tree when link is clicked to make it update selected node
        link.onclick = function (e) {
            window.parent.postMessage(e.target.href, sameOrigin);
            return true;
        };
    }
});
// Show Print button if inside iframe
if (isInIframe) {
    var printBtn = document.getElementById("btn-print");
    if (printBtn) {
        printBtn.style.display = "block";
    }
}
/**
 * Show tooltip next to copy button that times out after 1 sec
 * @param btn - Button element the tooltip will show next to
 * @param message - Message to show in the tooltip
 */
function setTooltip(btn, message) {
    btn.setAttribute("aria-label", message);
    btn.setAttribute("data-balloon-visible", "");
    var maxTimeout = 1000;
    setTimeout(function () {
        btn.removeAttribute("aria-label");
        btn.removeAttribute("data-balloon-visible");
    }, maxTimeout);
}
// Enable clipboard access for copy buttons
var clipboard = new ClipboardJS(".btn-copy");
clipboard.on("success", function (e) { return setTooltip(e.trigger, "Copied!"); });
clipboard.on("error", function (e) { return setTooltip(e.trigger, "Failed!"); });
/**
 * Find the currently scrolled to command anchor in iframe
 * @returns Element with <a> tag
 */
function findCurrentCmdAnchor() {
    var anchors = arrayFrom(document.getElementsByClassName("cmd-anchor"));
    var lastAnchor;
    for (var _i = 0, anchors_1 = anchors; _i < anchors_1.length; _i++) {
        var anchor = anchors_1[_i];
        var headerBounds = anchor.nextElementSibling.getBoundingClientRect();
        if (headerBounds.top > window.innerHeight) {
            break;
        }
        lastAnchor = anchor;
    }
    return lastAnchor;
}
// If in flat view, select currently scrolled to command in tree
if (isInIframe && window.location.href.indexOf("/all.html") !== -1) {
    var currentCmdName_1;
    window.onscroll = function (_) {
        var _a;
        var cmdName = (_a = findCurrentCmdAnchor()) === null || _a === void 0 ? void 0 : _a.getAttribute("name");
        if (cmdName != null && cmdName !== currentCmdName_1) {
            window.parent.postMessage(cmdName + ".html", sameOrigin);
            currentCmdName_1 = cmdName;
        }
    };
}
