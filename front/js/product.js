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

//Récupération des informations de l'article dans la base de donnée
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

        //Création du bloc DOM image et alt
        let imageProduit = document.createElement("img");
        Image.appendChild(imageProduit);
        imageProduit.src = produit.imageUrl;
        imageProduit.alt = produit.altTxt;

        //Insertion dans le DOM du titre, prix et description
        titre.innerText = produit.name;
        prix.innerText = produit.price;
        description.innerText = produit.description;
        
        /*Pour chaque  couleur existante dans la base de donnée :
        *Création de la balise option
        *Insertion de la couleur 
        */ 
        for (let i in produit.colors) {
            let optionProduits = document.createElement("option");
            couleur.appendChild(optionProduits);
            optionProduits.innerText = produit.colors[i];
        }

    })
    .catch(function(err) {
        let erreur = document.querySelector("item__img");
        erreur.innerHTML = "Une erreur n'a pas permis d'afficher notre canapé. Veuillez nous excuser pour ce désagrement et nous vous invitons a réessayer ultérieurement. <br> L'équipe Kanap."
        console.log("Erreur dans la récupération de l'article");
    });
}

ficheArticles();

//Création des constantes pour l'ajout des articles dans le panier
const BtnPanier = document.getElementById("addToCart");
let erreur = document.createElement("p");
document.querySelector(".item__content__addButton").appendChild(erreur);

console.log(document.querySelector("#colors").value);
BtnPanier.addEventListener('click', function() {
    erreur.innerText = "";
    if ((document.getElementById("quantity").value > 0 && document.getElementById("quantity").value <= 100) && (document.querySelector("#colors").value !== "")){
        let nouveauProduit = {
            _id: urlID,
            quantity: document.getElementById("quantity").value,
            colors: couleur.innerText

        };

        let tableauProduit = [];

        if (localStorage.getItem('produits') !== null) {
            tableauProduit = JSON.parse(localStorage.getItem('produits'));
        }
        tableauProduit.push(nouveauProduit);
        localStorage.setItem("produits", JSON.stringify(tableauProduit));

    } else {
        erreur.innerText = "Veuillez renseigner une quantité (entre 1 et 100) et choisir une couleur de canapé";

    };
});



