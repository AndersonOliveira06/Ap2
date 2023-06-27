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

    /*const professores = [
        { id: 0, nome: "Walter Pogba", curso: "DD", titulacao: "GRAD" },
        { id: 1, nome: "Ademir da Guia", curso: "ES", titulacao: "MEST" },
        { id: 2, nome: "Zico Gávea", curso: "CC", titulacao: "DOUT" },
        { id: 3, nome: "Edison Brito", curso: "SI", titulacao: "GRAD" },
        { id: 4, nome: "Washingnton Suarez", curso: "DD", titulacao: "MEST" }
    ]*/

    const [professores, setProfessores] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            axios.get("http://localhost:3001/professor/listar")
            .then(
                (response) => {
                    setProfessores(response.data)
                }
            )
            .catch(error => console.log(error))
        }
        ,
        []
    )

    function deleteProfessorById(id) {
        if(window.confirm("Deseja Excluir?")) {
            axios.delete(`http://localhost:3001/professor/delete/${id}`)
            .then(
                (response) => {
                    const resultado = professores.filter(professor => professor._id != id)
                    setProfessores(resultado)
                    navigate("/listarProfessor")
                }
            )
            .catch(error => console.log(error))
            alert("Professor " + id + " excluído com sucesso!")
        }
    }



    return (
        <div>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 4, mb: 4, color: "#0288d1" }}>
                Listar Professor
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>NOME</StyledTableCell>
                            <StyledTableCell>CURSO</StyledTableCell>
                            <StyledTableCell>TITULAÇÃO</StyledTableCell>
                            <StyledTableCell>AÇÕES</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            professores.map(
                                (professor) => {
                                    return (
                                        <StyledTableRow key={professor._id}>
                                            <StyledTableCell>{professor._id}</StyledTableCell>
                                            <StyledTableCell>{professor.nome}</StyledTableCell>
                                            <StyledTableCell>{professor.curso}</StyledTableCell>
                                            <StyledTableCell>{professor.titulacao}</StyledTableCell>
                                            <StyledTableCell>
                                                <Box>
                                                    <IconButton aria-label="edit" color="primary" component={Link}  to={`/editarProfessor/${professor._id}`}>
                                                        <EditIcon />
                                                    </IconButton>

                                                    <IconButton aria-label="delete" color="error" onClick={() => deleteProfessorById(professor._id)}>
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

        </div>
    )
}


export default Listar