<main class="mainSingle">
    <div class="main-contentSingle main-proizvodi"> 

        <div class="glavniProzivod" >
            <div class="cart-products" id="projizvodi">
            <?php
                if(!isset($_SESSION['korisnik'])):
            ?>
            <h2>Morate se ulogovati da bi ste koristili korpu!</h2>
                <?php else:
                    $id = $_SESSION['korisnik']->id;
                    $total = 0;

                    $rezultat = $conn->prepare("SELECT * FROM korpa_artikal k INNER JOIN proizvod p on p.id = k.idProizvod INNER JOIN slika s on s.id = p.idSlika WHERE k.idKorisnik = :idKorisnik");
                    $rezultat->bindParam(":idKorisnik", $id);
                    $rezultat->execute();
                    $korpa = $rezultat->fetchAll();
                    foreach($korpa as $deoKorpe):
                        $total = $total + ($deoKorpe->kolicina * $deoKorpe->cena)
                    ?>
                    
                <div class="product-cart" >
                        <div class="product-image">
                            <img src="<?=$deoKorpe->mala ?>">
                        </div>
                        <div class="product-info-cart">
                        <h5><?=$deoKorpe->naziv ?></h5><h6><?=$deoKorpe->cena * $deoKorpe->kolicina?>,00 rsd</h6><h6>Kolicina: <?=$deoKorpe->kolicina ?></h6>
                        <a class="removeCart" data-value="<?=$deoKorpe->kolicina?>" data-idp="<?= $deoKorpe->idProizvod?>" data-id="<?= $deoKorpe->idKorisnik?>">Remove</a>
                        </div>
        
                </div>
                    <?php endforeach; ?>
                    <h1>Your Total is: <?= $total.',00' ?></h1>

                <?php endif; ?>
                </div>
        </div>
    </div>
    <script src="assets/js/cart.js"></script>
</main>    