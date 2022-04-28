import * as React from 'react';
import { useState } from 'react';
import {
    useParams
} from 'react-router-dom';
import firebase from "../firebase";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import loading from '../images/loading.gif'
import { Alert } from '@mui/material';

var CryptoJS = require("crypto-js");
const myStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr"
}
export default function Proctor() {
    let { key } = useParams();
    key = key.replaceAll('@', '/');
    const [studentsArray, setArray] = useState([]);
    const [cardLoading, setLoading] = useState(false);

    const terminate = (id) => {
        alert(id)
        let newKey = key.replaceAll('/', '@')
        const newRef = firebase.database().ref('Students/' + id + '/Tests/' + newKey);
        newRef.on('value', (snap) => {
            let readfs = 0;
            let readts = 0;
            let term = 0;
            console.log(snap.val());
            readts = snap.val().tabs_changed;
            readfs = snap.val().fullScreen;
            term = 1
            try {
                newRef.set({
                    fullScreen: readfs,
                    tabs_changed: readts,
                    terminate: 1
                })
            } catch (e) {
                console.log(e);
            }


        });
    }

    React.useEffect(() => {
        var bytes = CryptoJS.AES.decrypt(key, 'my-secret-key@123');
        var url = bytes.toString(CryptoJS.enc.Utf8);

        const testRef = firebase.database().ref(url);
        testRef.on('value', (snapshot) => {
            const data = snapshot.val();
            let students = data.students;
            students = CryptoJS.AES.decrypt(students, 'my-secret-key@123');
            students = students.toString(CryptoJS.enc.Utf8);
            let tempArr = students.split(',');
            let Limit = tempArr.length;

            // setArray([])
            tempArr.forEach(element => {
                // alert("This was triggered")

                const studentRef = firebase.database().ref('Students/' + element);
                studentRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    let obj = {
                        "name": data.Student_Name,
                        "photo": data.Photo,
                        "id": element
                    }
                    let newKey = key.replaceAll('/', '@')
                    const newRef = firebase.database().ref('Students/' + element + '/Tests/' + newKey);
                    newRef.on('value', (snap) => {
                        const newData = snap.val();
                        // console.log(newData)
                        obj = { ...obj, "fullScreen": newData.fullScreen, "tabSwitch": newData.tabs_changed }
                        setArray(arr => {
                            if (arr.length == Limit) {
                                console.log("Entered here ")
                                let flag = 0;
                                for (let i = 0; i < arr.length; i++) {
                                    if (arr[i]["id"] == obj["id"]) {
                                        arr[i] = obj;
                                        flag = 1;
                                        break;
                                    }
                                }
                                if (flag == 0) {
                                    return [...arr, obj];
                                }
                                return [...arr]
                            }
                            else {
                                return [...arr, obj]
                            }
                        });

                    })

                })
            });
        });
    }, [])
    return (
        <div className="ProctorCards" style={myStyle}>
            {
                studentsArray.length == 0 ?
                    <img src={loading} style={{ height: "60%", borderRadius: "5%", marginLeft: "4%", marginTop: "20px" }} />
                    :
                    studentsArray.map(val => {
                        return (
                            <>
                                <Card sx={{ maxWidth: 345 }} style={{ margin: "6%", padding: "2%" }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={val["photo"]}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="div">
                                            {val["name"]}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            FullScreen : {val["fullScreen"]}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            TabSwitchs : {val["tabSwitch"]}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Warn</Button>
                                        <Button size="small" onClick={() => { terminate(val["id"]) }}>Terminate</Button>
                                    </CardActions>
                                </Card>

                            </>)
                    })
            }
        </div>
    )
}