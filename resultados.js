document.addEventListener('DOMContentLoaded', function() {
    const resultados = JSON.parse(localStorage.getItem('resultados')) || [];

    exibirResultadosNaPagina(resultados);
});

// Dicionários dos componentes (usados na busca)
const dicionario_HE = {
    'HE33RE': {'RI': 1.80, 'HEX': 2.40, 'LARG': 3.30, 'ALT': 1.00},
    'HE41BR': {'RI': 2.00, 'HEX': 2.70, 'LARG': 4.10, 'ALT': 0.70},
    'HE325TR': {'RI': 2.00, 'HEX': 2.55, 'LARG': 3.40, 'ALT': 0.70},
    'HE50RE': {'RI': 2.50, 'HEX': 3.30, 'LARG': 5.00, 'ALT': 1.00},
    'HE33BR': {'RI': 1.60, 'HEX': 2.40, 'LARG': 3.50, 'ALT': 0.70},
    'HE33TF': {'RI': 1.70, 'HEX': 2.40, 'LARG': 3.50, 'ALT': 1.00},
    'HE50TF': {'RI': 2.50, 'HEX': 3.40, 'LARG': 5.10, 'ALT': 1.00},
    'S48MU': {'RI': 1.40, 'HEX': 0, 'LARG': 4.80, 'ALT': 0},
    'S48ES': {'RI': 1.40, 'HEX': 3.30, 'LARG': 4.80, 'ALT': 0}
    // Adicione mais itens aqui...
};

const dicionario_HI = {
    'HI33UN': {'RI': 1.80, 'HEX': 2.30, '2HEX': 0.00, 'LARG': 3.50},
    'HI375-43UN': {'RI': 2.0, 'HEX': 2.5, '2HEX': 0.0, 'LARG': 4.0},
    'HI38-43TP': {'RI': 1.6, 'HEX': 2.5, '2HEX': 0.0, 'LARG': 4.3},
    'HI35-43SU': {'RI': 1.8, 'HEX': 2.5, '2HEX': 0.0, 'LARG': 3.5},
    'HI40TF': {'RI': 1.4, 'HEX': 2.4, '2HEX': 0.0, 'LARG': 4.0},
    'HI33CL': {'RI': 2.0, 'HEX': 2.4, '2HEX': 0.0, 'LARG': 3.3},
    'HI375-40DF': {'RI': 2.0, 'HEX': 2.5, '2HEX': 0.0, 'LARG': 4.0},
    'HI37-42MI': {'RI': 1.8, 'HEX': 2.4, '2HEX': 0.0, 'LARG': 3.8},
    'HI35CT': {'RI': 1.6, 'HEX': 2.2, '2HEX': 2.2, 'LARG': 3.5},
    'HI41CT': {'RI': 1.6, 'HEX': 2.7, '2HEX': 2.2, 'LARG': 4.1},
    'HI35RS': {'RI': 1.8, 'HEX': 0.0, '2HEX': 0.0, 'LARG': 3.5},
    'HI43RS': {'RI': 2.0, 'HEX': 0.0, '2HEX': 0.0, 'LARG': 4.3},
    'HI50RS': {'RI': 1.8, 'HEX': 0.0, '2HEX': 0.0, 'LARG': 5.0},
    'HI38SI': {'RI': 1.8, 'HEX': 2.5, '2HEX': 0.0, 'LARG': 3.8},
    'HI48MU': {'RI': 1.4, 'HEX': 0.0, '2HEX': 0.0, 'LARG': 4.8},
    'HI48ES': {'RI': 1.4, 'HEX': 3.3, '2HEX': 0.0, 'LARG': 4.8}
    // Adicione mais itens aqui...
};

const dicionario_CM = {
    'CM35-43-50ND': {'RI': 1.80, 'HEX': 2.10, 'LARG': 3.50},
    'Sistema universal Neodent': {'RI': 0.0, 'HEX': 0.0, 'LARG': 0.0},
    'CM48GTND': {'RI': 2.0, 'HEX': 3.0, 'LARG': 4.8},
    'CM38-45-55SISW': {'RI': 1.6, 'HEX': 2.0, 'LARG': 4.0},
    'CM35-375-40CN': {'RI': 1.6, 'HEX': 2.25, 'LARG': 3.5},
    'NC33ST': {'RI': 1.6, 'HEX': 0.0, 'LARG': 3.5},
    'RC41ST': {'RI': 1.6, 'HEX': 0.0, 'LARG': 4.1},
    'RN48ST': {'RI': 2.0, 'HEX': 0.0, 'LARG': 4.8},
    'WN65ST': {'RI': 2.0, 'HEX': 0.0, 'LARG': 6.5},
    'RBWB375-65ST': {'RI': 2.0, 'HEX': 0.0, 'LARG': 4.0},
    'CM35-43-50GMND': {'RI': 1.6, 'HEX': 2.0, 'LARG': 3.5},
    'CM30CCNB': {'RI': 1.4, 'HEX': 0.0, 'LARG': 3.0},
    'CM35NPNB': {'RI': 1.6, 'HEX': 2.25, 'LARG': 3.5},
    'CM43RPNB': {'RI': 2.0, 'HEX': 2.65, 'LARG': 4.3},
    'CM35-43-50DB': {'RI': 1.8, 'HEX': 1.9, 'LARG': 3.5},
    'CM35-40AT': {'RI': 1.6, 'HEX': 2.1, 'LARG': 3.5},
    'CM45-50AT': {'RI': 2.0, 'HEX': 2.5, 'LARG': 4.5},
    'CM375-42C1MI': {'RI': 1.8, 'HEX': 0.0, 'LARG': 3.75},
    '48MU': {'RI': 1.4, 'HEX': 0.0, 'LARG': 4.8}
    // Adicione mais itens aqui...
};




function exibirResultadosNaPagina(componentes) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Limpa resultados anteriores
    const lista = document.createElement('ul');
    resultsContainer.appendChild(lista);

    componentes.forEach(componente => {
        const item = document.createElement('li');
        item.textContent = `${componente.nome} - Compatibilidade: ${componente.compatibilidade.toFixed(2)}%`;
        item.classList.add('result-item');

        const vejaMaisBtn = document.createElement('button');
        vejaMaisBtn.textContent = 'Veja mais';
        vejaMaisBtn.classList.add('btn', 'btn-link');

        // Defina o nome do componente como um atributo data
        vejaMaisBtn.setAttribute('data-componente', componente.nome.trim());

        // Adicione o evento de clique no botão
        vejaMaisBtn.addEventListener('click', function() {
            const nomeComponente = this.getAttribute('data-componente').trim();
            console.log("Nome do Componente Clicado:", nomeComponente); // DEBUG: Verificar se o nome está correto
            abrirModal(nomeComponente); // Passa o nome diretamente para abrirModal
        });

        item.appendChild(vejaMaisBtn);
        lista.appendChild(item);
    });
}

function abrirModal(nomeComponente) {
    const medidasList = document.getElementById('medidasList');
    medidasList.innerHTML = ''; // Limpa medidas anteriores

    console.log("Abrindo modal para:", nomeComponente); // DEBUG: Verificar se o nome do componente está correto no modal

    let medidasComponente = buscarMedidasComponente(nomeComponente);
    
    if (medidasComponente) {
        Object.entries(medidasComponente).forEach(([chave, valor]) => {
            const medidaItem = document.createElement('li');
            medidaItem.textContent = `${chave}: ${valor}`;
            medidasList.appendChild(medidaItem);
        });
    } else {
        medidasList.innerHTML = '<li>Nenhuma medida disponível</li>';
        console.log("Nenhuma medida encontrada para:", nomeComponente); // DEBUG: Verificar se o componente está presente no dicionário
    }

    const modal = new bootstrap.Modal(document.getElementById('medidasModal'));
    modal.show();
}

function buscarMedidasComponente(nomeComponente) {
    nomeComponente = nomeComponente.trim(); // Remove espaços extras

    // Verifica qual dicionário contém o componente e retorna suas medidas
    if (dicionario_HE[nomeComponente]) {
        console.log("Componente encontrado em HE:", nomeComponente); // DEBUG: Verifica se o componente foi encontrado em HE
        return dicionario_HE[nomeComponente];
    } else if (dicionario_HI[nomeComponente]) {
        console.log("Componente encontrado em HI:", nomeComponente); // DEBUG: Verifica se o componente foi encontrado em HI
        return dicionario_HI[nomeComponente];
    } else if (dicionario_CM[nomeComponente]) {
        console.log("Componente encontrado em CM:", nomeComponente); // DEBUG: Verifica se o componente foi encontrado em CM
        return dicionario_CM[nomeComponente];
    }
    console.log("Componente não encontrado:", nomeComponente); // DEBUG: Verifica se o componente não foi encontrado em nenhum dicionário
    return null; // Caso não encontre o componente em nenhum dicionário
}




