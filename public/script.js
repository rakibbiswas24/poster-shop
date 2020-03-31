new Vue({
    el: '#app',
    data: {
        message: 'Hello Bangladesh',
        total: 0,
        products: [],
        cart: [],
        search: 'flower',
        resultCount: 0,
        lastSearch: '',
        loading: false
    },

    methods: {
        addToCart: function(product) {

            this.total += product.price;

            var found = false;

            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === product.id) {
                    found = true;
                    this.cart[i].qty++;

                }
            }

            if (!found) {
                this.cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    qty: 1
                })
            }

        },

        inc: function(item) {
            item.qty++;
            this.total += item.price;
        },
        dec: function(item) {
            item.qty--;
            this.total -= item.price;

            if (item.qty <= 0) {
                var i = this.cart.indexOf(item);
                this.cart.splice(i, 1);
            }
        },
        onSubmit: function() {
            // GET /someUrl
            var path = '/search?q='.concat(this.search);

            this.loading = true;

            this.$http.get(path).then(response => {

                this.products = response.body;
                this.resultCount = this.products.length;
                this.lastSearch = this.search;
                this.loading = false;


            }, response => {
                // error callback
            });
        }
    },
    filters: {
        currency: function(price) {
            return '$'.concat(price.toFixed(2));
        }
    },

    created: function() {
        this.onSubmit();
    }
})