window.onload = function(){
    var forma = document.getElementsByClassName("forma__item");
    var email = forma[0];
    var first_name = forma[1];
    var last_name = forma[2];
    var adress = forma[3];
    var password = forma[4];

    

    var rePassword = /^[\w]{3,19}$/;
    var reFirstName = /^[A-Z]{1}[a-z]{3,12}$/;
    var reLastName = /^[A-Z]{1}[a-z]{3,15}$/;
    var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var reAdress = /^[\w\s]{4,25}$/;


    document.getElementById("btnReg").addEventListener("click", function(){
        var nizGreske = [];
        if(!reEmail.test(email.value)){
            nizGreske.push("Email is not in valid.");
            email.classList.remove("zelena");
            email.classList.add("crvena");
        }
        else{
            email.classList.remove("crvena");
            email.classList.add("zelena");
        }
        if(!rePassword.test(password.value)){
            nizGreske.push("Password is not in valid format.");
            password.classList.remove("zelena");
            password.classList.add("crvena");
            }
        else{
            password.classList.remove("crvena");
            password.classList.add("zelena");
        }
        if(!reFirstName.test(first_name.value)){
            nizGreske.push("First name is not in valid format.");
            first_name.classList.remove("zelena");
            first_name.classList.add("crvena");
        }
        else{
            first_name.classList.remove("crvena");
            first_name.classList.add("zelena");
        }
        if(!reLastName.test(last_name.value)){
            nizGreske.push("Last name is not in valid format.");
            last_name.classList.remove("zelena");
            last_name.classList.add("crvena");
            }
        else{
            last_name.classList.remove("crvena");
            last_name.classList.add("zelena");
        }
        if(!reAdress.test(adress.value)){
            nizGreske.push("Adress is not in vailable format.");
            adress.classList.remove("zelena");
            adress.classList.add("crvena");
            }
        else{
            adress.classList.remove("crvena");
            adress.classList.add("zelena");
        }

        if(nizGreske.length > 0){
            var ispis ="";
            nizGreske.forEach(function(element){
                ispis += element+"<br>";
            });
            document.getElementById("rezultat").innerHTML = ispis;
            }
        else{
            document.getElementById("rezultat").innerHTML = "";
            $.ajax({
                data:{
                    korIme : korIme.value,
                    sifra : sifra.value,
                    gradVrednost : gradVrednost,
                    ime : ime.value,
                    prezime : Prezime.value,
                    email : Email.value,
                    ulica : Ulica.value
                },
                dataType:"json",
                method:"POST",
                url:"./models/user/registration.php",
                success : function(podaci){
                    korIme.classList.remove("crvena");
                    korIme.classList.add("zelena");
                    sifra.classList.remove("crvena");
                    sifra.classList.add("zelena");
                    document.getElementById("rezultat").innerHTML = "Uspesna registracija <a href='index.php?page=login' class='kupovina-link'>Ulogujte se!</a>";
                },
                error:function(error, xhr, status){
                    console.log(error);
                    var arr = error.responseJSON;
                    var ispis = '';
                    arr.forEach(function(element){
                        ispis+= element + "<br>";
                    });
                    document.getElementById("rezultat").innerHTML = ispis;
                    
                }
            });
        }

    });
}