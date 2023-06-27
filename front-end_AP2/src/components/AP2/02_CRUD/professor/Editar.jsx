import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography, Checkbox } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const Editar = () => {



    /*const professores = [
        { id: 0, nome: "Walter Pogba", curso: "DD", titulacao: "GRAD", areasInteresse: { dd: true, sm: false, ui: false, ihc: true } },
        { id: 1, nome: "Ademir da Guia", curso: "ES", titulacao: "MEST", areasInteresse: { dd: false, sm: true, ui: true, ihc: false } },
        { id: 2, nome: "Zico Gávea", curso: "CC", titulacao: "DOUT", areasInteresse: { dd: false, sm: true, ui: false, ihc: true } },
        { id: 3, nome: "Edison Brito", curso: "SI", titulacao: "GRAD", areasInteresse: { dd: true, sm: false, ui: true, ihc: false } },
        { id: 4, nome: "Washingnton Suarez", curso: "DD", titulacao: "MEST", areasInteresse: { dd: true, sm: true, ui: false, ihc: true } }
    ]*/

    /*function getProfessorById(id) {
        for (let i = 0; i < professores.length; i++) {
            if (id == professores[i].id) {
                return professores[i]
            }
        }
        return null
    }*/

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [titulacao, setTitulacao] = useState("GRAD")
    const [areasInteresse, setAreasInteresse] = useState({ dd: false, sm: false, ui: false, ihc: false })

    const { dd, sm, ui, ihc } = areasInteresse

    let { id } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            /*let professor = getProfessorById(id)

            if (professor) {
                setNome(professor.nome)
                setCurso(professor.curso)
                setTitulacao(professor.titulacao)
                setAreasInteresse(professor.areasInteresse)
            }*/

            axios.get(`http://localhost:3001/professor/retrieve/${id}`)
                .then(
                    (response) => {
                        setNome(response.data.nome)
                        setCurso(response.data.curso)
                        setTitulacao(response.data.titulacao)
                        setAreasInteresse(response.data.areasInteresse)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )


    function handleSubmit(event) {
        event.preventDefault()
        /*console.log(nome)
        console.log(curso)
        console.log(titulacao)*/

        const professorAtualizado = {nome, curso, titulacao, areasInteresse}
        axios.put(`http://localhost:3001/professor/update/${id}`, professorAtualizado)
        .then(
            (response) => {
                alert(`Professor de ID ${response.data._id} atualizado!`)
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
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#0288d1", mb: 4 }}>
                Editar Professor
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

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="curso"
                    label="Curso"
                    value={curso}

                    name="curso"
                    onChange={(event) => setCurso(event.target.value)}
                />

                <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel id="select-tit-label"> Titulação </InputLabel>
                    <Select
                        labelId="select-tit-label"
                        label="Titulação"
                        value={titulacao}
                        onChange={(event) => setTitulacao(event.target.value)}
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
                        <FormControlLabel control={<Checkbox checked={dd} name="dd" onChange={handleCheckbox} />} label="Design Digital" />
                        <FormControlLabel control={<Checkbox checked={sm} name="sm" onChange={handleCheckbox} />} label="Semiótica" />
                        <FormControlLabel control={<Checkbox checked={ui} name="ui" onChange={handleCheckbox} />} label="UX/UI" />
                        <FormControlLabel control={<Checkbox checked={ihc} name="ihc" onChange={handleCheckbox} />} label="IHC" />
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
                        Atualizar
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default Editar