import { createRouter, createWebHistory } from 'vue-router'

// Import Common components
import CustomerIndex from './components/common/CustomerIndex.vue'
import SetTransferLimit from './components/common/SetTransferLimit.vue'
import SetAbsoluteLimit from './components/common/SetAbsoluteLimit.vue'
import CustomerOverview from './components/common/CustomerOverview.vue'
import SearchCustomer from './components/common/SearchCustomer.vue'

// Import User components
import Login from './components/user/Login.vue'
import Register from './components/user/Register.vue'

// Import Bank components
import Transfer from './components/bank/Transfer.vue'
import TransferHistory from './components/bank/TransferHistory.vue'
import Account from './components/bank/BankAccount.vue'

// Import ATM components
import ATMIndex from './components/atm/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Common routes
    { path: '/index', component: CustomerIndex },
    { path: '/settransferlimit', component: SetTransferLimit },
    { path: '/setabsolutelimit', component: SetAbsoluteLimit },
    { path: '/customeroverview', component: CustomerOverview },
    { path: '/searchCustomer', component: SearchCustomer },

    //User routes
    { path: '/register', component: Register },

    //Bank routes 
    { path: '/bank/transfer', component: Transfer },
    { path: '/bank/transferhistory', component: TransferHistory },
    { path: '/bank/account', component: Account },

    //ATM routes
    { path: '/atm/index', component: ATMIndex },

    { path: '/', component: Login },
    { path: '/atm/login', component: Login},
    { path: '/:pathMatch(.*)*', redirect: '/'}
  ]
})

export default router