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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var isInIframe = window.location !== window.parent.location;
var links = Array.from(document.getElementsByTagName("a"));
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
    var oneSecAsMillis = 1000;
    btn.setAttribute("aria-label", message);
    btn.setAttribute("data-balloon-visible", "");
    setTimeout(function () {
        btn.removeAttribute("aria-label");
        btn.removeAttribute("data-balloon-visible");
    }, oneSecAsMillis);
}
// Enable clipboard access for copy buttons
var copyButtons = Array.from(document.getElementsByClassName("btn-copy"));
copyButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
        var success, textToCopy, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    success = false;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    textToCopy = btn.dataset.clipboardText;
                    if (!textToCopy) return [3 /*break*/, 3];
                    return [4 /*yield*/, navigator.clipboard.writeText(textToCopy)];
                case 2:
                    _b.sent();
                    success = true;
                    _b.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 5:
                    setTooltip(btn, success ? "Copied!" : "Failed!");
                    return [2 /*return*/];
            }
        });
    }); });
});
/**
 * Find the currently scrolled to command anchor in iframe
 * @returns Element with <a> tag
 */
function findCurrentCmdAnchor() {
    var anchors = Array.from(document.getElementsByClassName("cmd-anchor"));
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
