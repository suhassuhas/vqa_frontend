import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Paper,Grid,Box,Typography,Button,TextareaAutosize} from '@material-ui/core'
//import {makeStyles} from '@material-ui/core/styles'
import images_complex from './Complex_imgs'
import "./styles.css"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios from 'axios'

export default function Complex() {

    const [selectedImg, setSelectedImg] = useState(images_complex[0]);
    const [imageFile,setImageFile] = useState({ file: null })
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
        //Check Whether input question is typed or entered through microphone
        //console.log(event)
        let new_ques = undefined
        new_ques=event.target[1].value
        if(new_ques===""){
          //console.log(transcript)
          new_ques = transcript
        }
        setQues(new_ques)
        
        let fileImage
        console.log('evtn')
        console.log(event)
        if(!selectedImg.includes("COCO")){
            console.log('ekehjb')
          
          fileImage=event.target[0].files[0]
          let formData = new FormData()
          formData.append(
            "file",
            fileImage
          )       
          axios({
            method: 'post',
            url: 'https://python-vqa-api-xueksbf2aa-uc.a.run.app/complex/?ques='+new_ques,
            data: formData,
          })
          .then((val) => {
            //console.log(val.data)
            setAns(val.data["answer"])
            msg.text = "The answer is "+val.data["answer"]
            window.speechSynthesis.speak(msg);
          })	
          .catch(err => console.log(err))
          event.preventDefault();
  
        }else{
          let formData = new FormData()
          formData.append('ques',new_ques)
          formData.append('path',selectedImg)
          console.log('error')
          console.log(formData.get('ques'),formData.get('path'))
          console.log('error')
          axios({
            method: 'post',
            url: 'https://python-vqa-api-xueksbf2aa-uc.a.run.app/complexlocal/',
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
        
    }
    
    const changeSelectedImage = (event) => {
        console.log('jio')
        console.log(event.target.files[0])
        setSelectedImg(URL.createObjectURL(event.target.files[0]))
        event.preventDefault();
    }

    const resetFile = ()=>{
        setSelectedImg("")
    }
    return (
        <div>
            <div className="main">
                <Grid container>
                    <Grid item xs={7}>
                        <Paper style={{backgroundColor:"#000",color: '#fff'}}>
                            <Box padding="1vh">
                                <Typography variant="h3">Complex Visual Question Answering </Typography>
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
                                {images_complex.map((img, index) => (
                                    <img
                                    style={{border : selectedImg === img ? "2px solid white":""}}
                                    src={"./complex_images/"+img}
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
                                src={selectedImg}
                                className="selected"
                               />         
                            </div> 
                            
                        </Paper> 
                        
                        {
                            (
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={resetFile}>Remove File</button>
                                    </div>
                         )}
                        <br></br>                        
                        <div style={{textAlign:"center",margin:"2vh"}}>
                                    <Button size="small" variant="contained" color="primary" onClick={SpeechRecognition.startListening} m={2}>Start</Button>
                                    <Button size="small" variant="contained" color="primary" onClick={SpeechRecognition.stopListening} m={2}>Stop</Button>
                                    <Button size="small" variant="contained" color="primary" onClick={resetTranscript} m={2}>Reset</Button>
                        </div>


                        <form style={{textAlign:"center",marginTop:"1vh"}} onSubmit={getAnsfromapi}>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" accept="image/png, image/gif, image/jpeg" onChange={changeSelectedImage}/>
                                </div>
                                <Typography variant="h4" color="textPrimary" gutterBottom>Enter Question Below</Typography>
                                <textarea rows="4" cols="50" placeholder={transcript}></textarea>
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
