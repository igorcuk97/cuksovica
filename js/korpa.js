$(document).ready(function () {
    let products = productsInCart();
    
    if(!products.length)
        showEmptyCart();
    else
        displayCartData();

});

function displayCartData() {
    let products = productsInCart();

    $.ajax({
        url : "data/proizvodi.json",
        success : function(data) {
            let productsForDisplay = [];

            //izdvajanje objekata dohvacenih ajaxom tako da tu budu samo objekti koji su u localstorage i dodavanje kolicine
            data = data.filter(p => {
                for(let prod of products)
                {
                    if(p.id == prod.id) {
                        p.quantity = prod.quantity;
                        return true;
                    }
                        
                }
                return false;
            });
            generateTable(data)
        }
    });
}

function generateTable(products) {
    let html = "";
                
    for(let p of products) {
        html += generateTr(p);
    }

    $(".praznaK").html(html);

    function generateTr(p) {
       return  `
       <div class="prUk">
        <div class="prUk1">
            <img src="${p.slikap.ssrc}" alt="${p.slikap.salt}"/>
        </div>
        <div class="prUk2">
            <h3 class="h3uk">${p.karakteristike.t1}</h3>
            <h3 class="h3uk">Cena: ${p.cenanova} rsd</h3>
            <h3 class="h3uk">Količina: ${p.quantity}</h3>
        </div>
       </div>`
    }
}

function showEmptyCart() {
    $(".praznaK").html("<p>Korpa je prazna! De bar stavi nešto u nju...</p>")
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}



function removeFromCart(id) {
    let products = productsInCart();
    let filtered = products.filter(p => p.id != id);

    localStorage.setItem("products", JSON.stringify(filtered));

    displayCartData();
}