


function CreateLabel(name, innerHtml) {
	let label = document.createElement('label');
	label.setAttribute('name', name);
	label.setAttribute('id', name);
	label.innerHTML = innerHtml;
	return label;
}

function CreateTrThElement(name, value, colSpan, type) {
	let th = document.createElement('th');
    th.setAttribute('colspan', colSpan);
    th.setAttribute('name', name);
	let button = document.createElement("button");
    button.innerHTML = "-";
    button.setAttribute('onclick', 'toggle(event)');
	th.appendChild(button);
	th.appendChild(document.createElement('br'));
	let label = CreateLabel(value, value);
	th.appendChild(label);
	return th;
}


function GenerateTable() {
    let n = 42;
    let colspan = 3;
	let names1 = [];
    let names2 = [];
    let colspans = [];
    let rowsCount = 20;
    for(let i=0; i<n; i++){
        names1.push("Big column " + i);
    }
    for(let i=0; i<n; i++){
        colspans.push(colspan);
    }
    for(let i=0; i < n; i++){
        for(let j=0; j<colspans[i]; j++){
            names2.push("Small column " + i + "." + j);
        }
    }

    table = document.getElementById("table");
    thead = document.createElement("thead");
    let tr1 = document.createElement('tr');

        for (let i=0; i<names1.length; i++) {
            tr1.appendChild(CreateTrThElement(i, names1[i], colspans[i], 'string'));
        }

    thead.appendChild(tr1);

    let tr = document.createElement('tr');
    let index = 0;
    for (let i=0; i<names2.length; i++) {
        for(let j=0; j<colspans[i]; j++){
            tr.appendChild(CreateTrThElement(i + "." + j, names2[index], 1, 'string'));
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
            for(let j = 0; j < colspans[i]; j++){
                
                let td = document.createElement('td');
                td.setAttribute("name", i + "." + j + "_"); 
                td.innerHTML = "cell " + o + "_";
                tr.appendChild(td);
                o++;
            }
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}
window.onload = (event) => {
    GenerateTable();
$('#table').DataTable({"ordering": false});
    
};
