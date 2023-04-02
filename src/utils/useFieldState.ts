import {ChangeEventHandler, Dispatch, SetStateAction, useState} from "react";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";

function useFieldState(initialState: string | (() => string)): [string, Dispatch<SetStateAction<string>>, ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>] {
    const [state, setState] = useState<string>(initialState)
    const onTextFieldChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value: string = event.target.value
        setState(value)
    }
    return [state, setState, onTextFieldChange]
}
export default useFieldState
