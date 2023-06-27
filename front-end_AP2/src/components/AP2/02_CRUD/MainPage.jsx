import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container } from "@mui/material"

import Signin from "../01_Signin/Signin"

import MyMenu from "./MyMenuV1"

import CadastrarProfessor from "./professor/Cadastrar"
import ListarProfessor from "./professor/Listar"
import EditarProfessor from "./professor/Editar"

import CadastrarAluno from "./aluno/Cadastrar"
import ListarAluno from "./aluno/Listar"
import EditarAluno from "./aluno/Editar"
import ListarAlunosAprovados from "./aluno/ListarAprovados"


const MainPage = () => {
    return (
        <BrowserRouter>
            {/* <Signin /> */}

            <MyMenu />

            <Container sx={{ mt: 8, mb: 12 }} >
                <Routes>
                    <Route path="/" element={<Signin />} />


                    <Route path="cadastrarProfessor" element={<CadastrarProfessor />} />
                    <Route path="listarProfessor" element={<ListarProfessor />} />
                    <Route path="editarProfessor/:id" element={<EditarProfessor />} />

                    <Route path="cadastrarAluno" element={<CadastrarAluno />} />
                    <Route path="listarAluno" element={<ListarAluno />} />
                    <Route path="editarAluno/:id" element={<EditarAluno />} />
                    <Route path="listarAlunosAprovados" element={<ListarAlunosAprovados />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default MainPage