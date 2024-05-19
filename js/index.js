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
