



    // Form validation code .
    // this is the ValidateForm1 function triggered by the register button
      function ValidationForm1() { 
      //initialising variables
        let username = document.forms["RegForm1"]["Name"];
        let email = document.forms["RegForm1"]["Email"];
        let pass = document.forms["RegForm1"]["Password"];
        if(username.value == "") { // checks if username is blank
          alert("Please enter your name."); // display alert message
          username.focus(); // moves cursor to username box
          return false; 
        }
        if(email.value == "") {
          alert("Please enter your e-mail address.");
          email.focus();
          return false;
        }
        if(email.value.indexOf("@", 0) < 0) { //checks if email field has @ symbol 
          alert("Please enter a valid e-mail address.");
          email.focus();
          return false;
        }
        if(email.value.indexOf(".", 0) < 0) { //checks if email field has . symbol 
          alert("Please enter a valid e-mail address.");
          email.focus();
          return false;
        }

        if(pass.value == "") {
          alert("Please enter your password");
          pass.focus();
          return false;
        }
         // if all validation is successful displays a thank you message 
		alert("Thank you for Registering with Gardenly!");
        return true;
      }






/* Reference## https://code-boxx.com/simple-vanilla-javascript-shopping-cart/ */
//shopping cart code was referenced from the link above and customised
// initialise the products in the shopping cart
var products = {
  123: {
    name : "Indoor Plant", // name of the product
    desc : "Lovely indoor plant.", // description of the product
    img : "IMG_8710.jpg", //product image
    price : 10 //price of the product
  },
  124: {
    name : "Kitchen Plant",
    desc : "Great for the kitcken.",
    img : "IMG_8707.jpg",
    price : 32
  },
  125: {
    name : "Living Room Plant",
    desc : "Great for the Living Room.",
    img : "IMG_8711.jpg",
    price : 18
  },
  126: {
    name : "Hallway Plant",
    desc : "Plant to welcome guests. ",
    img : "IMG_8708.jpg",
    price : 15
  }
};


var cart = {
  // cart properties
  hPdt : null, // HTML products list
  hItems : null, // HTML current cart
  items : {}, // Current items in cart
  iURL : "", // Product image URL folder

  // (B) LOCALSTORAGE CART
  // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
  save : function () {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // (B2) LOAD CART FROM LOCALSTORAGE
  load : function () {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) { cart.items = {}; }
    else { cart.items = JSON.parse(cart.items); }
  },

  // (B3) EMPTY ENTIRE CART
  nuke : function () {
    if (confirm("Empty cart, are you sure?")) {
      cart.items = {};
      localStorage.removeItem("cart");
      cart.list();
    }
  },

  // (C) INITIALIZE
  init : function () {
    // (C1) GET HTML ELEMENTS
    cart.hPdt = document.getElementById("cart-products");
    cart.hItems = document.getElementById("cart-items");

    // (C2) DRAW PRODUCTS LIST
    cart.hPdt.innerHTML = "";
    let p, item, part;
    for (let id in products) {
      // WRAPPER
      p = products[id];
      item = document.createElement("div");
      item.className = "p-item";
      cart.hPdt.appendChild(item);

      // PRODUCT IMAGE
      part = document.createElement("img");
      part.src = cart.iURL + p.img;
      part.className = "p-img";
      item.appendChild(part);

      // PRODUCT NAME
      part = document.createElement("div");
      part.innerHTML = p.name;
      part.className = "p-name";
      item.appendChild(part);

      // PRODUCT DESCRIPTION
      part = document.createElement("div");
      part.innerHTML = p.desc;
      part.className = "p-desc";
      item.appendChild(part);

      // PRODUCT PRICE
      part = document.createElement("div");
      part.innerHTML = "$" + p.price;
      part.className = "p-price";
      item.appendChild(part);

      // ADD TO CART
      part = document.createElement("input");
      part.type = "button";
      part.value = "Add to Cart";
      part.className = "cart p-add";
      part.onclick = cart.add;
      part.dataset.id = id;
      item.appendChild(part);
    }

    // if page is refreshed load the cart from previous session
    cart.load();

  // if page is refreshed list current cart items
    cart.list();
  },

  // (D) LIST CURRENT CART ITEMS (IN HTML)
  list : function () {
    // (D1) RESET
    cart.hItems.innerHTML = "";
    let item, part, pdt;
    let empty = true;
    for (let key in cart.items) {
      if(cart.items.hasOwnProperty(key)) { empty = false; break; }
    }

    // (D2) CART IS EMPTY
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      cart.hItems.appendChild(item);
    }

    // (D3) CART IS NOT EMPTY - LIST ITEMS
    else {
      let p, total = 0, subtotal = 0;
      for (let id in cart.items) {
        // ITEM
        p = products[id];
        item = document.createElement("div");
        item.className = "c-item";
        cart.hItems.appendChild(item);

        // NAME
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "c-name";
        item.appendChild(part);

        // REMOVE
        part = document.createElement("input");
        part.type = "button";
        part.value = "X";
        part.dataset.id = id;
        part.className = "c-del cart";
        part.addEventListener("click", cart.remove);
        item.appendChild(part);

        // QUANTITY
        part = document.createElement("input");
        part.type = "number";
        part.min = 0;
        part.value = cart.items[id];
        part.dataset.id = id;
        part.className = "c-qty";
        part.addEventListener("change", cart.change);
        item.appendChild(part);

// calculates the total number of items and the total cost for each item
        // SUBTOTAL
        subtotal = cart.items[id] * p.price;
        total += subtotal;
      }
// calculates the total cost for all items 
      // TOTAL AMOUNT
      item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML ="TOTAL: $" + total;
      cart.hItems.appendChild(item);

// when empty button is clicked all items are cleared by running the nuke function 
      // EMPTY BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.addEventListener("click", cart.nuke);
      item.className = "c-empty cart";
      cart.hItems.appendChild(item);

      // CHECKOUT BUTTONS
      // when checkout button is clicked the checkout function is executed
      item = document.createElement("input");
      item.type = "button";
      item.value = "Checkout";
      item.addEventListener("click", cart.checkout);
      item.className = "c-checkout cart";
      cart.hItems.appendChild(item);
    }
  },

  // (E) ADD ITEM INTO CART
  // when add to cart button is clicked it increments the count by one
  // if the item is not in the cart then it adds one but if it is already present then it increments the count by 1.
  add : function () {
    if (cart.items[this.dataset.id] == undefined) {
      cart.items[this.dataset.id] = 1;
    } else {
      cart.items[this.dataset.id]++;
    }
    cart.save();
    cart.list();
  },

  // (F) CHANGE QUANTITY
  change : function () {
    // (F1) REMOVE ITEM
    if (this.value <= 0) {
      delete cart.items[this.dataset.id];
      cart.save();
      cart.list();
    }

    // (F2) UPDATE TOTAL ONLY
    else {
      cart.items[this.dataset.id] = this.value;
      var total = 0;
      for (let id in cart.items) {
        total += cart.items[id] * products[id].price;
        document.getElementById("c-total").innerHTML ="TOTAL: $" + total;
      }
    }
  },

  // (G) REMOVE ITEM FROM CART
  remove : function () {
    delete cart.items[this.dataset.id];
    cart.save();
    cart.list();
  },

  // function to call when checkout button is clicked
  // displays a thank you message with total amount and automatically clears the cart 
  checkout : function () {

    alert("Thank you, Your order has been processed!" + "\n\n"  + document.getElementById("c-total").innerHTML);
      cart.items = {};
      localStorage.removeItem("cart");
      cart.list();
  }
};
window.addEventListener("DOMContentLoaded", cart.init);
