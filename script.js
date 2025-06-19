// Registro do Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker registrado!', reg))
        .catch(err => console.log('Erro ao registrar Service Worker:', err));
}

// Função para calcular nova data
function calcularData() {
    const dataInput = document.getElementById('data').value;
    const anos = parseInt(document.getElementById('anos').value) || 0;
    const meses = parseInt(document.getElementById('meses').value) || 0;
    const dias = parseInt(document.getElementById('dias').value) || 0;
    const operacao = document.getElementById('operacao').value;
    
    if (!dataInput) {
        alert('Por favor, insira uma data válida.');
        return;
    }
    
    let data = new Date(dataInput);
    if (operacao === 'Adição') {
        data.setFullYear(data.getFullYear() + anos);
        data.setMonth(data.getMonth() + meses);
        data.setDate(data.getDate() + dias);
    } else {
        data.setFullYear(data.getFullYear() - anos);
        data.setMonth(data.getMonth() - meses);
        data.setDate(data.getDate() - dias);
    }
    
    document.getElementById('resultado').innerText = `Nova data: ${data.toISOString().split('T')[0]}`;
    salvarDados(dataInput, anos, meses, dias, operacao);
}

// Salvar dados localmente
function salvarDados(data, anos, meses, dias, operacao) {
    localStorage.setItem('data_calculo', JSON.stringify({ data, anos, meses, dias, operacao }));
}

// Restaurar dados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const dadosSalvos = JSON.parse(localStorage.getItem('data_calculo'));
    if (dadosSalvos) {
        document.getElementById('data').value = dadosSalvos.data;
        document.getElementById('anos').value = dadosSalvos.anos;
        document.getElementById('meses').value = dadosSalvos.meses;
        document.getElementById('dias').value = dadosSalvos.dias;
        document.getElementById('operacao').value = dadosSalvos.operacao;
    }
});

// Interface
document.write(`
    <h1>Calculadora de Datas</h1>
    <p>Este serviço permite realizar operações de adição ou subtração a partir de uma data.</p>
    <label>Data: <input type="date" id="data"></label> <br>
    <label>Anos: <input type="number" id="anos"></label> <br>
    <label>Meses: <input type="number" id="meses"></label> <br>
    <label>Dias: <input type="number" id="dias"></label> <br>
    <label>Operação:
        <select id="operacao">
            <option value="Adição">Adição</option>
            <option value="Subtração">Subtração</option>
        </select>
    </label> <br>
    <button onclick="calcularData()">Calcular</button>
    <p id="resultado"></p>
`);

// Manifest JSON
document.write(`
    <link rel="manifest" href="/manifest.json">
`);

