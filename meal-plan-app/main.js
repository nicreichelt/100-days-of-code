window.onload = function(){

    // ** Global Variables
    // Page Elements
    // Main Container & Section Heading
    const mainContainer = document.querySelector('.container');
    const sectionHeading = document.querySelector('#section-heading');
    // Section COntainer
    const homeContainer = document.querySelector('.home');

    // Application Sections Array
    const appSections = [
        {
            name: "Meal Plan",
            section: "meal-plan",
            container: "mealPlanContainer",
            loadContent: function(){
                const section = 'meal-plan'
                loadMealPlan(section);
            }
        },
        {
            name: "Meals Reference",
            section: "meals-reference",
            container: "mealsReferenceContainer",
            loadContent: function(){
                loadMealsReference();
            }
        },
        {
            name: "Reminders",
            section: "reminders",
            container: "remindersContainer",
            loadContent: function(){
                loadReminders();
            }
        },
        {
            name: "Settings",
            section: "settings",
            container: "settingsContainer",
            loadContent: function(){
                loadSettings();
            }
        },
        {
            name: "Simple Meal Planning!",
            section: "home",
            container: "homeContainer",
            loadContent: function(){
                console.log('Well that\'s odd, this is just a console log.');
            }
        }
    ];

    // Days of the week
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"
    ];

    // ** Build Functions
    // Load Home Screen (Main Page)
    function loadMainPage(){
        appSections.forEach(option => {
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
        // Grab Section Object
        const index = appSections.map(opt => opt.section).indexOf(`${e.target.dataset.section}`);
        const sectionObj = appSections[index];
        console.log(sectionObj);

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

        loadSection(sectionObj);
    }

    // Populate Section
    function loadSection(obj){
        // Get Section Container
        const container = mainContainer.querySelector(`.${obj.section}`);

        // Change Heading to Section Name
        sectionHeading.textContent = obj.name;

        // Generate Go Home Button (if not present and not loading home section)
        if(!container.querySelector('button.main-button') && obj.section != 'home'){
            // Generage Home Button
            let goHome = generateHomeButton();
            goHome.addEventListener('click', goToSection);
            container.appendChild(goHome);
        }else{}

        // Load Content
        obj.loadContent();
    }

    // Load Meal Plan
    function loadMealPlan(text){
        console.log('Meal Plan Loaded!');
        console.log(this)
        // Get Date Info
        const now = new Date();
        const firstDayOfWeek = new Date();
        const nowDayOfWeek = now.getDay();
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - nowDayOfWeek);
        const todayText = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`;
        const firstDayOfWeekText = `${firstDayOfWeek.getFullYear()}/${firstDayOfWeek.getMonth()+1}/${firstDayOfWeek.getDate()}`;
        console.log(firstDayOfWeekText);

        // Set "Week Of Heading"
        const weekOfHeading = document.createElement('h2');
        const weekOfHeadingText = document.createTextNode(`Week of: ${firstDayOfWeekText}`);
        weekOfHeading.appendChild(weekOfHeadingText);
        // Append to main contaier
        const container = mainContainer.querySelector(`.${text}`);
        container.appendChild(weekOfHeading);
        // Load This Weeks Meal Plan
        const planList = document.createElement('ul');
        var i = 0;
        days.forEach(day => {
            planList.innerHTML += `
                <li data-date="${firstDayOfWeek.getFullYear()}/${firstDayOfWeek.getMonth()+1}/${firstDayOfWeek.getDate()+i}"><label>${day}:</label></li>
            `
            i++;
        })
        container.appendChild(planList);
    }

    // ** Utility Functions
    // Generate Home Button
    function generateHomeButton(){
        mealPlanButton = document.createElement('button');
        mealPlanButton.classList.add('main-button');
        mealPlanButton.classList.add('transition');
        mealPlanButton.textContent = 'Go Home';
        mealPlanButton.dataset.section = 'home';

        mealPlanButton.addEventListener('click', goToSection)

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