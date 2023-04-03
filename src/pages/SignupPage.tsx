import {
    Button, Card, CardContent,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useState} from "react";
import useFieldState from "../utils/useFieldState";
import {useLocation} from "react-router-dom";
import {diseaseToMachineMap, t1} from "../functions";
import QRCode from "react-qr-code";
//import {, t1} from "../functions";

enum AgeRange {
    ZERO_TO_SEVENTEEN = "0-17",
    EIGHTEEN_TO_THIRTY_FIVE = "18-35",
    THIRTY_SIX_TO_FIFTY_FIVE = "36-55",
    FIFTY_FIVE_TO_SEVENTY = "55-70",
    SEVENTY_ONE_AND_OLDER = "71+"
}

const SelectAge = ({age, handleChange, values}) => {
    return
}


const SignupPage = () => {
    // WARNING: ALL CODE IN HERE WILL REFRESH ON STATE CHANGE.
    // DO NOT PUT ANY ONE-TIME INIT CODE IN HERE!!!
    const [name, setName, onNameChange] = useFieldState("")
    const [ageRange, setAgeRange] = useState<AgeRange>(AgeRange.EIGHTEEN_TO_THIRTY_FIVE)
    const [occupation, setOccupation, onOccupationChange] = useFieldState(null)
    const [nssfId, setNssfId, onNssfIdChange] = useFieldState(null)
    const [showDialog, setShowDialog] = useState(true)
    let [n, setn] = useState("")
    let [a, seta] = useState("")
    let [o, seto] = useState("")
    let [nssf, setnssf] = useState("")

    const {state} = useLocation();
    const {atRisk} = state
    const atRiskFor = atRisk

    const submitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        // console.log(event.target[4.js].outerHTML)
        seta(event.target[2].value)
        for (const elem of (event.target as any)) {
            console.log(elem.id)

            switch (elem.id) {
                case "name-field":
                    setn(elem.value)
                    break
                case "occupation-field":
                    seto(elem.value)
                    break
                case "nssf-field":
                    setnssf(elem.value ?? "")
                    break
            }
        }
        console.log(n, a, o, nssf)

        setShowDialog(true)


    }
    const handleClose = () => {
        setShowDialog(false)
    }

    return (
        <div>
            <Dialog
                open={showDialog}
                // onClose={handleClose}
                modal={false}
                fullScreen
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title">
                    {"Sign-up successful"}
                </DialogTitle>
                <DialogContent>
                    {
                        atRiskFor.map(disease => {
                            return <Card style={{margin:10}}>
                                    <CardContent>
                                        You are at risk of {disease}.
                                        Proceed to capsule machine {diseaseToMachineMap[disease]}.
                                        <br/>
                                        អ្នកមានហានិភ័យនៃ{t1(disease)} ។
                                        បន្តទៅម៉ាស៊ីនកន្សោម{diseaseToMachineMap[disease]} ។

                                    </CardContent>
                                </Card>
                        })
                    }

                    Hi! Welcome to SLA health machine center!<br/>
                    For the machines and future visits, please take a picture of this QR code for verification.<br/>
                    ជម្រាបសួរ,! សូមស្វាគមន៍មកកាន់មជ្ឈមណ្ឌលម៉ាស៊ីនសុខភាព SLA!
សម្រាប់ម៉ាស៊ីន និងការទស្សនានាពេលខាងមុខ សូមថតរូបលេខកូដ QR នេះសម្រាប់ការផ្ទៀងផ្ទាត់។<br/>
                    <QRCode value="387e7b54-44fc-418b-b878-7dd60ee6c8c9" style={{marginLeft: "auto", marginRight: "auto"}}/>

                </DialogContent>
            </Dialog>
            <form onSubmit={submitForm}>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 600,
                    marginLeft: "auto",
                    marginRight: "auto"
                }}>
                    <h2>Signup ចុះ​ឈ្មោះ</h2>
                    <TextField id="name-field" label="Name ឈ្មោះ" variant="outlined" value={name} onChange={onNameChange}
                               style={{margin: 10}} required {...(name ? {} : {
                        error: true,
                        helperText: "Please enter your name. សូម​បញ្ចូល​ឈ្មោះ​របស់​អ្នក។"
                    })} autoFocus/>
                    <FormControl style={{margin: 10}} required id="select-age-container">
                        <InputLabel>Age អាយុ</InputLabel>
                        <Select
                            labelId="select-age-label-id"
                            id="select-age"
                            value={ageRange}
                            label="Age អាយុ "
                            onChange={(event) => setAgeRange(event.target.value as AgeRange)}
                        >
                            {Object.values(AgeRange).map(ageRange => {
                                return <MenuItem value={ageRange}>{ageRange}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField id="occupation-field" label="Occupation មុខរបរ" variant="outlined" value={occupation}
                               onChange={onOccupationChange} style={{margin: 10}}
                               required {...(occupation ? {} : {
                        error: true,
                        helperText: "Please enter your occupation. សូមបញ្ចូលមុខរបររបស់អ្នក។"
                    })}/>
                    <TextField id="nssf-field" label="NSSF ID" variant="outlined" value={nssfId}
                               onChange={onNssfIdChange} style={{margin: 10}}/>


                    <Button type="submit">Submit ដាក់ស្នើ</Button>


                </div>
            </form>
        </div>
    )

}
export default SignupPage
