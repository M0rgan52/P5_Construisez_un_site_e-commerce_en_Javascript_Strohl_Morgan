//Création des constantes pour la récupération et l'affichage du localstorage
let tableauProduit = JSON.parse(localStorage.getItem('produits'));
const CreationSection = document.getElementById("cart__items");

console.log(tableauProduit);

function creationPanier() {

    //Si le panier est vide, prévenir le client
    if (tableauProduit === null) {
        let vide = document.querySelector(".cartAndFormContainer > h1");
        vide.innerText = "Votre panier est vide";
        
    };
     
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

        /*Importation et création de l'image
        On appelle de nouveau la base de donnée
        avec l'id pour pouvoir faire le lien avec l'image
        */
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
        /*
        On appelle de nouveau la base de donnée
        avec l'id pour pouvoir faire le lien avec le nom et le prix
        */
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
            prixU.setAttribute("value", affichage.price);
        })
        .catch(erreur => alert("Erreur d'affichage" + erreur));
        prixU.classList.add("PrixU");
        

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
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.value = article.quantity;
        inputQuantity.setAttribute("value", article.quantity)

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
creationPanier();

//Création d'une fonction pour calculer automatiquement la quantité et le prix total
function total() {
    //Calcul de la quantité
    var qte = document.querySelectorAll(".itemQuantity");
    let totalQte = 0;

    for (let p = 0; p < qte.length; p++) {
        totalQte += qte[p].valueAsNumber;
    }

    let affichageQte = document.getElementById("totalQuantity");
    affichageQte.innerText = totalQte;

    /*Calcul du prix total
    Appel de la base de donnée pour récupérer les prix unitaire */
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        let article = data;
        let totalPanier = 0;

        for (let p = 0; p < qte.length; p++) {
            let prixArticle = article.find(i => i._id === tableauProduit[p]._id);
            totalPanier += qte[p].valueAsNumber * prixArticle.price;
            
            let affichagePrix = document.getElementById('totalPrice');
            affichagePrix.innerText = totalPanier;
    
        }

    })
    .catch(erreur => console.log("Erreur d'affichage"));

}
total();

//Fonction permettant la modification de la quantité
function modificationQte () {
    var qte = document.querySelectorAll(".itemQuantity");
    
    for (let p = 0; p < qte.length; p++) {
        //On écoute l'évènement de changement du focus de la case quantité
        qte[p].addEventListener("change", (e) => {
            e.preventDefault();

            let ancienneQte = tableauProduit[p].quantity;
            let nouvelleQte = qte[p].valueAsNumber;

            //Si la quantité à changé, on prend la nouvelle quantité
            if (ancienneQte !== nouvelleQte) {
                ancienneQte = nouvelleQte;
                tableauProduit[p].quantity = nouvelleQte;
            }

            //Mise à jour du local storage
            localStorage.setItem("produits", JSON.stringify(tableauProduit));
            
            location.reload();
        })
    }
}
modificationQte();

//Création de la fonction du suppression d'un article
function suppressionArticle() {
    let supprimer = document.querySelectorAll(".deleteItem");

    for (let p = 0; p < supprimer.length; ++p) {
        //On écoute l'évènement du clique sur le bonton supprimer
        supprimer[p].addEventListener("click", (e) => {
            e.preventDefault;

            let suppressionId = tableauProduit[p]._id;
            let suppressionColors = tableauProduit[p].colors;

            //Selection de l'article à supprimer en fonction de son id et de sa couleur via un filtre
            tableauProduit = tableauProduit.filter(i => i._id !== suppressionId || i.colors !== suppressionColors)


            localStorage.setItem("produits", JSON.stringify(tableauProduit));

            location.reload();
        })
    }
}
suppressionArticle();

//Création de la fonction de controle de la saisie du formulaire
function controleFormulaire() {
    //Déclaration des constantes et variables
    let formulaire = document.querySelector(".cart__order__form");
    const RegexOrdinaire = new RegExp("^[a-zA-Z ,.'-]+$");
    const RegexEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    const RegexAdresse = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    
    //Controle du prénom
    formulaire.firstName.addEventListener('input', function(saisiePrenom) {
        let erreurPrenom = formulaire.firstName.nextElementSibling;
        
        if (RegexOrdinaire.test(saisiePrenom.target.value)) {
            erreurPrenom.innerText = "";
        } else {
            erreurPrenom.innerText = "Veuillez renseigner ce champ sans caractère spéciaux svp."
        }
    })

    //Controle du Nom
    formulaire.lastName.addEventListener('input', function(saisieNom) {
        let erreurNom = formulaire.lastName.nextElementSibling;
        
        if (RegexOrdinaire.test(saisieNom.target.value)) {
            erreurNom.innerText = "";
        } else {
            erreurNom.innerText = "Veuillez renseigner ce champ sans caractère spéciaux svp."
        }
    })

    //Controle de l'adresse
    formulaire.address.addEventListener('input', function(saisieAdresse) {
        let erreurAdresse = formulaire.address.nextElementSibling;
        
        if (RegexAdresse.test(saisieAdresse.target.value)) {
            erreurAdresse.innerText = "";
        } else {
            erreurAdresse.innerText = "Veuillez saisir votre numéro et nom de rue complète svp."
        }
    })

    //Controle de la ville
    formulaire.city.addEventListener('input', function(saisieVille) {
        let erreurVille = formulaire.city.nextElementSibling;
        
        if (RegexOrdinaire.test(saisieVille.target.value)) {
            erreurVille.innerText = "";
        } else {
            erreurVille.innerText = "Veuillez renseigner ce champ sans caractère spéciaux svp."
        }
    })

    //Controle de l'email
    formulaire.email.addEventListener('input', function(saisieEmail) {
        let erreurEmail = formulaire.email.nextElementSibling;
        
        if (RegexEmail.test(saisieEmail.target.value)) {
            erreurEmail.innerText = "";
        } else {
            erreurEmail.innerText = "Veuillez renseigner un mail valide svp."
        }
    })

}
controleFormulaire();

//Création des variables pour la suite des fonctions
let recupPrenom = document.getElementById("firstName");
let recupNom = document.getElementById("lastName");
let recupAdresse = document.getElementById("address");
let recupVille = document.getElementById("city");
let recupEmail = document.getElementById("email");


//Création de la fonction d'envoi de la commande
function envoiFormulaire() {
    let commande = document.getElementById("order");
    

    //Ecoute de l'évènement de clique sur le bouton commander
    commande.addEventListener("click", (e) => {
        e.preventDefault();

        let ListePanier = [];

        for (let p = 0; p < tableauProduit.length; p++) {
            ListePanier.push(tableauProduit[p]._id);
        };
        
        //Initialisation de l'objet contact
        const infoCommande = {
            contact: {
                firstName: recupPrenom.value,
                lastName: recupNom.value,
                address: recupAdresse.value,
                city: recupVille.value,
                email: recupEmail.value,
            },
            products: ListePanier
        };

        //Envoi à la base de donnée du panier et des informations de contact via une méthode POST et redirection vers la page de confirmation
        fetch("http://localhost:3000/api/products/order",{
            method: "POST",
            body: JSON.stringify(infoCommande),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        .then((res) =>  res.json())
        .then(function(data) {
            if ((recupPrenom.value == "") || (recupNom.value == "") || (recupAdresse.value == "") || (recupVille.value == "") || (recupEmail.value == "")) {
                alert("Veuillez compléter tous les champs du formulaire svp. Les champs Prénom, Nom et Ville ne doivent pas comporter de caractère spéciaux. Le champs adresse doit commencer par le numéro de la rue. L'email doit être valide");
            } else if (tableauProduit == null || tableauProduit == 0) {
                alert("Veuillez selectionner au moins un article svp.");
            } else {
            console.table(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);
            document.location.href = "confirmation.html";
            }
    
    
        })
        .catch((erreur) => console.log(erreur.message));   

    });
}
envoiFormulaire();