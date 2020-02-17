var cart = document.getElementsByClassName('removeCart');

$(document).on('click', '.removeCart', function(e){
        e.preventDefault();
        console.log('izbrisan');
        var id = this.dataset.id;
        var idP = this.dataset.idp;
        var kolicina = this.dataset.value;

        console.log(id, idP, kolicina);

        $.ajax({
            url: "models/products/deleteCart.php",
            method: "POST",
            data: {
                idProizvod : idP,
                idKorisnik : id,
                kolicina: kolicina
            },
            success: function(data){
                console.log(data);
                ispisProizvode(data);
            },
            error: function(error){
                console.log(error);
            }
        });

        
    });

    function ispisProizvode(data){
        data = JSON.parse(data);
        console.log(data);
        var ispis = ""
        var ukupno = 0;
        data.forEach(element => {
            ukupno += Number(element.cena);
            ispis +=`<div class="product-cart" >
            <div class="product-image">
                <img src="${element.mala}">
            </div>
            <div class="product-info-cart">
            <h5>${element.naziv}</h5><h6>${element.kolicina * element.cena},00 rsd</h6><h6>Kolicina: ${element.kolicina}</h6>
            <a class="removeCart" data-value="${element.kolicina}" data-idP="${element.idProizvod}" data-id="${element.idKorisnik}">Remove</a>
            </div>

    </div>`
        });  
        ispis+= `<h2>Your total is: ${ukupno}`;
        document.getElementById('projizvodi').innerHTML = ispis;
    }
    
    

