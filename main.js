// registering a component
Vue.component('product', {
    props: {
        premium : {
            type : Boolean,
            required : true
        }
    },
    template : `
    <div class="product">
        <div class="product-image">
            <div v-if = "onSale" class="sale-div">
                <span class="sale-span"> Sale </span>
            </div>
            <img v-bind:alt = "product" :title = "product" v-bind:src = "image">
        </div>
        <div class="product-info">
            <h1>{{title}}</h1>
            <p>{{description}}</p>
            <a v-bind:href = "link">Go To Manufacton</a>
            <p v-if="isInStock">In Stock</p>
            <!-- <p v-else-if = "inventory <= 10 && inventory > 0">Almost Sold Out!</p> -->
            <p v-else>
                <span :class = "{striked : !isInStock}">In Stock</span>
                Out Of Stock
            </p>

            <p>Shipping : {{shipping}}</p>

            <product-details :details = "details"></product-details>
            <div v-for = "(variant, index) in  variants" 
                :key= "variant.variantId"
                @mouseover = "updateProduct(index)"
                class = "color-box"
                :style = "{'background-color' : variant.variantColor}">
            </div>
            <button v-on:click = "addToCart()" :disabled = "!isInStock" :class = "{disabledButton : !isInStock}">Add To Cart</button>
            <button style = "width : 40%" v-on:click = "removeFromCart()">Remove From Cart</button>
        </div>
        <div>
            <h2>Reviews</h2>
            <p v-if = "!reviews.length">There are no reviews yet! </p>
            <ul>
                <li v-for = "review in reviews">
                <b>{{review.name}}</b> says <span>{{review.review}}</span>
                </li>
            </ul>
            <product-review @add-product-review = "addReview($event)"></product-review>
        </div>
    </div>
    `,
    data(){
        return {
            brand : 'Vue Mastery',
            product : 'Socks',
            description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ',
            selectedVariant: 0,
            link : 'https://manufacton.com',
            inventory : 0,
            onSale : false,
            details : ["80% Cotton", "20% Polyester", "Gender Neutral"],
            variants : [{variantId : "2234", variantColor : "green", variantImage : "./assets/green-socks.jpg", variantQty : 10},
                        {variantId : "2235", variantColor : "blue", variantImage : "./assets/blue-socks.jpg", variantQty : 0}    
                       ],
            reviews: []
            
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`
        },
        image() {
            return this.variants[this.selectedVariant]['variantImage']
        },
        isInStock() {
            return this.variants[this.selectedVariant]['variantQty']
        },
        shipping(){
            if(this.premium){
                return 'free';
            }
            return '200';
        }
    },
    methods : {
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant]['variantId']);
        },
        removeFromCart: function() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant]['variantId']);
        },
        addReview(review){
            this.reviews.push(review)
        },
        updateProduct: function(index){
            this.selectedVariant = index;
        } 
    }
})

Vue.component('product-details', {
    props: {
        details: {
          type: Array,
          required: true
        }
      },
    template: `
    <ul>
        <li v-for = "detail in details"> {{detail}} </li>
    </ul>
    `
})

Vue.component('product-review', {
    template: `
        <form class = "review-form" @submit.prevent = "submitReview()">
            <p>
                <label for = "name">Name:</label>
                <input id = "name" placeholder="Enter your Name" v-model = "name">
            </p>
            <p>
                <label for = "review">Review:</label>
                <textarea id = "review" v-model = "review"></textarea>
            </p>
            <p>
                <label for = "rating">Rating:</label>
                <select id = "rating" v-model = "rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <p>
                <input type="submit" value="Submit">  
            </p>    
        </form>
    `,
    data(){
        return {
            name: null,
            review: null,
            rating: null
        }
    },
    methods : {
        submitReview: function(){
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            };
            this.name = null
            this.review = null
            this.rating = null
            this.$emit('add-product-review', productReview)
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium : false,
        cart : []
    },
    methods: {
        updateCart(id){
            this.cart.push(id);
        },
        removeFromCart(id){
            let index = this.cart.indexOf(id);
            this.cart.splice(index, 1);
        }
    }
});