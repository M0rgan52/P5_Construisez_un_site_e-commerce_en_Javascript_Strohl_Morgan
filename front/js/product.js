//Récupération de l'ID présent dans l'URL
let url = new URL(document.location).searchParams;
let urlID = url.get("id");
console.log(urlID);

//Création des constantes pour l'intégration dynamique dans le DOM
const image = document.querySelector(".item__img");
const titre = document.getElementById('title');
const prix = document.getElementById('price');
const description = document.getElementById('description');
const couleur = document.getElementById('colors');

