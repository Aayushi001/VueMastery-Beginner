var app = new Vue({
    el : '#app',
    data : {
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
});