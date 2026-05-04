const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
    if (gmailRegExp.test(gmailInput.value)) {
        gmailResult.innerText = 'OK';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.innerText = 'NOT OK';
        gmailResult.style.color = 'red';
    }
};

const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');

let positionX = 0;
let positionY = 0;

const moveBlock = () => {
    const parentWidth = parentBlock.offsetWidth;
    const parentHeight = parentBlock.offsetHeight;
    const childWidth = childBlock.offsetWidth;
    const childHeight = childBlock.offsetHeight;

    if (positionX < parentWidth - childWidth && positionY === 0) {
        positionX++;
    } else if (positionX >= parentWidth - childWidth && positionY < parentHeight - childHeight) {
        positionY++;
    } else if (positionY >= parentHeight - childHeight && positionX > 0) {
        positionX--;
    } else if (positionX === 0 && positionY > 0) {
        positionY--;
    }

    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;

    requestAnimationFrame(moveBlock);
};

moveBlock();

const seconds = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

let count = 0;
let interval = null;

startBtn.onclick = () => {
    if (interval !== null) return;

    interval = setInterval(() => {
        count++;
        seconds.innerText = count;
    }, 1000);
};

stopBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
};

resetBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
    count = 0;
    seconds.innerText = count;
};