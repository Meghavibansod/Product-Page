Vue.component("product-details", {
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    template: `
    <v-card-text>
    <v-list v-if="items">
      <v-list-group v-for="item in items">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-for="child in item.details" :key="child.title">
          <v-list-item-content>
            <v-list-item-subtitle
              v-text="child.title"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card-text>
    `,
  });
  
  Vue.component("product", {
    props: {
      premium: {
        type: Boolean,
        required: true,
      },
    },
    template: `
    <v-card width="350px">
            <v-img contain width="350px" height="200px" :src="image">
              <span class="my-span" v-if="inStock"> In Stock </span>
              <span v-else class="my-span"> Out of Stock </span>
            </v-img>
            <v-divider></v-divider>
            <v-card-title class="my-0">{{title}}</v-card-title>
            <v-card-subtitle></v-card-subtitle>
            <product-details :items="items"></product-details>
            <v-divider></v-divider>
            <v-card-actions>
              <span v-for="(varient,index) in varients"
                ><v-btn
                  v-on:click="changeProduct(index)"
                  color="green"
                  elevation="1"
                  class="ml-4"
                  x-small
                >
                  {{varient.varientColor}} ({{varient.varientQuantity}})
                </v-btn></span
              >
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn v-on:click="addToCart" fab x-small>+</v-btn>
              
              <v-btn v-on:click="subFromCart" fab x-small>-</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="pink">Place Order</v-btn>
            </v-card-actions>
            <span >Shipping: {{shipping}} </span>
          </v-card>
    `,
    data() {
      return {
        productName: "Xbox 360",
        productBrand: "Cosmobity Controller",
        selectedVarient: 1,
  items: [
          {
            details: [
              { title: "Have sensitivity controllers" },
              { title: "Updated Drivers are available for all" },
              { title: "Easy to handle and High performance" },
            ],
            title: "Product Details",
          },
        ],
        varients: [
          {
            varientID: 2100,
            varientColor: "green",
            varientName: "c1",
            varientQuantity: 10,
            varientImage:
              "https://m.media-amazon.com/images/I/41nePu8CbRS._SL1000_.jpg",
          },
          {
            varientID: 2101,
            varientColor: "blue",
            varientName: "c2",
            varientQuantity: 20,
            varientImage:
              "https://m.media-amazon.com/images/I/51SFBQ8BqoS._SL1000_.jpg",
          },
          {
            varientID: 2102,
            varientColor: "pink",
            varientName: "c3",
            varientQuantity: 0,
            varientImage:
              "https://m.media-amazon.com/images/I/41IpmNnwYhS._SL1000_.jpg",
          },
          {
            varientID: 2103,
            varientColor: "yellow",
            varientName: "c4",
            varientQuantity: 100,
            varientImage:
              "https://m.media-amazon.com/images/I/61zvf6e8X2L._SL1000_.jpg",
          },
        ],
      };
    },
    computed: {
      title() {
        return `${this.productName} ${this.productBrand}`;
      },
      image() {
        return this.varients[this.selectedVarient].varientImage;
      },
      inStock() {
        return this.varients[this.selectedVarient].varientQuantity;
      },
      shipping() {
        if (this.premium) {
          return "Free";
        } else {
          return 2.99;
        }
      },
      showDetails() {
        if (this.details) {
          return true;
        } else {
          return false;
        }
      },
    },
    methods: {
      addToCart: function () {
        this.$emit("add-to-cart", this.varients[this.selectedVarient].varientID);
      },
      subFromCart: function () {
        this.$emit(
          "remove-from-cart",
          this.varients[this.selectedVarient].varientID
        );
      },
      changeProduct: function (index) {
        this.selectedVarient = index;
      },
    },
  });
  
  Vue.component("product-tabs", {
    template: `
      <v-card>
      <v-tabs v-for="(tab, index) in tabs"
      @click="selectedTab = tab" background-color="deep-purple accent-4" center-active dark>
        <v-tab>{{tab}}</v-tab>
      </v-tabs>
    </v-card>
    `,
    data() {
      return {
        tabs: ["Reviews", "Make a Review"],
        selectedTab: "Reviews", // set from @click
      };
    },
  });
  
  var app = new Vue({
    el: "#app",
    data: {
      premium: true,
      cart: [],
    },
    methods: {
      updateCart: function (id) {
        this.cart.push(id);
      },
      removeFromCart: function (id) {
        this.cart.forEach((e, i) => {
          if (e === id) {
            this.cart.splice(i, 1);
          }
        });
      },
    },
  });