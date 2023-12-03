var cartCount = 0;
var prodInfo = {};

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  if (pageID != "" && pageID != "home") {
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      loadCart();
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      $("#app").html(data);
    }).done(() => {
      loadProducts();
    });
  }
}

function loadCart() {
  if (prodInfo.Cart.length === 0) {
    $(".cartPage").html(
      `<p>0 Items</p> 
      <h1>You don't have any items in your shopping cart</h1>`
    );
  } else {
    $(".cartPage").html("");
    $.each(prodInfo.Cart, (idx, cartItem) => {
      let coffee = prodInfo.Products[cartItem.itemIdx];
      $(".cartPage").append(`<div class="product">
    <div class="productImg">
    <img src="/images/${coffee.productImage}"></img>
    </div>
    <div class="prodDetails">
    <h4>${coffee.productName}</h4>
    <h3>$${coffee.productPrice}</h3>
    <div class="shipping"><i class="fa-solid fa-truck-moving fa-flip-horizontal" style="color: rgb(126, 126, 126);"></i>Free Shipping</div>
    <div id=${idx} class="removeCart">Delete</div>
    </div>
</div>`);
    });
    $(".removeCart").on("click", function (e) {
      let removedIdx = $(this).attr("id");
      prodInfo.Cart.splice(removedIdx, 1); //removes item from Cart array
      cartCount = prodInfo.Cart.length;
      updateCartCount(); //updates counter
      loadCart(); //reloads cart
    });
  }
}

function loadProducts() {
  $.get(`data/data.json`, (data) => {
    $.each(prodInfo.Products, (idx, coffee) => [
      $(".home").append(`<div class="product">
      <div class="productImg">
      <img src="/images/${coffee.productImage}"></img>
      </div>
      <div class="prodDetails">
      <h4>${coffee.productName}</h4>
      <h3>$${coffee.productPrice}</h3>
      <div class="shipping"><i class="fa-solid fa-truck-moving fa-flip-horizontal" style="color: rgb(126, 126, 126);"></i>Free Shipping</div>
      <div id=${idx} class="buyNow">BUY NOW</div>
      </div>
  </div>`),
    ]);
  })
    .fail(function (error) {
      console.log("ERROR! ", error);
    })
    .done(function () {
      $(".buyNow").on("click", (e) => {
        // console.log("Click!");
        let cartUser = cartCount + 1;
        document.getElementById(
          "itemAdd"
        ).innerHTML = `Item successfully added to cart. You have ${cartUser} item(s) in your cart.`;
        let productIdx = e.currentTarget.id;
        let obj = {
          itemIdx: productIdx,
        };
        prodInfo.Cart.push(obj);
        cartCount = prodInfo.Cart.length;
        updateCartCount();
      });
    });
}

$(document).on("click", ".buyNow", function (e) {
  $(".modalBox").css("display", "flex");
  // console.log("Toggle!");
});

$(document).on("click", ".removeCart", function (e) {
  $(".modalBox").css("display", "flex");
  // console.log("Toggle!");
});

$(document).on("click", "#close", function (e) {
  $(".modalBox").css("display", "none");
  $(".accountWrap").css("display", "none");
  console.log("Close!");
});

$(document).on("click", "#account", function (e) {
  $(".accountWrap").css("display", "flex");
  console.log("Hi!");
});

function updateCartCount() {
  if (cartCount == 0) {
    $(".cartCounter").css("display", "none");
  } else if (cartCount >= 1) {
    $(".cartCounter").css("display", "flex");
    $(".cartCounter").html(cartCount);
  }
}

function getData() {
  $.get(`data/data.json`, (data) => {
    prodInfo = data;
  }).fail(function (error) {
    console.log("ERROR! ", error);
  });
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
  getData();
  updateCartCount();
}

$(document).ready(function () {
  initURLListener();
});
