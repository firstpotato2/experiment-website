document.getElementById('resumeButton').addEventListener('click', function() {
    const currentImageIndex = sessionStorage.getItem('currentImageIndex');
    window.location.href = `test.html?index=${currentImageIndex}`;
});
