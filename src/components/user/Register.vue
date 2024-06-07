<script>
import Footer from './../common/Footer.vue';
import axios from './../../axios-auth';

export default {
    name: "Register",
    components: {
        Footer
    },
    data() {
        return {
            user: null,
            errorMessage: ''
        }
    },
    methods: {
        getUserInfo() {
            this.user = {
                firstName: document.getElementById("Firstname").value,
                lastName: document.getElementById("Lastname").value,
                email: document.getElementById("Email").value,
                username: document.getElementById("Username").value,
                password: document.getElementById("Password").value,
                phoneNumber: document.getElementById("Phonenumber").value,
                bsn: document.getElementById("BSN").value
            }
        },
        validateUserInfo() {
            if (this.user.firstname == '' || this.user.lastname == '' || this.user.email == '' || this.user.username == '' || this.user.password == '' || this.user.phonenumber == '' || this.user.bsn == '') {
                this.errorMessage = "Please fill in all fields!";
                return false;
            }
            if (this.user.password != document.getElementById("RepeatPassword").value) {
                this.errorMessage = "Passwords do not match!";
                return false;
            }
            this.errorMessage = '';
            return true;
        },
        Register() {
            this.getUserInfo();
            if (this.validateUserInfo()) {
                axios
                    .post('users', this.user)
                    .then(response => {
                        console.log(response);
                        window.location.href = "/login";
                    })
                    .catch(error => {
                        this.errorMessage = error.response.data;
                    });
            }
        }
    }
};
</script>

<template>
    <section class="container">
        <div class="row justify-content-center mb-5">
            <div class="card col-6 mb-3">
                <div class="alert alert-danger" role="alert" v-if="this.errorMessage != ''">
                    {{ this.errorMessage }}
                </div>
                <div class="card-body">
                    <h1>Register your account here!</h1>
                    <form>
                        <div class="mb-2">
                            <label for="Firstname" class="form-label">First Name</label>
                            <input type="text" class="form-control" id="Firstname" required>
                        </div>
                        <div class="mb-2">
                            <label for="Lastname" class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="Lastname" required>
                        </div>
                        <div class="mb-2">
                            <label for="Email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="Email" required>
                        </div>
                        <div class="mb-2">
                            <label for="Username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="Username" required>
                        </div>
                        <div class="mb-2">
                            <label for="Password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="Password" required>
                        </div>
                        <div class="mb-2">
                            <label for="RepeatPassword" class="form-label">Repeat Password</label>
                            <input type="password" class="form-control" id="RepeatPassword" required>
                        </div>
                        <div class="mb-2">
                            <label for="Phonenumber" class="form-label">Phonenumber</label>
                            <input type="tel" class="form-control" id="Phonenumber" required>
                        </div>
                        <div class="mb-2">
                            <label for="BSN" class="form-label">BSN</label>
                            <input type="number" class="form-control" id="BSN" required>
                        </div>
                        <input type="button" class="btn btn-primary" value="Register" @click="Register()">
                        <div class="mb-2 form-check">
                            <p>Already have an account? <a href="/login">Login</a> here! </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <Footer> </Footer>
</template>

<style scoped></style>