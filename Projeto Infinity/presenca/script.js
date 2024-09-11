document.addEventListener('DOMContentLoaded', () => {
    const alunos = [{nome: 'elisson', presente: false},
        {nome: 'gustavo', presente: false},
        {nome: 'giovanni', presente: false},
        {nome: 'lais', presente: false},
        {nome: 'milena', presente: false},
        {nome: 'diego', presente: false},
        {nome: 'rafael maia', presente: false},
        {nome: 'nil', presente: false}]
    const lista = document.querySelector('.listaAlunos')

    
    function criarLista() {
        alunos.forEach((aluno) => {
            const li = document.createElement('li');
            li.classList.add('Aluno');
            aluno.presente = false;
            li.addEventListener('click', () => {
                if (aluno.presente) {
                    li.classList.toggle('ok');
                    aluno.presente = false;
                    console.log('agora estou '+ aluno.presente)
                } else {
                    aluno.presente = true;
                    li.classList.toggle('ok');
                    console.log('agora estou '+ aluno.presente)
                }
            })
    
            const h2 = document.createElement('h2');
            h2.classList.add('AlunoName')
            h2.innerText = aluno.nome;
            console.log(aluno.nome)
    
            const buttonObs = document.createElement('button');
            buttonObs.classList.add('AlunoObs');
            buttonObs.addEventListener('click', () => {
                alert('função para criar modal')
            })

    
            lista.appendChild(li);
            li.appendChild(h2);
            li.appendChild(buttonObs);
    
        })
    }

    criarLista()


})