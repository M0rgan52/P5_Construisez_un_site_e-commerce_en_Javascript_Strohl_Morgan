//Récupération des articles dans le serveur

function getArticles() {
fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
    })
    .catch(function(err) {
        let erreur = document.getElementById("items");
        erreur.innerHTML = "Une erreur n'a pas permis d'afficher nos canapés. Veuillez nous excuser pour ce désagrement et nous vous invitons a réessayer ultérieurement. L'équipe Kanap."
        console.log("Une erreur est survenue. Impossible de se connecter au serveur")
    });

}

getArticles();

