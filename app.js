const cards = document.querySelectorAll('.card');
const container = document.querySelector('.container');
const addCard = document.querySelector('#add-card');
const body = document.querySelector('body');

addCard.oncontextmenu = (e) => {
    e.preventDefault();
};

const clientMousePos = {
    clientX: 0,
    clientY: 0,
};

const MinusMousePos = {
    x: 0,
    y: 0,
};

const colors = ['aqua', 'blue', 'green', 'red', 'yellow', 'orange', 'coral', 'cornflowerblue', 'darkmagenta', 'deeppink']

let isClicked = false;

let selected = null;

const CardEvent = (e) => {
    isClicked = true;
    selected = e.target;
    let rect = e.target.getBoundingClientRect();
    MinusMousePos.x = e.clientX - rect.left;
    MinusMousePos.y = e.clientY - rect.top;
};

const OnCardAdded = () => {
    
};

addCard.onclick = () => { 
    AddCard();
};

function AddCard() {
    const randNo = parseInt(Math.random() * 10);
    var node = document.createElement('div');
    var nodeSpan = document.createElement('span');

    nodeSpan.innerHTML = 'Delete';
    nodeSpan.onclick = () => {node.remove()};

    node.appendChild(nodeSpan);
    node.classList.add('card');
    

    node.onmousedown = CardEvent;
    node.style.backgroundColor = colors[randNo];
    container.appendChild(node);
    OnCardAdded();

    window.getComputedStyle(node, 'after').onclick = () => {
        console.log('clicked');
    }
}

document.onmousemove = (data) => {
    if (isClicked && selected !== null) {    
        clientMousePos.clientX = data.pageX;
        clientMousePos.clientY = data.pageY;

        selected.style.left = `${clientMousePos.clientX - MinusMousePos.x}px`;
        selected.style.top = `${clientMousePos.clientY - MinusMousePos.y - 45}px`;
    }
};

document.onmouseup = () => {
    isClicked = false;
    selected = null;
};

body.onmouseup = (e) => {
    isClicked = false;
    selected = null;
};

cards.forEach(x => {
    x.onmousedown = CardEvent;
});