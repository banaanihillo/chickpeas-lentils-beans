Vue.config.devtools = true

new Vue({
    el: "#application",
    data: {
        moustacheText: "Hello, ",
        things: [
            {
                product: "Chickpeas",
                inStock: true
            },
            {
                product: "Lentils",
                inStock: true
            },
            {
                product: "All kindsa beans",
                inStock: false
            }
        ],
        allKindsaBeans: [
            {
                beanType: "Mung",
                quantity: 5
            },
            {
                beanType: "Black",
                quantity: 0
            },
            {
                beanType: "Kidney",
                quantity: 2
            },
            {
                beanType: "Fava",
                quantity: 0
            }
        ],
        favoriteBean: ""
    },
    computed: {
        expandedMessage: function () {
            return (this.moustacheText + "you!")
        },
        anotherMessage: function () {
            return (this.moustacheText + "everyone!")
        },
        beanQuantity () {
            return this.allKindsaBeans.reduce((sum, bean) => {
                return sum + bean.quantity
            }, 0)
        }
    },
    methods: {
        addToStock(beanType) {
            const bean = this.allKindsaBeans.find(bean => bean.beanType === beanType)
            bean.quantity++
        }
    }
})


const CounterButton = {
    template: "#counter-button-template",
    data () {
        return {
            count: 0
        }
    }
}

new Vue({
    el: "#counter-button-component",
    components: {
        "counter-button": CounterButton
    }
})

