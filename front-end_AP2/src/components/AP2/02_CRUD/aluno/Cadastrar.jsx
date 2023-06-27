import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Cadastrar = () => {

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState(0)

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()


        const novoAluno = { nome, curso, ira }
        axios.post("http://localhost:3001/aluno/register", novoAluno)
            .then(
                (response) => {
                    alert(`Professor de ID ${response.data._id} adicionado!`)
                    navigate("/listarAluno")
                }
            )
            .catch(error => console.log(error))
    }

    return (
        <div>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#0288d1" }}>
                Cadastrar Aluno
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    label="Nome Completo"
                    name="nome"
                    autoFocus
                    onChange={(event) => setNome(event.target.value)}
                />

                <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel id="select-tit-label"> Curso </InputLabel>
                    <Select
                        labelId="select-tit-label"
                        label="Curso"
                        value={curso}
                        onChange={(event) => setCurso(event.target.value)}
                    >
                        <MenuItem value="DD">Design Digital</MenuItem>
                        <MenuItem value="ES">Engenharia de Software</MenuItem>
                        <MenuItem value="RD">Redes de Computadores</MenuItem>
                        <MenuItem value="CC">Ciência da Computação</MenuItem>
                        <MenuItem value="SI">Sistemas de Informação</MenuItem>
                        <MenuItem value="EC">Engenharia de Computação</MenuItem>

                    </Select>
                </FormControl>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ira"
                    label="Índice de Rendimento Acadêmico (IRA)"
                    name="ira"
                    onChange={(event) => setIra(event.target.value)}
                />

                <Box
                    sx={{
                        my: 2,
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default Cadastrar