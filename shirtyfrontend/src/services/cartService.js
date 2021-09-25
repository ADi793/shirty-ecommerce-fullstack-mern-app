export function saveToCart(data) {
  let cartProducts = [];
  if (localStorage.getItem("cartProducts")) {
    cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    console.log(cartProducts);
  }

  let cartProduct = cartProducts.find(
    (cartProduct) => cartProduct._id === data._id
  );

  if (cartProduct) {
    cartProduct.quantity = data.quantity
      ? parseInt(cartProduct.quantity) + parseInt(data.quantity)
      : parseInt(cartProduct.quantity) + 1;

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  } else {
    data.quantity = data.quantity || 1;
    cartProduct = data;
    cartProducts.push(cartProduct);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }
}

export function getCartProducts() {
  if (localStorage.getItem("cartProducts")) {
    return JSON.parse(localStorage.getItem("cartProducts"));
  }

  return [];
}

export function deleteCartProduct(product) {
  let cartProducts = [];
  if (localStorage.getItem("cartProducts")) {
    cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  }

  const index = cartProducts.findIndex(
    (cartProduct) => cartProduct._id === product._id
  );
  cartProducts.splice(index, 1);

  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

export function deleteCartProducts() {
  localStorage.removeItem("cartProducts");
}

export function updateCartProduct(product) {
  let cartProducts = [];
  if (localStorage.getItem("cartProducts")) {
    cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  }

  const index = cartProducts.findIndex(
    (cartProduct) => cartProduct._id === product._id
  );
  cartProducts[index] = product;

  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}
