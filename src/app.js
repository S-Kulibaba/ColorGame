import './styles.css'

const invisibleClass = 'invisible'

let colorsArray = ['red', 'blue', 'green', 'yellow'];
let elemArray = [];
let currentChoosenArrray = [];
let currentChoosenColor = [];

let clicksOnBlock = 0;
let choosenBlock;
let currentPoints = 0;
let counter = 0;
let blocked = false;

let firstElement = document.getElementById('1');
let secondElement = document.getElementById('2');
let thirdElement = document.getElementById('3');
let fourthElement = document.getElementById('4');
let fifthElement = document.getElementById('5');
let sixthElement = document.getElementById('6');
let seventhElement = document.getElementById('7');
let eighthElement = document.getElementById('8');
let ninethElement = document.getElementById('9');

let pointsElem = document.getElementById('num');

elemArray.push(firstElement, secondElement, thirdElement, fourthElement, fifthElement, sixthElement, seventhElement, eighthElement, ninethElement);

function pointsUpadte(pointsToAdd) {
    currentPoints += pointsToAdd;
    pointsElem.innerHTML = currentPoints;
};

function addRandomClass() {
    let colorIndex = 0;

    while(elemArray.length > 1) {
        let randomIndex = Math.floor(Math.random() * elemArray.length);

        let randomElement = elemArray[randomIndex];

        let choosenColor = colorsArray[colorIndex];
        randomElement.classList.add(choosenColor, invisibleClass);

        colorIndex++;

        if(colorIndex >= 4) {
            colorIndex = 0;
        }

        elemArray.splice(randomIndex, 1);
    }
    
    pointsUpadte(0);
}

function handleClick(event) {
    if(currentPoints > -30 && counter !== 4 && blocked != true) {
        clicksOnBlock++

        if(clicksOnBlock <= 2) {
            choosenBlock = event.target;

            choosenBlock.classList.remove('invisible');

            currentChoosenColor.push(choosenBlock.classList.value);
            currentChoosenArrray.push(choosenBlock)

            if(currentChoosenArrray.length === 2 && currentChoosenArrray[0].classList.value === currentChoosenArrray[1].classList.value) {
                clicksOnBlock = 0;
                choosenBlock = null;
                currentChoosenArrray = [];
                currentChoosenColor = [];
                pointsUpadte(10);
                counter++;
                if(counter == 4) {
                    alert('You WIN! Please restart page to play again');
                    blocked = true;
                }
            } else if(currentChoosenArrray.length === 2 && currentChoosenArrray[0].classList.value != currentChoosenArrray[1].classList.value) {
                setTimeout(() => {
                    currentChoosenArrray.forEach(elem => {
                        elem.classList.add('invisible');
                    })
                    clicksOnBlock = 0;
                    choosenBlock = null;
                    currentChoosenArrray = [];
                    currentChoosenColor = [];
                    pointsUpadte(-10);
                }, 500);
            }
        }
    } else if(counter == 4) {
        alert('You WIN! Please restart page to play again');
        blocked = true;
    } else {
        alert('You lose!');
        resetGame();
    }
}

function resetGame() {
    location.reload();
}

elemArray.forEach(elem => {
    elem.addEventListener('click', handleClick);
})

// Вызовите функцию для добавления случайного класса
addRandomClass();