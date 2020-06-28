<template>
    <div>
        <ul v-for = "greetee in greetees" v-bind:key = "greetee.key">
            Hello, {{greetee.name}}!
            So, {{greetee.favoriteThing}} is your favorite, eh?
            <p v-if = "greetee.favoriteThing === 'Bananas'">
                Since you like 'em so much, how about adding some more?
                <button @click = "addBananas">
                    Right here!
                </button>
            </p>
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
        },
        methods: {
            addBananas() {
                this.$store.commit("addBananas")
            },
            getFruitSaladIngredients() {
                this.$store.getters.getFruitSaladIngredients
            }
        }
    }
</script>
