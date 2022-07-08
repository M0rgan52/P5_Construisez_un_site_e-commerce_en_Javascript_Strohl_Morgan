//Récupération des articles dans le serveur et modification du DOM

function getArticles() {
fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        let articles = data;
        console.log(articles);
        for (let article in articles) {

            //Création de la balise <a> et du lien vers la page produit
            let lienArticle = document.createElement("a");
            document.querySelector(".items").appendChild(lienArticle);
            lienArticle.href = 'product.html';
            
            //Création de la balise <article> dans la balise <a>
            let divArticle = document.createElement("article");
            lienArticle.appendChild(divArticle);

            //Intégration de l'image et de l'alt dans la balise <article>
            let imageProduit = document.createElement("img");
            divArticle.appendChild(imageProduit);
            imageProduit.src = data[article].imageUrl;
            imageProduit.alt = data[article].altTxt;

            //Intégration du nom du produit dans la balise <article>
            let nomProduit = document.createElement("h3");
            divArticle.appendChild(nomProduit);
            nomProduit.innerHTML = data[article].name;

            //Intégration de la description dans la balise <article>
            let descriptionProduit = document.createElement("p");
            divArticle.appendChild(descriptionProduit);
            descriptionProduit.innerHTML = data[article].description;
        }

    })
    .catch(function(err) {
        let erreur = document.getElementById("items");
        erreur.innerHTML = "Une erreur n'a pas permis d'afficher nos canapés. Veuillez nous excuser pour ce désagrement et nous vous invitons a réessayer ultérieurement. <br> L'équipe Kanap."
        console.log("Une erreur est survenue. Impossible de se connecter au serveur")
    });

}

getArticles();

