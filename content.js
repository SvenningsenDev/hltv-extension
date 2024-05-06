
chrome.storage.local.get('spoilersRemoved', function(data) {
    const selectors = [
        '.result-score', // result on /results page
        '.twoRowExtra', // small result in side bar
        '.won', //map score for winning team on match page
        '.lost', //map score for losing team on match page
        '.mapholder', //small score under each map on match page
        '.matchstats' // scoreboard below stream
    ]

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.filter = data.spoilersRemoved ? 'blur(200px)' : 'none';
            el.style.visibility = 'visible';
        });
    });
});

chrome.storage.local.get('spoilersRemoved', function(data) {
    const spoilersRemoved = data.spoilersRemoved; // True or false
    const streamBoxes = document.querySelectorAll('.spoiler > .stream-box');
    
    streamBoxes.forEach((box, index) => {
        if (spoilersRemoved && index === 0) {
            visible(box);            
        } else if (!spoilersRemoved) {
            visible(box);                      
        } else {
            box.style.visibility = 'hidden';            
        }
        const spoilerElement = box.querySelector('.spoiler');
        if (!spoilerElement.dataset.originalText) {
            spoilerElement.dataset.originalText = spoilerElement.textContent;
        }
    });

    processHtml(streamBoxes[0].querySelector('.spoiler'), spoilersRemoved);
});

function processHtml(spoilerElement, spoilersRemoved) {
    if (!spoilersRemoved) {
        spoilerElement.textContent = spoilerElement.dataset.originalText; // Revert to original text
    } else {
        spoilerElement.textContent = "Start stream from map 1"; // Switch to alternate text
    }
}

function visible(box) {
    box.style.visibility = 'visible';
}
