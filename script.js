const style = document.createElement('style');
style.textContent = `
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #111;
        font-family: sans-serif;
    }
    .main-container {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(180deg, #111 0%, #2a2a4a 100%);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .question-input {
        width: 90%;
        max-width: 600px;
        padding: 15px 25px;
        margin-bottom: 40px;
        border-radius: 30px;
        border: none;
        background-color: #f0d9ff;
        font-size: 20px;
        text-align: center;
        color: #333;
        outline: none;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    .ball-container {
        position: relative;
        width: 75vmin; 
        max-width: 600px;
        aspect-ratio: 1 / 1;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.1s ease;
    }
    .ball-container:active {
        transform: scale(0.95);
    }
    .ball-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        pointer-events: none;
    }
    .answer-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ffffff;
        font-size: 3rem;
        font-weight: bold;
        text-shadow: 0 0 10px #ffb3ff, 0 0 20px #000000, 0 0 30px #000000; 
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        text-align: center;
        z-index: 10;
        width: 80%;
    }
    .show-answer {
        opacity: 1;
    }
    .shake-animation {
        animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
    }
    @keyframes shake {
        10%, 90% { transform: translate3d(-4px, 0, 0); }
        20%, 80% { transform: translate3d(8px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-12px, 0, 0); }
        40%, 60% { transform: translate3d(12px, 0, 0); }
    }
`;
document.head.appendChild(style);

const mainContainer = document.createElement('div');
mainContainer.className = 'main-container';

const inputElement = document.createElement('input');
inputElement.type = 'text';
inputElement.className = 'question-input';
inputElement.placeholder = 'Введіть ваше питання тут...';

const ballContainer = document.createElement('div');
ballContainer.className = 'ball-container';

const ballImage = document.createElement('img');
ballImage.src = 'shar.png'; 
ballImage.className = 'ball-image';

const answerElement = document.createElement('div');
answerElement.className = 'answer-text';
answerElement.textContent = 'Yes'; 

ballContainer.appendChild(ballImage);
ballContainer.appendChild(answerElement);
mainContainer.appendChild(inputElement);
mainContainer.appendChild(ballContainer);
document.body.appendChild(mainContainer);

const answersList = [
    "Так","Ні","Можливо","Хз","У геміні спитай","BigYahu dont answer"
];

ballContainer.addEventListener('click', () => {
    const question = inputElement.value.trim();
    if (!question) {
        alert("введіть своє питання перед тим, як трусити кулю.");
        inputElement.focus();
        return;
    }

    answerElement.classList.remove('show-answer');
    ballContainer.classList.remove('shake-animation');
    
    void ballContainer.offsetWidth; 

    ballContainer.classList.add('shake-animation');

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * answersList.length);
        answerElement.textContent = answersList[randomIndex];
        answerElement.classList.add('show-answer');
    }, 400); 
});