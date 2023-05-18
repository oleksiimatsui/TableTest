
function px(val){ return [val, 'px'].join("") }

var resizeElement, startSize, startX

function beginResize(e){
    killResize()
    let th = e.target.parentElement
    resizeElement = th
    startSize = th.clientWidth
    startX = e.pageX
}   

function killResize(){
    resizeElement = null
    startSize = null
    startX = null
}

document.addEventListener('mousemove', e => {
    if(resizeElement){
    let diff = e.pageX - startX
    //resizeElement.style.minWidth = px(startSize + diff);
    resizeElement.style.width = px(startSize + diff);
    let name = resizeElement.getAttribute("name");
    let tds = document.getElementsByName(name+"_");
    for(let i=0;i<tds.length;i++){
        tds[i].children[0].style.width = px(startSize + diff);
    }
}
})

document.addEventListener('mouseup', killResize)
