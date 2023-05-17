
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
    if(rowspan == 2) console.log(2);
    th.setAttribute('name', name);
	let button = document.createElement("button");
    
    button.className = 'btn btn-sm btn-light expand-text text-bold';
    button.setAttribute('type', 'button');
    button.innerHTML = "-";
    button.setAttribute('onclick', 'toggle(event)');
    button.style.display = "inline-block";
	th.appendChild(button);
	th.appendChild(document.createElement('br'));
	let label = CreateLabel(value, value);
	th.appendChild(label);
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
                tr1.appendChild(CreateTrThElement(i, names1[i], colspans[i], 2, 'string'));
            }
            
        }

    thead.appendChild(tr1);

    let tr = document.createElement('tr');
    let index = 0;
    for (let i=0; i<names2.length; i++) {
        for(let j=0; j<colspans[i]; j++){
            if(colspans[i] > 1 ){
                tr.appendChild(CreateTrThElement(i + "." + j, i + "." + j, 1, 1, 'string'));
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
                td.innerHTML = "<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " + o + "_</div>";
                
                tr.appendChild(td);
                o++;
            }else{
                for(let j = 0; j < colspans[i]; j++){
                    let td = document.createElement('td');
                    td.setAttribute("name", i + "." + j + "_"); 
                    td.innerHTML = "<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " + o + "_</div>";
              
                    tr.appendChild(td);
                    o++;
                }
            }
            
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}
window.onload = (event) => {
    GenerateTable();
    
};
