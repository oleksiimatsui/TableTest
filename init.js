const table = document.querySelector("#accounting-table");

function CreateLabel(innerHtml) {
	let label = document.createElement('h7');
    label.setAttribute("name", "header-text");
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
    let label = CreateLabel(value);
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

function CreateTd(key,value,type,options,editable) {
    let td = document.createElement('td');
    td.setAttribute("name", key + "_");
    let entity = "";
    if(options != null){
        entity = document.createElement('select');
        for(let i=0; i < options.length; i++){
            let option = document.createElement("option");
            option.value = options[i];
            option.text = options[i];
            if(options[i] == value){
                option.setAttribute("selected", true);
            }
            entity.appendChild(option);
        };
        let btn = document.createElement("option");
        btn.innerHTML = "edit...";
        btn.className = "btn-edit-options";
        entity.setAttribute('lastvalue', value);
        entity.setAttribute('oninput', 'checkSelect(event)');
        entity.appendChild(btn);
    }else{
        entity = document.createElement('div');
        if(editable) entity.setAttribute("contenteditable", "true");
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
                bot.push(h);
            } else {
                console.log("adding column " + h.Name + "with colspan 1 and rowspan 2");
                h.Colspan = 1;
                h.Rowspan = 2;
                top.push(h);
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
                let editable = false;
                for(let k=0; k<top.length; k++){
                    if(key == top[k].Name){
                        dropdown = top[k].Dropdown;
                        editable = top[k].Editable;
                        console.log(editable);
                    }
                }
                for(let k=0; k<bot.length; k++){
                    if(key == bot[k].Name){
                        dropdown = bot[k].Dropdown;
                        editable = bot[k].Editable;
                    }
                }
                let td = CreateTd(key, fop[key], "text", dropdown, editable);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
}


