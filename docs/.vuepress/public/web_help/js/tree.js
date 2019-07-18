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
const jquery_1 = __importDefault(require("jquery"));
const bootstrap = require("bootstrap");
const jstree = require("jstree");
let currentNodeId;
let isFlattened = false;
let searchStrList;
let searchTimeout = 0;
function searchTree(_, node) {
    if ((node.parent === "#") && !isFlattened) {
        return false; // Don't match root node
    }
    const fullCmd = node.id.slice(0, -5).replace(/_/g, " ");
    for (const searchStr of searchStrList) {
        const matchIndex = fullCmd.indexOf(searchStr);
        if (matchIndex !== -1) {
            if (isFlattened || (fullCmd.indexOf(" ", matchIndex + searchStr.length) === -1)) {
                return true;
            }
        }
    }
    return false;
}
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
    return searchWordsList.map((words) => words.join(" "));
}
function selectCurrentNode(alsoExpand) {
    jquery_1.default("#cmd-tree").jstree(true).deselect_all();
    jquery_1.default("#cmd-tree").jstree(true).select_node(currentNodeId);
    if (alsoExpand) {
        jquery_1.default("#cmd-tree").jstree(true).open_node(currentNodeId);
    }
    const node = document.getElementById(currentNodeId);
    if (node !== null) {
        node.scrollIntoView();
    }
}
function updateSearch() {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    searchTimeout = window.setTimeout(() => {
        const searchStr = (jquery_1.default("#tree-search").val() || "").toString().trim();
        searchStrList = permuteSearchStr(searchStr);
        jquery_1.default("#cmd-tree").jstree(true).search(searchStr);
    }, 250);
}
function genFlattenedNodes(nestedNodes) {
    const flattenedNodes = [];
    nestedNodes.forEach((node) => {
        if (node.children && (node.children.length > 0)) {
            flattenedNodes.push(...genFlattenedNodes(node.children));
        }
        else {
            flattenedNodes.push({
                id: node.id,
                text: node.id.slice(0, -5).replace(/_/g, " "),
                children: undefined
            });
        }
    });
    return flattenedNodes;
}
function loadTree() {
    const urlParams = new URLSearchParams(window.location.search);
    jquery_1.default("#header-text").text(headerStr);
    jquery_1.default("#footer").text(footerStr);
    jquery_1.default("#cmd-tree").jstree({
        core: {
            animation: 0,
            multiple: false,
            themes: {
                icons: false
            },
            data: treeNodes
        },
        plugins: ["search", "wholerow"],
        search: {
            show_only_matches: true,
            show_only_matches_children: true,
            search_callback: searchTree
        },
    }).on("changed.jstree", (_, data) => {
        // Change src attribute of iframe when item selected
        if (data.selected.length > 0) {
            currentNodeId = data.selected[0];
            jquery_1.default("#docs-page").attr("src", `./docs/${currentNodeId}`);
        }
    }).on("loaded.jstree", () => {
        // Select and expand root node when page loads
        const nodeId = cmdToLoad || urlParams.get("p");
        currentNodeId = (nodeId === null) ? treeNodes[0].id : `${nodeId}.html`;
        selectCurrentNode(true);
    });
    if (urlParams.get("t") === "0") {
        toggleTreeView();
    }
    jquery_1.default("#tree-search").on("change keyup mouseup paste", updateSearch);
    window.addEventListener("message", (e) => {
        currentNodeId = e.data.slice(e.data.lastIndexOf("/") + 1);
        selectCurrentNode(false);
    }, false);
}
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
function toggleTreeView() {
    isFlattened = !isFlattened;
    const newNodes = isFlattened ? genFlattenedNodes(treeNodes) : treeNodes;
    jquery_1.default("#cmd-tree").jstree(true).settings.core.data = newNodes;
    jquery_1.default("#cmd-tree").jstree(true).refresh(false, true);
    setTimeout(() => selectCurrentNode(true), 250);
    const otherViewName = isFlattened ? "Tree View" : "List View";
    jquery_1.default("#tree-view-toggle").text(`Switch to ${otherViewName}`);
    jquery_1.default("#tree-expand-all").toggle();
    jquery_1.default("#tree-collapse-all").toggle();
}
function expandAll(expanded) {
    if (expanded) {
        jquery_1.default("#cmd-tree").jstree("open_all");
    }
    else {
        jquery_1.default("#cmd-tree").jstree("close_all");
        jquery_1.default("#cmd-tree").jstree(true).toggle_node(treeNodes[0].id);
    }
}
