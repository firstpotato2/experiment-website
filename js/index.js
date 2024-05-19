document.getElementById('downloadImagesButton').addEventListener('click', function() {
    fetch('path/to/images.zip')
        .then(response => response.blob())
        .then(blob => {
            JSZip.loadAsync(blob).then(zip => {
                return zip.file('images/').async('blob'); // 假设压缩文件包含一个 images 目录
            }).then(content => {
                const fileSaver = new FileSaver();
                fileSaver.saveAs(content, 'images/');
                alert('圖片下載完成');
                document.getElementById('startTestButton').disabled = false; // 启用开始测验按钮
            });
        }).catch(error => {
            console.error('下載圖片失敗:', error);
            alert('圖片下載失敗，請重試');
        });
});

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Check if the form is valid
    const form = document.getElementById('surveyForm');
    if (form.checkValidity()) {
        // Save user information in sessionStorage
        sessionStorage.setItem('gender', document.querySelector('input[name="gender"]:checked').value);
        sessionStorage.setItem('age', document.getElementById('age').value);
        sessionStorage.setItem('profession', document.getElementById('profession').value);
        
        // Redirect to the test page
        window.location.href = 'test.html';
    } else {
        alert('請完整填寫所有基本資料。');
    }
});
