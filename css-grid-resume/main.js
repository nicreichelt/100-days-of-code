window.onload = function(){
    start();
}

// Start JS
function start(){
    console.log('Starting JS')
    loadWorkDetailsEvents();
}

// Expand Work Item Event Listeners
function loadWorkDetailsEvents(){
    console.log("Adding Event Listeners");

    let workDetails = document.querySelectorAll('.work-item');
    workDetails.forEach(item => {
        item.addEventListener('click', showDetails);
        console.log(item)
    });

    let addtlDetails = document.querySelectorAll('.additional-work-details');
    addtlDetails.forEach(item => {
        item.querySelector('.close').addEventListener('click', closeDetails);
    })
}

// Expand Work Item Details
function showDetails(e){
    let className;

    this.classList.forEach(item => {
        item != 'work-item' ? className = item : '';
    });

    setTimeout(function(){
        document.querySelector(`.additional-work-details.${className}`).classList.add('show');
    }, 300);
}

// Close Work Item Details
function closeDetails(e){
    console.log(this.parentNode.parentNode)
    this.parentNode.parentNode.classList.remove('show');
}