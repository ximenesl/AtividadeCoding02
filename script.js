const catImg = document.getElementById("cat-img");

async function fetchCat() {
    // Definimos uma cor de fundo ou um estilo enquanto carrega
    catImg.style.opacity = "0.5";

    try {
        // The Cat API - endpoint bem simples e sem necessidade de chave
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();

        // A API retorna um array, pegamos o primeiro item
        catImg.src = data[0].url;

        // Quando a imagem terminar de carregar, volta a opacidade normal
        catImg.onload = () => {
            catImg.style.opacity = "1";
        };

    } catch (error) {
        console.error("Erro na API:", error);
        alert("Ops! Não foi possível carregar o gatinho.");
    }
}

// Carrega o primeiro gato quando abre a página
fetchCat();
