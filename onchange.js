
$( "tbody" ).on( "change", "tr>td>*", function(e){
    let row = {};
    let tr = e.target.parentElement.parentElement;
    tr.childNodes.forEach(td => {
        let key = td.getAttribute("name");
        key = key.substr(0, key.length-1);
        let entity = td.children[0];
        let value;
        if(entity.tagName == 'DIV'){
            value = entity.innerHTML;
        }else{
            value = entity.value;
        }
        row[key] = value;
    });
    console.log(row);
    let newRow = JSON.parse(getNewValues(row));
    console.log(newRow);
    tr.childNodes.forEach(td => {
        let key = td.getAttribute("name");
        key = key.substr(0, key.length-1);
        let entity = td.children[0];
        if(entity.tagName == 'DIV'){
            entity.innerHTML = newRow[key];
        }else{
            entity.value = newRow[key];
        }
    });
})