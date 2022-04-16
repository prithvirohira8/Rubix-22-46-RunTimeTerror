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
            tempArr = [tempArr[1], tempArr[0]];
            let final = [];
            tempArr.forEach(element => {
                const studentRef = firebase.database().ref('Students/' + element);
                studentRef.on('value', (snapshot) => {
                    const data = snapshot.val();
                    let obj = {
                        "name": data.Student_Name,
                        "photo": data.Photo
                    }
                    let newKey = key.replaceAll('/', '@')
                    const newRef = firebase.database().ref('Students/' + element + '/Tests/' + newKey);
                    newRef.on('value', (snap) => {
                        const newData = snap.val();
                        console.log(newData)
                        obj = { ...obj, "fullScreen": newData.fullScreen, "tabSwitch": newData.tabs_changed }
                        final.push(obj);
                        setArray(arr => [...arr, obj]);
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
                                        <Button size="small">Terminate</Button>
                                    </CardActions>
                                </Card>

                            </>)
                    })
            }
        </div>
    )
}