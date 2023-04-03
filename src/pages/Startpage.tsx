import {
    Button,
    ButtonGroup,
    Card, CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";
import {diseaseToMachineMap, t1} from "../functions";
import QRCode from "react-qr-code";
const Startpage = () => {
    const [registered, setRegistered] = useState<boolean>(undefined)
    const [showDialog, setShowDialog] = useState(false)
    const navigate = useNavigate()


    switch (registered) {
        case true:
            // @ts-ignore
            return <div align="center">
                <Dialog
                    open={showDialog}
                    // onClose={handleClose}
                    modal={false}
                    fullScreen
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >
                    <DialogTitle id="alert-dialog-title">
                        {"Welcome back! ស្វា​គម​ន៏​ការ​ត្រ​លប់​មក​វិញ!"}
                    </DialogTitle>
                    <DialogContent>
                        Name ឈ្មោះ: Clueless Bopha <br/>
                        Age range ជួរអាយុ: 18-35<br/>
                        NSSF/low-income NSSF/ចំណូលទាប: Yes បាទ
                        {
                            ["Diabetes", "Hypertension"].map(disease => {
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


                    </DialogContent>
                </Dialog>
                <h1>User login ចូល</h1>
                <div style={{height: 500}}>
                <QrScanner
                    containerStyle={{maxWidth: 400}}
                    videoStyle={{height: 500}}
                    onDecode={(result) => {
                        console.log(result)
                        setShowDialog(true)

                    }}
                    onError={(error) => console.log(error?.message)}
                />
                </div>
            </div>


        default:

            // @ts-ignore
            return <div align="center">
                <h1>Have you used the machines before?<br/>តើអ្នកធ្លាប់ប្រើម៉ាស៊ីនដែរឬទេ?</h1>
                <ButtonGroup>
                    <Button color="success" onClick={() => {
                        // console.log("a");
                        setRegistered(true)
                    }}>
                        <DoneIcon/>
                    </Button>
                    <Button color="error" onClick={() => {
                        navigate("/questions")
                        setRegistered(false)
                    }}>
                        <CloseIcon/>
                    </Button>
                </ButtonGroup>
            </div>
    }

}


export default Startpage
