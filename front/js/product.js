//Récupération de l'ID présent dans l'URL
let url = new URL(document.location).searchParams;
var urlID = url.get("id");
console.log(urlID);

//Création des constantes pour l'intégration dynamique dans le DOM
const Image = document.querySelector(".item__img");
const titre = document.getElementById('title');
const prix = document.getElementById('price');
const description = document.getElementById('description');
const couleur = document.getElementById('colors');

function ficheArticles() {
fetch("http://localhost:3000/api/products/" + urlID)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        let produit = data;
        console.log(data);

        let imageProduit = document.createElement("img");
        Image.appendChild(imageProduit);
        imageProduit.src = produit.imageUrl;
        imageProduit.alt = produit.altTxt;

        titre.innerText = produit.name;
        prix.innerText = produit.price;
        description.innerText = produit.description;

    })
    .catch(function(err) {
        let erreur = document.querySelector("item__img");
        erreur.innerHTML = "Une erreur n'a pas permis d'afficher notre canapé. Veuillez nous excuser pour ce désagrement et nous vous invitons a réessayer ultérieurement. <br> L'équipe Kanap."
        console.log("Erreur dans la récupération de l'article");
    });
}

ficheArticles();