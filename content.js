chrome.storage.local.get('spoilersRemoved', function(data) {
    if (data.spoilersRemoved) {
        document.querySelectorAll('.result-score').forEach(el => {
            el.style.filter = 'blur(8px)'; // Apply blur
        });
    } else {
        document.querySelectorAll('.result-score').forEach(el => {
            el.style.filter = 'none';
        });
    }
});
