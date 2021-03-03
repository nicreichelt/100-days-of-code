<template>
  <div class="event-create">
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <!-- Category -->
      <BaseSelect
        label="Select a Category"
        :options="categories"
        v-model="event.category"
        class="field"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="-text-error">
          Category is required
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <!-- Title -->
      <BaseInput
        type="text"
        placeholder="Add a title for your event..."
        label="Title"
        v-model="event.title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="-text-error">
          Title is required
        </p>
      </template>

      <!-- Description -->
      <BaseInput
        type="text"
        placeholder="Add a description for your event..."
        label="Description"
        v-model="event.description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="-text-error">
          Description is required
        </p>
      </template>

      <h3>Where is your event?</h3>
      <!-- Location -->
      <BaseInput
        type="text"
        placeholder="Add a location for your event..."
        label="Location"
        v-model="event.location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="-text-error">
          Location is required
        </p>
      </template>

      <h3>When is your event?</h3>
      <!-- Date -->
      <div class="field">
        <label>Date</label>
        <datepicker
          placeholder="Select a date"
          v-model="event.date"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
        />
      </div>

      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="-text-error">
          Date is required.
        </p>
      </template>

      <!-- Time -->
      <BaseSelect
        label="Select a Time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="-text-error">
          Time is required
        </p>
      </template>

      <!-- Submit -->
      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="-text-error">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapState, mapGetters } from "vuex";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }

    return {
      times,
      event: this.createFreshEventObject()
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch("event/createEvent", this.event)
          .then(() => {
            this.$router.push({
              name: "event-show",
              params: {
                id: this.event.id
              }
            });
            this.event = this.createFreshEventObject();
          })
          .catch(() => {
            NProgress.done();
          });
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        user: user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    }
  },
  computed: {
    ...mapGetters(["catLength", "getEventById"]),
    ...mapState(["user", "categories"])
  }
};
</script>

<style scoped>
.field {
  margin: 0 0 24px 0;
}
</style>
