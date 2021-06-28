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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports to help Browserify find dependencies
const jquery_1 = __importDefault(require("jquery"));
const bootstrap = require("bootstrap");
const jstree = require("jstree");
const scrollIntoView = require("scroll-into-view-if-needed");
// Define global variables
const urlParams = new URLSearchParams(window.location.search);
let currentNodeId;
let currentView = +(urlParams.get("v") === "1");
let searchTimeout = 0;
/**
 * Generate flattened list of tree nodes
 * @param nestedNodes - Node list for command tree
 * @returns Flattened node list
 */
function flattenNodes(nestedNodes) {
    const flattenedNodes = [];
    nestedNodes.forEach((node) => {
        if (node.children && (node.children.length > 0)) {
            flattenedNodes.push(...flattenNodes(node.children));
        }
        else {
            flattenedNodes.push({
                id: node.id,
                text: node.id.slice(0, -5).replace(/_/g, " ")
            });
        }
    });
    return flattenedNodes;
}
/**
 * Find all possible combinations of a search string that exist with different aliases
 * @param searchStr - Search string input by user
 * @returns NUL-delimited list of search strings with all combinations of aliases
 */
function permuteSearchStr(searchStr) {
    const searchWords = searchStr.split(" ");
    const searchWordsList = [searchWords];
    for (let i = 0; i < searchWords.length; i++) {
        const word = searchWords[i];
        if (aliasList[word] !== undefined) {
            const newSearchWordsList = [];
            searchWordsList.forEach((oldSearchWords) => {
                aliasList[word].forEach((alias) => {
                    newSearchWordsList.push([...oldSearchWords.slice(0, i), alias, ...oldSearchWords.slice(i + 1)]);
                });
            });
            searchWordsList.push(...newSearchWordsList);
        }
    }
    return searchWordsList.map((words) => words.join(" ")).join("\0");
}
/**
 * Update node that docs are displayed for
 * @param newNodeId - Node ID to select
 * @param goto - Whether to load docs page for node
 * @param expand - Whether to expand tree node
 * @param force - Whether to update node even if already selected
 */
function updateCurrentNode(newNodeId, goto, expand, force = false) {
    if (!force) {
        if ((newNodeId === currentNodeId) || !jquery_1.default("#cmd-tree").jstree(true).get_node(newNodeId)) {
            // Ignore if node already selected or does not exist
            return;
        }
    }
    currentNodeId = newNodeId;
    if (goto) {
        // Load docs page for node in iframe
        if (currentView === 0) {
            jquery_1.default("#docs-page").attr("src", `./docs/${currentNodeId}`);
        }
        else {
            jquery_1.default("#docs-page").attr("src", `./docs/all.html#${currentNodeId.slice(0, -5)}`);
        }
    }
    // Select node in command tree
    jquery_1.default("#cmd-tree").jstree(true).deselect_all();
    jquery_1.default("#cmd-tree").jstree(true).select_node(currentNodeId);
    if (expand) {
        // Expand node in command tree
        jquery_1.default("#cmd-tree").jstree(true).open_node(currentNodeId);
    }
    // Scroll node into view if needed
    setTimeout(() => {
        const nodeElem = document.getElementById(currentNodeId);
        scrollIntoView(nodeElem, { scrollMode: "if-needed", block: "nearest", inline: "nearest" });
    }, 0);
    // Update URL in address bar to contain node ID
    const baseUrl = window.location.href.replace(window.location.search, "");
    let queryString = "";
    if (currentNodeId !== treeNodes[0].id) {
        queryString = "?p=" + currentNodeId.slice(0, -5);
    }
    if (currentView === 1) {
        queryString = (queryString.length > 0) ? (queryString + "&v=1") : "?v=1";
    }
    window.history.replaceState(null, "", baseUrl + queryString);
}
/**
 * Generate list of context menu items for a node
 * @param node - Node that was right clicked
 * @return List of context menu items containing labels and actions
 */
function onTreeContextMenu(node) {
    if (node.id !== treeNodes[0].id) {
        return {};
    }
    return {
        expandAll: {
            label: "Expand All",
            action: () => {
                jquery_1.default("#cmd-tree").jstree("open_all");
            }
        },
        collapseAll: {
            label: "Collapse All",
            action: () => {
                jquery_1.default("#cmd-tree").jstree("close_all");
                jquery_1.default("#cmd-tree").jstree(true).toggle_node(treeNodes[0].id);
            }
        }
    };
}
/**
 * Check if node is matched by a search string
 * @param permutedSearchStr - NUL-delimited list of search strings
 * @param node
 * @returns True if the node matches
 */
function onTreeSearch(permutedSearchStr, node) {
    if ((node.parent === "#") && (currentView === 0)) {
        return false; // Don't match root node
    }
    // Strip off ".html" to get full command name
    const fullCmd = node.id.slice(0, -5).replace(/_/g, " ");
    const searchStrList = permutedSearchStr.split("\0");
    // Do fuzzy search that allows space or no char to be substituted for hyphen
    for (const haystack of [fullCmd, fullCmd.replace(/-/g, " "), fullCmd.replace(/-/g, "")]) {
        for (const needle of searchStrList) {
            const matchIndex = haystack.lastIndexOf(needle);
            if (matchIndex !== -1) { // A search string was matched
                if ((currentView === 1) || (haystack.indexOf(" ", matchIndex + needle.length) === -1)) {
                    // Don't match node if text that matches is only in label of parent node
                    return true;
                }
            }
        }
    }
    return false;
}
/**
 * Update current node and search bar after command tree (re)loaded
 */
function onTreeLoaded() {
    let tempNodeId = currentNodeId;
    if (!tempNodeId) {
        const tempCmdToLoad = cmdToLoad || urlParams.get("p");
        tempNodeId = tempCmdToLoad ? `${tempCmdToLoad}.html` : treeNodes[0].id;
    }
    updateCurrentNode(tempNodeId, true, true, true);
    if (jquery_1.default("#tree-search").val()) {
        onSearchTextChanged(true);
    }
}
/**
 * Update current node after new node selected in tree
 * @param _
 * @param data - jsTree event data
 */
function onTreeSelectionChanged(_, data) {
    // Change src attribute of iframe when item selected
    if (data.selected.length > 0) {
        updateCurrentNode(data.selected[0], true, true);
    }
}
/**
 * Search command tree after text in search box has changed
 * @param noDelay - If true, searches instantly rather than delaying 250 ms
 */
function onSearchTextChanged(noDelay = false) {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    searchTimeout = window.setTimeout(() => {
        const searchStr = (jquery_1.default("#tree-search").val() || "").toString().trim();
        jquery_1.default("#cmd-tree").jstree(true).search(permuteSearchStr(searchStr));
        if (!searchStr) {
            updateCurrentNode(currentNodeId, false, false, true);
        }
    }, noDelay ? 0 : 250);
}
/**
 * Update selected node in command tree after new page loaded in iframe
 * @param e - Event object sent by postMessage
 */
function onDocsPageChanged(e) {
    const tempNodeId = e.data.slice(e.data.lastIndexOf("/") + 1);
    updateCurrentNode(tempNodeId, false, false);
}
/**
 * Load command tree components
 */
function loadTree() {
    // Set header and footer strings
    jquery_1.default("#header-text").text(headerStr);
    jquery_1.default("#footer").text(footerStr);
    // Change active tab if not loading default view
    if (currentView === 1) {
        jquery_1.default("#tree-view-link").toggleClass("active");
        jquery_1.default("#flat-view-link").toggleClass("active");
    }
    // Load jsTree
    jquery_1.default("#cmd-tree").jstree({
        core: {
            animation: 0,
            multiple: false,
            themes: { icons: false },
            data: (currentView === 0) ? treeNodes : flattenNodes(treeNodes)
        },
        plugins: ["contextmenu", "search", "wholerow"],
        contextmenu: {
            items: onTreeContextMenu
        },
        search: {
            show_only_matches: true,
            show_only_matches_children: true,
            search_callback: onTreeSearch
        }
    })
        .on("model.jstree", onTreeLoaded)
        .on("changed.jstree", onTreeSelectionChanged);
    // Connect events to search box and iframe
    jquery_1.default("#tree-search").on("change keyup mouseup paste", () => onSearchTextChanged());
    window.addEventListener("message", onDocsPageChanged, false);
}
/**
 * Toggle visibility of command tree
 * @param splitter - Split.js object
 */
function toggleTree(splitter) {
    if (jquery_1.default("#panel-left").is(":visible")) {
        jquery_1.default("#panel-left").children().hide();
        jquery_1.default("#panel-left").hide();
        splitter.setSizes([0, 100]);
    }
    else {
        splitter.setSizes([20, 80]);
        jquery_1.default("#panel-left").show();
        jquery_1.default("#panel-left").children().show();
    }
}
/**
 * Change display mode of page
 * @param newMode - 0 = Tree View, 1 = Flat View
 */
function changeView(newMode) {
    if (newMode === currentView) {
        return;
    }
    currentView = newMode;
    jquery_1.default("#tree-view-link").toggleClass("active");
    jquery_1.default("#flat-view-link").toggleClass("active");
    const newNodes = (currentView === 0) ? treeNodes : flattenNodes(treeNodes);
    jquery_1.default("#cmd-tree").jstree(true).settings.core.data = newNodes;
    jquery_1.default("#cmd-tree").jstree(true).refresh(false, true);
}
