import { useState } from "react"
import Questao01Y from "./Questão01Y"

const Questao01X = () => {

    const alunos = [
        { nome: "Sicrano", notas: { ap1: 8.4, ap2: 5.4 } },
        { nome: "Beltrano", notas: { ap1: 6.7, ap2: 3.5 } },
        { nome: "Fulano", notas: { ap1: 7.3, ap2: 9.2 } }
    ];

    const [medias, setMedias] = useState([]);
    const [loading, setLoading] = useState(true);

    //função controlMedias atualiza a variável de estado medias com as médias calculadas por Questao01Y e define loading como false para indicar que o carregamento foi concluído.
    const controlMedias = (medias) => {
        setMedias(medias);
        setLoading(false);
    };

    //função alunosAprovados é responsável por filtrar os alunos com média superior ou igual a 6.0, se a página não estiver carregando
    const alunosAprovados = () => {
        if(loading === true) {
            return <p>Carregando...</p>
        } else {
            return alunos
                .filter((aluno, index) => medias[index] >= 6.0)
                .map((aluno) => <h3>{aluno.nome}</h3>);
        }
    };

    return (
        <div>
            <h2>Alunos Aprovados:</h2>
            {alunosAprovados()}
            <Questao01Y alunos={alunos} controlMedias={controlMedias} />
        </div>
    );

}

export default Questao01X