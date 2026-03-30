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
        console.error("Geolocalização não é suportada por este navegador.");
        return;
    }

    console.log("Solicitando geolocalização...");

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Coordenadas obtidas: ${latitude}, ${longitude}`);
        
        try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`);
            const data = await response.json();
            
            console.log("Dados do país obtidos:", data);

            if (data.countryCode) {
                const flag = getFlagEmoji(data.countryCode);
                flagElement.textContent = flag;
                console.log("Bandeira exibida:", flag);
            } else {
                console.warn("Código do país não encontrado na resposta da API.");
            }
        } catch (error) {
            console.error("Erro ao obter país da API:", error);
        }
    }, (error) => {
        console.error("Erro de geolocalização:", error.message);
        if (error.code === 1) {
            alert("Por favor, permita o acesso à localização para ver a bandeira do seu país.");
        }
    });
}

/**
 * Busca uma nova imagem de gatinho (sem alterações de estilo extras).
 */
async function fetchCat() {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        catImg.src = data[0].url;
    } catch (error) {
        console.error("Erro na API de gatos:", error);
        alert("Ops! Não foi possível carregar o gatinho.");
    }
}

// Inicializar
window.addEventListener("DOMContentLoaded", () => {
    initGeolocation();
    fetchCat();
});
