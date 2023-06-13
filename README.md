<div align="center">
  <h2>Calculadora de Comissões 💰</h2>
  <p>Aplicativo para realizar cálculo de comissões em vendas de produtos e serviços.</p>
</div>


## Sumário 📚

- [Sumário 📚](#sumário-)
- [**Endpoints da API 💡**](#endpoints-da-api-)
  - [**Vendedores e Clientes**](#vendedores-e-clientes)
    - [Exemplos](#exemplos)
  - [**Produtos**](#produtos)
    - [Exemplos](#exemplos-1)
  - [**Vendas**](#vendas)
    - [Exemplos](#exemplos-2)
- [**Configuração do Ambiente de Desenvolvimento ⚙️**](#configuração-do-ambiente-de-desenvolvimento-️)
- [**Backend**](#backend)
- [**Frontend**](#frontend)
- [**🛠 Tecnologias**](#-tecnologias)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
- [**Executando os Testes ✅**](#executando-os-testes-)
- [**Contribuindo 🤝**](#contribuindo-)
- [**Licença 📝**](#licença-)

## **Endpoints da API 💡**
### **Vendedores e Clientes**

- `api/v1/persons/vendors/`
  -  **GET:** listar vendedores cadastrados.
  -  **POST:** cadastrar vendedor.
- `api/v1/persons/vendors/<int:id>/`
  - **GET:** detalhes do vendedor.
  - **DELETE:** deletar vendedor.
  - **PUT:** atualizar vendedor.

- `api/v1/persons/customers/`
  -  **GET:** listar clientes cadastrados.
  -  **POST:** cadastrar cliente.
- `api/v1/persons/customers/<int:id>/`
  - **GET:** detalhes do cliente.
  - **DELETE:** deletar cliente.
  - **PUT:** atualizar cliente.
#### Exemplos

```python
# Cadastro de cliente

url = "http://localhost:8000/api/v1/customers/"
payload = {
  "name": "Test Person",
  "email": "testcustomer@email.com",
  "phone": "84991000000",
}
response = requests.post(url, json=payload)


# Atualização de vendedor (alterando nome)

url = "http://localhost:8000/api/v1/vendors/"
payload = {
  "name": "New Name Vendor",
  "email": "testvendor@email.com",
  "phone": "84991222222",
}
response = requests.put(url, json=payload)
```

### **Produtos**

- `api/v1/products/`
  -  **GET:** listar produtos cadastrados.
  -  **POST:** cadastrar produto.
- `api/v1/products/<int:id>/`
  - **GET:** detalhes do produto.
  - **DELETE:** deletar produto.
  - **PUT:** atualizar produto.
#### Exemplos

```python
# Cadastro de produto

url = "http://localhost:8000/api/v1/products/"
payload = {
    "code": "12346",
    "description": "New Product",
    "unit_price": "17.49",
    "commission_rate": "0.050"
}
response = requests.post(url, json=payload)


# Atualização de produto (alterando taxa de comissão)

url = "http://localhost:8000/api/v1/products/"
payload = {
    "code": "12346",
    "description": "New Product",
    "unit_price": "17.49",
    "commission_rate": "0.020"
}
response = requests.put(url, json=payload)
```

### **Vendas**

- `api/v1/sales/`
  - **GET:** listar vendas cadastradas.
  - **POST:** cadastrar venda.
- `api/v1/sales/<int:id>/`
  - **GET:** detalhes do produto.
  - **DELETE:** deletar produto.
  - **PUT:** atualizar produto.
#### Exemplos

```python
# Cadastro de venda

url = "http://localhost:8000/api/v1/sales/"
payload = {
    "date_time": "2023-06-13T08:24:42-03:00",
    "customer": "http://commission-calculator-api.up.railway.app/api/v1/persons/customers/1/",
    "vendor": "http://commission-calculator-api.up.railway.app/api/v1/persons/vendors/2/",
    "products": [
        {
            "product": "http://commission-calculator-api.up.railway.app/api/v1/products/3/",
            "quantity": 3
        },
        {
            "product": "http://commission-calculator-api.up.railway.app/api/v1/products/3/",
            "quantity": 2
        }
    ]
}
response = requests.post(url, json=payload)


# Atualização de venda (removendo primeiro produto)

url = "http://localhost:8000/api/v1/sales/"
payload = {
    "date_time": "2023-06-13T08:24:42-03:00",
    "customer": "http://commission-calculator-api.up.railway.app/api/v1/persons/customers/1/",
    "vendor": "http://commission-calculator-api.up.railway.app/api/v1/persons/vendors/2/",
    "products": [
        {
            "product": "http://commission-calculator-api.up.railway.app/api/v1/products/3/",
            "quantity": 2
        }
    ]
}
response = requests.put(url, json=payload)
```


## **Configuração do Ambiente de Desenvolvimento ⚙️**

Para configurar o ambiente de desenvolvimento, siga as etapas abaixo:

**0.** Clone este repositório em sua máquina.

## **Backend**

**1.** Acesse a pasta `backend` dentro do diretório clonado.

**2.** Certifique-se de ter o Docker Compose instalado em seu sistema.

**3.** Crie o arquivo `.env` com base no arquivo `.env.example`:

```bash
cp .env.example .env
```
  * Não esqueça de atualizar as variáveis do arquivo `.env` com base no seu ambiente.

**4.** Execute o comando `docker-compose up` para iniciar o ambiente de desenvolvimento.

**5.** Acesse a API em http://localhost:8000/.

  - **OBS:** ao inicializar a aplicação, um usuário administrador será criado automaticamente e você poderá acessar o painel de admin em http://localhost:8000/admin utilizando as credenciais `ADMIN_USERNAME` e `ADMIN_PASSWORD` que forneceu no arquivo `.env`.

## **Frontend**

**1.** Acesse a pasta `frontend` dentro do diretório clonado.

**2.** Certifique-se de ter o NodeJS instalado em seu sistema.

**3.** Instale as dependências do projeto:
```bash
npm i
```

**4.** Execute o comando para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

**5.** Acesse a aplicação em http://localhost:3000/.


## **🛠 Tecnologias**

### Backend

* [Django](https://www.djangoproject.com/): framework para desenvolvimento web em Python que facilita a criação de aplicativos web robustos e escaláveis.
* [Django REST Framework](https://www.django-rest-framework.org/): biblioteca poderosa e flexível para desenvolvimento de APIs Web em Django.
* [PostgreSQL](https://www.postgresql.org/): banco de dados relacional de código aberto, robusto e altamente escalável, que suporta recursos avançados como consultas complexas, índices, transações ACID e replicação.
* [Docker](https://www.docker.com/): plataforma para criação e execução de aplicativos em contêineres, proporcionando isolamento, portabilidade e facilidade na implantação.

### Frontend

* [TypeScript](https://www.typescriptlang.org/): linguagem de programação de código aberto baseada em JavaScript, com tipagem estática opcional. Oferece segurança, produtividade e escalabilidade no desenvolvimento de aplicativos web e Node.js.

* [NextJS](https://nextjs.org/): framework React de código aberto para criação de aplicativos web modernos. Com SSR (Renderização do Lado do Servidor) e SSG (Geração de Páginas Estáticas), permite desenvolver de forma produtiva e escalável, garantindo desempenho otimizado.


## **Executando os Testes ✅**

Este projeto inclui testes automatizados implementados com as ferramentas de teste do Django e Django REST Framework. Para executar os testes, siga as etapas abaixo:

1. Certifique-se de ter o ambiente de desenvolvimento configurado e em execução.

2. No diretório raiz do backend do projeto, execute o comando `docker-compose run backend coverage run manage.py test` para executar os testes automatizados.

3. (Opcional ) Se quiser visualizar o relatório de cobertura dos testes em html, execute `docker-compose run backend coverage html` e a pasta htmlcov será criada com todas as informações detalhadas sobre o resultado dos testes. Para visualizar esses resultados, execute `python -m http.server -d htmlcov 8001`

## **Contribuindo 🤝**

Contribuições são bem-vindas! Se você deseja contribuir para este projeto, siga estas etapas:

1. Faça um fork deste repositório.

2. Crie uma nova branch com sua contribuição: `git checkout -b minha-contribuicao`.

3. Faça as alterações necessárias e commit: `git commit -m "Minha contribuição"`.

4. Envie suas alterações para o seu fork: `git push origin minha-contribuicao`.

5. Abra um pull request neste repositório, descrevendo suas alterações.

6. Aguarde feedback e revisão do pull request.

## **Licença 📝**

Este projeto está licenciado sob a [MIT License](LICENSE).
