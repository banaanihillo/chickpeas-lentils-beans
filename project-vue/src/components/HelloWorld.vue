<template>
    <div class = "hello">
        {{console.log("Hello")}}
        {{console.log(window.performance.now())}}
        <h1> {{message}} </h1>
        <p>
            Banana count: {{this.$store.state.bananas}} <br />
            Guanabana count: {{this.$store.state.guanabanas}} <br />
            Total ingredients: {{this.$store.getters.getFruitSaladIngredients}}
            <br />
            Add some guanabanas:
            <input
                v-model.number = "guanabanasToAdd"
                type = "number"
                min = 1
                max = 99
            />
                <span v-if = "!(!(guanabanasToAdd < 100) || !(guanabanasToAdd > 0))">
                    <button @click = "addGuanabanas(guanabanasToAdd)">
                        Add
                    </button>
                </span>
                <span v-else>
                    <br />
                    Make sure the input is between 1 and 99.
                </span>
        </p>
        <p>
            For a guide and recipes on how to configure / customize this project,
            <br />
            check out the
            <a
                href = "https://cli.vuejs.org"
                target = "_blank"
                rel = "noopener"
            >
                vue-cli documentation
            </a>.
        </p>

        <h2> Installed CLI Plugins </h2>
        <ul>
            <li>
                <a
                    href = "`https://github.com/vuejs/vue-cli/tree/dev/packages/
                        %40vue/cli-plugin-babel`"
                    target = "_blank"
                    rel = "noopener"
                >
                    babel
                </a>
            </li>
            <li>
                <a
                    href = "`https://github.com/vuejs/vue-cli/tree/dev/packages/
                        %40vue/cli-plugin-eslint`"
                    target = "_blank"
                    rel = "noopener"
                >
                    eslint
                </a>
            </li>
        </ul>

        <h2> Essential Links </h2>
        <ul>
            <li>
                <a
                    href = "https://vuejs.org"
                    target = "_blank"
                    rel = "noopener"
                >
                    Core Docs
                </a>
            </li>
            <li>
                <a
                    href = "https://forum.vuejs.org"
                    target = "_blank"
                    rel = "noopener"
                >
                    Forum
                </a>
            </li>
            <li>
                <a
                    href = "https://chat.vuejs.org"
                    target = "_blank"
                    rel = "noopener"
                >
                    Community Chat
                </a>
            </li>
            <li>
                <a
                    href = "https://news.vuejs.org"
                    target = "_blank"
                    rel = "noopener"
                >
                    News
                </a>
            </li>
        </ul>

        <h2> Ecosystem </h2>
        <ul>
            <li>
                <a
                    href = "https://router.vuejs.org"
                    target = "_blank"
                    rel = "noopener"
                >
                    vue-router
                </a>
            </li>
            <li>
                <a
                    href = "https://vuex.vuejs.org"
                    target = "_blank"
                    rel = "noopener"
                >
                    vuex
                </a>
            </li>
            <li>
                <a
                    href = "https://github.com/vuejs/vue-devtools#vue-devtools"
                    target = "_blank"
                    rel = "noopener"
                >
                    vue-devtools
                </a>
            </li>
            <li>
                <a
                    href = "https://vue-loader.vuejs.org"
                    target = "_blank"
                    rel = "noopener"
                >
                    vue-loader
                </a>
            </li>
            <li>
                <a
                    href = "https://github.com/vuejs/awesome-vue"
                    target = "_blank"
                    rel = "noopener"
                >
                    awesome-vue
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            message: {
                type: String,
                required: true
            }
        },
        methods: {
            addGuanabanas(guanabanaInput) {
                this.$store.commit("addGuanabanas", {
                    guanabanaInput: guanabanaInput
                })
            }
        },
        data() {
            return {
                guanabanasToAdd: 1
            }
        },
        computed: {
            console: () => console,
            window: () => window
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
