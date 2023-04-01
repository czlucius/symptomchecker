import {useState} from 'react'
import './App.css'
import {AppBar, Button, Toolbar} from "@mui/material";
import {SurveyDesc, SurveyStep, SurveyType} from "./components/SurveyStep";

function App() {
    const states = []
    const items = [{
        title: "Diabetes",
        subtitle: "Do you feel fatigued frequently, especially after eating?",
        type: SurveyType.TrueFalse,
        options: ["Yes", "No"]
    }, {
        title: undefined,
        subtitle: "Have you been losing weight unexpectedly recently?",
        type: SurveyType.TrueFalse,
        options: ["Yes", "No"]
    }, {
        title: undefined,
        subtitle: "Are you constantly hungry and thirsty?",
        type: SurveyType.TrueFalse,
        options: ["Yes", "No"]
    }, {
        title: undefined,
        subtitle: "Do you constantly feel numbness or tingling in your feet/hands?",
        type: SurveyType.TrueFalse,
        options: ["Yes", "No"]
    }]

    function onBtnClick() {
        let numYes = 0
        let numTotal = 0
        for (const [state, setState] of states) {
            if (state === "Yes") {
                numYes++
            }
            numTotal++
        }


        if (numYes/numTotal >= 0.75) {
            alert("You are at risk of diabetes!\nPlease visit Capsule Machine 1 to get tips and supplements on diabetes.")
        }

    }



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
            <div align="center" style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                {items.map(item => {

                    const [state, setState] = useState(item.options[0])
                    states.push([state, setState])
                    function onChgState(event, newState) {
                        if (newState !== null) {
                            setState(newState)
                        }
                    }
                    return <SurveyStep {...item} state={state} onChgState={onChgState}/>

                })}

                <Button variant="contained" style={{marginLeft: "auto", marginRight: "auto"}} onClick={onBtnClick}>Confirm</Button>
            </div>

        </div>
    )
}

export default App
