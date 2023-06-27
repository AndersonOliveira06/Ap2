import { useEffect, useState } from 'react';

const Questao03 = () => {
    const [maiorPopulacao, setMaiorPopulacao] = useState('');
    const [menorPopulacao, setMenorPopulacao] = useState('');


    //requisição fetch feita no useEffect para a API, para obter os dados dos países da Europa
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/region/europe?fields=capital,population")
            .then((response) => response.json())
            .then((data) => {
                let maiorPopulacaoIndex = 0;
                let menorPopulacaoIndex = 0;

                //for para encontrar o índice do país com a maior população e menor população
                for (let i = 1; i < data.length; i++) {
                    if (data[i].population > data[maiorPopulacaoIndex].population) {
                        maiorPopulacaoIndex = i;
                    }

                    if (data[i].population < data[menorPopulacaoIndex].population) {
                        menorPopulacaoIndex = i;
                    }
                }

                //atualização dos estados das variáveis maiorPopulacao e menorPopulacao com as capitais dos países de maior e menor população.
                setMaiorPopulacao(data[maiorPopulacaoIndex].capital[0]);
                setMenorPopulacao(data[menorPopulacaoIndex].capital[0]);

            }).catch((error) => console.log(error));
    }
    , 
    []
    );

    return (
        <div>
            <h1>Capitais dos países com maior e menor população na Europa:</h1>
            <h3>Maior População: {maiorPopulacao}</h3>
            <h3>Menor População: {menorPopulacao}</h3>
        </div>
    );
};

export default Questao03