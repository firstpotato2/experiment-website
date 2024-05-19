document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Check if the form is valid
    const form = document.getElementById('surveyForm');
    if (form.checkValidity()) {
        // Redirect to the test page
        window.location.href = 'test.html';
    } else {
        alert('請完整填寫所有基本資料。');
    }
});
