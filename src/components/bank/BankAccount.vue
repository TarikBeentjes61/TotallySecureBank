<script>
import axios from '../../axios-auth';
import Footer from './../common/Footer.vue';
import AccountDetail from './AccountDetail.vue';

export default {
    name: "Index",
    components: {
        Footer,
        AccountDetail
    },
    data() {
        return {
            bankAccounts: JSON.parse(localStorage.getItem("bankAccounts")),
            user: {},
            totalBalance: 0.00,
            errorMessage: ''
        }
    },
    mounted() {
        if (this.bankAccounts == '') {
            this.errorMessage = 'No bank accounts found';
            return;
        }

        this.totalBalance = this.bankAccounts.reduce((acc, account) => acc + account.balance, 0);
        axios
            .get("users/" + this.bankAccounts[0].userId + "/details")
            .then(response => {
                this.user = response.data;
            })
            .catch(error => {
                this.errorMessage = error.response;
            });
    }
};
</script>

<template>
    <section class="container">
        <div class="alert alert-danger" role="alert" v-if="this.errorMessage != ''">
            {{ this.errorMessage }}
        </div>
        <div class="row justify-content-center">
            <AccountDetail v-for="bankAccount in bankAccounts" :key="bankAccount.iban" :account="bankAccount" />
            <h3 class="text-center">Total Balance: &euro;{{ totalBalance }}</h3>
        </div>
        <div class="row justify-content-center mb-5">
            <div class="card col-6">
                <div class="card-body">
                    <h5 class="card-title">Customer Information</h5>
                    <form>
                        <div class="mb-3">
                            <label for="Firstname" class="form-label">First Name</label>
                            <input type="text" class="form-control" id="Firstname" :value="this.user.firstName"
                                readonly>
                        </div>
                        <div class="mb-3">
                            <label for="Lastname" class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="Lastname" :value="this.user.lastName" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="Username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="Username" :value="this.user.username" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" :value="this.user.email"
                                readonly>
                        </div>
                        <div class="mb-3">
                            <label for="Phonenumber" class="form-label">Phonenumber</label>
                            <input type="tel" class="form-control" id="Phonenumber" :value="this.user.phoneNumber"
                                readonly>
                        </div>
                        <div class="mb-3">
                            <label for="BSN" class="form-label">BSN</label>
                            <input type="number" class="form-control" id="BSN" :value="this.user.bsn" readonly>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <Footer> </Footer>
</template>

<style scoped></style>