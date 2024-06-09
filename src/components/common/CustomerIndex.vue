<script>
import AccountDetail from '../bank/AccountDetail.vue';
import BankAccount from '../bank/BankAccount.vue';
import Footer from './../common/Footer.vue';

export default {
    name: "Index",
    components: {
        Footer,
        AccountDetail
    },
    data() {
        return {
            username: JSON.parse(localStorage.getItem("username")),
            bankAccounts: JSON.parse(localStorage.getItem("bankAccounts")),
            isActive: JSON.parse(localStorage.getItem("isActive")),
        }
    }
};
</script>

<template>
    <section class="container">
        <h1 class="h2">Welcome {{ username }} </h1> <!-- Add the user's name here -->

        <div class="row justify-content-center">
            <h3 v-if="isActive == 'false'" class="text-center">Your bank accounts have not yet been activated</h3>
            <AccountDetail v-else v-for="bankAccount in bankAccounts" :key="bankAccount.iban" :account="bankAccount" />
        </div>

        <div v-if="isActive == 'true'" class="row justify-content-center">
            <!-- Transaction -->
            <router-link to="/bank/transfer" class="card col-2 m-2">
                <img src="/images/transaction.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Transaction</h5>
                </div>
            </router-link>

            <!-- Transfer -->
            <router-link to="/bank/transferhistory" class="card col-2 m-2">
                <img src="/images/history.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">History</h5>
                </div>
            </router-link>

            <!-- ATM -->
            <router-link to="/atm/login" class="card col-2 m-2">
                <img src="/images/atm.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">ATM</h5>
                </div>
            </router-link>
        </div>
    </section>
    <Footer> </Footer>
</template>

<style scoped></style>