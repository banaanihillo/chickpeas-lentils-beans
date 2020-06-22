<template>
    <button v-on:click = "count++">
        {{count}}
    </button>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                count: 0
            }
        }
    }
</script>
