<script>
import axios from '../../axios-auth';
import Footer from './../common/Footer.vue';

export default {
    name: "Index",
    components: {
        Footer
    },
    data() {
        return {
            BankAccount: JSON.parse(localStorage.getItem('bankAccounts')).find(bankAccount => bankAccount.accountType === 'CHECKINGS'),
            userType: JSON.parse(localStorage.getItem('roles')),
            AtmIBAN: 'NL00INHO0000000ATM',
            errorMessage: ''
        };
    },
    methods: {
        transfer(transactionType) {
            let amount = document.getElementById('amount').value;

            if (amount === '') {
                this.errorMessage = 'Please enter an amount';
                return;
            }

            if (amount <= 0) {
                this.errorMessage = 'Amount should be greater than 0';
                return;
            }
            let body = {
                senderIban: null,
                receiverIban: null,
                amount: amount,
                description: document.getElementById('description').value,
                transactionType: transactionType,
                role: "ROLE_CUSTOMER"
            };
            if (transactionType == 'WITHDRAWAL') {
                body.senderIban = this.BankAccount.iban;
                body.receiverIban = this.AtmIBAN;
            }
            if (transactionType == 'DEPOSIT') {
                body.senderIban = this.AtmIBAN;
                body.receiverIban = this.BankAccount.iban;
            }
            axios
                .post("/transactions", body)
                .then(response => {
                    if (response.data.balance == this.BankAccount.absoluteLimit - 1.0) {
                        this.errorMessage = 'Absolute limit reached'
                    }
                    else if (response.data.balance == this.BankAccount.absoluteLimit - 2.0) {
                        this.errorMessage = 'Daily limit reached'
                    }
                    else {
                        this.BankAccount.balance = response.data.balance;
                        this.errorMessage = ''
                    }
                }).catch(error => {
                    this.errorMessage = error.response.data;
                });
        }
    }
};
</script>

<template>
    <div v-if="this.BankAccount === undefined" class="container d-flex justify-content-center">
        <div class="alert alert-danger" role="alert">
            <p> No bank account found </p>
        </div>
    </div>
    <div v-else class="container d-flex justify-content-center">
        <form class="shadow rounded row col-5">
            <div class="alert alert-danger" role="alert" v-if="this.errorMessage != ''">
                {{ this.errorMessage }}
            </div>
            <h1 class="text-center">ATM</h1>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon2">&euro;</span>
                <input type="number" class="form-control" aria-describedby="basic-addon2" min="0.00"
                    v-model="this.BankAccount.balance"
                    v-bind:class="this.BankAccount.balance >= 0 ? 'text-success' : 'text-danger'" readonly>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">&euro;</span>
                <input type="number" class="form-control" id="amount" placeholder="Amount" aria-label="Amount"
                    aria-describedby="basic-addon1" min="0.00">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input type="text" class="form-control" id="description" aria-describedby="descriptionHelp">
                <div id="descriptionHelp" class="form-text">Entering a description is optional</div>
            </div>
            <div class="row mb-3">
                <div class="col"></div>
                <input type="button" class="btn btn-primary col-5 mx-1" name="withdraw" value="Withdraw"
                    @click="transfer('WITHDRAWAL')">
                <input type="button" class="btn btn-primary col-5 mx-1" name="deposit" value="Deposit"
                    @click="transfer('DEPOSIT')">
                <div class="col"></div>
            </div>
        </form>
    </div>
    <Footer> </Footer>
</template>

<style scoped></style>