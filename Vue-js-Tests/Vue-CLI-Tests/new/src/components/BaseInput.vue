<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      @input="updateValue"
      v-on="listeners"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import { formFieldMixin } from "../mixins/formFieldMixin.js";
export default {
  mixins: [formFieldMixin]
};
</script>

<style scoped></style>
