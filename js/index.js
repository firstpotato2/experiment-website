document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Hide the main page and show the test page
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('test-page').style.display = 'block';
    
    startTimer();
});

document.getElementById('pauseButton').addEventListener('click', function() {
    stopTimer();
    window.location.href = 'pause.html'; // 跳轉到暫停頁面
});

let currentImageIndex = 0;
const imagesA = [
    'https://via.placeholder.com/600x400', // First image of group A
    'https://via.placeholder.com/600x401', // Second image of group A
    // Add more image URLs for group A here
];
const imagesB = [
    'https://via.placeholder.com/600x450', // First image of group B
    'https://via.placeholder.com/600x451', // Second image of group B
    // Add more image URLs for group B here
];
const specialImages = [
    'https://via.placeholder.com/600x500', // First special image
    'https://via.placeholder.com/600x501', // Second special image
    // Add more special image URLs here
];
const images = imagesA.concat(imagesB);
shuffleArray(images);

const times = [];

let startTime;

function startTimer() {
    startTime = new Date();
}

function stopTimer() {
    const endTime = new Date();
    const elapsed = endTime - startTime;
    times.push(elapsed);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.getElementById('nextButton').addEventListener('click', function() {
    stopTimer();
    
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
        alert('測驗完成');
        const totalTimeA = times.slice(0, imagesA.length).reduce((a, b) => a + b, 0);
        const totalTimeB = times.slice(imagesA.length).reduce((a, b) => a + b, 0);
        console.log('Total time for group A:', totalTimeA);
        console.log('Total time for group B:', totalTimeB);
        window.location.href = 'finish.html'; // 跳轉到完成頁面
        return;
    }
    
    if (specialImages.includes(images[currentImageIndex])) {
        window.location.href = 'special.html';
    } else {
        document.getElementById('testImage').src = images[currentImageIndex];
        startTimer();
    }
});
 
