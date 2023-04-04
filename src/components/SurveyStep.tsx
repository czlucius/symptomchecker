import {ReactElement, useState} from "react";
import {Button, IconButton, ToggleButton, ToggleButtonGroup} from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {useTranslation} from "react-i18next";
enum SurveyType {
    MultiChoice,
    OpenEnded
}

const SurveyStep = ({title, subtitle, type, options, state, onChgState, visual}) => {

    // @ts-ignore
    return <div align="center"
                style={{display: "flex", flexDirection: "row", alignSelf: "center", margin: 10, flexWrap: "wrap"}}>
        <SurveyDesc title={title} subtitle={subtitle} visual={visual}/>
        <SurveyContents type={type} options={options} state={state} onChgState={onChgState}/>
    </div>

}

const SurveyContents = ({type, options, state, onChgState}): ReactElement => {

    switch (type) {
        case SurveyType.MultiChoice:


            // @ts-ignore
            return <div align="center"
                        style={{marginTop: "auto", marginBottom: "auto", marginLeft: "auto", marginRight: "auto"}}>
                <ToggleButtonGroup exclusive value={state} onChange={onChgState}>
                    {options.map(option => {

                        return <ToggleButton value={option}>{option}</ToggleButton>
                    })}
                </ToggleButtonGroup>
            </div>

            break
        default:
            console.error("Undefined route!")
            alert("undefined route!")
    }
}

const SurveyDesc = ({title, subtitle, visual}) => {
    const {i18n} = useTranslation()
    return <div style={{display: "flex", flexDirection: "row"}}>
        <div>
            <h2 style={{margin: 4, fontWeight: "normal"}}>{title}</h2>
            <h3 style={{margin: 2, marginLeft: 4, fontWeight: "normal"}}>{subtitle}</h3>
            {visual ?
                <img src={visual} style={{height: 60, width: 100}}/>
                : null}
        </div>
        <IconButton onClick={() => {

            const utterThis = new SpeechSynthesisUtterance(title);

            // const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
            // for (const voice of voices) {
            //     if (voice.name === selectedOption) {
            //         utterThis.voice = voice;
            //     }
            // }
            const synth = window.speechSynthesis;
            for (const voice of synth.getVoices()) {
                console.log(voice)
                if (voice.lang === i18n.language) {
                    utterThis.voice = voice
                    break
                }
            }
            synth.speak(utterThis)

        }}>
            <VolumeUpIcon/>
        </IconButton>
    </div>
}

export {SurveyDesc, SurveyStep, SurveyType}
