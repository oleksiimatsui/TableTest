



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

function setWidth(column, width){
    document.getElementsByName(column)[0].width = width;
    let tds = document.getElementsByName(column + "_");
    for(let i=0;i<tds.length;i++){
        tds[i].children[0].style.width = px(width);
    }
    let col = widths.find(x => x.key == column);
    if(col != null){
        col.width = width;
    }else{
        widths.push({key: column, width: width});
    }
    
    localStorage.setItem('widths', JSON.stringify(widths));
}

document.addEventListener('mousemove', e => {
    if(resizeElement){
        let diff = e.pageX - startX;
        let name = resizeElement.getAttribute("name");
        setWidth(name, startSize + diff);
    }
})

document.addEventListener('mouseup', killResize);

var widths = [];

function setWidths(){
    let ths = document.querySelectorAll(".accounting-table th");
    widths = JSON.parse(localStorage.getItem('widths'));
    for(let i=0; i<ths.length; i++){
        if(ths[i].getAttribute("colspan") == 1){
            let w = widths.find(x => x.key == ths[i].getAttribute("name"));

            if(w != null){
                console.log(w.width);
                setWidth(ths[i].getAttribute("name"), w.width);
            }
        }
        
    }
};



