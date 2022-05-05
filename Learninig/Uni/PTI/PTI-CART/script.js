
let product = (p_id, p_name, p_desc, p_price) => {
  return { id: p_id, name: p_name, desc: p_desc, price: p_price };
}

let createElementFromHtml = (htmlString) => {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

let productListElement = document.getElementById("productList");


let productList = () => {
  let list = [];
  let namesList = ["Kartoshka", "Morkovka", "Kapusta", "Ogurets", "Pomidor"];
  let descriptionList = ["Malishka bes nojek", "Rijaya golovka", "Luchshe kartoshki", "Vkusniy pipets", "Bes om gay"];
  let priceList = [55, 98, 67, 33, 89];
  console.log('sus');
  for (let i = 0; i < 5; i++) {
    list.push(product(i, namesList[i], descriptionList[i], priceList[i]));
  }
  return list;
}

let cart = {};
let cartElement = document.getElementById("cart");

cartIncremet = (event) => {
  console.log(event.target.value);
  let product_id = event.target.parentElement.parentElement.id;
  cart[product_id] = event.target.value;

console.log('sys')
	cartUpdate();
	console.log('sus')
}
let addToCart = (event) => {
  let productElemButton = event.target;
  let product_id = productElemButton.parentElement.parentElement.id;
  if (cart[product_id]) {
    alert("Already in cart")
  }
  else {
    cart[product_id] = 1;

    console.log(product_id);


    let product = productList().find(product => product.id == product_id);
    let cartItemElem = cartElement.appendChild(
      createElementFromHtml(
        `<div id="${product.id}" class="card my-3">
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>

    <p class="card-text">${product.desc}</p>
  </div>
</div>`
      ))
    let cartCounter = createElementFromHtml(`<input class="col-9 mb-3 " min="1" max="10" value="1" type="number">`)
    cartCounter.addEventListener("change", cartIncremet)
    cartItemElem.children[0].appendChild(cartCounter);

    let cartDeleteButton = document.createElement("a")
    cartDeleteButton.className = "btn btn-danger";
    cartDeleteButton.innerText = "Delete"
    cartDeleteButton.addEventListener("click", deleteFromCart);
    cartItemElem.children[0].appendChild(cartDeleteButton);

    cartUpdate();
  }
}

let deleteFromCart = (event) => {
  let card = event.target.parentElement.parentElement
  id = event.target.parentElement.parentElement.id;
  console.log(card);
  delete cart[id];
  card.remove();
  cartUpdate();
  console.log(cart);
}

let cartUpdate = () => {
  console.log("update");
  console.log(cart);
  let sum = 0;
  for (let id in cart) {

    let product = productList().find(product => product.id == id);
    sum += cart[id] * product.price;
  }
  console.log(sum);
  document.getElementById("total").innerText = "Total:" + sum + " $";
}

productList().forEach((product) => {
  let productElem = productListElement.appendChild(
    createElementFromHtml(
      `<div id="${product.id}" class="card my-3">
	  	<div class="card-body">
    		<h5 class="card-title">${product.name}</h5>
   		 	<p class="card-text">${product.desc}</p>
   		 	<p class="card-text">${product.price} $</p>
  		</div>
		</div>`
    ))
  let productElemButton = document.createElement("a")
  productElemButton.className = "btn btn-primary";
  productElemButton.innerText = "Add to cart"
  productElemButton.addEventListener("click", addToCart);
  productElem.children[0].appendChild(productElemButton);
  console.log(product)
	
})

