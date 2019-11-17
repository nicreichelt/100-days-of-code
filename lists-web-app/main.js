window.onload = function(){

    // ** Global Variables
    // Page Elements
    const homeContainer = document.querySelector('.home');
    const mealPlanContainer = document.querySelector('.meal-plan')
    // Meal Plan Options
    const mealPlanOptions = [
        {
            name: "Meal Plan",
            section: "meal-plan"
        },
        {
            name: "Meals Reference",
            section: "meals-reference"
        },
        {
            name: "Reminders",
            section: "reminders"
        },
        {
            name: "Settings",
            section: "settings"
        },
    ];
    // Home Plan Button = 
    const home = {
        name: "Meal Planning",
        section: "home"
    }

    // ** Build Functions
    // Create App Options (Main Page)
    function loadMainPage(){
        mealPlanOptions.forEach(option => {
            // Create Button
            mealPlanButton = document.createElement('button');
            mealPlanButton.classList.add('main-button');
            mealPlanButton.classList.add('transition');
            mealPlanButton.textContent = option.name;
            mealPlanButton.dataset.section = option.section;

            mealPlanButton.addEventListener('click', goToSection)
            
            // Append Button to Container
            homeContainer.appendChild(mealPlanButton);
        });
    }

    // ** Utility Functions
    // Go to section function
    function goToSection(e){
        // Hide Home Container
        homeContainer.classList.add('hide');

        // Hide All "Section" divs
        const divs = homeContainer.querySelectorAll('div');
        divs.forEach(div => {
            div.classList.remove('show');
        })

        // Show selected "Section" div
        const section = document.querySelector(`.${e.target.dataset.section}`);
        section.classList.add('show');

        // Populate Section
        switch(`${e.target.dataset.section}`){
            case "meal-plan": 
                loadMealPlan();
                break;
            case "meals-reference":
                loadMealsReference();
                break;
            case "reminders":
                loadReminder();
                break;
            case "settings":
                loadSettings();
                break;
            default:
                goHome();
        }
    }
    // Load Home Section
    function goHome(){
        console.log(home.section);
    }
    // Populate Meal Plan Section
    function loadMealPlan(){
        console.log('Meal Plan Section Loaded!');
    }
    // Populate Meal Plan Section
    function loadMealsReference(){
        console.log('Meals Reference Section Loaded!');
    }
    // Populate Meal Plan Section
    function loadReminder(){
        console.log('Reminders Section Loaded!');
    }
    // Populate Meal Plan Section
    function loadSettings(){
        console.log('Settings Section Loaded!');
    }

    // ** Event Listeners


    // ** Start Script
    function start() {
        console.clear();
        loadMainPage();
    }
    start();

}