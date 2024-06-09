<script>
import Footer from './../common/Footer.vue';
import { userStore } from "../../stores/store";

export default {
    name: "Index",
    components: {
        Footer
    },
    setup() {
        const store = userStore();
        return { store };
    },
    data() {
        return {
            username: null,
            password: null,
            user: null,
            jwt: "",
            errorMessage: ''
        }
    },
    beforeMount() {
        if (localStorage.getItem("username") != null && window.location.pathname == "/") {
            localStorage.removeItem("jwt")
            localStorage.removeItem("username")
            localStorage.removeItem("roles")
            localStorage.removeItem("bankAccounts")
            localStorage.removeItem("isActive")

            window.location.reload()
        }
    },
    methods: {
        login(username, password) {
            this.store.login(username, password)
                .then(() => {
                    if (window.location.pathname == "/TotallySecureBank/atm/login") {
                        window.location.href = "/TotallySecureBank/atm/index"
                    }
                    else {
                        window.location.href = "/TotallySecureBank/index"
                    }

                })
                .catch(error => {
                    console.log(error);
                    this.errorMessage = error.response.data;
                })
        }
    }
};
</script>

<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="alert alert-danger" role="alert" v-if="this.errorMessage != ''">
                {{ this.errorMessage }}
            </div>
            <div class="card col-6">
                <div class="card-body">
                    <form>
                        <div class="mb-3">
                            <label for="Username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="Username" name="username" v-model="username">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="password"
                                v-model="password">
                        </div>
                        <div class="mb-3 form-check">
                            <p>Don't have an account yet? <a href="/TotallySecureBank/register">Register</a> here! </p>
                        </div>
                        <input type="button" class="btn btn-primary" value="Login" @click="login(username, password)" />
                    </form>
                </div>
            </div>
        </div>
    </section>
    <Footer> </Footer>
</template>

<style scoped></style>