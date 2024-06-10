<template>
    <div class="container-fluid bg-light">
        <header class="d-flex py-2 mb-2 border-bottom">
            <img src="/logo.png" alt="logo" width="60" height="60" />
            <h1>Totally Secure Bank</h1>

            <ul class="nav nav-pills m-2">
                <li class="nav-item">
                    <RouterLink to="/index" class="nav-link" active-class="active"
                        :class="{ disabled: !store.isLoggedIn }">
                        Home
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/bank/transfer" class="nav-link" active-class="active"
                        :class="{ disabled: !store.isLoggedIn || isActive != 'true'}">
                        Transfer
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/bank/transferhistory" class="nav-link" active-class="active"
                        :class="{ disabled: !store.isLoggedIn || isActive != 'true'}">
                        Transfer History
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/atm/login" class="nav-link" active-class="active" :class="{ disabled: isActive != 'true'}">ATM</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/customeroverview" class="nav-link" active-class="active"
                        :class="{ disabled: !store.isLoggedIn || isActive != 'true'}"
                        v-if="roles && roles.includes('ROLE_EMPLOYEE')">
                        Customer Overview
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/bank/account" class="nav-link" active-class="active"
                        :class="{ disabled: !store.isLoggedIn || isActive != 'true'}">
                        Account
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/" class="nav-link" active-class="active" v-if="store.isLoggedIn" @click="handleLogout">Logout</RouterLink>
                    <RouterLink to="/" class="nav-link" active-class="active" v-else>Login</RouterLink>
                </li>
            </ul>
        </header>
    </div>
</template>

<script>
import { userStore } from '../../stores/store';

export default {
    name: "Navigation",
    setup() {
        const store = userStore();

        const handleLogout = () => {
            store.logout();
        };

        return { store,handleLogout };
    },
    data() {
        return {
            isActive: JSON.parse(localStorage.getItem("isActive")),
            roles: []
        }
    },
    mounted() {
        this.roles = JSON.parse(localStorage.getItems("roles"));
        console.log(this.roles);
    }
};
</script>

<style></style>