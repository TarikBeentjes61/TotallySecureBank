<script>
import Footer from './../common/Footer.vue';
import axios from '../../axios-auth';


export default {
    name: "TransferHistory",
    components: {
        Footer
    },
    data() {
        return {
            today: new Date().toLocaleDateString('en-CA'), // en-CA, so format is yyyy-mm-dd, which is the format required by the input type="date"
            BankAccount: JSON.parse(localStorage.getItem('bankAccounts')).find(bankAccount => bankAccount.accountType === 'CHECKINGS'),
            transactions: [],
            startDate: '',
            endDate: '',
            errorMessage: ''
        };
    },
    methods: {
        getTransactions() {
            if (this.BankAccount === undefined) {
                this.errorMessage = 'No bank account found';
                return;
            }
            axios.get("/accounts/" + this.BankAccount.iban + "/history")
                .then(response => {
                    this.transactions = response.data;
                })
                .catch(error => {
                    this.errorMessage = error.response;
                });
        },
        validateDates() {
            if (this.startDate === '' || this.endDate === '') {
                this.startDate = new Date(this.today).setMonth(new Date(this.today).getMonth() - 1);
                this.endDate = new Date(this.today);
            }
            if (new Date(this.startDate) > new Date(this.endDate)) {
                this.errorMessage = 'Start date should be before end date';
                return false;
            }
            if (new Date(this.startDate) > new Date(this.today) || new Date(this.endDate) > new Date(this.today)) {
                this.errorMessage = 'Date should be before today';
                return false;
            }

            return true;
        },
        filterTransactions() {
            this.startDate = document.getElementById('startDate').value;
            this.endDate = document.getElementById('endDate').value;

            if (!this.validateDates()) {
                return;
            }

            axios.get('/accounts/' + this.BankAccount.iban + '/history', {
                params: {
                    startDate: new Date(this.startDate).toLocaleDateString('en-CA'),
                    endDate: new Date(this.endDate).toLocaleDateString('en-CA'),
                    filter: document.querySelector('input[name="btnradio1"]:checked').value,
                    amount: document.getElementById('amount').value,
                    filterIBAN: document.querySelector('select[name="select"]').value,
                    filterAccount: document.getElementById('filterIBAN').value
                }
            })
                .then(response => {
                    this.transactions = response.data;
                    this.errorMessage = '';
                })
                .catch(error => {
                    this.errorMessage = error.response.data;
                    this.transactions = [];
                });
            this.errorMessage = '';
        },
        isOwner(IBAN) {
            return IBAN === this.BankAccount.iban;
        }
    },
    mounted() {
        this.getTransactions();
    }
};
</script>

<template>
    <div class="container">
        <div class="alert alert-danger" role="alert" v-if="this.errorMessage != ''">
            {{ this.errorMessage }}
        </div>
        <h1>Transfer History</h1>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-2">
                <label for="startDate" class="form-label">Start date</label>
                <input type="date" class="form-control" id="startDate" name="startDate" :max="today">
            </div>
            <div class="col-2">
                <label for="endDate" class="form-label">End date</label>
                <input type="date" class="form-control" id="endDate" name="endDate" :max="today">
            </div>
            <div class="col-3">
                <label for="dropdown" class="form-label">To / from</label>
                <div class="input-group mb-3">
                    <select name="select" class="form-select">
                        <option value="TO" selected>To</option>
                        <option value="FROM">From</option>
                    </select>
                    <input id="filterIBAN" type="text" class="form-control">
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-2"></div>
            <div class="col-2">
                <label for="filter" class="form-label">Filter</label>
                <div id="filter" class="btn-group col-12" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio1" id="Less" value="LESS" autocomplete="off">
                    <label class="btn btn-outline-primary" for="Less">Less</label>

                    <input type="radio" class="btn-check" name="btnradio1" id="Equal" value="EQUAL" autocomplete="off">
                    <label class="btn btn-outline-primary" for="Equal">Equal</label>

                    <input type="radio" class="btn-check" name="btnradio1" id="Greater" value="GREATER"
                        autocomplete="off" checked>
                    <label class="btn btn-outline-primary" for="Greater">Greater</label>
                </div>
            </div>
            <div class="col-2">
                <label for="amount" class="form-label">Amount</label>
                <input type="number" class="form-control" id="amount" name="amount" min="0.00" value="0.00">
            </div>
            <div class="col-3">
                <label for="search" class="form-label">Search</label>
                <input id="search" type="button" class="btn btn-primary col-12" value="Search"
                    @click="filterTransactions()" />
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-2"></div>
        <div class="col-7">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Sender</th>
                        <th scope="col">Receiver</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in transactions">
                        <td v-bind:class="[isOwner(transaction.senderIBAN) ? 'text-primary' : '']"> {{
            transaction.senderIBAN }}</td>
                        <td v-bind:class="[isOwner(transaction.receiverIBAN) ? 'text-primary' : '']"> {{
            transaction.receiverIBAN }}</td>
                        <td>{{ new Intl.NumberFormat('nl-NL', {
            style: 'currency', currency:
                'EUR'
        }).format(transaction.amount) }}</td>
                        <td>{{ new Date(transaction.transactionDate).toLocaleDateString() }}</td>
                        <td>{{ transaction.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-2"></div>
    </div>
    <div class="row my-5"></div>
    <Footer> </Footer>
</template>

<style scoped></style>