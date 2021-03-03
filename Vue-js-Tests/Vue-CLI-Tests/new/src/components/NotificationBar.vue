<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    }
  },
  data() {
    return {
      timeOut: null
    };
  },
  mounted() {
    this.timeOut = setTimeout(() => this.remove(this.notification), 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeOut);
  },
  methods: mapActions("notification", ["remove"])
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0;
}
</style>
