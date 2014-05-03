var MAXCHILDREN = 30;
var OLDPARENT = "";


chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed.");
  localStorage.counter = 0;
});


function stringifyNode(nodeId){
  var node = JSON.parse(localStorage['node' + nodeId]);
  var name = node.name;
  var children = node.children;
  var res = "{ name:" + name + ", children: [";

  for(var i = 0; i < children.length; i++){
    res = res + stringifyNode(childId);
    if(i != children.length - 1){res =res + ",";}
  }

  res = res + " ]}"
}


function stringifyTree(tabId){
  //If this tab isn't stored, we'll just return nothing.
  if(!localStorage.hasOwnProperty('root' + tabId)){
    return "";
  }

  var root = JSON.parse(localStorage['root' + tabId]);
  return stringifyNode(root.id);
}


function objectifyNode(nodeId){
  var node = JSON.parse(localStorage['node'+nodeId]);
  var newChildren = [];
  var oldChildren = node.children;
  console.log[oldChildren];
  for(var i = 0; i < oldChildren.length; i++){
    console.log[oldChildren[i]];
    newChildren.push(objectifyNode(oldChildren[i]));
  }
  node.children = newChildren;
  return node;
}


function objectifyTree(tabId){
  //If this tab isn't stored, we'll just return nothing.
  if(!localStorage.hasOwnProperty('root' + tabId)){
    return null;
  }

  var root = JSON.parse(localStorage['root' + tabId]);
  return objectifyNode(root.id);
}

chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {

    //If the tab didn't change we return
    if(!changeInfo.hasOwnProperty('url')) {return;}

    if(changeInfo.url.substr(0,6) == 'chrome') {return;}
    if(changeInfo.url == OLDPARENT) {return;}

    //get the new Id
    var newId = localStorage.counter++;
    
    var curr = 'currOnTab' + tabId;
    //check if this is the first time a tab was used.
    if(!localStorage.hasOwnProperty('currOnTab' + tabId)){
      var rootname = 'root' + tabId;
      var root = {
        id:  newId,
        name: 'New Tab',
        children: []
      };
      newId = localStorage.counter++;
      localStorage[curr] = JSON.stringify(root);
      localStorage[rootname] = JSON.stringify(root); 
      localStorage["node" + root.id] = JSON.stringify(root);
    }

    var newParent = JSON.parse(localStorage[curr]);

    if(newParent.hasOwnProperty('parent')){
      var parParent = JSON.parse(localStorage['node' + newParent.parent]);

      if(changeInfo.url == parParent.url){
        localStorage[curr] = JSON.stringify(parParent);
        return;
      }
    }

    for(var j = 0; j < newParent.children.length; j++){
      var testChild = JSON.parse(localStorage['node' + newParent.children[j]]);
      if(testChild.url == changeInfo.url){
        localStorage[curr] = JSON.stringify(testChild);
        return;
      }
    }

    var title = changeInfo.url;

    if(newParent != null && newParent.url != null){
      console.log(title);
      var strslice = newParent.url.slice(0, newParent.url.lastIndexOf("/"));
      title = title.replace(strslice,"");
      console.log("REPLACED " + strslice);
      console.log(title);
    }

    title = title.replace("https://","");
    title = title.replace("http://","");
    title = title.replace("www.","");

    OLDPARENT = changeInfo.url;

    //build my storage info
    var myInfo = {
      parent: newParent.id,
      id : newId,
      children : [],
      tab: tabId,
      name: title,
      url : changeInfo.url
    }

    myInfo.fUrl = (changeInfo.hasOwnProperty('faviconURL')) ? changeInfo.faviconURL : newParent.faviconURL;

    newParent.children.push("" + myInfo.id);
    localStorage['node' + newParent.id] = JSON.stringify(newParent);

    var store = JSON.stringify(myInfo);
    localStorage["node" + newId] = store;
    localStorage['currOnTab' + tabId] = store;
  }
);


chrome.commands.onCommand.addListener(function(command) {
  var mapURL = chrome.extension.getURL("tree.html");
  chrome.tabs.update({url: mapURL});
});


chrome.browserAction.onClicked.addListener(function(tab){
  var mapURL = chrome.extension.getURL("tree.html");
  chrome.tabs.update({url:mapURL});
});
