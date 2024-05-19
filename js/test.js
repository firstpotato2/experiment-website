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
let answers = JSON.parse(sessionStorage.getItem('answers')) || [];

const imagesA = [
    'image1',
    'image2'
];

const imagesB = [
    'image3',
    'image4'
];

const specialImagesA = [
    'special_image1',
    'special_image2'
];

const specialImagesB = [
    'special_image3',
    'special_image4'
];

const images = imagesA.concat(imagesB);
const specialImages = specialImagesA.concat(specialImagesB);
const combinedImages = images.concat(specialImages);

shuffleArray(combinedImages);

const times = [];

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
        document.querySelectorAll('#imageContainer img').forEach(img => img.style.display = 'none'); // 隐藏所有图片
        document.getElementById(nextImage).style.display = 'block'; // 显示下一张图片
        startTimer();
    }
}

document.getElementById('nextButton').addEventListener('click', displayNextImage);

document.querySelectorAll('#imageContainer img').forEach(img => img.style.display = 'none'); // 隐藏所有图片
document.getElementById(combinedImages[currentImageIndex]).style.display = 'block'; // 显示初始图片
startTimer();
