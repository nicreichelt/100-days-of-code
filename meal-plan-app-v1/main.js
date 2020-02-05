window.onload = function(){
    // App Sections
    const appSections = [
        {
            name: 'home',
            heading: 'Simple Meal Planning!',
            buttonText: 'Go Home',
            loadContent: function(){
                loadHome();
            } 
        },
        {
            name: 'meal-plan',
            heading: 'Meal Plan',
            buttonText: 'Meal Plan',
            loadContent: function(){
                loadMealPlanSection();
            }
        },
        {
            name: 'meal-references',
            heading: 'Meal References',
            buttonText: 'Meal References',
            loadContent: function(){
                loadMealReferencesSection();
            }
        },
        {
            name: 'reminders',
            heading: 'Reminders',
            buttonText: 'Reminders',
            loadContent: function(){
                loadRemindersSection();
            }
        },
        {
            name: 'settings',
            heading: 'Settings',
            buttonText: 'Settings',
            loadContent: function(){
                loadSettingsSection();
            }
        }
    ]

    // Section Functions
    function loadSection(sectionName){
        const section = getAppSectionData(sectionName);

        updateHeading(section.heading);

        const contentContainer = document.querySelector('#content-container');

        contentContainer.dataset.section = section.name;

        contentContainer.hideSection();

        if(section.name != 'home'){
            addHomeButton();
        }

        section.loadContent();

        contentContainer.showSection();
    }
    function loadHome(){
        const contentContainer = document.querySelector('#content-container');
        appSections.forEach(section => {
            if(section.name != 'home'){
                setTimeout(() => {
                    contentContainer.addMainButton(section)
                }, 300);
            }
        });
    }
    function loadMealPlanSection(){
        console.log('Meal Plan Loaded!');
    }
    function loadMealReferencesSection(){
        console.log('Meal References Loaded!');
    }
    function loadRemindersSection(){
        console.log('Reminders Loaded!');
    }
    function loadSettingsSection(){
        console.log('Settings Loaded!');
    }
    function getAppSectionData(sectionName){
        const filteredSection = appSections.filter(section => section.name == sectionName);
        return filteredSection[0];
    }

    // Meal Plan Functions
    function loadCurrentWeekMealsList(){
        
    }

    // Meal Reference Functions
    function loadMealReminderList(){

    }

    // Reminder Functions
    function loadReminderList(){

    }

    // Settings Functions
    function darkModeToggle(){

    }

    // *** UI FUNCTIONS ***
    // Update App Heading
    function updateHeading(sectionName){
        const heading = document.querySelector('#app-heading');

        heading.style.opacity = 0;

        setTimeout(() => {
            heading.textContent = sectionName;
            heading.style.opacity = 1;
        }, 600);
    }
    function addHomeButton(){
        const contentContainer = document.querySelector('#content-container');
        const homeSection = getAppSectionData('home');
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('home-button-container')
        buttonContainer.addMainButton(homeSection);
        setTimeout(() => {
            contentContainer.appendChild(buttonContainer);
        }, 300);
    }
    HTMLDivElement.prototype.hideSection = function(){
        this.style.opacity = 0;
        this.innerHTML = '';
    }
    HTMLDivElement.prototype.showSection = function(){
        setTimeout(() => {
            this.style.opacity = 1;
        }, 600);
    }
    HTMLDivElement.prototype.addMainButton = function(section){

        console.log('Button Created!')

        const mainButton = document.createElement('button');
        mainButton.classList.add('main-button');
        mainButton.classList.add('transition')
        mainButton.textContent = section.buttonText;
        mainButton.addEventListener('click', () => {
            loadSection(section.name);
        });

        this.appendChild(mainButton);
    }

    // Initial Load
    function loadApplication(){
        loadSection('home');
    }
    loadApplication();
}