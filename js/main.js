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

        // Omvandla svaret från API:et till Javascript data
        const data = await response.json();

        // Ta bort tidigare meddelanden
        apiMessage.textContent = "";

        // Kontrollera om några recept har hittats
        if (data.recipes.length === 0) {
            apiMessage.textContent = "Inget recept hittades, prova en ny sökfras.";
            return;
        }

        // Hämta det första receptet från resultatet
        const firstRecipe = data.recipes[0];

        // Visa det första receptet på webbsidan
        showRecipe(firstRecipe);   
    }

    // Visa receptet på webbsidan
    function showRecipe(recipe) {
        // Ta bort tidigare recept
        recipeSection.textContent = "";

        // Skapa en artikel för receptet
        const article = document.createElement("article");

        // Skapa rubriken med receptets namn
        const heading = document.createElement("h2");
        heading.textContent = recipe.name;
        article.appendChild(heading);

        // Skapa en bild för receptet
        const image = document.createElement("img");
        image.src = recipe.image;
        image.alt = recipe.name;
        article.appendChild(image);

        // Skapa ett område för receptets information
        const recipeInfo = document.createElement("div");
        recipeInfo.className = "recipe-info";

        // Visa antal portioner
        const servings = document.createElement("p");
        servings.textContent = "Portioner: " + recipe.servings;
        recipeInfo.appendChild(servings);

        // Visa förberedelsetid
        const prepTime = document.createElement("p");
        prepTime.textContent = "Förberedelsetid: " + recipe.prepTimeMinutes + " minuter";
        recipeInfo.appendChild(prepTime);

        // Lägg till informationen i artikeln
        article.appendChild(recipeInfo);

        // Lägg till artikeln på webbsidan
        recipeSection.appendChild(article);
    } 