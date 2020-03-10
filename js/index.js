$(document).ready(function(){
    prikaziMiniI();
    document.querySelector('#dugmePotvrdi').addEventListener("click", provera);
});

/*ispisivanje mini divova u sadrzaju u indexu*/
function prikaziMiniI(){
    $.ajax({
        url:"data/indexmini.json",
        method:"get",
        dataType:"json",
        success:function(data){
            ispisiMiniI(data);
        },
        error: function(xhr, error, status){
            alert("status");
        }
    })
}
function ispisiMiniI(data){
    ispis="";
    for(var d of data){
        ispis+=`
        <div id="${d.divid}" class="${d.klasa}">
            <div class="txt-wraper">
                <h2>${d.naslov}</h2>
                <h3>${d.tekst1}</h3>
                <h3>${d.tekst2}</h3>
                <h3><a href="${d.a.ahref}">${d.a.alink}</a></h3>
            </div>
            <div class="img-wraper">
                <img src="${d.slika.src}" alt="${d.slika.alt}"/>
            </div>  
        </div>`
    }
document.querySelector(".pocetna").innerHTML = ispis;
}

  /* proveravanje forme i forma */
  function provera() {

	var Ime = document.querySelector('#formaIme');
	var Prezime = document.querySelector('#formaPrezime');
	var Email = document.querySelector('#formaEmail');
	var Sifra = document.querySelector('#formaSifra');
	var SifraPr = document.querySelector('#formaSifraPr');
	var SlazemSe = document.querySelector('#formaSlazemSe');
	
	var kiksIme = document.querySelector('#formaImeKiks');
	var kiksPrezime = document.querySelector('#formaPrezimeKiks');
	var kiksEmail = document.querySelector('#formaEmailKiks');
	var kiksSifra = document.querySelector('#formaSifraKiks');
	var kiksSifraPr = document.querySelector('#formaSifraPrKiks');
	var kiksSlazemSe = document.querySelector('#formaSlazemSeKiks');
	
	var reIme = /^([A-Z][a-z]{2,12})+$/;
	var rePrezime = /^([A-Z][a-z]{2,17})+$/;
	var reEmail = /^[a-z]{3,13}\.[a-z]{3,17}\.[1-9][0-9]{0,3}\.[0-1][0-9]@(ict.edu.rs)$/;
	var reSifra = /[A-Z]+[a-z]+[.,@/$%^&*()!#]/;
	var reSifraPr = /[A-Z]+[a-z]+[.,@/$%^&*()!#]/;
	// ime
	if(!reIme.test(Ime.value)) {
		formaImeKiks.textContent = "Ime nije napisano u dobrom formatu!";
	 }
	 else if(Ime == ""){
		formaImeKiks.textContent = "Ime nije napisano!";
	}else{
		formaImeKiks.textContent = "";
	}
	// prezime
	if(!rePrezime.test(Prezime.value)) {
		formaPrezimeKiks.textContent = "Prezime nije napisano u dobrom formatu!";
	}else if(Prezime == ""){
		formaPrezimeKiks.textContent = "Prezime nije napisano!";
	}else{
		formaPrezimeKiks.textContent = "";
	}
	// email
	if(!reEmail.test(Email.value)) {
		formaEmailKiks.textContent = "Email nije napisano u dobrom formatu!";
	}else if(Email == ""){
		formaEmailKiks.textContent = "Email nije napisano!";
	}else{
		formaEmailKiks.textContent = "";
	}
	// sifra
	if(!reSifra.test(Sifra.value)) {
		formaSifraKiks.textContent = "Sifra nije napisana u dobrom formatu!";
	}else if(Sifra == ""){
		formaSifraKiks.textContent = "Sifra nije napisana!";
	}else{
		formaSifraKiks.textContent = "";
	}
	// sifra provera
	if(!reSifraPr.test(SifraPr.value)) {
		formaSifraPrKiks.textContent = "Sifra nije napisana u dobrom formatu!";
	}else if(SifraPr == ""){
		formaSifraPrKiks.textContent = "Sifra nije napisana!";
	}else{
		formaSifraPrKiks.textContent = "";
	}
}