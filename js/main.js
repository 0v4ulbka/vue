//создание экземпляра vue
let app = new Vue({
    el: '#app',     //подключение экземпляра к html странице
    data: {     //место для хранения данных
        product: "Socks",
        brand: 'Vue Mastery',
        description: 'A pair of warm, fuzzy socks',
        selectedVariant: 0,
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inventory: 20,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'Green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10,
            },
            {
                variantId: 2235,
                variantColor: 'Blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0,
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
    },
    methods: {      //создение методов
        addToCart() {
            this.cart += 1;
        },

        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },

        removeFromCart() {
            this.cart -= 1;
        },


    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            let ons = ''
            if (this.onSale) {
                ons = 'On sale'
            }
            return this.brand + ' ' + this.product + ' ' + ons
        }
    }

})
