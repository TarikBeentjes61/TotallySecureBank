<script>
import axios from '../../axios-auth';
import Footer from './../common/Footer.vue';

export default {
  name: "SearchCustomer",
  components: {
    Footer
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      accounts: [],
      errorMessage: ''
    };
  },
  methods: {
    getAccounts() {
      axios.get('accounts/customer', {
        params: {
          firstName: this.firstName,
          lastName: this.lastName,
        }
      })
        .then(result => {
          this.accounts = result.data;
          console.log(result);
          this.errorMessage = "";
        })
        .catch(error => {
          console.log(error);
          this.errorMessage = error.response;
        });
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input v-model="firstName" type="text" class="form-control" id="firstName">
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input v-model="lastName" type="text" class="form-control" id="lastName">
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <button @click="getAccounts" class="btn btn-primary mt-4">Submit</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">IBAN</th>
              <th scope="col">Account Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(account, index) in accounts" :key="index">
              <td>{{ account.firstName }}</td>
              <td>{{ account.lastName }}</td>
              <td>{{ account.iban }}</td>
              <td>{{ account.accountType }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>