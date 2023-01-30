//создание экземпляра vue
let app = new Vue({
    el: '#app',     //подключение экземпляра к html странице
    data: {     //место для хранения данных
        product: "Socks",
        description: 'A pair of warm, fuzzy socks',
        image: "./assets/vmSocks-blue-onWhite.jpg",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inStock: true,
        inventory: 100,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'Green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'Blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
    },
    methods: {      //создение методов
        addToCart() {
            this.cart += 1
        },

        updateProduct(variantImage) {
            this.image = variantImage
        },

        removeFromCart() {
            this.cart -= 1
        }
    },
})
