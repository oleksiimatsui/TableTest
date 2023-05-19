
function ToggleFirstCol(id, isClosed) {
    let elements = document.getElementsByName(id+"_");
    let Header = document.getElementsByName(id)[0];
    ToggleFirstCell(Header, isClosed);
    for (var i = 0; i < elements.length; i++) {
        ToggleFirstCell(elements[i], isClosed);
    }
}
function ToggleColumn(id, isClosed) {
    let elements = document.getElementsByName(id+"_");
    let Header = document.getElementsByName(id)[0];
    ToggleCellDisplay(Header, isClosed);
    for (var i = 0; i < elements.length; i++) {
        ToggleCellDisplay(elements[i], isClosed);
    }
}

function ToggleCell(element, isClosed) {
    var childs = element.children;
    if(childs == null) return;
    for (var i = 0; i < childs.length; i++) {
      var child = childs[i];
      if( isClosed ){
        child.classList.remove("hiddenCell");
        }else{
            child.classList.add("hiddenCell");
        }
    }
}

function ToggleFirstCell(element, isClosed) {
    var childs = element.children;
    if(childs == null) return;
    console.log("childs " + childs.length);
    for (var i = 0; i < childs.length; i++) {
      var child = childs[i];
      if( isClosed ){
            child.classList.remove("hiddenCell");
        }else{
            child.classList.add("hiddenCell");
        }
    }    
}

function ToggleHeader(element, isClosed) {
    var childs = element.children;
    element.style.width = "40px";
    if(childs == null) return;
    for (var i = 0; i < childs.length; i++) {
      var child = childs[i];
      if(child.tagName != "BUTTON"){
        child.style.display = isClosed == true ? "" : "none";
      }else{
        child.innerHTML = isClosed ? "-" : "+";
        child.setAttribute('title', isClosed ? "" : element.getAttribute("name"));
      }
    }
}

function ToggleCellDisplay(element, isClosed) {
    element.style.display = isClosed == true ? "" : "none";
}

function toggle(e) {
    let isClosed = e.target.innerHTML == "+" ? true : false;
    e.target.innerHTML = isClosed ? "-" : "+";
    let header = e.target.parentElement;
    let parentName = header.getAttribute("name");
    childCol = document.getElementsByName(parentName + "." + 0)[0];
    ToggleHeader(header, isClosed);
    if(childCol == null){
        header
        let elements = document.getElementsByName(parentName +"_");
        for (let i = 0; i < elements.length; i++) {
            ToggleCell(elements[i], isClosed);
        }
    }else{
        let i = 0;
        ToggleFirstCol(parentName + "." + i, isClosed);
        i = 1;
        childCol = document.getElementsByName(parentName + "." + i)[0];
        while(childCol != null){
            ToggleColumn(parentName + "." + i, isClosed);
            i++;
            childCol = document.getElementsByName(parentName + "." + i)[0];
        }
        header.colSpan = header.colSpan == i ? 1 : i;
    }
    
}