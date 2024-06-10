<script>
import axios from '../../axios-auth';
import Footer from './../common/Footer.vue';

export default {
    name: "CustomerOverview",
    components: {
        Footer
    },
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            BSN: "",
            isActive: false,
            users: [],
            errorMessage: ''
        };
    },
    methods: {
        getUsers() {
            axios.get('users', {
                params: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    BSN: this.BSN,
                    isActive: this.isActive
                }
            })
                .then(result => {
                    this.users = result.data;
                    this.errorMessage = ''
                })
                .catch(error => {
                    this.errorMessage = error.response.data;
                    this.users = [];
                });
        },
        acceptUser(userId) {
            axios.put('users/' + userId + '/activate', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(result => {
                    this.getUsers();
                })
                .catch(error => {
                });
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="alert alert-danger" role="alert" v-if="this.errorMessage != ''">
            {{ this.errorMessage }}
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input v-model="firstName" type="text" class="form-control" id="firstname">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label for="firstName">Last Name</label>
                    <input v-model="lastName" type="text" class="form-control" id="lastname">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label for="firstName">Email</label>
                    <input v-model="email" type="text" class="form-control" id="email">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label for="phonenumber">Phonenumber</label>
                    <input v-model="phoneNumber" type="text" class="form-control" id="phonenumber">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label for="bsn">BSN</label>
                    <input v-model="BSN" type="text" class="form-control" id="bsn">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label for="bsn">Active</label>
                    <input v-model="isActive" type="checkbox" true-value="true" false-value="false"
                        id="isActive"></input>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <button @click="getUsers" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">PhoneNumber</th>
                <th scope="col">BSN</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users">
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phoneNumber }}</td>
                <td>{{ user.bsn }}</td>
                <td><button v-if="!user.active" @click="acceptUser(user.userId)"
                        class="btn btn-primary">Activate</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>