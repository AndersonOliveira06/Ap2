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



const ListarAprovados = () => {

    const [alunos, setAlunos] = useState([])
    const navigate = useNavigate()


    //Apesar da dica dada na folha da prova, resolvi fazer diferente

    //Aqui no useEffect eu puxei todos os alunos do express -- CONTINUAÇÃO ABAIXO
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

    //Aqui eu criei uma função que calcula a média do IRA de todos os alunos -- CONTINUAÇÃO ABAIXO
    function getMediaIRA() {
        let soma = 0
        for (let i = 0; i < alunos.length; i++) {
            soma += alunos[i].ira
        }

        let media = soma / alunos.length
        return media.toFixed(2)
    }

    return (
        <div>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 4, mb: 4, color: "#0288d1" }}>
                Listar Alunos Aprovados
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
                            /*E por fim, aqui eu filtrei os alunos que tem IRA maior que a média de todos os alunos 
                            e adicionei na tabela através do map*/
                            
                            alunos.filter(aluno => aluno.ira > getMediaIRA())
                            .map(
                                (aluno) => {
                                    return (
                                        <StyledTableRow key={aluno._id}>
                                            <StyledTableCell>{aluno._id}</StyledTableCell>
                                            <StyledTableCell>{aluno.nome}</StyledTableCell>
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
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>

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


export default ListarAprovados