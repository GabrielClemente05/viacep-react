import {useState} from 'react'
import './App.css'

function App() {
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState(null);

    function consultaEndereco() {
        if (cep.length !== 8) {
            alert('CEP Inválido');
            return;
        }

        let url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                mostrarEndereco(data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

    function mostrarEndereco(dados) {
        if (dados.erro) {
            setEndereco(<div className='dadosapi'>
                        <p>Não foi possível localizar o endereço.   </p>
                        </div>);
        } else {
            setEndereco(
                <>
                    <div className="dadosapi">
                        <p>Endereço: {dados.logradouro}</p>
                        <p>DDD: {dados.ddd}</p>
                        <p>Bairro: {dados.bairro}</p>
                        <p>Cidade: {dados.localidade} - {dados.uf}</p>
                    </div>
                </>
            );
        }
    }

    return (
        <div className='corpo'>
            <h1>Consulta de Endereço</h1>
            <label htmlFor="cep">Insira seu CEP: </label>
            <input
                type="text"
                id="cep"
                value={cep}
                onChange={e => setCep(e.target.value)}
                placeholder='12345678'
            />
            <button onClick={consultaEndereco}>Consultar</button>

            <div id="resultado">
                {endereco}
            </div>
        </div>
    );
}


export default App
