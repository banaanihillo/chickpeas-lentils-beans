<template>
    <div>
        <ul v-for = "greetee in greetees" v-bind:key = "greetee.key">
            Hello, {{greetee.name}}!
            So, {{greetee.favoriteThing}} is your favorite, eh?
        </ul>
    </div>
</template>

<script>
    export default {
        name: "HelloEveryoneElse",
        props: {
            greetees: {
                type: Array,
                required: true
            }
        }
    }
</script>
