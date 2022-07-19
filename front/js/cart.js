//Création des constantes pour la récupération et l'affichage du localstorage
let tableauProduit = JSON.parse(localStorage.getItem('produits'));
const CreationSection = document.getElementById("cart__items");

//Récupération de la base de données
function fichePanier() {
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            console.log(data);
            creationPanier();
    
        })
        .catch(function(err) {
            let erreur = document.querySelector("#cart__items");
            erreur.innerHTML = "Une erreur n'a pas permis d'afficher notre canapé. Veuillez nous excuser pour ce désagrement et nous vous invitons a réessayer ultérieurement. <br> L'équipe Kanap."
            console.log("Erreur dans la récupération de la base de donnée");
        });
}
    
fichePanier();

console.log(tableauProduit);

function creationPanier() {

    for (let article of tableauProduit) {

        //Création de la balise article
        let creationArticle = document.createElement("article");
        CreationSection.appendChild(creationArticle);
        creationArticle.classList.add("cart__item");
        creationArticle.setAttribute("data-id", article._id);
        creationArticle.setAttribute("data-color", article.colors);

        //Création de la div contenant l'image
        let divImage = document.createElement("div");
        creationArticle.appendChild(divImage);
        divImage.classList.add("cart__item__img");

        //Création de l'image
        fetch("http://localhost:3000/api/products/" + article._id)
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function(resultatImage) {
                let image = document.createElement("img");
                divImage.appendChild(image);
                let affichageImage = resultatImage;
                image.src = affichageImage.imageUrl;
                image.alt = affichageImage.altTxt;
            })
            .catch(erreur => alert("Erreur d'affichage" + erreur));

        //Création de la div contenant le titre, la couleur, le prix unitaire, la quantité totale et le bouton supprimer
        let divContent = document.createElement("div");
        creationArticle.appendChild(divContent);
        divContent.classList.add("cart__item__content");

        //Création de la div contenant le titre, la couleur et le prix unitaire
        let divDescription = document.createElement("div");
        divContent.appendChild(divDescription);
        divDescription.classList.add("cart__item__content__description");

        //Création du titre, de la couleur et du prix unitaire
        let titre = document.createElement("h2");
        let couleur = document.createElement("p");
        let prixU = document.createElement("p");
        divDescription.appendChild(titre);
        divDescription.appendChild(couleur);
        divDescription.appendChild(prixU);
        couleur.innerText = article.colors;
        fetch("http://localhost:3000/api/products/" + article._id)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(resultat) {
            let affichage = resultat;
            titre.innerText = affichage.name;
            prixU.innerText = affichage.price + " €";
        })
        .catch(erreur => alert("Erreur d'affichage" + erreur));

        //Création de la div contenant la quantité totale et le bouton supprimer
        let divSettings = document.createElement("div");
        divContent.appendChild(divSettings);
        divSettings.classList.add("cart__item__content__settings");

        //Création de la div contenant la quantité totale
        let divQuantity = document.createElement("div");
        divSettings.appendChild(divQuantity);
        divQuantity.classList.add("cart__item__content__settings__quantity");
        let textQuantity = document.createElement("p")
        divQuantity.appendChild(textQuantity);
        textQuantity.innerText = "Qté :";
        let inputQuantity = document.createElement("input");
        divQuantity.appendChild(inputQuantity);
        inputQuantity.classList.add("itemQuantity");
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("value", article.quantity);

        //Création de la div contenant le bouton suppression
        let divDelete = document.createElement('div');
        divSettings.appendChild(divDelete);
        divDelete.classList.add("cart__item__content__settings__delete");
        let pDelete = document.createElement('p');
        divDelete.appendChild(pDelete);
        pDelete.classList.add("deleteItem");
        pDelete.innerText = "Supprimer";

    }
}