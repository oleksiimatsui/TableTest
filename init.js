
var table;

function CreateLabel(name, innerHtml) {
	let label = document.createElement('div');
	label.setAttribute('name', name);
	label.setAttribute('id', name);
	label.innerHTML = innerHtml;
	return label;
}

function CreateTrThElement(name, value, colSpan, rowspan, type) {
	let th = document.createElement('th');
    th.setAttribute('colspan', colSpan);
    th.setAttribute('rowspan', rowspan);
    th.setAttribute('name', name);
	let button = document.createElement("button");
    
    button.className = 'toggleColButton';
    button.innerHTML = "-";
    button.setAttribute('onclick', 'toggle(event)');
   
	th.appendChild(button);
	let label = CreateLabel(value, value);
	th.appendChild(label);
    console.log(th.children.length);
	return th;
}


function GenerateTable() {
    let n = 9;
    let colspan = 3;
	let names1 = [];
    let names2 = [];
    let colspans = [];
    
    let rowsCount = 20;
    for(let i=0; i<n; i++){
        names1.push("Big column " + i);
    }
   
    for(let i=0; i<n/2; i++){
        colspans.push(colspan);
        
    }
    for(let i=n/2; i<n-1; i++){
        
        colspans.push(1);
    }

    for(let i=0; i < n; i++){
        for(let j=0; j<colspans[i]; j++){
            names2.push("Small column " + i + "." + j);
        }
    }

    table = document.getElementById("table");
    thead = document.createElement("thead");
    thead.classList.add("thead-dark");  
    let tr1 = document.createElement('tr');

        for (let i=0; i<names1.length; i++) {
            if(colspans[i] > 1){
                tr1.appendChild(CreateTrThElement(i, names1[i], colspans[i], 1, 'string'));
            }else{
                let td = CreateTrThElement(i, names1[i], colspans[i], 2, 'string')
                let trigger = document.createElement('span')
                trigger.className = 'resizeTrigger'
                trigger.addEventListener('mousedown', beginResize)
                td.appendChild(trigger)
                tr1.appendChild(td);
            }
            
        }

    thead.appendChild(tr1);

    let tr = document.createElement('tr');
    let index = 0;
    for (let i=0; i<names2.length; i++) {
        for(let j=0; j<colspans[i]; j++){
            if(colspans[i] > 1 ){
                let td = CreateTrThElement(i + "." + j, i + "." + j, 1, 1, 'string')
                let trigger = document.createElement('span')
                trigger.className = 'resizeTrigger'
                trigger.addEventListener('mousedown', beginResize)
                td.appendChild(trigger)
                tr.appendChild(td);
            }
            index++;
            
        }
    }

    thead.appendChild(tr);
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    let o =0 ;
    
    for(let i = 0; i<rowsCount; i++){
        let tr =  document.createElement('tr');
        for(let i = 0; i < n ; i++){
            if(colspans[i] == 1){
                let td = document.createElement('td');
                td.setAttribute("name", i + "_"); 
                td.classList.add("editable");
                let text =  document.createElement('div');
                    text.classList.add("cellText")
                    text.setAttribute("contenteditable","true");
                    text.innerHTML = o;
                    td.appendChild(text);
                tr.appendChild(td);
                o++;
            }else{
                for(let j = 0; j < colspans[i]; j++){
                    let td = document.createElement('td');
                    td.setAttribute("name", i + "." + j + "_"); 
                    td.classList.add("editable");
                    let text =  document.createElement('div');
                    text.classList.add("cellText")
                    text.setAttribute("contenteditable","true");
                    text.innerHTML = o;
                    td.appendChild(text);
                    tr.appendChild(td);
                    o++;
                }
            }
            tbody.appendChild(tr);
        }
    }
    table.appendChild(tbody);
}
window.onload = (event) => {
    GenerateTable();
};
