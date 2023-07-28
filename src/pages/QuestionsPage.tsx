import {Button} from "@mui/material";
import {SurveyStep, SurveyType} from "../components/SurveyStep";
import {useEffect, useState} from "react";
import {Diseases} from "../functions";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const atRiskFor = []
const states = []

const destructors = []


const QuestionsPage = () => {

    const [currentStage, setCurrentStage] = useState(() => 0)
    const [currentRisk, setCurrentRisk] = useState(() => true)

    const {t} = useTranslation()

    const stages = [{
        qns:
            [{
                title: t("Do you feel fatigued frequently, especially after eating?"),
                subtitle: undefined,
                type: SurveyType.MultiChoice,
                options: [t("Yes ✅"), t("No ❌")],
                trigger: t("Yes ✅"),
                num: 0
            }, {
                title: t("Have you been losing weight unexpectedly recently?"),
                subtitle: undefined,
                type: SurveyType.MultiChoice,
                options: [t("Yes ✅"), t("No ❌")],
                trigger: t("Yes ✅"),
                num: 1
            }, {
                title: t("Are you constantly hungry and thirsty?"),
                subtitle: undefined,
                type: SurveyType.MultiChoice,
                options: [t("Yes ✅"), t("No ❌")],
                trigger: t("Yes ✅"),
                num: 2
            }, {
                title: t("Do you constantly feel numbness or tingling in your feet/hands?"),
                subtitle: undefined,
                type: SurveyType.MultiChoice,
                options: [t("Yes ✅"), t("No ❌")],
                trigger: t("Yes ✅"),
                visual: "https://images.squarespace-cdn.com/content/v1/6001266af8f42f6c209fa83c/1c0d98a0-a789-47fe-b96b-84187c43782e/Neuropathy+Foot+1.png",
                num: 3
            }, {
                title: t("How much sugar/condensed milk do you put in your drinks?"),
                subtitle: undefined,
                type: SurveyType.MultiChoice,
                options: [t("❌"), t("🥄"), t("🥄🥄"), t(">=🥄🥄🥄...")],
                trigger:[t(">=🥄🥄🥄..."),t("🥄🥄")],
                visual: "https://www.hsph.harvard.edu/nutritionsource/wp-content/uploads/sites/30/2022/04/sugar-g963832288_1280.jpg",
                num: 3
            }],
        title: t("Diabetes"),
        id: 0,
        disease: "diabetes",
        machineNo: 1,
        diseaseEnum: Diseases.Diabetes
    }, {
        qns:
            [{
                title: t("Do you smoke?"),
                subtitle: t("Smoking may increase your risk of hypertension."),
                type: SurveyType.MultiChoice,
                options: [t("Yes ✅"), t("No ❌")],
                trigger: t("Yes ✅"),
                visual: "https://d31g6oeq0bzej7.cloudfront.net/Assets/image/webp/9e6976b8-7b8d-46d8-9a2e-03f53b1658f2.webp",
                num: 0
            }, {
                title: t("What is your BMI?"),
                subtitle: t("A higher BMI increases risk of hypertension."),
                type: SurveyType.MultiChoice,
                options: ["<18.5", "18.5-24.9", ">25"],
                trigger: ">25",
                num: 1
            }, {
                title: t("Do your parents/siblings have high blood pressure?"),
                subtitle: undefined,
                type: SurveyType.MultiChoice,
                options: [t("Yes ✅"), t("No ❌")],
                trigger: t("Yes ✅"),
                num: 2
            }, {
                title: t("Are you constantly stressed?"),
                subtitle: t("Stress can be an indication of hypertension."),
                type: SurveyType.MultiChoice,
                options: [t("Yes ✅"), t("No ❌")],
                trigger: t("Yes ✅"),
                visual: "https://nwkidneykids.org/tpn/c/C131/img/Stress.jpg",
                num: 3
            }, {
                title: t("How much salt/MSG do you put in your food?"),
                subtitle: undefined,
                type: SurveyType.MultiChoice,
                options: [t("❌"), t("🥄"), t("🥄🥄"), t(">=🥄🥄🥄...")],
                trigger:[t(">=🥄🥄🥄..."),t("🥄🥄")],
                visual: "/msg.jpg",
                num: 3
            }, ],
        title: t("Hypertension"),
        id: 2,
        disease: "hypertension",
        machineNo: 3,
        diseaseEnum: Diseases.Hypertension
    }
    ]


    useEffect(() => {
        console.log("mounted")
        for (const qn of stages[0].qns) {
            states.push(qn.trigger)
        }
    }, [])

    // WARNING: ALL CODE IN HERE WILL REFRESH ON STATE CHANGE.
    // DO NOT PUT ANY ONE-TIME INIT CODE IN HERE!!!

    const navigate = useNavigate()

    function init(a = 45, currentStage) {
        const cState = currentStage
        console.log("init", a, cState, states)
        // for (let i=0;i<states.length;i++){
        //     states.pop()
        // }
        console.log(states, stages[cState].qns)
        states.splice(0, states.length)
        for (const qn of stages[cState].qns) {
            states.push(qn.trigger)
        }
        console.log(states)
        setCurrentRisk(true)
        for (const d of destructors) {
            d()
        }
    }


    function getRisk(stage) {
        let numTrigger = 0
        let numTotal = 0
        const currentStateData = stages[currentStage]
        const currentQns = currentStateData.qns
        // const currentState = states[currentStage]
        console.log("states2", states)
        // @ts-ignore
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

        return numTrigger / numTotal >= 0.75;
    }

    function onBtnClick() {
        const currentStateData = stages[currentStage]
        const atRisk = currentRisk
        console.log("at risk", atRisk)
        if (atRisk) {
            atRiskFor.push(currentStateData.diseaseEnum)
            // alert("at risk")
        }
        if (currentStage !== stages.length - 1) {
            init(3, currentStage)

            setCurrentStage(currentStage + 1)
            console.log("state3", states)

        } else {
            // Confirm
            navigate("/signup", {state: {atRisk: atRiskFor}})
        }

    }

    // useEffect(() => {init(77)})
    console.log("svsr")

    // @ts-ignore
    return <div align="center" style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: 900,
        marginLeft: "auto",
        marginRight: "auto"
    }}>

        <h2 style={{marginLeft: "auto", marginRight: "auto"}}>{stages[currentStage].title}</h2>

        {stages[currentStage].qns.map(qn => {
            console.log(qn)

            const [localState, localSetState] = useState(Array.isArray(qn.trigger) ? "White" : qn.trigger)

//            localSetState(Array.isArray(qn.trigger) ? "White" : qn.trigger)
            console.log("trigger", localState, currentStage, states)

            // if (Array.isArray(localState)) {
            //     localSetState(localState[0])
            // }


            function onChgState(event, newState) {
                if (newState !== null) {
                    console.log("New state", newState)
                    states[qn.num] = newState
                    localSetState(newState)
                    setCurrentRisk(getRisk(currentStage))
                }
            }

            destructors.push(() => {
                try {
                    localSetState(Array.isArray(stages[currentStage + 1].qns[qn.num].trigger) ? stages[currentStage + 1].qns[qn.num].trigger[0] : stages[currentStage + 1].qns[qn.num].trigger)
                } catch (Err) {
                    console.log(Err)
                }
            })

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
        {/*<h4 style={{marginLeft: "auto", marginRight: "auto"}}>You are {currentRisk ? "" : "not"} at risk*/}
        {/*    for {stages[currentStage].disease}.</h4>*/}

        <Button variant="contained" style={{marginLeft: "auto", marginRight: "auto"}}
                onClick={() => {
                    onBtnClick()
                }}>{(currentStage === stages.length - 1) ? t("Confirm") : t("Next")}</Button>
    </div>
}

export default QuestionsPage
