import {ReactElement, useState} from "react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

enum SurveyType {
    TrueFalse,
    MultipleChoice,
    OpenEnded
}

const SurveyStep = ({title, subtitle, type, options, state, onChgState}) => {

    return <div style={{display: "flex", flexDirection: "row", alignSelf: "center", margin: 10}}>
        <SurveyDesc title={title} subtitle={subtitle}/>
        <SurveyContents type={type} options={options} state={state} onChgState={onChgState}/>
    </div>

}

const SurveyContents = ({type, options, state, onChgState}): ReactElement => {

    switch (type) {
        case SurveyType.TrueFalse:


            return <div style={{marginTop: "auto", marginBottom: "auto", marginLeft: 20}}>
                <ToggleButtonGroup exclusive value={state} onChange={onChgState}>
                    {options.map(option => {

                        return <ToggleButton value={option}>{option}</ToggleButton>
                    })}
                </ToggleButtonGroup>
            </div>
    }
}

const SurveyDesc = ({title, subtitle}) => {
    return <div>
        <h2 style={{margin: 4, fontWeight: "normal"}}>{title}</h2>
        <h3 style={{margin: 2, marginLeft: 4, fontWeight: "normal"}}>{subtitle}</h3>
    </div>
}

export {SurveyDesc, SurveyStep, SurveyType}
