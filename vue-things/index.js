const application = new Vue({
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
                bean: "Kidney beans",
                quantity: 2
            },
            {
                bean: "Black beans",
                quantity: 0
            },
            {
                bean: "Mung beans",
                quantity: 5
            },
            {
                bean: "Fava beans",
                quantity: 0
            }
        ]
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
    }
})
