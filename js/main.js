"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Sandra Safari
 */

// Hämta elementen från HTML
const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorMessage = document.querySelector("#error");
const apiMessage = document.querySelector("#message");
const recipeSection = document.querySelector("#recipe");

// Lyssna när användaren skickar sökformuälret
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Läs sökfrasen från formuläret
    const searchTerm = searchInput.value.trim();

    // Kontrollera om sökfältet är tomt
    if (searchTerm === "") {
        errorMessage.textContent = "Du måste fylla i en sökfras!";
        return;
    }

    // Ta bort den tidigare felmeddelande när en giltig sökning skrivs in
    errorMessage.textContent = "";

    // Skapa API-adressen med användarens sökfras
    const apiUrl = "https://dummyjson.com/recipes/search?q=" + searchTerm;

    // Hämtar recept från API:et
    getRecipes(apiUrl);
});

    // Hämtar recept från API:et
    async function getRecipes(url) {
        const response = await fetch(url);
        
    }