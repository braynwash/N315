// var cartCount = 0;
var prodInfo = {};

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  if (pageID != "" && pageID != "home") {
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      // loadCart();
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      $("#app").html(data);
    }).done(() => {
      loadProducts();
    });
  }
}

function getData() {
  $.get(`data/data.json`, (data) => {
    prodInfo = data;
  }).fail(function (error) {
    console.log("ERROR! ", error);
  });
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
        let productIdx = e.currentTarget.id;
        let obj = {
          itemIdx: productIdx,
        };
        // prodInfo.Cart.push(obj);
        // cartCount = prodInfo.Cart.length;
        // updateCartCount();
      });
    });
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
  getData();
  // updateCartCount();
}

$(document).ready(function () {
  initURLListener();
});
