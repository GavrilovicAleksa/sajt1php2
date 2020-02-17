<?php
    session_start();
    if(isset($_POST['idKorisnik'])){
        require_once '../../config/connection.php';
        require_once 'functions.php';
        $rezultat = $conn->prepare("SELECT * FROM korpa_artikal WHERE idProizvod = :idProizvod AND idKorisnik = :idKorisnik");
        $rezultat->bindParam(":idKorisnik", $_POST['idKorisnik']);
        $rezultat->bindParam(":idProizvod", $_POST['idProizvod']);
        try{
        $rezultat->execute();
            $rezultat3 = $conn->prepare("DELETE FROM korpa_artikal WHERE idKorisnik = :idKorisnik AND idProizvod = :idProizvod");
            $rezultat3->bindParam(":idKorisnik", $_POST['idKorisnik']);
            $rezultat3->bindParam(":idProizvod", $_POST['idProizvod']);
            $rezultat3->execute();
            http_response_code(200);
            echo json_encode(getAllCartProducts($_POST['idKorisnik']));
        }
        catch(PDOexception $e){
            http_response_code(500);
            echo json_encode($e);
        }
    }
    