const questions = [
    {
        question: '這是第一個特殊圖片的題目？',
        options: ['選項1', '選項2', '選項3', '選項4'],
        correct: '選項1'
    },
    {
        question: '這是第二個特殊圖片的題目？',
        options: ['選項A', '選項B', '選項C', '選項D'],
        correct: '選項B'
    },
    // 继续添加所有特殊图片的题目
];

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    const specialIndex = getQueryParam('index');
    if (specialIndex !== null) {
        const questionData = questions[specialIndex];
        const questionContainer = document.getElementById('questionContainer');
        
        const questionElement = document.createElement('h2');
        questionElement.textContent = questionData.question;
        questionContainer.appendChild(questionElement);
        
        questionData.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => {
                answers[specialIndex] = {
                    answer: option,
                    correct: option === questionData.correct
                };
                document.getElementById('nextImageButton').disabled = false; // 启用下一张图片按钮
                answeredQuestions.push(specialIndex);
                sessionStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions)); // 保存已回答题目索引到会话存储
            });
            questionContainer.appendChild(optionElement);
        });
    }
    
    document.getElementById('nextImageButton').addEventListener('click', () => {
        window.location.href = 'test.html';
    });
    
    document.getElementById('pauseButton').addEventListener('click', () => {
        window.location.href = 'pause.html';
    });
});
