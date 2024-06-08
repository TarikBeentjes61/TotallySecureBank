<template>
        <div class="card col-4 m-2">
            <div class="card-body">
                <h5 class="card-title">{{ account.accountType }}</h5>
                <p class="card-text">Balance: {{account.balance }} </p>
                <p class="card-text">Absolute Limit: {{ account.absoluteLimit }} </p>
            </div>
        </div>
</template>

<script>

export default {
    name: 'AccountDetail',
    props: {
        account: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
</style>