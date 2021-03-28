function displayProducts(productos) {

    let productsHTML = '';

    productos.forEach(element => {

        productsHTML +=
            `<div data-aos="fade-up" class='product-container'>
        <h4 class='name'>${element.name}</h4>
        <img src=${element.img}>
        <h3 class='price'>Precio: ${element.price}$</h3>

    </div>`

    });

    document.getElementById('page-content').innerHTML = productsHTML;
}

function aosAnimations() {
    AOS.init();
}

window.onload = async() => {
    const productList = await (await fetch("/database")).json();
    aosAnimations();
    console.log(productList);
    displayProducts(productList);
}