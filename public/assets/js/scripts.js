const axios = require('axios');

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



const buttonSend = document.getElementById("IdBtnSend");

buttonSend.addEventListener("click", () => {
    let sendName = document.getElementById("IdCE").value;
    let sendEmail = document.getElementById("IdEM").value;
    let sendText = document.getElementById("IdTxt").value;

    if (sendEmail != '' && sendName != '' && sendText != '') {

        const datos = {
            email: sendEmail,
            name: sendName,
            text: sendText
        }

        axios.post('/contactanos', datos)
            .then((res) => {

                document.getElementById("IdCE").value = "";
                document.getElementById("IdEM").value = "";
                document.getElementById("IdTxt").value = "";
                alert("Gracias por escribirnos");

            }).catch((err) => {

                console.log(err);
            })

    } else {
        alert('Verifica bien los campos');
    }

});