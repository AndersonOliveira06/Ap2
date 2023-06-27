import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography, Checkbox } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Cadastrar = () => {

    const [nome,setNome] = useState("")
    const [curso,setCurso] = useState("")
    const [titulacao, setTitulacao] = useState("GRAD")
    const [areasInteresse, setAreasInteresse] = useState({dd: false, sm: false, ui: false, ihc: false})

    const {dd, sm, ui, ihc} = areasInteresse
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        /*console.log(nome)
        console.log(curso)
        console.log(titulacao)*/

        const novoProfessor = {nome, curso, titulacao, areasInteresse}
        axios.post("http://localhost:3001/professor/register", novoProfessor)
        .then(
            (response) => {
                alert(`Professor de ID ${response.data._id} adicionado!`)
                navigate("/listarProfessor")
            }
        )
        .catch(error => console.log(error))
    }

    function handleCheckbox(event) {
        setAreasInteresse({
            ...areasInteresse,
            [event.target.name]: event.target.checked 
        })
    }

    return (
        <div>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#0288d1" }}>
                Cadastrar Professor
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
                    onChange={ (event) => setNome(event.target.value) }
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="curso"
                    label="Curso"
                    name="curso"
                    onChange={ (event) => setCurso(event.target.value) }
                />

                <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel id="select-tit-label"> Titulação </InputLabel>
                    <Select
                        labelId="select-tit-label"
                        label="Titulação"
                        value={titulacao}
                        onChange={ (event) => setTitulacao(event.target.value) }
                    >
                        <MenuItem value="GRAD">Graduação</MenuItem>
                        <MenuItem value="MEST">Mestrado</MenuItem>
                        <MenuItem value="DOUT">Doutorado</MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    component="fieldset"
                    variant="standard"
                    sx={{
                        mt: 2,
                        ml: 2,
                    }}
                >
                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: 12,
                            mb: 2
                        }}
                        
                    >
                        Áreas de Interesse
                    </FormLabel>

                    <FormGroup>
                        <FormControlLabel control={ <Checkbox checked={dd} name="dd" onChange={handleCheckbox} /> } label="Design Digital" />
                        <FormControlLabel control={ <Checkbox checked={sm} name="sm" onChange={handleCheckbox} /> } label="Semiótica" />
                        <FormControlLabel control={ <Checkbox checked={ui} name="ui" onChange={handleCheckbox} /> } label="UX/UI" />
                        <FormControlLabel control={ <Checkbox checked={ihc} name="ihc" onChange={handleCheckbox} /> } label="IHC" />
                    </FormGroup>
                </FormControl>

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