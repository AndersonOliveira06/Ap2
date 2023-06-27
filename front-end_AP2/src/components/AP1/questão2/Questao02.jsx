import { useState, useEffect } from "react"

const Questao02 = () => {

    const [imagem, setImagem] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png")
    
    //a variável de estado flag serve para controlar se a imagem exibida é a frontal ou a de costas do Pokémon
    const [flag, setFlag] = useState(true)

    //aqui é determinado o caminho da imagem a ser exibida com base no valor de flag. Se for true, a imagem de frente será exibida. Caso contrário, a imagem de costas será exibida
    useEffect(
        ()=>{
            if(flag === true) setImagem("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png")
            else setImagem("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png")
        }
        ,
        [flag]
    )

    //ao pressionar o botão, a função acaoBotao é chamada, alterando o valor de flag
    const acaoBotao = () => {
        setFlag(!flag)
    }

    return (
        <div>
            <img
                src={imagem}
                alt="pikachu"
                style={{width: "250px"}}
            />

            <hr />

            <button
                onClick={acaoBotao}
            >
                Virar o Pokemon
            </button>
        </div>
    )
}

export default Questao02