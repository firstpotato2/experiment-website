document.getElementById('downloadDataButton').addEventListener('click', function() {
    const data = {
        gender: sessionStorage.getItem('gender'),
        age: sessionStorage.getItem('age'),
        profession: sessionStorage.getItem('profession'),
        answers: JSON.parse(sessionStorage.getItem('answers')),
        times: JSON.parse(sessionStorage.getItem('times'))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test_data.json';
    a.click();
    URL.revokeObjectURL(url);
});

document.getElementById('deleteImagesButton').addEventListener('click', function() {
    // 假设所有图片都保存在一个目录中
    const imagesDirectory = 'images/';

    fetch(imagesDirectory, { method: 'DELETE' })
        .then(() => {
            alert('本地圖片已刪除');
        }).catch(error => {
            console.error('刪除本地圖片失敗:', error);
            alert('刪除本地圖片失敗');
        });
});
 
