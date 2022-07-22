function confirmation() {
    let numeroConfirmation = document.getElementById("orderId");
    numeroConfirmation.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}
confirmation();