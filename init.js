const table = document.querySelector("#accounting-table");

function CreateLabel(name, innerHtml) {
	let label = document.createElement('label');
	label.setAttribute('name', name);
	label.setAttribute('id', name);
	label.innerHTML = innerHtml;
	return label;
}

function CreateThElement(name, value, parent, shortvalue, colSpan, rowspan, type) {
    let th = document.createElement('th');
    th.setAttribute('colspan', colSpan);
    th.setAttribute('rowspan', rowspan);
    th.setAttribute('name', name);
    th.setAttribute('othername', shortvalue);
    th.setAttribute('parent', parent);
    let button = document.createElement("button");
    button.className = 'toggleColButton';
    button.innerHTML = "-";
    button.setAttribute('onclick', 'toggle(event)');
    th.appendChild(button);
    let label = CreateLabel(value, value);
    th.appendChild(label);
    if(colSpan == 1){
        let trigger = document.createElement('span');
        trigger.className = 'resizeTrigger';
        trigger.addEventListener('mousedown', beginResize);
        th.appendChild(trigger);
    }
    return th;
}



function checkSelect (event) {
    let previous_value = event.target.getAttribute("lastvalue");
    let value = event.target.value;
    if(value == "edit..."){
        event.target.value = previous_value;
        alert("editing is not supported for now");
    }else{
        event.target.setAttribute("lastvalue", value);
    }
}

function CreateTd(key,value,type,options) {
    let td = document.createElement('td');
    td.setAttribute("name", key + "_");
    let entity = "";
    if(options != null){
        entity = document.createElement('select');
        for(let i=0; i < options.length; i++){
            let option = document.createElement("option");
            option.value = options[i];
            option.text = options[i];
            option.setAttribute("contenteditable", "true");
            if(options[i] == value){
                option.setAttribute("selected", true);
            }
            entity.appendChild(option);
        };
        let btn = document.createElement("option");
        btn.innerHTML = "edit...";
        btn.className = "btn-edit-options";
      //  btn.setAttribute("disabled", true);
        entity.setAttribute('lastvalue', value);
        entity.setAttribute('oninput', 'checkSelect(event)');
        entity.appendChild(btn);
    }else{
        entity = document.createElement('div');
        entity.setAttribute("contenteditable", "true");
        entity.innerHTML = value;
    }
    
    td.appendChild(entity);
    return td;
}


function GenerateTable() {
    let thead = document.querySelector("#accounting-table>thead");
        let tbody = document.querySelector("#accounting-table>tbody");

        let headers = JSON.parse(HEADERS);

        let topHeader = document.createElement("tr");
        let bottomHeader = document.createElement("tr");
        let top = [];
        let bot = [];
        
        console.log("adding headers: ");
        for (let i = 0; i < headers.length; i++) {
            let h = headers[i];
            if (h.Group != "") {
                if (i>0 && top[top.length - 1].Name == h.Group) {
                    console.log("adding colspan to  " + top[top.length - 1].Name);
                    top[top.length - 1].Colspan++;
                } else {
                    console.log("adding column " + h.Group + "with colspan 1 and rowspan 1");
                    top.push({ Name: h.Group, Colspan: 1, Rowspan: 1, Dropdown:false });
                }
                console.log("adding column " + h.Name + " with dropdown " +  h.Dropdown);
                let a = bot.push(h);
            } else {
                console.log("adding column " + h.Name + "with colspan 1 and rowspan 2");
                top.push({ Name: h.Name, Colspan: 1, Rowspan: 2 });
            }
        }

        for (let i = 0; i < top.length; i++) {
            let th = CreateThElement(top[i].Name, top[i].Name, "", "", top[i].Colspan, top[i].Rowspan, "string");
            topHeader.appendChild(th);
        }
        for (let i = 0; i < bot.length; i++) {
            let th = CreateThElement(bot[i].Name, bot[i].Name, bot[i].Group, bot[i].ShortName, 1, 1, "string");
            bottomHeader.appendChild(th);
        }
        thead.appendChild(topHeader);
        thead.appendChild(bottomHeader);

        let fields = JSON.parse(FIELDS);

        for (let i = 0; i < fields.length; i++) {
            let fop = fields[i];
            let tr = document.createElement("tr");
            for (const key in fop) {
                let dropdown = null;
                for(let k=0; k<bot.length; k++){
                    if(key == bot[k].Name){
                        dropdown = bot[k].Dropdown;
                    }
                }
                let td = CreateTd(key, fop[key], "text", dropdown);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
}

window.onload = (event) => {
    GenerateTable();
    setWidths();
};
