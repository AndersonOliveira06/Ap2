import { useEffect } from "react"

const Questao01Y = ({ alunos, controlMedias }) => {

    useEffect(
        () => {
            const calcularMedias = () => {
                const mediasAlunos = alunos.map((aluno) => {
                    const media = (aluno.notas.ap1 + aluno.notas.ap2) / 2;
                    return media;
                })
                controlMedias(mediasAlunos);
            }

            calcularMedias();
        }
        ,
        [alunos, controlMedias]
    )

}

export default Questao01Y