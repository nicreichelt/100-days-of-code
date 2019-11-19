window.onload = function(){

    // ** Global Variables
    // Page Elements
    // Main Container & Section Heading
    const mainContainer = document.querySelector('.container');
    const sectionHeading = document.querySelector('#section-heading');
    // Section COntainer
    const homeContainer = document.querySelector('.home');
    const mealPlanContainer = document.querySelector('.meal-plan');
    const mealsReferenceCOntainer = document.querySelector('.meals-reference');
    const remindersContainer = document.querySelector('.reminders');
    const settingsContainer = document.querySelector('.settings');

    // Meal Plan Options
    const mealPlanOptions = [
        {
            name: "Meal Plan",
            section: "meal-plan",
            container: "mealPlanContainer"
        },
        {
            name: "Meals Reference",
            section: "meals-reference",
            container: "mealsReferenceContainer"
        },
        {
            name: "Reminders",
            section: "reminders",
            container: "remindersContainer"
        },
        {
            name: "Settings",
            section: "settings",
            container: "settingsContainer"
        },
        {
            name: "Simple Meal Planning!",
            section: "home",
            container: "homeContainer"
        }
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
            if(option.section != 'home'){
                // Create Button
                mealPlanButton = document.createElement('button');
                mealPlanButton.classList.add('main-button');
                mealPlanButton.classList.add('transition');
                mealPlanButton.textContent = option.name;
                mealPlanButton.dataset.section = option.section;

                mealPlanButton.addEventListener('click', goToSection)
                
                // Append Button to Container
                homeContainer.appendChild(mealPlanButton);
            }
        });
    }

    // ** Load Sections
    // Go to section function - hides all divs and loads "shows" the target div
    function goToSection(e){
        // Hide All "Section" divs
        const divs = mainContainer.querySelectorAll('div');
        divs.forEach(div => {
            div.classList.remove('show');
            div.style.zIndex = -10;
        })

        // Show selected "Section" div
        const section = document.querySelector(`.${e.target.dataset.section}`);
        // Delay screen load by 0.5s
        setTimeout(() => {
            section.classList.add('show');
            section.style.zIndex = 10;
        }, 500);

        // Populate Section
        switch(`${e.target.dataset.section}`){
            case "meal-plan": 
                loadMealPlanSection();
                break;
            case "meals-reference":
                loadMealsReferenceSection();
                break;
            case "reminders":
                loadRemindersSection();
                break;
            case "settings":
                loadSettingsSection();
                break;
            case "home":
                goHome();
                break;
        }
    }
    // Load Home Section
    function goHome(){
        console.log(home.section);
        sectionHeading.textContent = 'Meal Planning';
        const index = mealPlanOptions.map(option => option.section).indexOf('home');
        const home = mealPlanOptions[index];
    }

    // Populate Meal Plan Section
    function loadMealPlanSection(){
        console.log('Meal Plan Section Loaded!');
        // 
        sectionHeading.textContent = 'The Meal Plan!';
        // Go Home Button
        if(!mealPlanContainer.querySelector('button.main-button')){
            // Generate "Home" Button
            let goHome = generateHomeButton();
            goHome.addEventListener('click', goToSection);
            mealPlanContainer.appendChild(goHome);
        }else{}
        // Placeholder Data
        loadPlaceHolderText(mealPlanContainer , 'Meal Plan data goes here...');
    }
    // Populate Meals Reference Section
    function loadMealsReferenceSection() {
        console.log('Meals Reference Section Loaded!');
        sectionHeading.textContent = 'Meals Reference';
        // Go Home Button
        if (!mealsReferenceCOntainer.querySelector('button.main-button')) {
            // Generate "Home" Button
            let goHome = generateHomeButton();
            goHome.addEventListener('click', goToSection);
            document.querySelector('.meals-reference').appendChild(goHome);
        }
        // Placeholder Data
        loadPlaceHolderText(mealsReferenceCOntainer , 'Meals Reference data goes here...');
    }
    // Populate Reminders Section
    function loadRemindersSection() {
        console.log('Reminders Section Loaded!');
        sectionHeading.textContent = 'Reminders';
        // Go Home Button
        if (!remindersContainer.querySelector('button.main-button')) {
            // Generate "Home" Button
            let goHome = generateHomeButton();
            goHome.addEventListener('click', goToSection);
            document.querySelector('.reminders').appendChild(goHome);
        }
        // Placeholder Data
        loadPlaceHolderText(remindersContainer, 'Reminders data goes here...');
    }
    // Populate Settings Section
    function loadSettingsSection() {
        console.log('Settings Section Loaded!');
        sectionHeading.textContent = 'Settings';
        // Go Home Button
        if (!settingsContainer.querySelector('button.main-button')) {
            // Generate "Home" Button
            let goHome = generateHomeButton();
            goHome.addEventListener('click', goToSection);
            document.querySelector('.settings').appendChild(goHome);
        }
        // Placeholder Data
        loadPlaceHolderText(settingsContainer, 'Settings data goes here...');
    }

    // ** Utility Functions
    // Generate Home Button
    function generateHomeButton(){
        mealPlanButton = document.createElement('button');
        mealPlanButton.classList.add('main-button');
        mealPlanButton.classList.add('transition');
        mealPlanButton.textContent = 'Go Home';
        mealPlanButton.dataset.section = home.section;

        mealPlanButton.addEventListener('click', goHome)

        return mealPlanButton;
    }
    // Load Placeholder text
    function loadPlaceHolderText(cont, text){
        const p = document.createElement('p');
        const t  = document.createTextNode(text);
        p.appendChild(t);
        cont.appendChild(p);
    }

    // ** Event Listeners


    // ** Start Script
    function start() {
        console.clear();
        loadMainPage();
    }
    start();

}