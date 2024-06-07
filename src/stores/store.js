import { defineStore } from 'pinia'
import axios from '../axios-auth'

export const userStore = defineStore('store', {
    state: () => ({
        jwt: '',
        username: '',
        roles: [],
        bankAccounts: [],
        isActive: false,
    }),
    getters: {
        isLoggedIn: (state) => state.jwt !== '',
    },
    actions: {
        login(username, password) {
            return new Promise((resolve, reject) => {
                this.user = {
                    username: username,
                    password: password
                }
                axios
                    .post("users/login", this.user)
                    .then(response => {
                        console.log(response.data)

                        this.jwt = response.data.token;
                        this.username = response.data.username;
                        this.roles = response.data.roles;
                        this.bankAccounts = response.data.bankAccounts;
                        this.isActive = response.data.isActive;

                        axios.defaults.headers.common['Authorization'] = "Bearer " + this.jwt;
                        resolve();

                        if (this.user != "") {
                            localStorage.setItem("jwt", this.jwt)
                            localStorage.setItem("username", JSON.stringify(this.username))
                            localStorage.setItem("roles", JSON.stringify(this.roles))
                            localStorage.setItem("bankAccounts", JSON.stringify(this.bankAccounts))
                            localStorage.setItem("isActive", JSON.stringify(this.isActive))
                        }
                    })
                    .catch((error) => reject(error));
            }
            )
        },
        autoLogin() {
            const jwt = localStorage.getItem("jwt")
            const username = localStorage.getItem("username")

            if (jwt && username) {
                this.jwt = jwt
                this.username = JSON.parse(username)
                axios.defaults.headers.common['Authorization'] = "Bearer " + this.jwt
            }
        }
    },
}
)