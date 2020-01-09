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

    let addtlDetails = document.querySelectorAll('.modal');
    addtlDetails.forEach(item => {
        item.querySelector('.close').addEventListener('click', closeDetails);
    })
}

// Expand Work Item Details
function showDetails(e){
    console.log('Show Details')
    let className;

    this.classList.forEach(item => {
        item != 'work-item' ? className = item : '';
    });

    setTimeout(function(){
        document.querySelector(`.modal.${className}`).style.maxHeight = '10000px';
    }, 200);

    setTimeout(function(){
        document.querySelector(`.modal.${className}`).style.opacity = 1;
    }, 300);
}

// Close Work Item Details
function closeDetails(e){
    console.log(this.parentNode.parentNode)
    // this.parentNode.parentNode.classList.remove('show');

    let parent = this.parentNode.parentNode;

    parent.style.opacity = 0;

    setTimeout(function(){
        parent.style.maxHeight = 0;
    }, 400);
}