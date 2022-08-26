let chat = [];
let nome;

function entrarSala() {
    nome = prompt('Diga seu nome');
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: nome});
    promisse.then(nomeAprovado);
    promisse.catch(outroNome);
};
entrarSala()
function nomeAprovado(){
    setInterval(manterConexao, 5000);
};

function outroNome(erro){
    const statusCode = erro.response.status;
    if (statusCode === 400) {
        alert('Esse nome já está sendo utilizado, escolha outro')
        entrarSala()
    }
}

function manterConexao(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name: nome});
    console.log('conexão ok')
}

/*-------------------------------------------------------------------------------------------*/

function pegarDados() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(processarDados);
}
setInterval(pegarDados, 3000)
//pegarDados()
function processarDados(resposta) {
    chat = resposta.data;
    renderizarChat();
}
function renderizarChat() {
    const ul = document.querySelector('.main-wrapper');
    ul.innerHTML = '';

    for (let i = 0; i < chat.length; i++) {
        
        if (chat[i].type === 'status') {
            ul.innerHTML += `<li class="mensagem status">
                <p>
                    <span class="hora">(${chat[i].time}) </span> <span class="user">${chat[i].from}</span> para <span class="user">${chat[i].to}</span>: ${chat[i].text}
                </p>
            </li>`;
        } else if (chat[i].type === 'message') {
            ul.innerHTML += `<li class="mensagem msg">
                <p>
                    <span class="hora">(${chat[i].time}) </span> <span class="user">${chat[i].from}</span> para <span class="user">${chat[i].to}</span>: ${chat[i].text}
                </p>
            </li>`;
        }

        const msgAtt = document.querySelectorAll('.mensagem');
        const last = msgAtt[msgAtt.length - 1];
        last.scrollIntoView();
    }

}