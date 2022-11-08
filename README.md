# Kanap #

Il s'agit du **projet n°:five:** de la formation Développeur Web d'OpenClassrooms (Juillet 2022).

## Contexte :clipboard:

Ce projet consiste à créer une plateforme de e-commerce en plus d'une boutique physique.

L'équipe à déjà développée le front-end statique HTML - CSS ainsi que l'intégralité du back-end qui implémente l'API. Mon rôle est de développer le front-end de manière dynamique avec Javascript.

## Spécificités du projet :hammer_and_wrench:

### Techniques :arrow_down:

- [x] Le développement devra se faire en **JavaScript** sans Framework. 

- [x] La **page d'accueil** doit retourner tous les produits présent dans l'API avec son image, son nom et le début de sa description. Au clic, on est redirigé vers la page produit.

- [x] La **page produit** doit présenter un seul produit. Elle aura un menu déroulant permettant de personnaliser son produit et sa quantité. Ces éléments doivent être pris en compte dans le panier.

- [x] La **page panier** doit récapituler l'ensemble des produits qui ont été ajouté. Sur cette page, il est possible de modifier la quantité d'un produit et le total du panier soit se mettre à jour de façon dynamique. De plus, le formulaire doit être controllé pour que les informations qui sont envoyées à l'API soit correcte.

- [x] La **page confirmation** qui affiche un numéro de commande transmis par l'API.

## Installation du back-end :gear:

Après avoir cloner ce repository, depuis le terminal, saisir :
- `cd back`
- `npm install`
- `nodemon server`

Le serveur doit fonctionner sur le `localhost:3000`.

