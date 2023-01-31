//создание экземпляра vue
//регистрация компонента
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `
    <div class="product">
        <div class="product-image">
                <img :alt="altText" :src="image"/>
            </div>
            <div class="product-info">
                <h1>{{ sale }}</h1>
                <p>Shipping: {{ shipping }}</p>
                <p>{{ description }}</p>
                <product-detail :details="details"></product-detail>
                <div class="color-box"
                     v-for="(variant, index) in variants"
                     :key="variant.variantId"
                     :style="{ backgroundColor:variant.variantColor}"
                     @mouseover="updateProduct(index)"
                >
                </div>
                <div>
                    <p>Sizes:</p>
                    <ul>
                        <li v-for="size in sizes">{{ size }}</li>
                    </ul>
                </div>
                <a :href="link">More products like this</a>
                <p id="In_Stock" v-if="inStock">In Stock</p>
                <p id="Almost" v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p :class="{ outOfStock: !inStock }" v-else>Out of Stock</p>
                <span v-show="onSale">On Sale</span><br>
                <button
                        @click="addToCart"
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                >
                    Add to cart
                </button>
                <button @click="removeFromCart">Remove from cart</button>
                
            </div>
    </div>
    `,
    data() {
        return {
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

        }
    },
    methods: {

        addToCart() {
            this.$emit('add-to-cart',
                this.variants[this.selectedVariant].variantId);
        },

        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },

        removeFromCart() {
            this.$emit('remove-from-cart',
                this.variants[this.selectedVariant].variantId);
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            } else {
                return 2.99
            }
        }

    }
})

Vue.component('product-detail', {
    props: {
        details: {
            type: Array,
        }
    },
    template: `
    <div class="product-detail">    
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    </div>
    `,

})

let app = new Vue({
    el: '#app',     //подключение экземпляра к html странице
    data: {
        premium: true,
        cart: [],
    },

    methods: {
        updateCart(id){
            this.cart.push(id);
        },
        removeFromCart(id){
            this.cart.pop(id);
        }
    }
})

