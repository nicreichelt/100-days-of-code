window.onload = function(){
    // *** App Data Variables (Store in Local Storage)
    let mealPlanData = JSON.parse(localStorage.getItem('mealPlanData')) || [];

    // ** GLOBAL ELEMENT VARIABLES
    const appHeading = document.querySelector('#app-heading');
    const sectionContentContainer = document.querySelector('#content-container');
    const popupContainer = document.querySelector('#popup');
    const reminderContainer = document.querySelector('#reminders');

    // ** APP SETTINGS VARIABLES
    const frontEndSettings = {
        changeDelay: 400,
        showDelay: 600,
        daysOfWeek: [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ]
    }
    
    // ** App Sections
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
            loadContent: function(e){
                loadMealPlanSection(e);
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

    // ** Load Section Functions
    function loadSection(sectionName){
        const section = getAppSectionData(sectionName);

        updateHeading(section.heading);

        sectionContentContainer.dataset.section = section.name;

        sectionContentContainer.hideSection();

        if(section.name != 'home'){
            addHomeButton();
        }

        section.loadContent();

        sectionContentContainer.showSection();
    }
    function loadHome(){
        appSections.forEach(section => {
            if(section.name != 'home'){
                setTimeout(() => {
                    sectionContentContainer.addMainButton(section)
                }, frontEndSettings.changeDelay);
            }
        });
    }
    function loadMealPlanSection(firstDay = getFirstDayOfWeek(new Date())){
        firstDay.timeStartOfDay();
        
        const currentWeekMealPlan = loadSelectedWeekMealsList(firstDay);
        setTimeout(() => {
            addWeekOfText(firstDay);
            sectionContentContainer.appendChild(currentWeekMealPlan);
        },frontEndSettings.changeDelay);
        // -> [ ] Get Current Weeks Meal Plan Items
        // -> [X] Create an "ul" with a loop and insert meal plan items
        // -> [ ] Add Remove button with remove functionality to items?
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

    // ** Meal Plan Functions
    function loadSelectedWeekMealsList(firstDay){
        let lastDay = getLastDayOfWeek(firstDay);
        lastDay.timeEndOfDay();

        const currentWeekMeals = mealPlanData.filter((meal) => {
            return new Date(meal.date) >= firstDay && new Date(meal.date) <= lastDay;
        });

        const mealPlanList = document.createElement('ul');
        mealPlanList.classList.add('transition');
        mealPlanList.id = 'main-list';
        
        // currentWeekMeals.forEach(meal => {
        //     const mealPlanItem = createMealListItem(new Date(meal.date), meal.meal);
        //     mealPlanList.appendChild(mealPlanItem);
        // });

        frontEndSettings.daysOfWeek.forEach((day, index) => {
            let startOfDay = new Date(firstDay);
            startOfDay.timeStartOfDay();
            let endOfDay = new Date(firstDay);
            endOfDay.timeEndOfDay();

            if(index > 0){
                startOfDay = changeDate(startOfDay, index);
                endOfDay = changeDate(endOfDay, index);
            }

            const daysMeal = mealPlanData.filter(mealPlan => {
                const mealDate = new Date(mealPlan.date);
                return mealDate >= startOfDay && mealDate <= endOfDay;
            });

            let mealPlanItem = '';
            if(daysMeal.length > 0){
                mealPlanItem = createMealListItem(new Date(startOfDay), day, daysMeal[0].meal);
                mealPlanItem.classList.add('active');
                console.log(`${day} | ${daysMeal[0].meal.name}`);
            } else{
                mealPlanItem = createMealListItem(new Date(startOfDay), day, '');
                console.log(`${day} |`);
            }

            mealPlanList.appendChild(mealPlanItem);
        });

        return mealPlanList;
    }
    function createMealListItem(date, day, mealPlanItem = false){
        let listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.classList.add('meal-plan-item');
        listItem.classList.add('transition')
        listItem.dataset.date = date;

        if(mealPlanItem){
            listItem.dataset.meal = mealPlanItem.name;
            listItem.createMealListItemText(day, mealPlanItem);
        }else{
            listItem.dataset.meal = 'none';
            listItem.textContent = `${day} |`;
        }

        return listItem;
    }
    HTMLLIElement.prototype.createMealListItemText = function(day, mealPlanItem = false){
        this.textContent = `${day} | ${mealPlanItem.name}`;
    }
    function removePriorWeek(){
        document.querySelector('#main-list').style.opacity = 0;
        document.querySelector('#week-of-text').style.opacity = 0
        
        setTimeout(() => {
            document.querySelector('#main-list').remove();
            document.querySelector('#week-of-text').remove();
        }, frontEndSettings.changeDelay)
        
    }

    function addWeekOfText(firstDay){
        const weekOfContainer = document.createElement('div');
        weekOfContainer.id = 'week-of-text';
        weekOfContainer.classList.add('content-button-container');
        weekOfContainer.classList.add('transition');

        weekOfContainer.addPreviousWeekButton(firstDay);

        const weekOfText = document.createElement('h2');
        weekOfText.classList.add('subheading');
        weekOfText.textContent = `Week Of: ${getDateText(firstDay)}`;
        weekOfContainer.appendChild(weekOfText);

        weekOfContainer.addNextWeekButton(firstDay);

        sectionContentContainer.appendChild(weekOfContainer);
    }
    HTMLDivElement.prototype.addPreviousWeekButton = function(firstDay){
        const prevWeek = changeDate(firstDay, -7);
        const prevWeekButton = document.createElement('button');
        prevWeekButton.classList.add('content-button');
        prevWeekButton.classList.add('transition');
        prevWeekButton.dataset.firstDay = prevWeek;
        prevWeekButton.textContent = 'Previous Week';
        prevWeekButton.addEventListener('click', () => {
            removePriorWeek();
            loadMealPlanSection(prevWeek);
        })
        this.appendChild(prevWeekButton);
    }
    HTMLDivElement.prototype.addNextWeekButton = function(firstDay){
        const nextWeek = changeDate(firstDay, 7);
        const nextWeekButton = document.createElement('button');
        nextWeekButton.classList.add('content-button');
        nextWeekButton.classList.add('transition');
        nextWeekButton.dataset.firstDay = nextWeek;
        nextWeekButton.textContent = 'Next Week';
        nextWeekButton.addEventListener('click', () => {
            removePriorWeek();
            loadMealPlanSection(nextWeek);
        })
        this.appendChild(nextWeekButton);
    }
    // --> Helpers
    function addMealPlanData(date, mealPlan){
        const mealPlanObject = newMealPlanObject(date, mealPlan);
        // console.log('Meal Plan Object:',mealPlanObject)
        mealPlanData.push(mealPlanObject);
        localStorage.setItem('mealPlanData', JSON.stringify(mealPlanData));
    }
    function newMealPlanObject(date, meal){
        const newMealPlanObject = {
            date: date,
            meal: meal
        }
        return newMealPlanObject;
    }

    // ** Meal Reference Functions
    function loadMealReminderList(){

    }

    // ** Reminder Functions
    function loadReminderList(){

    }

    // ** Settings Functions
    function darkModeToggle(){

    }

    // *** UI FUNCTIONS ***
    // Update App Heading
    function updateHeading(sectionName){
        appHeading.style.opacity = 0;

        setTimeout(() => {
            appHeading.textContent = sectionName;
            appHeading.style.opacity = 1;
        }, frontEndSettings.showDelay);
    }
    function addHomeButton(){
        const homeSection = getAppSectionData('home');

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('home-button-container')
        buttonContainer.addMainButton(homeSection);

        setTimeout(() => {
            sectionContentContainer.appendChild(buttonContainer);
        }, frontEndSettings.changeDelay);
    }
    HTMLDivElement.prototype.hideSection = function(){
        this.style.opacity = 0;
        this.innerHTML = '';
    }
    HTMLDivElement.prototype.showSection = function(){
        setTimeout(() => {
            this.style.opacity = 1;
        }, frontEndSettings.showDelay);
    }
    HTMLDivElement.prototype.addMainButton = function(section){

        console.log('Button Created!')

        const mainButton = document.createElement('button');
        mainButton.classList.add('main-button');
        mainButton.classList.add('transition')
        mainButton.textContent = section.buttonText;
        mainButton.addEventListener('click', (e) => {
            loadSection(section.name);
        });

        this.appendChild(mainButton);
    }

    // *** TEST FUNCTIONS (Remove these one features are built) ***
    function loadDummyMealPlanData(){
        let dummyMealPlan = [
            {
                date: 'Fri Jan 31 2020 00:00:00 GMT-0800 (Pacific Standard Time)',
                meal: {
                    name: 'Spaghetti',
                    type: 'Pasta',
                    link: 'https://tastesbetterfromscratch.com/homemade-spaghetti-sauce/',
                    season: 'Year-round'
                }
            },
            {
                date: 'Mon Feb 03 2020 00:00:00 GMT-0800 (Pacific Standard Time)',
                meal: {
                    name: 'Spaghetti',
                    type: 'Pasta',
                    link: 'https://tastesbetterfromscratch.com/homemade-spaghetti-sauce/',
                    season: 'Year-round'
                }
            },
            {
                date: 'Tue Feb 04 2020 00:00:00 GMT-0800 (Pacific Standard Time)',
                meal: {
                    name: 'Tacos',
                    type: 'Comfort',
                    link: 'https://tastesbetterfromscratch.com/homemade-spaghetti-sauce/',
                    season: 'Year-round'
                }
            },
            {
                date: 'Wed Feb 05 2020 00:00:00 GMT-0800 (Pacific Standard Time)',
                meal: {
                    name: 'Lemon Chicken',
                    type: 'Poultry',
                    link: 'https://tastesbetterfromscratch.com/homemade-spaghetti-sauce/',
                    season: 'Year-round'
                }
            },
        ]
        dummyMealPlan.forEach(meal => {
            addMealPlanData(meal.date, meal.meal);
        })
    } 

    // Initial Load
    function loadApplication(){
        loadSection('home');
        mealPlanData.length == 0 ? loadDummyMealPlanData() : '';
    }
    loadApplication();
}