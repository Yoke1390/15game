const $table = document.getElementById("nine_keys");
const $numbers = document.getElementById("numberList")
var count = 1;
window.addEventListener("resize", resizeTable);

function addNumber(number) {
    var div = document.createElement("div");
    div.classList.add("alert", "alert-dark")
    div.appendChild(document.createTextNode(number));
    $numbers.appendChild(div);
}

function handleClick() {
    var cellText = this.textContent;
    console.log("Clicked cell: " + cellText);
    addNumber(cellText);
}

function resizeTable() {
    var windowWidth = window.innerWidth;
    if (windowWidth > 300) {
        windowWidth = 300;
    }
    $table.style.width = windowWidth + "px";
}

// Main

for (var i = 0; i < 3; i++) {
    var row = document.createElement("tr");

    for (var j = 0; j < 3; j++) {
        var cell = document.createElement("td");
        cell.classList.add("key")
        cell.appendChild(document.createTextNode(count));
        cell.addEventListener("click", handleClick);
        row.appendChild(cell);
        count++;
    }

    $table.appendChild(row);
}
resizeTable();
