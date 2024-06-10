<template>
  <div>
    <select v-if="!isCustomInput" v-model="selectedReceiverBankAccount" @change="handleSelectChange" class="form-select">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      <option value="custom">Custom</option>
    </select>
    <input v-else type="text" v-model="customInput" @input="handleInput" class="form-control" />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedReceiverBankAccount: this.value || this.options[0],
      isCustomInput: false,
      customInput: ''
    };
  },
  watch: {
    value(newValue) {
      this.selectedReceiverBankAccount = newValue;
    }
  },
  methods: {
    handleSelectChange() {
      if (this.selectedReceiverBankAccount === 'custom') {
        this.isCustomInput = true;
        this.customInput = '';
      } else {
        this.$emit('input', this.selectedReceiverBankAccount);
      }
    },
    handleInput() {
      this.$emit('input', this.customInput);
      if (this.customInput === '') {
        this.isCustomInput = false; 
      }
    }
  },
  mounted() {
    if (this.value === 'custom') {
      this.isCustomInput = true;
    }
  }
};
</script>

<style scoped>
</style>