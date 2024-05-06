document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleSpoiler');

    // Function to update button text
    function updateButtonText(areSpoilersRemoved) {
        toggleButton.textContent = areSpoilersRemoved ? "Spoilers: Off" : "Spoilers: On";
    }

    // Fetch the initial state of spoilers and update button text
    chrome.storage.local.get('spoilersRemoved', function(data) {
        updateButtonText(data.spoilersRemoved);
    });

    toggleButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.storage.local.get('spoilersRemoved', function(data) {
                const currentStatus = !data.spoilersRemoved;

                // Update the button text based on the new status
                updateButtonText(currentStatus);

                chrome.storage.local.set({'spoilersRemoved': currentStatus}, function() {
                    // Inject the content script to read the new state and act on it
                    chrome.scripting.executeScript({
                        target: {tabId: tabs[0].id},
                        files: ['content.js']
                    });
                });
            });
        });
    });
});
