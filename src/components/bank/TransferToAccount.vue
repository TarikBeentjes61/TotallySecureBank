<script>

export default {
    name: "TransferToAccount",
};
</script>

<template>
    <h3>To Account:</h3>
    <!-- https://blog.logrocket.com/making-components-dynamic-vue-3/ -->
    <form method="post">
        <div class="row mb-3">
            <div class="col-3">
                <label for="IBAN" class="col-form-label">Receiver IBAN</label>
            </div>
            <div class="col-auto">
                <input type="text" id="IBAN" class="form-control">
            </div>
        </div>

        <div class="row mb-3">
                        <div class="col-2">
                            <label for="Amount" class="col-form-label">Amount</label>
                        </div>
                        <div class="input-group col-auto">
                            <span class="input-group-text">&euro;</span>
                            <input id="Amount" type="number" class="form-control" aria-label="Amount"
                                aria-describedby="Amount" min="0.00" value="0.00">
                        </div>
                    </div>

        <div class="row mb-3">
            <input type="submit" class="btn btn-primary" value="Transfer">
        </div>
    </form>
</template>

<style scoped></style>