//Création d'un fonction nettoyant le localstorage et donnant l'orderId
function confirmation() {
    let numeroConfirmation = document.getElementById("orderId");
    numeroConfirmation.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}
confirmation();