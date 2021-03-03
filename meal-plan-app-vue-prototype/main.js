/* 

    Vue Structure

    - body

        - nav-tabs
        - content
            - meal plan
            - meal references
            - reminders
            - settings
        - footer

*/

// Event Bus
var eventBus = new Vue();

// Nav Bar tabs (switch screens)
Vue.component("nav-tabs", {
  props: {},
  template: `
        <div class='nav-bar'>
            <ul class='tabs'>
                <li 
                    v-for='(tab, index) in tabs' 
                    class='btn transition'
                    :class='{active: $root.activeTab === tab}'
                    :tab=tab
                    @click.prevent='setActiveTab(tab)'>
                        {{tab}}
                </li>
            </ul>
        </div>
    `,
  data() {
    return {
      tabs: ["Meal Plan", "Meal References", "Reminders", "Settings"]
    };
  },
  methods: {
    setActiveTab(clickedTab) {
      eventBus.$emit("set-active-tab", clickedTab);
      console.log(this);
    }
  },
  computed: {},
  mounted() {}
});

// ** APP CONTENT
Vue.component("tab-content", {
  props: {
    selectedTab: "Meal Plan"
  },
  template: `
        <div class='app-content' :activeTab=selectedTab >
            <!-- Meal Plan Component -->
            <meal-plan :class='{"active-tab": $root.activeTab === "Meal Plan"}'></meal-plan>
            <!-- Meal Reference Component -->
            <meal-references :class='{"active-tab": $root.activeTab === "Meal References"}'></meal-references>
            <!-- Reminders Compnonent -->
            <app-reminders :class='{"active-tab": $root.activeTab === "Reminders"}'></app-reminders>
            <!-- Settings Component -->
            <app-settings :class='{"active-tab": $root.activeTab === "Settings"}'></app-settings>
        </div>
    `,
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {}
});

// * Meal Plan
Vue.component("meal-plan", {
  props: {
    tabName: "Meal Plan"
  },
  template: `
        <div class='transition tab meal-plan'>
            <h1>Meal Plan Data</h1>
        </div>
    `,
  mounted() {}
});

// * Meal References
Vue.component("meal-references", {
  props: {},
  template: `
        <div class='transition tab meal-references'>
            <h1>Meal References Data</h1>
        </div>
    `
});

// * Reminders
Vue.component("app-reminders", {
  props: {},
  template: `
        <div class='transition tab reminders'>
            <h1>Application Reminders</h1>
        </div>
    `
});

// * Settings
Vue.component("app-settings", {
  props: {},
  template: `
        <div class='transition tab settings'>
            <h1>Application Settings</h1>
            
            <!--
            Meal Type List
            Container with a list of types, and the ability to delete existing and add new items

            Meal Season List
            Container with a list of seasons, and the ability to delete existing and add new items

            Dark Mode Toggle
            Simple toggle to enable/disable dark mode

            Download and Delete Data
            2 buttons - 1 for downloading data and one for deleting
            -->
            <toggle></toggle>
        </div>
    `
});

// *** UI Components (Simple components)
Vue.component("toggle", {
  template: `
        <div class='toggle'>
            <p>Toggle Dark Mode {{$root.darkMode ? 'Off' : 'On'}}</p>
            <label :class='{"on" : $root.darkMode}'>
                <span id='dark-mode-toggle-switch' class='transition'></span>
                <input id='dark-mode-toggle-checkbox' type='checkbox' @click='toggleDarkMode'>
            </label>
        </div>
    `,
  data() {
    return {};
  },
  methods: {
    toggleDarkMode() {
      eventBus.$emit("toggle-dark-mode", "mode");
    }
  }
});

// *** Index.html Vue Hook
var app = new Vue({
  el: "#app",
  data: {
    activeTab: "Meal Plan",
    darkMode: false
  },
  methods: {
    checkDarkMode() {
      if (this.darkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    }
  },
  mounted() {
    eventBus.$on("set-active-tab", clickedTab => {
      this.activeTab = clickedTab;
    }),
      eventBus.$on("toggle-dark-mode", mode => {
        this.darkMode = !this.darkMode;
        this.checkDarkMode();
      });
  },
  created() {
    this.checkDarkMode();
  }
});
