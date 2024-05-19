document.getElementById('pauseButton').addEventListener('click', function() {
    stopTimer();
    sessionStorage.setItem('currentImageIndex', currentImageIndex); // 保存当前图片索引到会话存储
    sessionStorage.setItem('displayedImages', JSON.stringify(displayedImages)); // 保存已显示图片索引到会话存储
    sessionStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions)); // 保存已回答题目索引到会话存储
    window.location.href = 'pause.html'; // 跳轉到暫停頁面
});

let currentImageIndex = parseInt(new URLSearchParams(window.location.search).get('index')) || parseInt(sessionStorage.getItem('currentImageIndex')) || 0;
let displayedImages = JSON.parse(sessionStorage.getItem('displayedImages')) || [];
let answeredQuestions = JSON.parse(sessionStorage.getItem('answeredQuestions')) || [];

const imagesA = [
    'https://example.com/images/image1.jpg',
    'https://example.com/images/image2.jpg',
    // 确保共有40个URL（A组普通图片）
];

const imagesB = [
    'https://example.com/images/image41.jpg',
    'https://example.com/images/image42.jpg',
    // 确保共有40个URL（B组普通图片）
];

const specialImagesA = [
    'https://example.com/images/special_image1.jpg',
    'https://example.com/images/special_image2.jpg',
    // 确保共有10个URL（A组特殊图片）
];

const specialImagesB = [
    'https://example.com/images/special_image11.jpg',
    'https://example.com/images/special_image12.jpg',
    // 确保共有10个URL（B组特殊图片）
];

const images = imagesA.concat(imagesB);
const specialImages = specialImagesA.concat(specialImagesB);
const combinedImages = images.concat(specialImages);

shuffleArray(combinedImages);

const times = [];
const answers = [];

window.addEventListener('popstate', function(event) {
    history.pushState(null, null, location.href); // 阻止历史记录中的后退操作
});

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

function displayNextImage() {
    stopTimer();

    if (currentImageIndex >= combinedImages.length) {
        alert('測驗完成');
        generateCSV(); // 生成并下载CSV文件
        window.location.href = 'finish.html'; // 跳轉到完成頁面
        return;
    }

    let nextImage;
    do {
        nextImage = combinedImages[currentImageIndex];
        currentImageIndex++;
    } while (displayedImages.includes(nextImage) && currentImageIndex < combinedImages.length);

    if (currentImageIndex >= combinedImages.length) {
        alert('測驗完成');
        generateCSV(); // 生成并下载CSV文件
        window.location.href = 'finish.html'; // 跳轉到完成頁面
        return;
    }

    displayedImages.push(nextImage);

    if (specialImages.includes(nextImage)) {
        const specialIndex = specialImages.indexOf(nextImage);
        window.location.href = `special.html?index=${specialIndex}`;
    } else {
        document.getElementById('testImage').src = nextImage;
        startTimer();
    }
}

document.getElementById('nextButton').addEventListener('click', displayNextImage);

document.getElementById('testImage').src = combinedImages[currentImageIndex];
startTimer();
