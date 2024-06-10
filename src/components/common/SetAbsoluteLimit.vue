<script>
import axios from 'axios';
import Footer from './../common/Footer.vue';

export default {
    name: "SetAbsoluteLimit",
    components: {
        Footer
    },
    data() {
        return {
            IBAN: "",
            absoluteLimit: 0,
            errorMessage: ''
        };
    },
    methods: {
        send() {
            axios
            .put("http://localhost:8080/accounts/" + this.IBAN + "/absoluteLimit?limit=" + this.absoluteLimit) 
            .then((result) => {
                this.errorMessage = "";
            })
            .catch((error) => {
                this.errorMessage = error.response.data;
            });
        }
     }
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="IBAN">IBAN</label>
                    <input v-model="IBAN" type="text" class="form-control" id="IBAN" placeholder="Enter IBAN">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="absoluteLimit">Absolute Limit</label>
                    <input v-model.number="absoluteLimit" type="number" class="form-control" id="absoluteLimit" placeholder="Enter new absolute limit">
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