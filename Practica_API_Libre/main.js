const URL_ARCHETYPES = 'https://db.ygoprodeck.com/api/v7/archetypes.php';
const URL_CARDS = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=';

const select = document.getElementById('archetypeSelect');
const container = document.getElementById('cardsContainer');

async function cargarArquetipos() {
    try {
        const response = await fetch(URL_ARCHETYPES);
        const data = await response.json();
        
        select.innerHTML = '<option value="" disabled selected>Selecciona un arquetipo</option>';
        
        data.slice(0, 50).forEach(archetype => {
            const option = document.createElement('option');
            option.value = archetype.archetype_name;
            option.textContent = archetype.archetype_name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando arquetipos:', error);
        select.innerHTML = '<option>Error al cargar</option>';
    }
}

async function buscarCartas() {
    const arquetipoSeleccionado = select.value;
    if (!arquetipoSeleccionado) return alert("Por favor selecciona un arquetipo primero.");

    container.innerHTML = '<p class="placeholder">Cargando cartas...</p>';

    try {
        const response = await fetch(`${URL_CARDS}${encodeURIComponent(arquetipoSeleccionado)}`);
        const data = await response.json();

        mostrarCartas(data.data);
    } catch (error) {
        console.error('Error buscando cartas:', error);
        container.innerHTML = '<p class="placeholder">No se encontraron cartas o hubo un error.</p>';
    }
}

function mostrarCartas(cartas) {
    container.innerHTML = '';
    
    cartas.forEach(carta => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        
        const imagen = carta.card_images[0].image_url_small;
        
        cardDiv.innerHTML = `
            <img src="${imagen}" alt="${carta.name}">
            <div class="card-info">
                <h3>${carta.name}</h3>
                <p>ATK: ${carta.atk || '-'} / DEF: ${carta.def || '-'}</p>
            </div>
        `;
        
        container.appendChild(cardDiv);
    });
}

cargarArquetipos();