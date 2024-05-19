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
    'https://drive.google.com/file/d/1FumQFEe5i3wG0byoR1EsW-9ZGVpblM0Z/view?usp=drive_link',
    'https://drive.google.com/file/d/1FglXXLJtgVHWxu9g_A8iX9FChE9Htglr/view?usp=drive_link',
    // 确保共有40个URL（A组普通图片）
];


const imagesB = [
    'https://drive.google.com/file/d/1EBpl_j3jEDq7wQdIn7xEjO_P0KO-zxkw/view?usp=drive_link',
    'https://drive.google.com/file/d/1cGrUqRK0P6IgpOJcwP6IRikCbaoDMDIl/view?usp=drive_link',
    
    // 确保共有40个URL（B组普通图片）
];

const specialImagesA = [
    'https://drive.google.com/file/d/1id74twme_AfdwmYEInKVwYWgf6jcwf9V/view?usp=drive_link',
    'https://drive.google.com/file/d/1OHSPGQevKVVMdLUoRNIVmQGQ3S2u2WvT/view?usp=drive_link',
    // 确保共有10个URL（A组特殊图片）
];

const specialImagesB = [
    'https://drive.google.com/file/d/1oUunjw82c71X9b8OLKunzNat3Q_iWoFE/view?usp=drive_link',
    'https://drive.google.com/file/d/149_6wZrxp5DodRzG3bIAlG0ACvLETnM8/view?usp=drive_link',
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
