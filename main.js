const $table = document.getElementById("nine_keys");
const $numbers = document.getElementById("numberList");
const $winModal = document.getElementById('win-modal');
const $winModalContent = document.getElementById('win-modal-content');
window.addEventListener("resize", resizeTable);

class GameState {
    constructor() {
        this.numbersRemain = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.disabled_keys = new Set();
        this.gameNumbers = {
            "player": new Set(),
            "enemy": new Set(),
        }
    }
}
state = new GameState();

let numbersRemain = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
let disabledKeys = new Set();

const gameNumbers = {
    "player": new Set(),
    "enemy": new Set(),
}

const textStyle = {
    "player": "chat-bubble--right",
    "enemy": "chat-bubble--left"
}

// 集合からランダムに値を取り出す関数
function getRandomValueFromSet(set) {
    const values = Array.from(set);
    return values[Math.floor(Math.random() * values.length)];
}

// 3つの数字の和を計算する関数
function getSumOfTriplets(set) {
    const array = Array.from(set);
    const result = [];
    if (array.length < 3) {
        return result;
    }
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            for (let k = j + 1; k < array.length; k++) {
                result.push([array[i], array[j], array[k]].reduce((a, b) => a + b, 0));
            }
        }
    }
    return result;
}

function makeMessage(number, side) {
    const message = document.createElement("div");
    message.classList.add("chat-bubble", textStyle[side]);
    message.appendChild(document.createTextNode(number));
    return message;
}

function add_number(number, side) {
    // 数字の表示を追加
    const div = makeMessage(number, side);
    $numbers.appendChild(div);

    // 数字を追加
    state.gameNumbers[side].add(number);

    // 押されたキーを無効化
    const $key = document.getElementById("key_" + number);
    $key.classList.add("disabled");
    state.disabled_keys.add(number);
    state.numbersRemain.delete(number);

    // 最後までスクロール
    $numbers.scrollTo(0, $numbers.scrollHeight);
}

// 勝敗の判定
function judge() {
    if (state.gameNumbers["player"].size >= 3 || state.gameNumbers["enemy"].size >= 3) {
        const playerSum = getSumOfTriplets(state.gameNumbers["player"]);
        const enemySum = getSumOfTriplets(state.gameNumbers["enemy"]);
        if (playerSum.includes(15)) {
            $winModalContent.innerHTML = "<h2>Player Win!!</h2>";
            $winModal.classList.add('active');
            return "player";
        }
        else if (enemySum.includes(15)) {
            $winModalContent.innerHTML = "<h2>Enemy Win!!</h2>";
            $winModal.classList.add('active');
            return "enemy";
        }
        else if (state.disabled_keys.size === 9) {
            $winModalContent.innerHTML = "<h2>Draw!!</h2>";
            $winModal.classList.add('active');
            return "draw";
        }
        else {
            return "unknown";
        }
    } else {
        return "unknown";
    }
}

// クリックイベント
function handleClick() {
    // ボタンの数字を取得
    const cellNumber = parseInt(this.id.split("_")[1]); // key_1 -> 1のように数字のみを取り出す
    // すでに押されている場合は何もしない
    if (state.disabled_keys.has(cellNumber)) {
        return;
    } else {
        console.log("Clicked cell: " + cellNumber);
        add_number(cellNumber, "player");
        const result = judge();
        console.log(result);

        if (state.numbersRemain.size > 0) {
            add_number(getRandomValueFromSet(state.numbersRemain), "enemy");
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
