import {useState} from 'react'
import './App.css'
import {AppBar, Button, Toolbar} from "@mui/material";
import {SurveyDesc, SurveyStep, SurveyType} from "./components/SurveyStep";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Startpage from "./pages/Startpage";
import QuestionsPage from "./pages/QuestionsPage";




function App() {



    return (
        <div className="App">
            <AppBar className="navBar" position="static" style={{
                color: "rgba(255, 255, 255, 0.87)",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                width: "auto"
            }}>
                <h3 style={{margin: 16}}>Symptom Checker</h3>
            </AppBar>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Startpage/>}/>
                    <Route path="/questions" element={<QuestionsPage/>}/>
                    {/*<Route path="/users/:id" element={<UserResult/>}/>*/}

                </Routes>
            </BrowserRouter>


        </div>
    )
}

export default App
