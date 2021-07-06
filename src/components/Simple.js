import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Paper,Grid,Box,Typography,Button,TextareaAutosize} from '@material-ui/core'
//import {makeStyles} from '@material-ui/core/styles'
import images_simple from './Simple_imgs'
import "./styles.css"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios from 'axios'

export default function Simple() {

    const [selectedImg, setSelectedImg] = useState(images_simple[0]);
    const history = useHistory();
    const [ques,setQues] = useState("")
    const [ans,setAns] = useState("")

    const useStyles = makeStyles(() =>
    createStyles({
        root: {
        backgroundColor: "#000",
        color:"#fff",
        padding: "1vh",
        fontSize: '18px',
        width: '40vh',
        marginLeft:'20vh',
        marginTop:'5vh'
        },
    }),
    );

    const classes = useStyles();
    const { transcript, resetTranscript } = useSpeechRecognition()
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    let msg = new SpeechSynthesisUtterance();

    const getAnsfromapi = (event) => {
        console.log(selectedImg)
        let new_ques = undefined
        new_ques=event.target[0].value
        if(new_ques===""){
          //console.log(transcript)
          new_ques = transcript
        }
        
        let formData = new FormData()
        formData.append('ques',new_ques)
        formData.append('path',selectedImg)
        console.log(formData.get('ques'),formData.get('path'))
              
        axios({
          method: 'post',
          url: 'https://python-vqa-api-xueksbf2aa-uc.a.run.app/simplelocal/',
          data: formData,
        })
        .then((val) => {
          console.log(val.data)
          setAns(val.data["answer"])
          msg.text = "The answer is "+val.data["answer"]
          window.speechSynthesis.speak(msg);
        })	
        .catch(err => console.log(err))
        
        event.preventDefault();
    }

    return (
        <div>
            <div className="main">
                <Grid container>
                    <Grid item xs={7}>
                        <Paper style={{backgroundColor:"#000",color: '#fff'}}>
                            <Box padding="1vh">
                                <Typography variant="h3">Simple Visual Question Answering </Typography>
                            </Box>
                            <Box padding="1vh" width="110vh" height="23.5vh" >
                                <Typography variant="h4" align="justify">
                                    This is a demo of the model trained on simple images.Question must be related to shape color of the object in the image.
                                    Try this model by selecting a image and type the question . You can also use your microphone.Then press Submit to get the 
                                    answer from the model.
                                </Typography>
                                <Button size="large" variant="contained" color="secondary" onClick={() => history.goBack()}>Go Back</Button>
                            </Box>
                
                            <div className="container">
                                <div className="imgContainer">
                                {images_simple.map((img, index) => (
                                    <img
                                    style={{border : selectedImg === img ? "2px solid white":""}}
                                    src={"./simple_images/"+img}
                                    key={index}
                                    alt="dog"
                                    onClick={() => setSelectedImg(img)}
                                    />
                                ))}
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper style={{backgroundColor:"#000000",color: '#fff'}}> 
                            <Box padding="1vh">
                                <Typography variant="h3">Selected Image</Typography>
                            </Box>
                            <div className="selectImage">
                               <img
                                src={"./simple_images/"+selectedImg}
                                className="selected"
                               />         
                            </div> 
                        </Paper> 
                        <div style={{textAlign:"center",margin:"2vh"}}>
                                    <Button size="small" variant="contained" color="primary" onClick={SpeechRecognition.startListening} m={2}>Start</Button>
                                    <Button size="small" variant="contained" color="primary" onClick={SpeechRecognition.stopListening} m={2}>Stop</Button>
                                    <Button size="small" variant="contained" color="primary" onClick={resetTranscript} m={2}>Reset</Button>
                        </div>
                        <form style={{textAlign:"center",marginTop:"1vh"}} onSubmit={getAnsfromapi}>
                                <Typography variant="h4" color="textPrimary" gutterBottom>Enter Question Below</Typography>
                                <textarea rows="6" cols="50" placeholder={transcript}></textarea>
                                <br></br>
                                <Button size="large" variant="contained" color="secondary" type="submit" margin="5vh">Submit</Button>
                                <br></br>
                                <div className={classes.root}>{ans}</div>
                        </form>                        
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
