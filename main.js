const $table = document.getElementById("nine_keys");
const $numbers = document.getElementById("numberList");
window.addEventListener("resize", resizeTable);

let numbersRemain = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
let disabled_keys = new Set();

const gameNumbers = {
    "player": new Set(),
    "enemy": new Set(),
}

// 敵とプレイヤーで色を変える
const textStyle = {
    "player": "chat-bubble--right",
    "enemy": "chat-bubble--left"
}

// 集合からランダムに値を取り出す関数
function getRandomValueFromSet(set) {
    const values = Array.from(set);
    return values[Math.floor(Math.random() * values.length)];
}

function makeMessage(number, side) {
    const row = document.createElement("div");
    row.classList.add("row", "no-gutters");
    const col = document.createElement("div");
    col.classList.add("col-3", "offset-md-9");
    row.appendChild(col);
    const message = document.createElement("div");
    message.classList.add("chat-bubble", textStyle[side]);
    message.appendChild(document.createTextNode(number));
    col.appendChild(message);
    return row;
}

function add_number(number, side) {
    // 数字の表示を追加
    const div = makeMessage(number, side);
    $numbers.appendChild(div);

    // 数字を追加
    gameNumbers[side].add(number);

    // 押されたキーを無効化
    const $key = document.getElementById("key_" + number);
    $key.classList.add("disabled");
    disabled_keys.add(number);
    numbersRemain.delete(number);
}

function handleClick() {
    const cellNumber = parseInt(this.id.split("_")[1]); // key_1 -> 1のように数字のみを取り出す
    if (disabled_keys.has(cellNumber)) {
        return;
    } else {
        console.log("Clicked cell: " + cellNumber);
        add_number(cellNumber, "player");
        if (numbersRemain.size > 0) {
            add_number(getRandomValueFromSet(numbersRemain), "enemy");
        }
    }
}

function resizeTable() {
    var tableWidth = window.innerWidth;
    if (tableWidth > 300) {
        tableWidth = 300;
    }
    $table.style.width = tableWidth + "px";
}

// 9つのキーを作成
var count = 1;
for (var i = 0; i < 3; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 3; j++) {
        const cell = document.createElement("td");
        cell.id = "key_" + count;
        cell.classList.add("key")
        cell.appendChild(document.createTextNode(count));
        // クリックイベントを追加
        cell.addEventListener("click", handleClick);
        row.appendChild(cell);
        count++;
    }
    $table.appendChild(row);
}
resizeTable();
