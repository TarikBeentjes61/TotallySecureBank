<script>
import axios from '../../axios-auth';
import Footer from './../common/Footer.vue';

export default {
    name: "TransferCustomer",
    components: {
        Footer
    },
    data() {
        return {
        };
    },
    methods: {
        Transfer() {
            let body = {
                senderIban: null,
                receiverIban: null,
                amount: amount,
                description: document.getElementById('description').value,
                transactionType: transactionType,
                role: "ROLE_CUSTOMER",
                errorMessage: ''
            };
            axios.post('transactions', body)
            .then(result => {
                this.accounts = result.data;
                this.errorMessage = ''
            })
            .catch(error => {
                this.errorMessage = error.response.data;
            });
        }
    }
};
</script>

<template>
    <div class="container">

    </div>
  </template>
  
  <style scoped></style>