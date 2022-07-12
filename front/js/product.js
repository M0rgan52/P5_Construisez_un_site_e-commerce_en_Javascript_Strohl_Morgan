//Récupération de l'ID présent dans l'URL
let url = new URL(document.location).searchParams;
let urlID = url.get("id");
console.log(urlID);

