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

            
            let divArticle = document.createElement("article");
            document.querySelector(".items").appendChild(divArticle);
            divArticle.classList.add("fiche_prodruits");

            let lienArticle = document.createElement("a");
            divArticle.appendChild(lienArticle);
            lienArticle.href = 'product.html';
            lienArticle.classList.add("lien_produits");


        }

    })
    .catch(function(err) {
        let erreur = document.getElementById("items");
        erreur.innerHTML = "Une erreur n'a pas permis d'afficher nos canapés. Veuillez nous excuser pour ce désagrement et nous vous invitons a réessayer ultérieurement. <br> L'équipe Kanap."
        console.log("Une erreur est survenue. Impossible de se connecter au serveur")
    });

}

getArticles();

