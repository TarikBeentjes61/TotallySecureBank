<script>
import CustomSelect from './../common/CustomSelect.vue';
import axios from '../../axios-auth';

export default {
   components: {
      CustomSelect
   },
   data() {
      return {
         selectedBankAccount: '',
         selectedSelfReceiverBankAccount: '',
         amount: '',
         firstName: '',
         lastName: '',
         description: '',
         bankAccounts: JSON.parse(localStorage.getItem("bankAccounts")),
         foundAccounts: '',
         selectedReceiverBankAccount: '',
         searchMode: 'iban',
         errorMessage: ''
      }
   },
   computed: {
      receiverSelfBankAccountDisplay() {
         const account = this.bankAccounts.find(account => account.iban === this.selectedSelfReceiverBankAccount);
         return account ? `${account.iban} - ${account.accountType}` : '';
      }
   },
   methods: {
      swapToIbanMode() {
         this.searchMode = 'iban';
      },
      swapToNameMode() {
         this.searchMode = 'name';
      },
      submitTransactionSelf() {
         let body = {
            senderIban: this.selectedBankAccount,
            receiverIban: this.selectedSelfReceiverBankAccount,
            amount: this.amount,
            description: this.description,
            transactionType: "TRANSFER",
            role: "ROLE_CUSTOMER"
         };
         this.transfer(body);
      },
      submitTransactionOther() {
         let body = {
            senderIban: this.selectedBankAccount,
            receiverIban: this.selectedReceiverBankAccount,
            amount: this.amount,
            description: this.description,
            transactionType: "TRANSFER",
            role: "ROLE_CUSTOMER"
         };
         this.transfer(body);
      },
      transfer(body) {
         axios.post("/transactions", body)
            .then(response => {
               const senderAccount = this.bankAccounts.find(account => account.iban === body.senderIban);
               const receiverAccount = this.bankAccounts.find(account => account.iban === body.receiverIban);

               if (senderAccount) {
                  senderAccount.balance -= body.amount;
               }
               if (receiverAccount) {
                  receiverAccount.balance += body.amount;
               }
               localStorage.setItem("bankAccounts", JSON.stringify(this.bankAccounts));
               this.errorMessage = '';
            })
            .catch(error => {
               this.errorMessage = error.response.data;
            });
      },
      updateSelfReceiverBankAccount() {
         const selectedAccount = this.bankAccounts.find(account => account.iban === this.selectedBankAccount);
         if (selectedAccount) {
            const otherAccount = this.bankAccounts.find(account => account.accountType !== selectedAccount.accountType);
            if (otherAccount) {
               this.selectedSelfReceiverBankAccount = otherAccount.iban;
            }
         }
      },
      searchForIban() {
         axios.get('accounts/customer', {
            params: {
               firstName: this.firstName,
               lastName: this.lastName,
            }
         })
            .then(result => {
               this.foundAccounts = result.data;
               if (this.foundAccounts.length > 0) {
                  this.selectedReceiverBankAccount = this.foundAccounts[0].iban;
               }
            })
            .catch(error => {
               console.log(error.response.data);
               this.errorMessage = error.response.data;
            });
      },
   },
   mounted() {
      if (this.bankAccounts.length > 0) {
         this.selectedBankAccount = this.bankAccounts[0].iban;
         this.updateSelfReceiverBankAccount();
      }
   }
}
</script>
<template>
   <div class="container mt-4">
      <div class="alert alert-danger" role="alert" v-if="this.errorMessage != ''">
         {{ this.errorMessage }}
      </div>
      <div class="col">
         <h1>Transfer</h1>
         <div class="mb-3">
            <label for="bank-account" class="form-label">Select Bank Account:</label>
            <select v-model="selectedBankAccount" id="bank-account" class="form-select"
               @change="updateSelfReceiverBankAccount">
               <option v-for="bankAccount in bankAccounts" :key="bankAccount.iban" :value="bankAccount.iban">
                  {{ bankAccount.iban }} - {{ bankAccount.accountType }} - €{{ bankAccount.balance }}
               </option>
            </select>
         </div>
         <div class="mb-3">
            <label for="amount" class="form-label">Amount:</label>
            <input type="number" v-model="amount" id="amount" class="form-control" />
         </div>
         <div class="mb-3">
            <label for="description" class="form-label">Description:</label>
            <input v-model="description" id="description" class="form-control" />
         </div>
      </div>
      <div class="row">
         <div class="col-md-6">
            <h2>To savings/checkings</h2>
            <div class="mb-3">
               <label for="receiver-self-bank-account" class="form-label">Receiver Bank Account:</label>
               <input type="text" :value="receiverSelfBankAccountDisplay" id="receiver-self-bank-account"
                  class="form-control" disabled />
            </div>
            <div class="mb-3">
               <button @click="submitTransactionSelf" class="btn btn-primary">Submit</button>
            </div>
         </div>
         <div class="col-md-6">
            <h1>To other</h1>
            <button @click="swapToNameMode" class="btn btn-primary">Search IBAN By Full Name</button>
            <button @click="swapToIbanMode" class="btn btn-primary">Fill in IBAN</button>
            <div v-if="searchMode === 'name'" class="mb-3">
               <h3>Search for account by name</h3>
               <div class="mb-3">
                  <label for="first-name" class="form-label">First Name:</label>
                  <input type="text" v-model="firstName" id="first-name" class="form-control" />
               </div>
               <div class="mb-3">
                  <label for="last-name" class="form-label">Last Name:</label>
                  <input type="text" v-model="lastName" id="last-name" class="form-control" />
               </div>
               <div class="mb-3">
                  <button @click="searchForIban" class="btn btn-primary">Search</button>
               </div>
               <div class="mb-3">
                  <label for="bank-account" class="form-label">Select Bank Account:</label>
                  <select v-model="selectedReceiverBankAccount" class="form-select">
                     <option v-for="bankAccount in foundAccounts" :key="bankAccount.iban" :value="bankAccount.iban">
                        {{ bankAccount.iban }}
                     </option>
                  </select>
               </div>
            </div>
            <div v-if="searchMode === 'iban'" class="mb-3">
               <label class="form-label">Receiver Bank Account:</label>
               <input type="text" v-model="selectedReceiverBankAccount" id="receiver-bank-account" class="form-control"
                  placeholder="Enter Receiver Bank Account">
            </div>
            <div class="mb-3">
               <button @click="submitTransactionOther" class="btn btn-primary">Submit</button>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
button {
   margin-left: 10px;
   margin-top: 10px;
}
</style>