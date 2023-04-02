import {Button} from "@mui/material";
import {SurveyStep, SurveyType} from "../components/SurveyStep";
import {useEffect, useState} from "react";
import {Diseases} from "../functions";

const atRiskFor = []
let states = []
const stages = [{
    qns:
        [{
            title: "Do you feel fatigued frequently, especially after eating?",
            subtitle: undefined,
            type: SurveyType.MultiChoice,
            options: ["Yes", "No"],
            trigger: "Yes",
            num: 0
        }, {
            title: "Have you been losing weight unexpectedly recently?",
            subtitle: undefined,
            type: SurveyType.MultiChoice,
            options: ["Yes", "No"],
            trigger: "Yes",
            num: 1
        }, {
            title: "Are you constantly hungry and thirsty?",
            subtitle: undefined,
            type: SurveyType.MultiChoice,
            options: ["Yes", "No"],
            trigger: "Yes",
            num: 2
        }, {
            title: "Do you constantly feel numbness or tingling in your feet/hands?",
            subtitle: undefined,
            type: SurveyType.MultiChoice,
            options: ["Yes", "No"],
            trigger: "Yes",
            num: 3
        }],
    title: "Diabetes",
    id: 0,
    disease: "diabetes",
    machineNo: 1,
    diseaseEnum: Diseases.Diabetes
}, {
    qns:
        [{
            title: "What colour is your vaginal discharge?",
            subtitle: undefined,
            type: SurveyType.MultiChoice,
            options: ["Transparent", "White", "Yellow"],
            trigger: ["White", "Yellow"],
            num: 0
        }, {
            title: "Is your vaginal discharge smelly/has a bad odour?",
            subtitle: undefined,
            type: SurveyType.MultiChoice,
            options: ["Yes", "No"],
            trigger: "Yes",
            num: 1
        }, {
            title: "Do you feel pain in your tummy/lower abdomen?",
            subtitle: undefined,
            type: SurveyType.MultiChoice,
            options: ["Yes", "No"],
            trigger: "Yes",
            num: 2
        }, {
            title: "Does your lower abdomen itch frequently?",
            subtitle: undefined,
            type: SurveyType.MultiChoice,
            options: ["Yes", "No"],
            trigger: "Yes",
            num: 3
        }],
    title: "Vaginal infection",
    id: 1,
    disease: "vaginal infection",
    machineNo: 2,
    diseaseEnum: Diseases.Vaginal_Infection
}
]

for (const qn of stages[0].qns) {
    states.push(qn.trigger)
}
const QuestionsPage = () => {

    // WARNING: ALL CODE IN HERE WILL REFRESH ON STATE CHANGE.
    // DO NOT PUT ANY ONE-TIME INIT CODE IN HERE!!!

    const [currentStage, setCurrentStage] = useState(0)
    const [currentRisk, setCurrentRisk] = useState(true)

    function init(a = 45) {
        console.log("init", a)
        states = []
        for (const qn of stages[currentStage].qns) {
            states.push(qn.trigger)
        }
    }



    function getRisk(stage) {
        let numTrigger = 0
        let numTotal = 0
        const currentStateData = stages[currentStage]
        const currentQns = currentStateData.qns
        // const currentState = states[currentStage]
        console.log("states2", states)
        for (const [index, element] of states.entries()) {
            console.log()
            const trigger = currentQns[index].trigger
            // const answer = element.
            console.log("trigger elem", trigger, element, Math.random())
            if (element === trigger) {
                numTrigger++
            } else if (Array.isArray(trigger) && element in trigger) {
                numTrigger++
            }
            numTotal++
        }
        console.log("numTrig / numTotal", numTrigger, numTotal)

        const atRisk = numTrigger / numTotal >= 0.75
        return atRisk;
    }

    function onBtnClick() {
        const currentStateData = stages[currentStage]
        const atRisk = currentRisk
        console.log("at risk", atRisk)
        if (atRisk) {
            atRiskFor.push(currentStateData.diseaseEnum)
            alert("at risk")
        }
        if (currentStage !== stages.length - 1) {
            setCurrentStage(currentStage + 1)
            console.log("Confirm")
            init(3)
            // Confirm
        } else {
            alert(atRiskFor)
        }

    }

    // useEffect(() => {init(77)})


    return <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
        <h2 style={{marginLeft: "auto", marginRight: "auto"}}>{stages[currentStage].title}</h2>

        {stages[currentStage].qns.map(qn => {
            const [localState, localSetState] = useState(qn.trigger)
            console.log("e2fw", states.length, stages[currentStage].qns.length)


            function onChgState(event, newState) {
                if (newState !== null) {
                    console.log("New state", newState)
                    states[qn.num] = newState
                    localSetState(newState)
                    setCurrentRisk(getRisk(currentStage))
                }
            }

            // console.log(states[currentIndex])
            // value={}
            return <>
                <SurveyStep state={localState} {...qn} onChgState={onChgState}/>
            </>
        })}

        {/*{items.map(item => {*/}

        {/*    const [state, setState] = useState(item.options[0])*/}
        {/*    states.push([state, setState])*/}

        {/*    function onChgState(event, newState) {*/}
        {/*        if (newState !== null) {*/}
        {/*            setState(newState)*/}
        {/*        }*/}
        {/*    }*/}

        {/*    return <SurveyStep {...item} state={state} onChgState={onChgState}/>*/}

        {/*})}*/}
        <h4 style={{marginLeft: "auto", marginRight: "auto"}}>You are {currentRisk ? "" : "not"} at risk
            for {stages[currentStage].disease}.</h4>

        <Button variant="contained" style={{marginLeft: "auto", marginRight: "auto"}}
                onClick={() => {
                    onBtnClick()
                }}>{(currentStage === stages.length - 1) ? "Confirm" : "Next"}</Button>
    </div>
}

export default QuestionsPage
