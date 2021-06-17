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
const isInIframe = window.location !== window.parent.location;
const links = Array.from(document.getElementsByTagName("a"));
// Process all <a> tags on page
links.forEach((link) => {
    const url = link.getAttribute("href");
    if (!url) {
        // Ignore links with no href
    }
    else if (url.indexOf("://") > 0 || url.indexOf("//") === 0) {
        // If link is absolute, assume it points to external site and open it in new tab
        link.setAttribute("target", "_blank");
    }
    else if (isInIframe) {
        // If link is relative and page is inside an iframe, then send signal to command tree when link is clicked to make it update selected node
        link.setAttribute("onclick", "window.parent.postMessage(this.href, '*'); return true;");
    }
});
// Show Print button if inside iframe
if (isInIframe) {
    const printBtn = document.getElementById("btn-print");
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
    setTimeout(() => {
        btn.removeAttribute("aria-label");
        btn.removeAttribute("data-balloon-visible");
    }, 1000);
}
// Enable clipboard access for copy buttons
const clipboard = new (require("clipboard"))(".btn-copy");
clipboard.on("success", (e) => setTooltip(e.trigger, "Copied!"));
clipboard.on("error", (e) => setTooltip(e.trigger, "Failed!"));
// If in flat view, select currently scrolled to command in tree
if (isInIframe && (window.location.href.indexOf("/all.html") !== -1)) {
    let currentCmdName;
    window.onscroll = (_) => {
        const anchors = Array.from(document.getElementsByClassName("cmd-anchor"));
        for (const anchor of anchors) {
            const headerBounds = anchor.nextElementSibling.getBoundingClientRect();
            if (0 < headerBounds.bottom) {
                if (headerBounds.top < window.innerHeight) {
                    const cmdName = anchor.getAttribute("name");
                    if (cmdName && (cmdName !== currentCmdName)) {
                        window.parent.postMessage(cmdName + ".html", "*");
                        currentCmdName = cmdName;
                    }
                }
                break;
            }
        }
    };
}
