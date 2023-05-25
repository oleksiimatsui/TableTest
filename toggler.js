
function ToggleFirstCol(id, isClosed) {
    let elements = document.getElementsByName(id + "_");
    let Header = document.getElementsByName(id)[0];
    ToggleFirstCell(Header, isClosed);
    for (var i = 0; i < elements.length; i++) {
        ToggleFirstCell(elements[i], isClosed);
    }
}
function ToggleColumn(id, isClosed) {
    let elements = document.getElementsByName(id + "_");
    let Header = document.getElementsByName(id)[0];
    ToggleCellDisplay(Header, isClosed);
    for (var i = 0; i < elements.length; i++) {
        ToggleCellDisplay(elements[i], isClosed);
    }
}

function ToggleCell(element, isClosed) {
    var childs = element.children;
    if (childs == null) return;
    for (var i = 0; i < childs.length; i++) {
        var child = childs[i];
        if (isClosed) {
            child.classList.remove("hiddenCell");
        } else {
            child.classList.add("hiddenCell");
        }
    }
}

function ToggleFirstCell(element, isClosed) {
    element.style.width = "10px";
    var childs = element.children;
    if (childs == null) return;
    for (var i = 0; i < childs.length; i++) {
        var child = childs[i];
        if (isClosed) {
            child.classList.remove("hiddenCell1");
        } else {
            child.classList.add("hiddenCell1");
        }
    }
}

function ToggleHeader(element, isClosed) {
    var childs = element.children;
    element.style.width = "40px";
    if (childs == null) return;
    for (var i = 0; i < childs.length; i++) {
        var child = childs[i];
        if (child.tagName != "BUTTON") {
            //child.style.display = isClosed == true ? "" : "none";
            if (child.getAttribute("name") == "header-text") {
                let tmp = child.innerHTML;
                child.innerHTML = child.parentElement.getAttribute("othername");
                child.parentElement.setAttribute("othername", tmp);
            }else{
                if (child.style.display == "none") {
                    child.style.display = "";
                } else {
                    child.style.display = "none";
                }
            }
        } else {
            if (child.classList.contains("checked")) {
                child.classList.remove("checked");
            } else {
                child.classList.add("checked");
            }
            child.innerHTML = isClosed ? "-" : "+";
            child.setAttribute('title', isClosed ? "" : element.getAttribute("name"));
        }
    }
}

function ToggleCellDisplay(element, isClosed) {
    element.style.display = isClosed == true ? "" : "none";
}

function toggle(e) {
    let isClosed = e.target.classList.contains("checked") ? true : false;
    e.target.innerHTML = isClosed ? "-" : "+";
    let header = e.target.parentElement;
    let thisName = header.getAttribute("name");
    ToggleHeader(header, isClosed);

    let parent = header.getAttribute("parent");
    let rowspan = header.getAttribute("rowspan");
    if (rowspan != 2 && parent == "") {
        //if it's top header
        childColumns = document.querySelectorAll("[parent='" + thisName + "']");
        ToggleFirstCol(childColumns[0].getAttribute("name"), isClosed);
        for (let i = 1; i < childColumns.length; i++) {
            let name = childColumns[i].getAttribute("name");
            ToggleColumn(name, isClosed);
        }
        header.colSpan = header.colSpan == childColumns.length ? 1 : childColumns.length;
    } else {
        //if it's bottom header
        let elements = document.getElementsByName(thisName + "_");
        for (let i = 0; i < elements.length; i++) {
            ToggleCell(elements[i], isClosed);
        }
    }
   

}