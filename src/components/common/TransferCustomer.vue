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
                role: "ROLE_CUSTOMER"
            };
            axios.post('transactions', body)
            .then(result => {
                this.accounts = result.data;
                console.log(result);
            })
            .catch(error => {
                console.log(error);
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