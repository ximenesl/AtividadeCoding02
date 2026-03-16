const catImg = document.getElementById("cat-img");

async function fetchCat() {
    catImg.style.opacity = "0.5";

    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();

        catImg.src = data[0].url;

        catImg.onload = () => {
            catImg.style.opacity = "1";
        };

    } catch (error) {
        console.error("Erro na API:", error);
        alert("Ops! Não foi possível carregar o gatinho.");
    }
}

fetchCat();
