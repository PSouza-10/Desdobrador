# Desdobrador

## [Veja a aplicação](https://desdobrador.herokuapp.com/)

Desdobrador de dezenas para jogos da [Lotofácil](http://loterias.caixa.gov.br/wps/portal/loterias/landing/lotofacil/), com funcionalidade de editar e organizar os desdobramentos. Aprenda mais sobre desdobramentos [aqui](https://www.somatematica.com.br/lotofacilFechamentos.php).

## Configuração

Em seu terminal

```bash
git init

git clone https://github.com/PSouza-10/Desdobrador.git

cd Desdobrador

# Com yarn

yarn
cd client
yarn

# Com npm 

npm install
cd client
npm install

# Iniciar backend e frontend

yarn run dev

#ou

npm run dev
```

Após isso, crie uma pasta `config` na raiz do projeto, crie o arquivo `default.json` com o seguinte conteúdo, inserindo sua URI do MongoDB e chave de autenticação :

```json
{
    "Database":"<Sua URI MongoDB>",
    "jwtSecret": "<Chave de autenticação JWT>"
}
```

## Objetivo

Facilitar o gerenciamento e análise de jogos criados com a estratégia de desdobramento para a loteria Lotofácil, abrangendo os casos mais comuns de de jogos, como forma de aprendizado na Stack MERN. 

## Stack

* Front-end
  * React
  * Reactstrap
  * Redux
* Back-end
  * Node
  * Express
  * JSON Web Token
  * Mongoose (ORM MongoDB)

## Funcionalidade

### Desdobrar

![Desdobrar](https://res.cloudinary.com/souzacloud/image/upload/v1612638329/GIthubShowcase/Desdobrador-1.png)

Selecione os números que quer incluir em seu desdobramento, e um número de reforço, que será aplicado a todos os jogos. Após selecionar os números, ocorrera a validação, e se a seleção for válida, o botão "Desdobrar" se torna disponível. A matriz de jogos se tornará visível no painel a direita. Para limpar a seleção, pressione limpar ao lado do contador de números.

### Painel e comparador de resultado

![Resultado](https://res.cloudinary.com/souzacloud/image/upload/v1612638906/GIthubShowcase/Desdobrador-3.png)

Na caixa de resultados, insira o resultado com o qual deseja separar usando até 15 números separados por vírgula. O painel será atualizado para mostrar o resultado de cada jogo (última célula de cada fileira), e o número de jogos premiados por faixa de pontuação (parte de baixo do Painel).

![Painel](https://res.cloudinary.com/souzacloud/image/upload/v1612639218/GIthubShowcase/Desdobrador-2.png)

Você pode copiar os números de uma fileira de painel para a tabela de seleção de números clicando nela.

### Salvar Resultados 

Abaixo da caixa de entrada de resultados, ao clicar em "Salvar resultado", será requisitado o nome do resultado a salvar. Você pode ver, importar, e apagar os seus resultados após clicar no botão "Meus resultados".

### Salvar jogos

O explicado acima se aplica também aos jogos gerados após desdobrar. Abaixo da tabela de seleção de números, você pode salvar jogos, visualizar os jogos salvos após clicar em "Meus Jogos", que abrirá o seguinte painel.

![Meus Jogos](https://res.cloudinary.com/souzacloud/image/upload/v1612640364/GIthubShowcase/Desdobrador-4.png)

Na direita há uma lista com os jogos categorizados por grupos, clique em um grupo para visualizar seus jogos, e em um jogo para selecioná-lo e visualizar suas combinações. Após selecionado, o jogo pode ser deletado, renomeado, ou exportado, utilizando os respectivos botões do painel.

Crie e nomeie novos grupos com o botão "Novo Grupo", e adicione jogos com o botão "Editar" dentro do grupo localizado na lista da direita.
