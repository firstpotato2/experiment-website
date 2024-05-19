document.getElementById('pauseButton').addEventListener('click', function() {
    stopTimer();
    window.location.href = 'pause.html'; // 跳轉到暫停頁面
});

let currentImageIndex = 0;
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
    if (currentImageIndex >= combinedImages.length) {
        alert('測驗完成');
        generateCSV(); // 生成并下载CSV文件
        window.location.href = 'finish.html'; // 跳轉到完成頁面
        return;
    }
    
    if (specialImages.includes(combinedImages[currentImageIndex])) {
        const specialIndex = specialImages.indexOf(combinedImages[currentImageIndex]);
        window.location.href = `special.html?index=${specialIndex}`;
    } else {
        document.getElementById('testImage').src = combinedImages[currentImageIndex];
        startTimer();
    }
});

function generateCSV() {
    const headers = ['性別', '年齡', '專業', '圖片停留時間', '回答', '正確'];
    const csvContent = [];
    csvContent.push(headers.join(','));

    const userInfo = [
        document.querySelector('input[name="gender"]:checked').value,
        document.getElementById('age').value,
        document.getElementById('profession').value,
    ];

    let correctA = 0, correctB = 0, totalA = 0, totalB = 0;

    for (let i = 0; i < combinedImages.length; i++) {
        const isSpecial = specialImages.includes(combinedImages[i]);
        const isGroupA = imagesA.includes(combinedImages[i]) || specialImagesA.includes(combinedImages[i]);
        const isCorrect = isSpecial ? answers[specialImages.indexOf(combinedImages[i])]?.correct : '';

        if (isGroupA) {
            totalA++;
            if (isCorrect) correctA++;
        } else {
            totalB++;
            if (isCorrect) correctB++;
        }

        const row = [
            ...userInfo,
            times[i] || '', // 图片停留时间
            isSpecial ? answers[specialImages.indexOf(combinedImages[i])]?.answer || '' : '', // 题目回答
            isCorrect ? '是' : '否' // 是否正确
        ];
        csvContent.push(row.join(','));
    }

    const correctRateA = totalA > 0 ? (correctA / totalA * 100).toFixed(2) : 0;
    const correctRateB = totalB > 0 ? (correctB / totalB * 100).toFixed(2) : 0;

    csvContent.push(`A组正确率：${correctRateA}%`);
    csvContent.push(`B组正确率：${correctRateB}%`);

    const csvBlob = new Blob([csvContent.join('\n')], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = csvUrl;
    downloadLink.download = 'test_results.csv';
    downloadLink.click();
}
