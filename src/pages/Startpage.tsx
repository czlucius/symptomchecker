import {Button, ButtonGroup, ToggleButton, ToggleButtonGroup} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";
const Startpage = () => {
    const [registered, setRegistered] = useState<boolean>(undefined)
    const navigate = useNavigate()


    switch (registered) {
        case true:
            return <div align="center">
                <h1>User check</h1>
                <div style={{height: 500}}>
                <QrScanner
                    containerStyle={{maxWidth: 400}}
                    videoStyle={{height: 500}}
                    onDecode={(result) => {
                        console.log(result)
                    }}
                    onError={(error) => console.log(error?.message)}
                />
                </div>
            </div>


        default:

            return <div align="center">
                <h1>Have you used the machines before?</h1>
                <ButtonGroup>
                    <Button color="success" onClick={() => {
                        console.log("a");
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
