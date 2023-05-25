//sorting
function resort(e){
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    let name = e.target.parentElement.getAttribute("name");
    if(e.target.value == "up"){
      e.target.innerHTML = "&darr;";
      e.target.value = "down";
    }else{
      e.target.innerHTML = "&uarr;";
      e.target.value = "up";
    }
    table = document.getElementById("accounting-table");
    switching = true;
    dir = "asc"; 
    while (switching) {
     switching = false;
     rows = table.rows;
     for (i = 2; i < (rows.length - 1); i++) {
       shouldSwitch = false;
       x = rows[i].querySelector("[name='"+name+"_']");
       y = rows[i + 1].querySelector("[name='"+name+"_']");
       if (dir == "asc") {
         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
           shouldSwitch= true;
           break;
         }
       } else if (dir == "desc") {
         if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
           shouldSwitch = true;
           break;
         }
       }
     }
     if (shouldSwitch) {
       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
       switching = true;
       switchcount ++;      
     } else {
       if (switchcount == 0 && dir == "asc") {
         dir = "desc";
         switching = true;
       }
     }
   }
 };



function setSortingArrows(){
  let el = $( "th[colspan='1']" );
  for(let i=0; i<el.length; i++){
    let btn = document.createElement("label");
    btn.setAttribute("name", "btn-sort")
    btn.style.padding = "4px";
    btn.style.userSelect = "none";
    btn.innerHTML = "&darr;";
    btn.setAttribute("onclick","resort(event)");
    el[i].appendChild(btn);
  }
}