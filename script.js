function calcularDesafio() {
    const combustivel = document.getElementById('combustivel').value;
    const consumo = parseFloat(document.getElementById('consumo').value);
    const horas = parseFloat(document.getElementById('horas').value);

    if (isNaN(consumo) || isNaN(horas) || consumo <= 0 || horas <= 0) {
        alert("Por favor, insira valores válidos para calcular o impacto.");
        return;
    }

    const fatorEmissao = combustivel === 'biodiesel' ? 0.50 : 2.68;
    const totalCO2 = consumo * horas * fatorEmissao;
    const arvoresNecessarias = Math.ceil(totalCO2 / 15);

    document.getElementById('emissaoTexto').innerHTML = `<strong>${totalCO2.toFixed(1)} kg</strong>`;
    document.getElementById('arvoresTexto').innerHTML = `<strong>${arvoresNecessarias} árvores</strong>`;

    definirRankEcolgico(totalCO2, combustivel);

    document.getElementById('resultado').classList.remove('hidden');
}

function definirRankEcolgico(co2, combustivel) {
    const badge = document.getElementById('badgeNota');
    const statusMsg = document.getElementById('statusMensagem');
    const listaDicas = document.getElementById('listaDicas');
    const barraProgresso = document.getElementById('barraProgresso');
    
    listaDicas.innerHTML = "";
    // Reseta classes antigas da barra de progresso
    barraProgresso.className = "barra-progresso"; 
    
    let missoes = [];

    if (co2 < 200) {
        badge.innerText = "A";
        badge.className = "badge nota-a";
        barraProgresso.classList.add("progresso-a");
        statusMsg.innerHTML = "🏆 <strong>Guardião da Terra!</strong> Seu impacto é super baixo. Parabéns!";
        missoes = [
            "<strong>Missão Multiplicador:</strong> Compartilhe seus métodos eficientes com outros produtores regionais.",
            "<strong>Sustentabilidade Máxima:</strong> Planeje o uso de energia solar na sede da fazenda."
        ];
    } else if (co2 >= 200 && co2 <= 1000) {
        badge.innerText = "C";
        badge.className = "badge nota-c";
        barraProgresso.classList.add("progresso-c");
        statusMsg.innerHTML = "🌱 <strong>Produtor Consciente.</strong> Boa pontuação, mas dá para otimizar o maquinário.";
        missoes = [
            "<strong>Missão Pneus Calibrados:</strong> Monitore a pressão semanalmente para economizar até 4% de combustível.",
            "<strong>Missão Manutenção Geral:</strong> Revise bicos injetores do trator para queimar o combustível de forma correta."
        ];
    } else {
        badge.innerText = "E";
        badge.className = "badge nota-e";
        barraProgresso.classList.add("progresso-e");
        statusMsg.innerHTML = "⚠️ <strong>Alerta de Emissões!</strong> Seus gastos de CO₂ estão elevados.";
        missoes = [
            "<strong>Missão Filtro Novo:</strong> Filtros obstruídos aumentam o consumo de combustível drasticamente. Troque-os!",
            "<strong>Missão GPS Agrícola:</strong> Planeje rotas para evitar sobreposição de passadas e desperdício de tempo rodando.",
            "<strong>Compensação Ambiental:</strong> Separe uma área para plantio de mudas nativas da sua região."
        ];
    }

    if (combustivel === 'diesel') {
        missoes.push("<strong>Missão Transição Verde:</strong> Migre para o Biodiesel e reduza em até 80% suas emissões diretas.");
    }

    missoes.forEach(missao => {
        const li = document.createElement('li');
        li.innerHTML = missao;
        listaDicas.appendChild(li);
    });
}