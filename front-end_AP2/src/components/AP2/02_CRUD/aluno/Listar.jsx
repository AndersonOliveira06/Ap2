import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { styled } from "@mui/material/styles"
import { tableCellClasses } from "@mui/material/TableCell"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const Listar = () => {

    const [alunos, setAlunos] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            axios.get("http://localhost:3001/aluno/listar")
                .then(
                    (response) => {
                        setAlunos(response.data)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )

    function deleteAlunoById(id) {
        if (window.confirm("Deseja Excluir?")) {
            axios.delete(`http://localhost:3001/aluno/delete/${id}`)
                .then(
                    (response) => {
                        const resultado = alunos.filter(aluno => aluno._id != id)
                        setAlunos(resultado)
                        navigate("/listarAluno")
                    }
                )
                .catch(error => console.log(error))
            alert("Aluno " + id + " excluído com sucesso!")
        }
    }

    //Aqui eu criei uma função para calcular a média do IRA de todos os alunos
    //Essa função pega todos os IRAs do vetor de alunos, soma, depois divide pela quantidade de alunos
    function getMediaIRA() {
        let soma = 0
        for (let i = 0; i < alunos.length; i++) {
            soma += alunos[i].ira
        }

        let media = soma / alunos.length
        return media.toFixed(2)
    }

    //Aqui eu criei uma função para analisar o IRA de cada aluno e comparar com a média
    //Para pegar aluno por aluno, eu usei o método find() para encontrar o aluno com o ID igual ao ID do parâmetro
    //Depois, eu criei uma variável estilo que vai analisar se o IRA do aluno é menor que a média, se for, a cor da letra vai ser vermelha
    function analisarIRA(id) {
        let media = getMediaIRA()
        let aluno = alunos.find(aluno => aluno._id == id)
        let estilo = aluno.ira < media ? { color: 'red' } : {}

        //Aqui eu retorno uma linha da tabela com os dados do aluno para colocar no map mais a frente
        return (
            <StyledTableRow key={aluno._id}>
                <StyledTableCell>{aluno._id}</StyledTableCell>
                {/* E aqui eu coloca a variável estilo dentro do sx da célula onde tem o nome do aluno */}
                <StyledTableCell sx={estilo}>{aluno.nome}</StyledTableCell>
                <StyledTableCell>{aluno.curso}</StyledTableCell>
                <StyledTableCell>{aluno.ira}</StyledTableCell>
                <StyledTableCell>
                    <Box>
                        <IconButton aria-label="edit" color="primary" component={Link} to={`/editarAluno/${aluno._id}`}>
                            <EditIcon />
                        </IconButton>

                        <IconButton aria-label="delete" color="error" onClick={() => deleteAlunoById(aluno._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </StyledTableCell>
            </StyledTableRow>
        )
    }


    return (
        <div>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 4, mb: 4, color: "#0288d1" }}>
                Listar Alunos
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>NOME</StyledTableCell>
                            <StyledTableCell>CURSO</StyledTableCell>
                            <StyledTableCell>IRA</StyledTableCell>
                            <StyledTableCell>AÇÕES</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            //Aqui dentro do map eu chamei a função analisarIRA() para cada aluno do vetor de alunos
                            alunos.map(
                                (aluno) => {
                                    return analisarIRA(aluno._id)
                                }
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            {/* E por fim, adicionei uma nova tabela com a média de todos os alunos usando a função getMediaIRA() */}
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <StyledTableRow key={"Média IRA"} sx={{ display: "flex", justifyContent: "space-around" }}>
                                <StyledTableCell sx={{ fontWeight: "bold" }}>Média IRA</StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: "bold" }}>{getMediaIRA()}</StyledTableCell>
                            </StyledTableRow>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}


export default Listar