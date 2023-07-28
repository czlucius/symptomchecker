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
import {useTranslation} from "react-i18next";
const Startpage = () => {
    const [registered, setRegistered] = useState<boolean>(undefined)
    const [showDialog, setShowDialog] = useState(false)
    const navigate = useNavigate()
    const {t, i18n} = useTranslation()

    const [id, setId] = useState(null)


    switch (registered) {
        case true:
            // @ts-ignore
            return <div align="center">
                <Dialog
                    open={showDialog}
                    // onClose={handleClose}
                    fullScreen
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >
                    <DialogTitle id="alert-dialog-title">
                        {t("Welcome back!")}
                    </DialogTitle>
                    <DialogContent>
                        {
                            JSON.parse(window.localStorage.getItem(id) ?? "[\"Diabetes\",\"Hypertension\"]").map(disease => {
                                return <Card style={{margin:10}}>
                                    <CardContent>
                                        {i18n.language === "en" ? `You are at risk of ${disease}.
                                        Proceed to capsule machine 1.`
                                        :
                                        `អ្នកមានហានិភ័យនៃ${t1(disease)} ។
                                        បន្តទៅម៉ាស៊ីនកន្សោម1 ។`}

                                    </CardContent>
                                </Card>
                            })
                        }
                        <img src="/tokens.png"/>
                        <h2>{t("Please collect your token for capsule machine.")}</h2>


                    </DialogContent>
                </Dialog>
                <h1>{t("User login")}</h1>
                <div style={{height: 500}}>
                <QrScanner
                    containerStyle={{maxWidth: 400}}
                    videoStyle={{height: 500}}
                    onDecode={(result) => {
                        console.log(result)
                        setShowDialog(true)
                        setId(result)

                    }}
                    onError={(error) => console.log(error?.message)}
                />
                    <Button onClick={() => setRegistered(undefined)}>{t("Go to homepage")}</Button>
                </div>
            </div>


        default:

            // @ts-ignore
            return <div align="center">
                <h1>{t("Have you used the machines before?")}</h1>
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
