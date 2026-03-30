const catImg = document.getElementById("cat-img");
const flagElement = document.getElementById("country-flag");

/**
 * Converte um código de país (ISO 3166-1 alpha-2) em emoji de bandeira.
 * @param {string} countryCode 
 */
function getFlagEmoji(countryCode) {
    if (!countryCode) return "";
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

/**
 * Solicita geolocalização e exibe a bandeira do país.
 */
async function initGeolocation() {
    if (!navigator.geolocation) {
        console.warn("Geolocalização não é suportada por este navegador.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
            // Usando API gratuita da BigDataCloud para geocodificação reversa
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`);
            const data = await response.json();
            
            if (data.countryCode) {
                const flag = getFlagEmoji(data.countryCode);
                flagElement.textContent = flag;
                flagElement.classList.add("visible");
            }
        } catch (error) {
            console.error("Erro ao obter país:", error);
        }
    }, (error) => {
        console.warn("Permissão de geolocalização negada ou erro:", error.message);
    });
}

/**
 * Busca uma nova imagem de gatinho.
 */
async function fetchCat() {
    catImg.style.opacity = "0.4";
    catImg.style.transform = "scale(0.96)";

    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();

        catImg.src = data[0].url;

        catImg.onload = () => {
            catImg.style.opacity = "1";
            catImg.style.transform = "scale(1)";
        };

    } catch (error) {
        console.error("Erro na API de gatos:", error);
        alert("Ops! Não foi possível carregar o gatinho.");
        catImg.style.opacity = "1";
        catImg.style.transform = "scale(1)";
    }
}

// Inicializar
window.addEventListener("DOMContentLoaded", () => {
    initGeolocation();
    fetchCat();
});
