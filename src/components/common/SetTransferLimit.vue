<script>
import axios from 'axios';
import Footer from './../common/Footer.vue';

export default {
    name: "SetTransferLimit",
    components: {
        Footer
    },
    data() {
        return {
            userId: "1",
            transferLimit: 0,
            errorMessage: ''
        };
    },
    methods: {
        send() {
            axios
            .put("http://localhost:8080/users/" + this.userId + "/transferlimit?limit=" + this.transferLimit) 
            .then((result) => {
                this.errorMessage = "";
            })
            .catch(
                (error) => {
                    this.errorMessage = error.response.data;
                }
            );
        }
     }
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="userId">User Id</label>
                    <input v-model="userId" type="text" class="form-control" id="userId" placeholder="Enter User Id">
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="transferLimit">Transfer Limit</label>
                <input v-model="transferLimit" type="number" class="form-control" id="transferLimit" placeholder="Enter new daily transfer limit">
            </div>
        </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <button @click="send" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>