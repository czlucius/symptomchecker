import {useEffect, useState} from 'react'
import './App.css'
import {AppBar, Button, FormControl, InputLabel, MenuItem, Select, Toolbar} from "@mui/material";
import {SurveyDesc, SurveyStep, SurveyType} from "./components/SurveyStep";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Startpage from "./pages/Startpage";
import QuestionsPage from "./pages/QuestionsPage";
import SignupPage from "./pages/SignupPage";

import React from "react";
import {createRoot} from 'react-dom/client';
import i18n from "i18next";
import {useTranslation, initReactI18next} from "react-i18next";


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            km: {
                translation: {
                    "Welcome to React": "Welcome to React and react-i18next",
                    "Do you feel fatigued frequently, especially after eating?": "ើ​អ្នក​មាន​អារម្មណ៍​ថា​នឿយ​ហត់​ជា​ញឹកញាប់​ជា​ពិសេស​បន្ទាប់​ពី​បរិភោគ​អាហារ​?",
                    "Diabetes": "ជំងឺទឹកនោមផ្អែម",
                    "Yes": "មាន",
                    "No": "ទេ",
                    "Yes ✅": "មាន ✅",
                    "No ❌": "ទេ ❌",
                    "Have you been losing weight unexpectedly recently?": " តើអ្នកបានស្រកទម្ងន់ដោយមិនបានរំពឹងទុកថ្មីៗនេះទេ?",
                    "Are you constantly hungry and thirsty?": "តើអ្នកឃ្លាន និងស្រេកទឹកឥតឈប់ឈរមែនទេ?",
                    "Do you constantly feel numbness or tingling in your feet/hands?": " តើ​អ្នក​មាន​អារម្មណ៍​ស្ពឹក ឬ​រមួល​ជើង​ជា​និច្ច?",
                    "Confirm": "បញ្ជាក់",
                    "Next": "បន្ទាប់",
                    "Do you feel pain in your tummy/lower abdomen?": "តើ​អ្នក​មាន​អារម្មណ៍​ថា​ឈឺ​ក្នុង​ពោះ​ឬ​ពោះ​របស់​អ្នក​ទេ?",
                    "Does your lower abdomen itch frequently?": "តើពោះខាងក្រោមរបស់អ្នករមាស់ញឹកញាប់ទេ?",
                    "Do you smoke?": "តើអ្នកជក់បារីញឹកញាប់ទេ?",
                    "Smoking may increase your risk of hypertension.": "ការជក់បារីអាចបង្កើនហានិភ័យនៃជំងឺលើសឈាម។",
                    "What is your BMI?": "តើ BMI របស់អ្នកគឺជាអ្វី?",
                    "A higher BMI increases risk of hypertension.": "BMI ខ្ពស់បង្កើនហានិភ័យនៃជំងឺលើសឈាម។",
                    "Do your parents/siblings have high blood pressure?": "តើឪពុកម្តាយ/បងប្អូនបង្កើតរបស់អ្នកមានជំងឺលើសឈាមដែរឬទេ?",
                    "Are you constantly stressed?": "តើអ្នកមានភាពតានតឹងជានិច្ចទេ?",
                    "Stress can be an indication of hypertension.": "ស្ត្រេសអាចជាសញ្ញានៃជំងឺលើសឈាម។",
                    "Hypertension": "លើសឈាម",
                    "Sign-up successful": "ចុះឈ្មោះជោគជ័យ",
                    "Go to homepage": "ចូលទៅកាន់គេហទំព័រ",
                    "Have you used the machines before?": "ើអ្នកធ្លាប់ប្រើម៉ាស៊ីនដែរឬទេ?",
                    "User login": "ចូល",
                    "Welcome back!": "ស្វា​គម​ន៏​ការ​ត្រ​លប់​មក​វិញ!",
                    "How much salt/MSG do you put in your food?": "តើអ្នកដាក់អំបិល/MSG ប៉ុន្មានក្នុងអាហាររបស់អ្នក?",
                    "Do you find it difficult to urinate?":"តើអ្នកពិបាកនោមទេ?",
                    "How much sugar/condensed milk do you put in your drinks?": "តើអ្នកដាក់ស្ករ/ទឹកដោះគោខាប់ប៉ុន្មានក្នុងភេសជ្ជៈរបស់អ្នក?",
                    "Please collect your token for capsule machine.":"សូមប្រមូលនិមិត្តសញ្ញារបស់អ្នកសម្រាប់ម៉ាស៊ីនកន្សោម។"
                }
            }
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

const langs = ["en", "km"]
const hrLangs = {
    "en": "English",
    "km": " ខ្មែរ"
}


function App() {
    const {t, i18n} = useTranslation()
    const [lang, setLang] = useState("km")
    useEffect(() => {
        i18n.changeLanguage("km")
    }, [])


    return (
        <div className="App">
            <AppBar className="navBar" position="static" style={{
                color: "rgba(255, 255, 255, 0.87)",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                width: "auto"
            }}>
                <h3 style={{margin: 16}}>Health machine ម៉ាស៊ីនសុខភាព</h3>
                <FormControl style={{margin: 10}} required id="select-lang-container">
                    <InputLabel>Language ភាសា</InputLabel>
                    <Select
                        labelId="select-lang-label-id"
                        id="select-lang"
                        label="Language ភាសា"
                        // label="Age អាយុ "
                        onChange={(event) => {
                            const newVal = event.target.value
                            setLang(newVal)
                            console.log(newVal)
                            i18n.changeLanguage(newVal).then(r => console.log(r))
                        }}
                        value={lang}
                        style={{height: "auto"}}
                    >
                        {langs.map(lg => {
                            return <MenuItem value={lg}>{hrLangs[lg]}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </AppBar>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Startpage/>}/>
                    <Route path="/questions" Component={() => <QuestionsPage/>}>

                    </Route>
                    {/*<Route path="/users/:id" element={<UserResult/>}/>*/}
                    <Route path="/signup" element={<SignupPage/>}/>

                </Routes>
            </BrowserRouter>


        </div>
    )
}

export default App
