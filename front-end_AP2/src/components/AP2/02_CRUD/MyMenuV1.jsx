import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import AdbIcon from "@mui/icons-material/Adb"
import { useState } from "react"

import { Link } from "react-router-dom"

const MyMenu = () => {

    const [anchorElProfessor, setAnchorElProfessor] = useState(null) //representa o elemento HTML do botão Professores

    const handleOpenProfessorMenu = (event) => {
        setAnchorElProfessor(event.currentTarget)
    }
    const handleCloseProfessorMenu = () => {
        setAnchorElProfessor(null)
    }

    const profDropMenu = () => {
        return (
            <Box>
                <Button
                    sx={{
                        my: 2, color: "white"
                    }}
                    onClick={handleOpenProfessorMenu}
                >
                    Professores
                </Button>
                <Menu
                    anchorEl={anchorElProfessor}
                    open={Boolean(anchorElProfessor)}
                    onClose={handleCloseProfessorMenu}
                >
                    <MenuItem
                        onClick={handleCloseProfessorMenu}
                        component={Link}
                        to="cadastrarProfessor"
                    >
                        <Typography>Cadastrar</Typography>
                    </MenuItem>

                    <MenuItem
                        onClick={handleCloseProfessorMenu}
                        component={Link}
                        to="listarProfessor"
                    >
                        <Typography>Listar</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        )
    }


    const [anchorElAluno, setAnchorElAluno] = useState(null) //representa o elemento HTML do botão Alunos

    const handleOpenAlunoMenu = (event) => {
        setAnchorElAluno(event.currentTarget)
    }

    const handleCloseAlunoMenu = () => {
        setAnchorElAluno(null)
    }

    const alunoDropMenu = () => {
        return (
            <Box>
                <Button
                    sx={{
                        my: 2, color: "white"
                    }}
                    onClick={handleOpenAlunoMenu}
                >
                    Alunos
                </Button>
                <Menu
                    anchorEl={anchorElAluno}
                    open={Boolean(anchorElAluno)}
                    onClose={handleCloseAlunoMenu}
                >
                    <MenuItem
                        onClick={handleCloseAlunoMenu}
                        component={Link}
                        to="cadastrarAluno"
                    >
                        <Typography>Cadastrar</Typography>
                    </MenuItem>

                    <MenuItem
                        onClick={handleCloseAlunoMenu}
                        component={Link}
                        to="listarAluno"
                    >
                        <Typography>Listar</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        )
    }


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <AdbIcon
                        sx={{
                            display: "flex",
                            mr: 1
                        }}
                    />
                    <Typography
                        variant="h5"
                        component="a"
                        href="/"
                        sx={{

                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".2rem",
                            color: "white",
                            textDecoration: "none"
                        }}
                    >
                        CRUD V1
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "flex-end",
                            mt: 0.5
                        }}
                    >
                        {profDropMenu()}

                        {alunoDropMenu()}

                        <Button
                            sx={{
                                my: 2, color: "white"
                            }}
                            onClick={() => alert("Clicou em Sobre!")}
                        >
                            Sobre
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default MyMenu