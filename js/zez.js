$(document).ready(function(){
    prikaziMiniZ();
    prikaziZproizvode();

    $("#ddlistasortZ").change(onSortProducts);
    $("#ddlistafilterZ").change(onFilterProducts);
});

/*ispisivanje mini divova u sadrzaju u zezancije*/
function prikaziMiniZ(){
    $.ajax({
        url:"data/zezmini.json",
        method:"get",
        dataType:"json",
        success:function(data){
            ispisiMiniZ(data);
        },
        error: function(xhr, error, status){
            alert("xy");
        }
    })
}
function ispisiMiniZ(data){
    ispis="";
    for(var d of data){
        ispis+=`
        <div id="${d.divid}" class="${d.klasa}">
            <div class="txt-wraper">
                <h2>${d.naslov}</h2>
                <h3>${d.tekst1}</h3>
                <h3>${d.tekst2}</h3>
                <h3><a href="${d.a.ahref}" target="${d.a.atarget}">${d.a.alink}</a></h3>
            </div>
            <div class="img-wraper">
                <img src="${d.slika.src}" alt="${d.slika.alt}"/>
            </div>  
        </div>`
    }
    document.querySelector(".zez").innerHTML = ispis;

    $(".zez a").click( function(event) {

        if (this.hash !== "") {
          event.preventDefault();
    
          var hash = this.hash;
    
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 600, function(){
       
            window.location.hash = hash;
          });
        }
      });
}
/*ispisivanje proizvoda u zezancije*/
function prikaziZproizvode(){
    $.ajax({
        url:"data/proizvodi.json",
        method:"get",
        dataType:"json",
        success:function(data){
            ispisiZproizvode(data);
        },
        error: function(xhr, error, status){
            alert("aa");
        }
    })
}
function ispisiZproizvode(data){
    ispis="";
    for(var d of data){
        if(d.kategorija == "zez"){
        ispis+=`<div class="pr">
        <div class="slikaP">
            <img src="${d.slikap.ssrc}" alt="${d.slikap.salt}"/>
        </div>
        <div class="opisP">
            <h4>${d.karakteristike.t1}</h4>
            <h4>"${d.karakteristike.t2}"</h4>
            <p>*${d.karakteristike.t3}</p>
            <p>*${d.karakteristike.t4}</p>
        </div>
        <div class="cenaP">
              <span class="novaCena">${d.cenanova} rsd</span>
            <span class="staraCena">${d.cenastara} rsd</span>
        </div>
        <div class="dugmeKupi">
            <button class="dugmeKupovina" id="${d.dugme}" data-id="${d.id}" onclick="alert('Vaš proizvod je stavljen u korpu!')"><i class="fa fa-shopping-cart"></i></button>
        </div>
    </div>`
    }}
    document.querySelector("#zezproizvodi").innerHTML = ispis;
    bindCartEvents();
}

function bindCartEvents(){
    $(".dugmeKupovina").click(addToCart);
}
function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}
function addToCart() {
    let id = $(this).attr("data-id");

    var products = productsInCart();
    console.log(products);
    if(products != null) {
        if(productIsAlreadyInCart(id)) {
            updateQuantity(id);
        } else {
            addToLocalStorage(id)
        }
    }
    if (products == null){
        addFirstItemToLocalStorage(id);
        console.log(JSON.parse(localStorage.getItem("products")))
    }

    /* Male funkcije koje odradjuju po jednu funkcionalnost radi lakse odrzivosti koda */
    function productIsAlreadyInCart() {
        return products.filter(p => p.id == id).length;
    }

    function addToLocalStorage() {
        let products = productsInCart();
        products.push({
            "id" : id,
            "quantity" : 1
        });
        localStorage.setItem("products", JSON.stringify(products));
    }

    function updateQuantity() {
        let products = productsInCart();
        for(let i in products)
        {
            if(products[i].id == id) {
                products[i].quantity++;
                break;
            }      
        }

        localStorage.setItem("products", JSON.stringify(products));
    }

    function addFirstItemToLocalStorage(id) {
        let productsItems = [];
        productsItems.push({
            "id" : id,
            "quantity" : 1
        });
        console.log(productsItems)
        localStorage.setItem("products", JSON.stringify(productsItems));
    }
}//dovde

/*filtriranje proizvoda za zezancije stranu*/
function onFilterProducts(e){
    let id = e.target.value;
    if(id==0){
        prikaziZproizvode();
    }
    else{
     $.ajax({
     url:"data/proizvodi.json",
     method:"get",
     dataType:"json",
     success:function(data){
        filtrirajProizvodeZ(id, data);
     },
     error: function(xhr, error, status){
         alert("greska filter");
     }
 });
 }
}
 function filtrirajProizvodeZ(id, data){
    let filterniz = data.filter(function(x){
        if(x.tip == id){
            return x;
        }
    });
    console.log(filterniz);
    ispisiZproizvode(filterniz);
 }
/*sortiranje proizvoda za zez stranu*/
function onSortProducts(e){
    let id = e.target.value;
     $.ajax({
     url:"data/proizvodi.json",
     method:"get",
     dataType:"json",
     success:function(data){
        sortirajProizvodeZ(id, data);
     },
     error: function(xhr, error, status){
         alert("greska sort");
     }
 });
 }

 function sortirajProizvodeZ(id, data){

     if(id == 'ascza'){
         data.sort(function(a,b){
         if(a.karakteristike.t2 > b.karakteristike.t2)
             return -1;
         if(a.karakteristike.t2 < b.karakteristike.t2)
             return 1;
         else
             return 0;});
     }
     if(id == 'ascaz'){
         data.sort(function(a,b){
         if(a.karakteristike.t2 > b.karakteristike.t2)
             return 1;
         if(a.karakteristike.t2 < b.karakteristike.t2)
             return -1;
         else
             return 0;});
     }
     if(id == 'ascco'){
         data.sort(function(a,b){
            return b.cenanova - a.cenanova;});
     }
     if(id == 'asccr'){
         data.sort(function(a,b){
            return a.cenanova - b.cenanova;});
     }
     console.log(data);
     ispisiZproizvode(data);
 }