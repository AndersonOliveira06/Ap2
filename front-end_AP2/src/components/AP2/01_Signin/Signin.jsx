import { Container, Box, Typography, TextField, Button, Link } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signin = () => {

    //Pela questão pedir apenas para comparar se o usuário já existe através do login, eu não criei um estado para o email e senha
    const email = ""
    const senha = ""

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        /*Apesar da questão não ter pedido, eu criei um model para usuários no mongoose e
        adicionei alguns no banco de dados --VER MAIS NO CRUD_EXPRESS */
        const usuario = { email, senha }
        axios.get("http://localhost:3001/login/listar", usuario)
            .then(
                (response) => {
                    //E aqui, se o usuário existir o sistema retorna o id dele e vai para a página de listar alunos
                    //Se não existir, o sistema retorna que o usuário não existe
                    if(response.data == null) {
                        alert("Usuário não existe!")
                    } else {
                        alert(`Usuário de ID ${response.data._id} logado!`)
                        navigate("/listarAluno")
                    }
                }
            )
            .catch(error => console.log(error))
    }

    return (
        <Container maxWidth="xs">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 10
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Endereço de e-mail"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    name="senha"
                    label="Senha"
                    type="password"
                    id="senha"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                    width="100%"
                >
                    <Link
                        href="#"
                        underline="none"
                        className="link"
                    >
                        Esqueceu a senha?
                    </Link>

                    <Link
                        href="#"
                        underline="none"
                        className="link"
                    >
                        Não tem conta? Cadastre-se.
                    </Link>
                </Box>
            </Box>
        </Container>
    )

}

export default Signin