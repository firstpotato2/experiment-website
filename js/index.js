document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Redirect to the test page
    window.location.href = 'test.html';
});

