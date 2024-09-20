document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obter valores do formulário
        const tipoSelect = document.getElementById('tipo');
        const tipo = tipoSelect.value.toUpperCase();
        
        // Verificar se o usuário selecionou um tipo de componente válido
        if (tipoSelect.selectedIndex === 0) {
            alert("Por favor, escolha um tipo de componente válido.");
            return; // Impede o envio do formulário
        }

        const RI = parseFloat(document.getElementById('RI').value) || null;
        const HEX = parseFloat(document.getElementById('HEX').value) || null;
        const LARG = parseFloat(document.getElementById('LARG').value) || null;
        const ALT = tipo === 'HE' || tipo === 'HI' ? parseFloat(document.getElementById('ALT').value) || null : null;

        const medidas = { tipo, RI, HEX, LARG, ALT };

        // Salvar as medidas no localStorage
        localStorage.setItem('medidasUsuario', JSON.stringify(medidas));

        // Encontrar componentes compatíveis
        const componentesCompatíveis = encontrarComponentes(tipo, medidas);

        // Exibir resultados
        exibirResultados(componentesCompatíveis);
    });
});

function exibirResultados(componentes) {
    // Verificar se a lista de componentes está vazia
    if (componentes.length === 0) {
        // Se estiver vazia, armazenar uma mensagem no localStorage
        localStorage.setItem('resultados', JSON.stringify([{ nome: 'Nenhum componente compatível' }]));
    } else {
        // Se não estiver vazia, armazenar os componentes no localStorage
        localStorage.setItem('resultados', JSON.stringify(componentes));
    }
    // Redirecionar para a página de resultados
    window.location.href = 'resultados.html';
}
