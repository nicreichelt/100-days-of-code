window.onload = function(){
    // *** App Data Variables (Store in Local Storage)
    let mealPlanData = JSON.parse(localStorage.getItem('mealPlanData')) || [];
    let mealsReferenceData = JSON.parse(localStorage.getItem('mealsReferenceData')) || [];
    let remindersData = JSON.parse(localStorage.getItem('remindersData')) || [];
    let settingsData = JSON.parse(localStorage.getItem('settingsData')) || {
        mealSeasons:[],
        mealTypes:[],
        darkMode: false
    };

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
        // -> [X] Get Current Weeks Meal Plan Items
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
    // * App Section Helper Functions
    function getAppSectionData(sectionName){
        const filteredSection = appSections.filter(section => section.name == sectionName);
        return filteredSection[0];
    }

    // ** Meal Plan Functions
    function loadSelectedWeekMealsList(firstDay){
        let lastDay = getLastDayOfWeek(firstDay);
        lastDay.timeEndOfDay();

        const mealPlanList = document.createElement('ul');
        mealPlanList.classList.add('transition');
        mealPlanList.id = 'main-list';

        frontEndSettings.daysOfWeek.forEach((day, index) => {
            let startOfDay = new Date(firstDay);
            startOfDay.timeStartOfDay();
            let endOfDay = new Date(firstDay);
            endOfDay.timeEndOfDay();

            if(index > 0){
                startOfDay = changeDate(startOfDay, index);
                endOfDay = changeDate(endOfDay, index);
            }

            const currendDaysMeal = mealPlanData.filter(mealPlan => {
                const mealDate = new Date(mealPlan.date);
                return mealDate >= startOfDay && mealDate <= endOfDay;
            });

            let mealPlanItem = '';
            if(currendDaysMeal.length > 0){
                mealPlanItem = createMealListItem(new Date(startOfDay), day, currendDaysMeal[0].meal);
                mealPlanItem.classList.add('active');
            } else{
                mealPlanItem = createMealListItem(new Date(startOfDay), day, '');
            }

            mealPlanList.appendChild(mealPlanItem);
        });

        return mealPlanList;
    }
    function removePriorWeek(){
        document.querySelector('#main-list').style.opacity = 0;
        document.querySelector('#week-of-text').style.opacity = 0
        
        setTimeout(() => {
            document.querySelector('#main-list').remove();
            document.querySelector('#week-of-text').remove();
        }, frontEndSettings.changeDelay)
        
    }
    // * Week Of Text & Helpers
    function addWeekOfText(firstDay){
        const weekOfContainer = document.createElement('div');
        weekOfContainer.id = 'week-of-text';
        weekOfContainer.classList.add('content-button-container');
        weekOfContainer.classList.add('transition');

        weekOfContainer.changeWeekButton(firstDay, -1);

        const weekOfText = document.createElement('h2');
        weekOfText.classList.add('subheading');
        weekOfText.textContent = `Week Of: ${getDateText(firstDay)}`;
        weekOfContainer.appendChild(weekOfText);

        weekOfContainer.changeWeekButton(firstDay, 1);

        sectionContentContainer.appendChild(weekOfContainer);
    }
    HTMLDivElement.prototype.changeWeekButton = function(firstDay, changeType){
        let changeWeek;

        changeType == -1 ? changeWeek = changeDate(firstDay, -7) : '';
        changeType == 1 ? changeWeek = changeDate(firstDay, 7) : '';

        const changeWeekButton = document.createElement('button');
        changeWeekButton.classList.add('content-button');
        changeWeekButton.classList.add('transition');
        changeWeekButton.dataset.firstDay = changeWeek;
        changeType == -1 ? changeWeekButton.textContent = 'Previous Week' : '';
        changeType == 1 ? changeWeekButton.textContent = 'Next Week' : '';
        changeWeekButton.addEventListener('click', () => {
            removePriorWeek();
            loadMealPlanSection(changeWeek);
        })

        this.appendChild(changeWeekButton);
    }
    // * Add/Edit Meal Plan Dialog Funtions
    function addEditMealDialog(e){
        const dialogData = {
            mealName: e.target.dataset.meal,
            mealDate : e.target.dataset.date,
            dialogType : e.target.dataset.meal == 'none' ? 'add' : 'edit'
        }

        const mealPlanPopupBox = document.createElement('div');
        mealPlanPopupBox.classList.add('meal-plan-popup');
        if(dialogData.dialogType == 'add'){
            mealPlanPopupBox.addPopupHeading('Add New Meal');
        }else{
            mealPlanPopupBox.addPopupHeading(`Change Meal from ${dialogData.mealName}`);
        }

        mealPlanPopupBox.generateMealPlanDialogContent(dialogData);

        popupContainer.appendChild(mealPlanPopupBox);

        setTimeout(() => {
            popupContainer.showSection();
            popupContainer.style.zIndex = 20;
        }, frontEndSettings.changeDelay)
    }
    HTMLDivElement.prototype.generateMealPlanDialogContent = function(dialogContentObject){
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');

        const newOrExistingMealRadioContainer = generateMealPlanDialogRadios(dialogContentObject.dialogType);
        popupContent.appendChild(newOrExistingMealRadioContainer);

        const mealFormsContainer = document.createElement('div');
        mealFormsContainer.classList.add('meal-forms-container');
        mealFormsContainer.classList.add('transition');

        const newMealForm = generateNewMealForm();
        dialogContentObject.dialogType == 'add' ? newMealForm.classList.add('active') : '';
        mealFormsContainer.appendChild(newMealForm);

        const existingMealForm = generateExistingMealForm(dialogContentObject);
        dialogContentObject.dialogType == 'edit' ? existingMealForm.classList.add('active') : '';
        mealFormsContainer.appendChild(existingMealForm);

        popupContent.appendChild(mealFormsContainer)

        const mealDialogSaveCancelButtonsContainer = generateMealDialogSaveCancelButtons(dialogContentObject.dialogType, dialogContentObject.mealDate);
        popupContent.appendChild(mealDialogSaveCancelButtonsContainer)

        this.appendChild(popupContent);
    }
    function generateMealPlanDialogRadios(dialogContentObject){
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('add-edit-dialog-radios');

        const newMealRadio = document.createElement('input');
        newMealRadio.id = 'new-meal-radio'
        newMealRadio.setAttribute('type', 'radio');
        newMealRadio.setAttribute('name', 'popup-radios');
        dialogContentObject == 'add' ? newMealRadio.checked  = true: '';
        newMealRadio.addEventListener('click', () => {
            changePopupContent('add');
        });
        buttonContainer.appendChild(newMealRadio);
        const newMealLabel = document.createElement('label');
        newMealLabel.classList.add('transition');
        newMealLabel.setAttribute('for', 'new-meal-radio');
        newMealLabel.textContent = 'Create New Meal'
        buttonContainer.appendChild(newMealLabel);

        const existingMealRadio = document.createElement('input');
        existingMealRadio.id = 'existing-meal-radio'
        existingMealRadio.setAttribute('type', 'radio');
        existingMealRadio.setAttribute('name', 'popup-radios');
        dialogContentObject == 'edit' ? existingMealRadio.checked = true : '';
        existingMealRadio.addEventListener('click', () => {
            changePopupContent('edit');
        });
        buttonContainer.appendChild(existingMealRadio);
        const existingMealLabel = document.createElement('label');
        existingMealLabel.classList.add('transition');
        existingMealLabel.setAttribute('for', 'existing-meal-radio');
        existingMealLabel.textContent = 'Choose Existing Meal'
        buttonContainer.appendChild(existingMealLabel);

        return buttonContainer;
    }
    function generateNewMealForm(){
        const newMealForm = document.createElement('div');
        newMealForm.classList.add('new-meal-form');
        newMealForm.classList.add('transition');

        const mealNameInput = document.createElement('input');
        mealNameInput.classList.add('transition');
        mealNameInput.id = 'form-meal-name';
        mealNameInput.setAttribute('type', 'text');
        mealNameInput.placeholder = 'Enter Meal Name here...'
        newMealForm.appendChild(mealNameInput);

        const mealTypeInput = document.createElement('select');
        mealTypeInput.classList.add('transition');
        mealTypeInput.id = 'form-meal-type';
        mealTypeInput.generateDropdownList('- Select Meal Type', settingsData.mealTypes);
        newMealForm.appendChild(mealTypeInput);

        const mealSeasonSelection = document.createElement('select');
        mealSeasonSelection.classList.add('transition');
        mealSeasonSelection.id = 'form-meal-season';
        mealSeasonSelection.generateDropdownList('- Select Meal Season', settingsData.mealSeasons);
        newMealForm.appendChild(mealSeasonSelection);

        const mealUrlInput = document.createElement('input');
        mealUrlInput.classList.add('transition');
        mealUrlInput.id = 'form-meal-link';
        mealUrlInput.setAttribute('type', 'text');
        mealUrlInput.placeholder = '(Optional) Add recipe/website URL here...'
        newMealForm.appendChild(mealUrlInput);

        return newMealForm;
    }
    function generateExistingMealForm(dialogContentObject){
        const existingMealForm = document.createElement('div');
        existingMealForm.classList.add('existing-meal-form');
        existingMealForm.classList.add('transition');

        const existingMealDropDownsContainer = document.createElement('div');
        existingMealDropDownsContainer.classList.add('existing-meal-dropdowns')

        const existingMealSeasonDropDown = document.createElement('select');
        existingMealSeasonDropDown.id = 'existing-meal-season-dropdown';
        existingMealSeasonDropDown.generateDropdownList('- Filter By Meal Season', settingsData.mealSeasons);
        existingMealSeasonDropDown.addEventListener('change', filterMealList);
        existingMealDropDownsContainer.appendChild(existingMealSeasonDropDown);

        const existingMealTypeDropDown = document.createElement('select');
        existingMealTypeDropDown.id = 'existing-meal-type-dropdown';
        existingMealTypeDropDown.generateDropdownList('- Filter By Meal Type', settingsData.mealTypes);
        existingMealTypeDropDown.addEventListener('change', filterMealList);
        existingMealDropDownsContainer.appendChild(existingMealTypeDropDown);

        existingMealForm.appendChild(existingMealDropDownsContainer);

        const existingMealListContainer = document.createElement('div');
        existingMealListContainer.classList.add('existing-meal-list');
        existingMealListContainer.classList.add('transition');
        existingMealListContainer.generateMealReferenceList(dialogContentObject.mealName);
        existingMealForm.appendChild(existingMealListContainer)

        return existingMealForm;
    }
    function generateMealDialogSaveCancelButtons(dialogType, mealDate){
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('add-edit-dialog-buttons');

        const saveButton = document.createElement('button');
        saveButton.classList.add('transition');
        saveButton.textContent = dialogType == 'add' ? 'Add Meal' : 'Change Meal';
        saveButton.addEventListener('click', () => {
            addEditMeal(dialogType, mealDate);
        });
        buttonContainer.appendChild(saveButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('transition');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', closePopupDialog);
        buttonContainer.appendChild(cancelButton);

        return buttonContainer;
    }
    // * Meal Plan List Functions
    function createMealListItem(date, day, mealPlanItem = false){
        let listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.classList.add('meal-plan-item');
        listItem.classList.add('transition')
        listItem.dataset.date = date;
        listItem.addEventListener('click', addEditMealDialog);

        if(mealPlanItem){
            listItem.dataset.meal = mealPlanItem.name;
            listItem.createMealPlanListItemText(day, mealPlanItem);
        }else{
            listItem.dataset.meal = 'none';
            listItem.textContent = `${day} |`;
        }

        return listItem;
    }
    HTMLLIElement.prototype.createMealPlanListItemText = function(day, mealPlanItem = false){
        this.textContent = `${day} | ${mealPlanItem.name}`;
    }
    // * Meal Plan Data Helpers
    function newMealPlanObject(date, meal){
        const newMealPlanObject = {
            date: date,
            meal: meal
        }
        return newMealPlanObject;
    }
    function addEditMeal(addType, mealDate){
        const newMealData = getNewMealFormData();
        const existingMealData = getExistingMealFormdata();

        let mealExistsFlag = false;

        const dialogType = getMealDialogType();
        if(addType == 'add'){
            dialogType == 'new-meal-radio' ? mealExistsFlag = addMealPlanData(mealDate, newMealData, 'new') : addMealPlanData(mealDate, existingMealData, 'existing');
        }else{
            dialogType == 'new-meal-radio' ? mealExistsFlag = updateMealPlanData(mealDate, newMealData, 'new') : updateMealPlanData(mealDate, existingMealData, 'existing');
        }

        if(!mealExistsFlag){
            removePriorWeek();
            loadMealPlanSection(getFirstDayOfWeek(new Date(mealDate)));
            closePopupDialog();
        }
    }
    function addMealPlanData(date, mealPlan, addType = 'new'){
        let mealExistsflag = false;
        addType == 'new' ?  mealExistsFlag = addMealReferenceData(mealPlan) : '';

        if(!mealExistsflag){
            const mealPlanObject = newMealPlanObject(date, mealPlan);
            mealPlanData.push(mealPlanObject);
            localStorage.setItem('mealPlanData', JSON.stringify(mealPlanData));
        }else{
            return mealExistsflag;
        }
    }
    function updateMealPlanData(mealDate, mealPlan, updateType = 'new'){
        let mealExistsflag = false;
        updateType == 'new' ? mealExistsflag = addMealReferenceData(mealPlan) : '';

        if(!mealExistsflag){
            let  mealIndex
            mealPlanData.forEach((meal, index) => {
                meal.date == mealDate ? mealIndex = index : '';
            });
            mealPlanData[mealIndex] = newMealPlanObject(mealDate, mealPlan);
            localStorage.setItem('mealPlanData', JSON.stringify(mealPlanData));
        }

        return mealExistsflag;
    }
    function getMealDialogType(){
        const mealDialogRadios = document.querySelectorAll('input[name=popup-radios]');
        let mealDialogType;

        mealDialogRadios.forEach(type => {
            if(type.checked){
                mealDialogType = type.id;
            }
        });

        return mealDialogType;
    }
    function getNewMealFormData(){
        const mealFormData = {
            name: document.querySelector('#form-meal-name').value,
            type: document.querySelector('#form-meal-type').value,
            season: document.querySelector('#form-meal-season').value,
            link: document.querySelector('#form-meal-link').value
        }

        return mealFormData;
    }
    function getExistingMealFormdata(){
        const existingMealRadios = document.querySelectorAll('input[name=meal-list-radios]');
        let selectedMealName = '';
        let selectedMeal = {};

        existingMealRadios.forEach(radio => {
            radio.checked ? selectedMealName = radio.value : '';
        });

        selectedMeal = getMeal(selectedMealName);

        console.log(selectedMeal)

        return selectedMeal;
    }
    function getExistingMealFilters(){
        let typeFilter = document.querySelector('#existing-meal-type-dropdown').value;
        let seasonFilter = document.querySelector('#existing-meal-season-dropdown').value;

        const mealFilters = {
            type: typeFilter == '- Filter By Meal Type' ? typeFilter = '' : typeFilter,
            season: seasonFilter == '- Filter By Meal Season' ? seasonFilter = '' : seasonFilter
        }

        return mealFilters;
    }

    // ** Meal Reference Functions
    function loadMealReferenceList(){

    }
    HTMLDivElement.prototype.generateMealReferenceList = function(mealName){
        this.innerHTML = '';

        const mealOptions = getMealOptions(mealsReferenceData, mealName);

        mealOptions.forEach(item => {
            this.appendChild(item)
        });
    }
    function getMealOptions(mealArray, mealName = ''){
        const mealList = []

        mealArray.forEach(meal => {
            const mealRadio = document.createElement('input');
            mealRadio.id = `existing-meal-${meal.name}`;
            mealRadio.value = `${meal.name}`;
            mealRadio.setAttribute('type', 'radio');
            mealRadio.setAttribute('name', 'meal-list-radios');
            mealName == meal.name ? mealRadio.checked  = true : '';
            mealList.push(mealRadio);

            const mealLabel = document.createElement('label');
            mealLabel.classList.add('transition');
            mealLabel.setAttribute('for', `existing-meal-${meal.name}`);
            mealLabel.textContent = meal.name
            mealList.push(mealLabel);
        });

        return mealList;
    }
    function filterMealList(){
        const existingMealList = document.querySelector('.existing-meal-list');
        const filters = getExistingMealFilters();

        let filteredMealData = mealsReferenceData
            .filter(meal => meal.season == filters.season || filters.season == '')
            .filter(meal => meal.type == filters.type || filters.type == '');

        const filteredOptions = getMealOptions(filteredMealData);

        existingMealList.style.opacity = 0;
        existingMealList.style.maxHeight = 0;

        setTimeout(() => {
            existingMealList.innerHTML = '';
            filteredOptions.forEach(item => {
                existingMealList.appendChild(item)
            });
            existingMealList.style.opacity = 1;
            existingMealList.style.maxHeight = '3000px';
        },frontEndSettings.changeDelay);
    }
    function addMealReferenceData(meal){
        let mealExistsFlag = false;

        mealsReferenceData.forEach(mealRef => {
            if(mealRef.name == meal.name){
                mealExistsFlag = true
                return;
            }
        });

        if(!mealExistsFlag){
            mealsReferenceData.push(meal);
            localStorage.setItem('mealsReferenceData', JSON.stringify(mealsReferenceData));
        }else{
            alert(`A meal with the same name (${meal.name}) already exists. Please pick a different name.`);
        }
        
        return mealExistsFlag;
    }
    function updateMealReferenceData(newMeal){
        let mealIndex = 0;

        mealsReferenceData.forEach((meal, index) => {
            meal.name == newMeal.name ? mealIndex = index : '';
        })

        mealsReferenceData[mealIndex] = newMeal;
        localStorage.setItem('mealsReferenceData', JSON.stringify(mealsReferenceData));
    }
    function addMealTypeData(type){
        let flag = false;
        settingsData.mealTypes.forEach(currentType => {
            currentType == type ? true : false;
        })

        if(!flag){
            settingsData.mealTypes.push(type);
            localStorage.setItem('settingsData', JSON.stringify(settingsData));
        }else{
            alert(`A meal type with the same name (${type}) already exists. Please pick a different type name.`);
        }
    }
    function addMealSeasonData(season){
        let flag = false;
        settingsData.mealSeasons.forEach(currentSeason => {
            currentSeason == season ? true : false;
        })

        if(!flag){
            settingsData.mealSeasons.push(season);
            localStorage.setItem('settingsData', JSON.stringify(settingsData));
        }else{
            alert(`A meal season with the same name (${season}) already exists. Please pick a different season name.`);
        }
    }
    function getMeal(mealName){
        const meal = mealsReferenceData.filter((value) => {
            return value.name == mealName;
        });
        return meal[0];
    }
    function getMealProperty(mealName, propertyName){
        const meal = mealsReferenceData.filter((value) => {
            return value.name == mealName;
        });
        return meal[0][propertyName]
    }

    // ** Reminder Functions
    function loadReminderList(){

    }

    // ** Settings Functions
    function darkModeToggle(){

    }

    // *** GLOBAL UI FUNCTIONS ***
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
        const mainButton = document.createElement('button');
        mainButton.classList.add('main-button');
        mainButton.classList.add('transition')
        mainButton.textContent = section.buttonText;
        mainButton.addEventListener('click', (e) => {
            loadSection(section.name);
        });

        this.appendChild(mainButton);
    }
    HTMLDivElement.prototype.addPopupHeading = function(headingText){
        heading = document.createElement('h2');
        heading.textContent = headingText;
        this.appendChild(heading);
    }
    HTMLSelectElement.prototype.generateDropdownList = function(blankValueText, arrayToLoop){
        const blankOption = document.createElement('option');
        blankOption.value = blankValueText;
        blankOption.textContent = blankValueText;
        this.appendChild(blankOption);
        
        arrayToLoop.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            this.appendChild(option);
        });
    }
    HTMLSelectElement.prototype.setDropdownSelection = function (selectionValue, propertyName){
        const mealProperty = getMealProperty(selectionValue, propertyName)
        this.childNodes.forEach((option, index) => {
            option.value == mealProperty ? this.selectedIndex = index : '';
        });
    }
    function changePopupContent(dialogType){
        const existingForm = document.querySelector('.existing-meal-form');
        const newForm = document.querySelector('.new-meal-form');

        if(dialogType == 'add'){
            existingForm.classList.remove('active');
            setTimeout(() => {
                newForm.classList.add('active');
            },frontEndSettings.changeDelay)
        }else{
            newForm.classList.remove('active');
            setTimeout(() => {
                existingForm.classList.add('active');
            },frontEndSettings.changeDelay)
        }
    }
    function closePopupDialog(){
        popupContainer.style.opacity = 0;
        popupContainer.style.zIndex = -10;
        setTimeout(() => {
            popupContainer.children[0].remove();
        }, frontEndSettings.changeDelay);
    }

    // *** TEST FUNCTIONS (Remove these one features are built) ***
    function loadDummyMealsReferenceData(){
        let dummyMealsReference = [
            {
                name: 'Spaghetti',
                type: 'Pasta',
                link: 'https://tastesbetterfromscratch.com/homemade-spaghetti-sauce/',
                season: 'Year-round'
            },
            {
            name: 'Tacos',
            type: 'Comfort',
            link: 'https://tastesbetterfromscratch.com/homemade-spaghetti-sauce/',
            season: 'Year-round'
            },
            {
                name: 'Lemon Chicken',
                type: 'Poultry',
                link: 'https://tastesbetterfromscratch.com/homemade-spaghetti-sauce/',
                season: 'Year-round'
            }
        ]
        dummyMealsReference.forEach(meal => {
            addMealReferenceData(meal);
        })
    }
    function loadDummyMealTypeData(){
        let dummyTypes = [
            'Pasta', 'Comfort', 'Vegetarian', 'Poultry'
        ]

        dummyTypes.forEach(type => {
            addMealTypeData(type);
        })
    }
    function loadDummyMealSeasonData(){
        let dummySeasons = [
            'Year-round', 'Cold Weather', 'Warm Weather'
        ]

        dummySeasons.forEach(season => {
            addMealSeasonData(season);
        })
    }

    // **** Initial Load
    function loadApplication(){
        loadSection('home');
        mealsReferenceData.length == 0? loadDummyMealsReferenceData() : '';
        settingsData.mealTypes == 0 ? loadDummyMealTypeData() : '';
        settingsData.mealSeasons == 0 ? loadDummyMealSeasonData() : '';
    }
    loadApplication();
}