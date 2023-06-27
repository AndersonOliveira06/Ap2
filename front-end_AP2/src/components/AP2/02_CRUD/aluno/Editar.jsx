import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const Editar = () => {


    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState(0)

    let { id } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {

            axios.get(`http://localhost:3001/aluno/retrieve/${id}`)
                .then(
                    (response) => {
                        setNome(response.data.nome)
                        setCurso(response.data.curso)
                        setIra(response.data.ira)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )


    function handleSubmit(event) {
        event.preventDefault()


        const alunoAtualizado = { nome, curso, ira }
        axios.put(`http://localhost:3001/aluno/update/${id}`, alunoAtualizado)
            .then(
                (response) => {
                    alert(`Aluno de ID ${response.data._id} atualizado!`)
                    navigate("/listarAluno")
                }
            )
            .catch(error => console.log(error))
    }

    return (
        <div>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#0288d1", mb: 4 }}>
                Editar Aluno
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
                    value={nome}

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
                        <MenuItem value="RC">Redes de Computadores</MenuItem>
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
                    value={ira}

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
                        Atualizar
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default Editar