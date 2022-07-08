//Récupération des articles dans le serveur

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

            let lienArticle = document.createElement("a");
            document.querySelector(".items").appendChild(lienArticle);
            lienArticle.href = 'product.html';
            
            let divArticle = document.createElement("article");
            lienArticle.appendChild(divArticle);

            let imageProduit = document.createElement("img");
            divArticle.appendChild(imageProduit);
            imageProduit.src = data[article].imageUrl;
            imageProduit.alt = data[article].altTxt;

            let nomProduit = document.createElement("h3");
            divArticle.appendChild(nomProduit);
            nomProduit.innerHTML = data[article].name;

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

