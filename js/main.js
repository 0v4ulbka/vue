//создание экземпляра vue
//регистрация компонента
let eventBus = new Vue()
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `
    <div class="product">
        <div>
            <ul>
                <span class="tab" 
                    v-for="(tab, index) in tabs" 
                    @click="selectedTab = tab"
                    :class="{ activeTab: selectedTab === tab }"
                >{{ tab }}</span>
            </ul>
        </div>
        <div v-show="selectedTab === 'Shoes'">
            <h1>Shoes</h1>         
        </div>
        <div class="product-info" v-show="selectedTab === 'Socks'">
        <div class="product-image">
                <img :alt="altText" :src="image"/>
            </div>
                <h1>{{ sale }}</h1>
                <p>{{ description }}</p>
                <detail-tabs :shipping="shipping" :details="details"></detail-tabs>
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
                <product-tabs :reviews="reviews"></product-tabs>
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
            reviews: [],
            tabs:['Socks', 'Shoes'],
            selectedTab: 'Socks'

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
        },
    },

    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }

})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
        }
    },
    template: `
    <div class="product-details">    
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    </div>
    `,

})

Vue.component('product-review', {
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name" placeholder="name">
        </p>
    
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
        <p>
        <label for="recommend">Would you recommend this product?</label>
        
        <label>
            <input type="radio" v-model="recommend" name="rec" value="Yes">
            Yes
        </label>
        <label>
            <input type="radio" v-model="recommend" name="rec" value="No">
            No
        </label>
        </p>
        
        <p>
          <input type="submit" value="Submit"> 
        </p>

    </form>

    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: [],
        }
    },

    methods:{
        onSubmit(){
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommend required.")
            }

        }
    },


})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    template:`
    <div>
        <ul>
            <span class="tab" 
            v-for="(tab, index) in tabs" 
            @click="selectedTab = tab"
            :class="{ activeTab: selectedTab === tab }"
            >{{ tab }}</span>
        </ul>
        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>
        <div v-show="selectedTab === 'Make a Review'">
            <product-review></product-review>
        </div>
    </div>
    `,
    data() {
        return{
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    },
})

Vue.component('detail-tabs', {
    template: `
     <div>   
       <ul>
         <span class="tab"
               :class="{ activeTab: selectedTab === tab }"
               v-for="(tab, index) in tabs"
               @click="selectedTab = tab"
         >{{ tab }}</span>
       </ul>
       <div v-show="selectedTab === 'Shipping'">
         <p>Shipping: {{ shipping }}</p>
       </div>
       <div v-show="selectedTab === 'Details'">
         <product-details :details="details"></product-details>
       </div>
     </div>
    `,
    props: {
        shipping: {
            type: Function,
            required: false,
        },
        details: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            tabs: ['Details', 'Shipping'],
            selectedTab: 'Details'
        }
    },
})


let app = new Vue({
    el: '#app',     //подключение экземпляра к html странице
    data: {
        premium: false,
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

