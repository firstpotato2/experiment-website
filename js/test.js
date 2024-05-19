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
    'https://drive.google.com/uc?export=view&id=1cGrUqRK0P6IgpOJcwP6IRikCbaoDMDIl',
    'https://drive.google.com/uc?export=view&id=1FumQFEe5i3wG0byoR1EsW-9ZGVpblM0Z'
];

const imagesB = [
    'https://drive.google.com/uc?export=view&id=1FglXXLJtgVHWxu9g_A8iX9FChE9Htglr',
    'https://drive.google.com/uc?export=view&id=1id74twme_AfdwmYEInKVwYWgf6jcwf9V'
];

const specialImagesA = [
    'https://drive.google.com/uc?export=view&id=1oUunjw82c71X9b8OLKunzNat3Q_iWoFE',
    'https://drive.google.com/uc?export=view&id=149_6wZrxp5DodRzG3bIAlG0ACvLETnM8'
];

const specialImagesB = [
    'https://drive.google.com/uc?export=view&id=1OHSPGQevKVVMdLUoRNIVmQGQ3S2u2WvT',
    'https://drive.google.com/uc?export=view&id=1EBpl_j3jEDq7wQdIn7xEjO_P0KO-zxkw'
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
        document.getElementById('testImage').src = nextImage;
        startTimer();
    }
}

document.getElementById('nextButton').addEventListener('click', displayNextImage);

document.getElementById('testImage').src = combinedImages[currentImageIndex];
startTimer();
