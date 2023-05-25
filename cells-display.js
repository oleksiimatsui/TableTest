document.getElementById("cells-display").addEventListener("change", (event) => {
    let value = event.target.value;
    let r = document.querySelector(':root');    
    let array = document.querySelectorAll('td>[contenteditable]');
    console.log(value);
    array.forEach(element => {
        element.className = value;
    });
});

function setClasses(){
    let array = document.querySelectorAll('td>[contenteditable]');
    array.forEach(element => {
        element.className = "scroll";
    });
}