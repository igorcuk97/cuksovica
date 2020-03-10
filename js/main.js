$(document).ready(function(){
    prikaziMeni();
    prikaziSoc();

});
/*ispisivanje menija u hederu*/
function prikaziMeni(){
    $.ajax({
        url:"data/meni.json",
        method:"get",
        dataType:"json",
        success:function(data){
            ispisiMeni(data);
        },
        error: function(xhr, error, status){
            alert("prikaziMeni");
        }
    })
}
function ispisiMeni(data){
    ispis="";
    for(var d of data){
        ispis+=`
        <li><a href="${d.ahref}">${d.anaziv}</a></li>`
    }
    document.querySelector("#h1").innerHTML = ispis;
}
/*ispisivanje drustvenih mreza u futeru*/
function prikaziSoc(){
    $.ajax({
        url:"data/social.json",
        method:"get",
        dataType:"json",
        success:function(data){
            ispisiSoc(data);
        },
        error: function(xhr, error, status){
            alert("prikaziSoc");
        }
    })
}
function ispisiSoc(data){
    ispis="";
    for(var d of data){
        ispis+=`
        <li><a href="${d.ahref}" target="${d.target}"><i class="${d.klasa}"></i></a></li>`
    }
    document.querySelector("#soc1").innerHTML = ispis;
}
/* otvaranje korpe sa strane */
function korpaOpen() {
    document.getElementById("korpaDesno").style.width = "600px";
}

function korpaClose() {
    document.getElementById("korpaDesno").style.width = "0";
}

/* lagani skrol na a klik*/
$(document).ready(function(){
    $("body a").on('click', function(event) {

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
  });

