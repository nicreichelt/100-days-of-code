// CONSTANTS
const token = "";

// Event Bus
var eventBus = new Vue();

// ** SECTIONS
// * Sticky Banner Component
Vue.component("sticky-banner", {
  props: {
    updateMargin: Boolean,
  },
  template: `
        <div class='sticky-banner transition' :class='{"show": open}'>
            <p>{{stickyNavText}}</p>
            <a @click='closeBanner' class='btn close transition'></a>
        </div>
    `,
  data() {
    return {
      open: true,
      bannerHeight: 0,
      elementToAdjust: "div.splash h1",
    };
  },
  methods: {
    getFirstDay(date) {
      date = new Date(date);
      var day = date.getDay(),
        diff = date.getDate() - day + (day == 0 ? -6 : 1) - 1;
      return new Date(date.setDate(diff));
    },
    getSimpleDate(date, format = "US") {
      date = new Date(date);
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getFullYear();

      return format == "US" ? `${mon}/${day}/${year}` : `${day}/${mon}/${year}`;
    },
    closeBanner() {
      this.open = false;
    },
    setBannerHeight() {
      this.bannerHeight =
        this._self.$el.clientHeight == 0
          ? 0
          : this._self.$el.clientHeight + "px";
      console.log("Banner Height Updated: " + this.bannerHeight);
    },
    updateAppMargin(update) {
      if (update) {
        this.setBannerHeight();
        let elem = document.querySelector(this.elementToAdjust);
        elem.classList.add("transition");
        elem.style.marginTop = this.bannerHeight;
      }
    },
  },
  computed: {
    stickyNavText: function () {
      return (
        "Appointments Available for the week of " +
        this.getSimpleDate(this.getFirstDay(new Date()))
      );
    },
  },
  created() {},
  mounted() {
    this.updateAppMargin(this.updateMargin);
  },
  updated() {
    setTimeout(() => {
      this.updateAppMargin(this.updateMargin);
    }, 350);
  },
});

// * Splash Screen
Vue.component("splash-screen", {
  props: {},
  template: `
        <div class='splash'>
          <h1>{{splashHeading}}</h1>
          <h2>{{splashSubHeading}}</h2>
          <p>{{splashText}}</p>
          <p>{{splashHours}}</p>
          <base-button></base-button>
        </div>
    `,
  data() {
    return {
      splashHeading: "Nic Reichelt",
      splashSubHeading: "Tech Services",
      splashText: "Sacramento Area After Hours Tech Support",
      splashHours: "Weekdays 5:30 - 9:00 PM & Weekends 11:00 AM - 6:00 PM",
    };
  },
});

// * Services
Vue.component("services", {
  props: {},
  template: `
          <div class='services section'>
            <h1>Overview of Services Offered</h1>
            <div class='card-container'>
              <base-card v-for="card in serviceCards" :key='card.id' :card-data='card'></base-card>
            </div>
            <popup :popup-description='popupDescription' :popup-points='popupPoints' :class='{"show": popupOpen}'></popup>
          </div>
      `,
  data() {
    return {
      serviceCards: "",
      popupDescription: "",
      popupPoints: [],
      popupOpen: false,
    };
  },
  created() {
    fetch("http://localhost:3000/serviceCards")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.serviceCards = data;
      });
  },
  methods: {
    updatePopup(popupObject) {
      this.popupDescription = popupObject.popupDescription;
      this.popupPoints = popupObject.popupPoints;
      this.togglePopup(true);
    },
    togglePopup(state) {
      this.popupOpen = state;
    },
  },
  mounted() {
    eventBus.$on("sendpopup", (popupObject) => {
      this.updatePopup(popupObject);
    });
    eventBus.$on("closepopup", (close) => {
      this.togglePopup(close);
    });
  },
});

// * Contact Form
Vue.component("contact-form", {
  props: {},
  template: `
    <div class='contact-form section' id='contact'>
      <h1>Let me know how I can help you ...</h1>
      <form name='contact-form' action='' method='post'>
        <input id='name-input' type='text' placeholder='Enter your name ...'>
        <input id='email-input' type='email' placeholder='Enter your e-mail address ...'>
        <select id='service-selection'>
          <option v-for='item in optionTypes' :value='item'>{{item}}</option>
        </select>
        <textarea id='description-text' placeholder='Provide a detailed description of your needs so I can better prepare to assist you ...'></textarea>
        <input id='contact-button' class='transition' type='button' value='Submit' @click='submitForm'>
      </form>
    </div>
  `,
  methods: {
    submitForm() {
      // Email.send({
      //   SecureToken: this.token,
      //   To: "nic.reichelt@gmail.com",
      //   From: "contact@nicreichelt.com",
      //   Subject: "Test",
      //   Body: "Test",
      // }).then((message) => console.log(message));
      let nameValue = document.querySelector("#name-input").value;
      let emailValue = document.querySelector("#email-input").value;
      let serviceValue = document.querySelector("#service-selection").value;
      let descriptionValue = document.querySelector("#description-text").value;

      console.log("SEND EMAIL", {
        name: nameValue,
        email: emailValue,
        service: serviceValue,
        description: descriptionValue,
      });
    },
  },
  data() {
    return {
      optionTypes: [
        "- Select Service -",
        "Setup",
        "Upgrade",
        "Software",
        "Mobile",
        "Troubleshooting",
        "Consulting",
      ],
      token: "88625290-6f59-404c-9359-897182e4f5ee",
    };
  },
});

// * Page Footer
Vue.component("page-footer", {
  props: {},
  template: `
    <footer class='footer'>
      <social-links></social-links>
      <a class='copyright' href='https://nicreichelt.com'>{{copyrightText}}</a>
    </footer>
  `,
  data() {
    return {
      copyrightText: "",
    };
  },
  methods: {
    getCopyrightText() {
      var year = new Date().getUTCFullYear();

      this.copyrightText = `Copyright \u00A9 ${year} Nic Reichelt`;
    },
  },
  mounted() {
    this.getCopyrightText();
  },
});

// ** BASIC ELEMENTS
// * Base Button
Vue.component("base-button", {
  props: {},
  template: `
    <a class='btn base-btn' :href=buttonLink>
      {{buttonContent}}
    </a>
  `,
  data() {
    return {
      buttonLink: "#contact",
      buttonContent: "Contact Me",
    };
  },
});

// * Service Card
Vue.component("base-card", {
  props: {
    cardData: Object,
  },
  template: `
    <div class='card transition' @click='showDetails'>
      <div class='card-topper' v-bind:style="{backgroundColor:cardData.color}"></div>
      <img src="Standard_Logo_OG_FINAL.png">
      <div class='card-content'>
        <p class='service-name'><b>{{cardData.name}}</b></p>
        <p class='service-price'>Starting @ \${{cardData.startingRate}}</p>
        <p class='service-description'>{{cardData.description}}</p>
      </div>
    </div>
  `,
  data() {
    return {};
  },
  methods: {
    showDetails() {
      eventBus.$emit("sendpopup", {
        popupDescription: this.cardData.slideDescription,
        popupPoints: this.cardData.slideBulletPoints,
      });
    },
  },
  mounted() {},
});
// Service Card Popup
Vue.component("popup", {
  props: {
    popupDescription: String,
    popupPoints: Array,
  },
  template: `
    <div class='popup-overlay transition'>
      <div class='popup-card'>
        <p class='popup-description'>{{popupDescription}}</p>
        <ul>
          <li v-for="point in popupPoints">
            {{point}}
          </li>
        </ul>
      </div>
      <a class='close transition' @click='closePopup'></a>
    </div>
  `,
  data() {
    return {};
  },
  methods: {
    closePopup() {
      eventBus.$emit("closepopup", false);
    },
  },
});

// * Social Links
Vue.component("social-links", {
  props: {},
  template: `
    <div class='social'>
      <social-icon v-for="link in socialLinks" :key='link.id' :link-data='link'></social-icon>
    </div>
  `,
  data() {
    return {
      socialLinks: "",
    };
  },
  created() {
    fetch("http://localhost:3000/socialLinks")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.socialLinks = data;
      });
  },
});
// * Social Icon
Vue.component("social-icon", {
  props: {
    linkData: Object,
  },
  template: `
    <a target="_blank" class='transition' :class=linkData.class :style="{backgroundColor:iconColor}" :href=linkData.url @mouseover="iconColor = linkData.color" @mouseleave="iconColor = '#feffff'"></a> 
  `,
  data() {
    return {
      iconColor: "#feffff",
    };
  },
  mounted() {},
});

// ** APP
var app = new Vue({
  el: "#app",
  data: {
    test: true,
  },
  methods: {},
  mounted() {},
  created() {},
  updated() {},
});
