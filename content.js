chrome.storage.local.get('spoilersRemoved', function(data) {
    const selectors = [
        '.result-score', // result on /results page
        '.twoRowExtra', // small result in side bar
        '.won', //map score for winning team on match page
        '.lost', //map score for losing team on match page
        '.mapholder' //small score under each map on match page
    ]

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.filter = data.spoilersRemoved ? 'blur(200px)' : 'none';
            el.style.visibility = 'visible';
        });
    });

    removeSpoilersAddButton();
});

function removeSpoilersAddButton() {
    const streamBoxes = document.querySelectorAll('.stream-box');
    const numberOfStreamBoxes = streamBoxes.length;
    console.log('Total number of stream boxes:', numberOfStreamBoxes);
}
