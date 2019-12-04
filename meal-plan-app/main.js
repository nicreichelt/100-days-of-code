window.onload = function(){

    // ** Global Variables
    const mealPlanData = JSON.parse(localStorage.getItem('mealPlanData')) || [];
    const mealsReferenceData = JSON.parse(localStorage.getItem('mealsReferenceData')) || [];
    const remindersData = JSON.parse(localStorage.getItem('remindersData')) || [];
    const settingsData = JSON.parse(localStorage.getItem('settingsData')) || [];

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
            loadContent: function(e){
                loadMealPlan(e);
            }
        },
        {
            name: "Meals Reference",
            section: "meals-reference",
            container: "mealsReferenceContainer",
            loadContent: function(section){
                loadMealsReference(section);
            }
        },
        {
            name: "Reminders",
            section: "reminders",
            container: "remindersContainer",
            loadContent: function(section){
                loadReminders(section);
            }
        },
        {
            name: "Settings",
            section: "settings",
            container: "settingsContainer",
            loadContent: function(section){
                loadSettings(section);
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
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
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
        // Remove content when going to 'home' section
        if(e.target.dataset.section == 'home'){
            console.log('Removing Wrapper!')
            const parent = e.target.parentElement;
            const wrapperToRemove = parent.querySelector('.content-wrapper');
            if (wrapperToRemove === null) {}else{
                console.log('Removed Wrapper!')
                wrapperToRemove.remove();
            }
        }

        // Grab Section Object
        const sectionObj = getSectionObject(e);
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

        // Load Section
        loadSection(sectionObj);

        // Load Section Content
        const sectionText = sectionObj.section;
        console.log(sectionText)
        sectionObj.loadContent(e);
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
    }

    // Load Meal Plan
    function loadMealPlan(e){
        // Grab meal plan container
        const sectionObj = getSectionObject(e);
        sectionText = sectionObj.section;
        const container = mainContainer.querySelector(`.${sectionText}`);
        // Clear previous meal plan
        cleanSectionData(container);

        // Grab date from target button
        const date = e.target.dataset.firstDay;
        let passedDate;
        // Get Passed date (if present) or Make today
        if(date === undefined){
            passedDate = new Date();
        }
        else{
            console.log(`Loading passed date:`)
            passedDate = new Date(date);
        }
        // Set Time to 12am (reset)
        passedDate.setHours(0);
        passedDate.setMinutes(0);
        passedDate.setSeconds(0);
        passedDate.setMilliseconds(0);
        // Set First Day of week
        const firstDayOfWeek = new Date(passedDate.getTime() - (passedDate.getDay() * 86400000));
        // Set to 12am (reset)
        firstDayOfWeek.setHours(0);
        firstDayOfWeek.setMinutes(0);
        firstDayOfWeek.setSeconds(0);
        firstDayOfWeek.setMilliseconds(0);
        const firstDayOfWeekText = getDateText(firstDayOfWeek);
        // Set End of Week
        const lastDayOfWeek = new Date(firstDayOfWeek.getTime() + (6 * 86400000) + 86399999);
        // Week Array
        const currentWeek = []
        for(var i = 0; i < 7; i++){
            const weekDay = new Date(firstDayOfWeek.getTime() + (i * 86400000));
            currentWeek.push(weekDay);
        }

        // Get Meal Plan Data for that week (using first day of week)
        const currentWeekMealPlanData = [];
        mealPlanData.forEach(meal => {
            // console.log(meal)
            mealDate = new Date(meal.date);
            // console.log(mealDate, first)
            if(mealDate >= firstDayOfWeek && mealDate <= lastDayOfWeek){
                console.log('Meal Added!');
                currentWeekMealPlanData.push(meal);
            }
        });

        // Wrap Meal Plan
        const mealPlanWrapper = document.createElement('div');
        mealPlanWrapper.classList.add('content-wrapper');

        // Week of and Prev/Next Week Container
        const weekOfContainer = document.createElement('div');
        weekOfContainer.classList.add('week-of');

        // Add Previous Week Button
        const prevWeekDate = new Date(firstDayOfWeek.getTime() - (7 * 86400000));
        // Check if daylight savings occured
        if(prevWeekDate.getHours() == 23){
            prevWeekDate.setTime(prevWeekDate.getTime() + 3600000);
        } else if(prevWeekDate.getHours() == 1){
            prevWeekDate.setTime(prevWeekDate.getTime() - 3600000);
        }
        console.log('Prev Week: ', prevWeekDate)
        const prevWeekBtn = document.createElement('button');
        prevWeekBtn.dataset.firstDay = `${prevWeekDate}`;
        prevWeekBtn.dataset.section = sectionText;
        prevWeekButtonText = document.createTextNode('Prev Week');
        prevWeekBtn.appendChild(prevWeekButtonText);
        prevWeekBtn.addEventListener('click', loadMealPlan);
        weekOfContainer.appendChild(prevWeekBtn);

        // Set "Week Of Heading"
        const weekOfHeading = document.createElement('h2');
        const weekOfHeadingText = document.createTextNode(`Week of: ${firstDayOfWeekText}`);
        weekOfHeading.appendChild(weekOfHeadingText);
        weekOfContainer.appendChild(weekOfHeading);

        // Add Next Week Button
        const nextWeekDate = new Date(firstDayOfWeek.getTime() + (7 * 86400000));
        // Check if daylight savings occurred
        if (nextWeekDate.getHours() == 23) {
            nextWeekDate.setTime(nextWeekDate.getTime() + 3600000);
        } else if (nextWeekDate.getHours() == 1) {
            nextWeekDate.setTime(nextWeekDate.getTime() - 3600000);
        }
        console.log('Next Week: ', nextWeekDate)
        const nextWeekBtn = document.createElement('button');
        nextWeekBtn.dataset.firstDay = `${nextWeekDate}`;
        nextWeekBtn.dataset.section = sectionText;
        nextWeekButtonText = document.createTextNode('Next Week');
        nextWeekBtn.appendChild(nextWeekButtonText);
        nextWeekBtn.addEventListener('click', loadMealPlan);
        weekOfContainer.appendChild(nextWeekBtn);

        // Append to wrapper contaier
        mealPlanWrapper.appendChild(weekOfContainer);

        // Load This Weeks Meal Plan
        const planList = document.createElement('ul');
        currentWeek.forEach(day => {
            // Initiate Meal & Recipe Link
            let currentMeal = '';
            let mealLink = '';
            let mealDate = '';
            currentWeekMealPlanData.forEach(meal => {
                if(getDateText(new Date(meal.date)) == getDateText(day)){
                    currentMeal = meal.meal;
                    mealLink = meal.recipeLink;
                    mealDate = meal.date;
                } 
            })
            // Create 'li' to append to 'ul'
            const listItem = document.createElement('li');
            listItem.dataset.date = day;
            // Create List Item Text
            const listItemText = document.createTextNode(`${days[day.getDay()]}: ${currentMeal}`);
            listItem.appendChild(listItemText);
            // Add 'addMea' or 'updateMeal' eventListener
            if (mealDate == '') {
                listItem.addEventListener('click', addMeal);
            } else {
                listItem.classList.add('meal-exists');
                listItem.addEventListener('click', updateMeal);
            }
            planList.appendChild(listItem);
       
        })
        mealPlanWrapper.appendChild(planList);
        container.appendChild(mealPlanWrapper);
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
    // Generate Date Text
    function getDateText(date){
        return dateText = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    }
    // Grab Section Object
    function getSectionObject(e){
        const index = appSections.map(opt => opt.section).indexOf(`${e.target.dataset.section}`);
        const obj = appSections[index];
        return obj;
    }
    // Remove prior section data and update text
    function cleanSectionData(container){
        if (container.querySelector('.content-wrapper') != null) {
            container.querySelector('.content-wrapper').remove();
        }
    }
    // New Meal Plan Object
    function newMealObject(date, meal, recipeLink){
        const mealObject = {
            date: date,
            meal: meal,
            recipeLink: recipeLink
        }
        return mealObject;
    }
    // Add new meal
    function addMeal(){
        console.log('Add new meal!')
        // Create 'Modal/Popup'
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        const modal = document.createElement('div');
        modal.classList.add('modal')
        modal.classList.add('add-meal')
        // Modal Heading Text
        const modalHeading = document.createElement('h1');
        const modalDate = getDateText(new Date(this.dataset.date));
        const modalHeadingText = document.createTextNode(`Add Meal for ${modalDate}`)
        modalHeading.appendChild(modalHeadingText);
        modal.appendChild(modalHeading);

        // *** Add radio button to select 'create new meal' or 'select an existing meal'
        const addMealSelectionTypeContainer = document.createElement('div');
        addMealSelectionTypeContainer.classList.add('add-meal-options')
        // Heading for container
        // const newMealHeading = document.createElement('h2');
        // const newMealHeadingText = document.createTextNode('How would you like to add a meal:');
        // newMealHeading.appendChild(newMealHeadingText);
        // addMealSelectionTypeContainer.appendChild(newMealHeading);
        // * New Meal option
        const newMealRadioContainer = document.createElement('div');
        // New Meal Label
        const newMealRadioLabel = document.createElement('label');
        const newMealRadioLabelText = document.createTextNode('Create New Meal');
        newMealRadioLabel.setAttribute('for', 'new-meal');
        newMealRadioLabel.appendChild(newMealRadioLabelText);
        // New Meal Radio Button
        const newMealRadioButton = document.createElement('input');
        newMealRadioButton.setAttribute('type', 'radio');
        newMealRadioButton.id = 'new-meal';
        newMealRadioButton.setAttribute('name', 'add-meal');
        newMealRadioButton.setAttribute('value', 'new');
        newMealRadioButton.addEventListener('change', (e) => {
            modalSectionToShow(e);
        })
        // Append Children to containers
        newMealRadioContainer.appendChild(newMealRadioLabel);
        newMealRadioContainer.appendChild(newMealRadioButton);
        addMealSelectionTypeContainer.appendChild(newMealRadioContainer);
        // * Existing Meal option
        const existingMealRadioContainer = document.createElement('div');
        // Existing Meal Label
        const existingMealRadioLabel = document.createElement('label');
        const existingMealRadioLabelText = document.createTextNode('Choose Existing Meal');
        existingMealRadioLabel.setAttribute('for', 'existing-meal');
        existingMealRadioLabel.appendChild(existingMealRadioLabelText);
        // Existing Meal Radio Button
        const existingMealRadioButton = document.createElement('input');
        existingMealRadioButton.setAttribute('type', 'radio');
        existingMealRadioButton.id = 'existing-meal';
        existingMealRadioButton.setAttribute('name', 'add-meal');
        existingMealRadioButton.setAttribute('value', 'new');
        existingMealRadioButton.addEventListener('change', (e) => {
            modalSectionToShow(e);
        });
        // Append Children to containers
        existingMealRadioContainer.appendChild(existingMealRadioLabel);
        existingMealRadioContainer.appendChild(existingMealRadioButton);
        addMealSelectionTypeContainer.appendChild(existingMealRadioContainer);
        modal.appendChild(addMealSelectionTypeContainer);

        // New Meal Options
        const newMealOptionsContainer = document.createElement('div');
        newMealOptionsContainer.classList.add('new-meal-options');
        newMealOptionsContainer.classList.add('options-section');
        const newMealOptionsContainerText = document.createTextNode('New Meal Creation Options presented here!');
        newMealOptionsContainer.appendChild(newMealOptionsContainerText)
        modal.appendChild(newMealOptionsContainer);

        // Existng Meal Options
        const existingMealOptionsContainer = document.createElement('div');
        existingMealOptionsContainer.classList.add('existing-meal-options');
        existingMealOptionsContainer.classList.add('options-section');
        const existingMealOptionsContainerText = document.createTextNode('Existing Meal Selection Options presented here!');
        existingMealOptionsContainer.appendChild(existingMealOptionsContainerText)
        modal.appendChild(existingMealOptionsContainer);

        // Modal Buttons
        const addMealBtnContainer = document.createElement('div');
        addMealBtnContainer.classList.add('modal-button-container')
        const addMealBtn = document.createElement('button');
        const addMealBtnText = document.createTextNode('Add Meal');
        addMealBtn.appendChild(addMealBtnText);
        addMealBtn.addEventListener('click', addMealPlanData);
        const cancelAddMealBtn = document.createElement('button');
        const cancelAddMealBtnText = document.createTextNode('Cancel');
        cancelAddMealBtn.appendChild(cancelAddMealBtnText);
        cancelAddMealBtn.addEventListener('click', () => {
            overlay.remove();
        });
        addMealBtnContainer.appendChild(addMealBtn);
        addMealBtnContainer.appendChild(cancelAddMealBtn);
        modal.appendChild(addMealBtnContainer);
        overlay.appendChild(modal);
        overlay.classList.add('show')
        document.body.appendChild(overlay);
    }
    // Modal Section To Show Function
    function modalSectionToShow(e){
        // Remove 'show' class from children
        const container = document.querySelector('.modal');
        const children = container.querySelectorAll('.options-section');
        console.log(container)
        children.forEach((child) => {
            console.log(child.classList)
            child.classList.remove('show')
            console.log(child.classList)
        });
        // Select section to show
        const showSectionText = `.${e.target.id}-options`;
        console.log(showSectionText)
        const sectionToShow = document.querySelector(showSectionText);
        setTimeout(() => sectionToShow.classList.add('show'),500);
    }
    // Add Meal Plan Data
    function addMealPlanData(){
        console.log('Meal Plan Data Added!')
    }
    // Update Meal
    function updateMeal() {
        console.log('Update meal!')
    }

    // *** Placeholder/Dummy Data ***
    function loadDummyMealPlan(){
        console.log('Dummy Data Loaded!')
        const mealPlan = []

        mealPlan.push(newMealObject('Mon Nov 18 2019 00:00:01 GMT-0800 (Pacific Standard Time)', 'Spaghetti', 'https://www.foodiecrush.com/my-moms-homemade-spaghetti-and-meat-sauce/'));
        mealPlan.push(newMealObject('Sun Nov 17 2019 00:00:01 GMT-0800 (Pacific Standard Time', 'Tacos', 'https://houseofyumm.com/best-ever-taco-meat/'));
        mealPlan.push(newMealObject('Tue Nov 26 2019 00:00:01 GMT-0800 (Pacific Standard Time', 'Pizza', 'https://pizzarev.com/'));
        mealPlan.push(newMealObject('Thur Nov 28 2019 00:00:01 GMT-0800 (Pacific Standard Time', 'Turkey', 'https://tastesbetterfromscratch.com/easy-no-fuss-thanksgiving-turkey/'));
        mealPlan.push(newMealObject('Tue Dec 03 2019 00:00:01 GMT-0800 (Pacific Standard Time', 'Pizza', 'https://pizzarev.com/'));
        mealPlan.push(newMealObject('Fri Dec 06 2019 00:00:01 GMT-0800 (Pacific Standard Time', 'Red Pepper Pasta', 'https://damndelicious.net/2019/01/08/creamy-red-pepper-shells/'));
        
        localStorage.setItem('mealPlanData', JSON.stringify(mealPlan))
    }

    // ** Start Script
    function start() {
        console.clear();
        loadDummyMealPlan();
        loadMainPage();
    }
    start();
}