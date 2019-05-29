// registering a component
Vue.component('product', {
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
            <ul>
                <li v-for = "detail in details"> {{detail}} </li>
            </ul>
            <div v-for = "(variant, index) in  variants" 
                :key= "variant.variantId"
                @mouseover = "updateProduct(index)"
                class = "color-box"
                :style = "{'background-color' : variant.variantColor}">
            </div>
            <button v-on:click = "addToCart()" :disabled = "!isInStock" :class = "{disabledButton : !isInStock}">Add To Cart</button>

            <div class="cart">
                <p>{{cart}}</p>
            </div>
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
            cart : 0
            
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
        }
    },
    methods : {
        addToCart: function() {
            this.cart += 1;
        },
        updateProduct: function(index){
            this.selectedVariant = index;
        } 
    }
})

var app = new Vue({
    el : '#app'
});