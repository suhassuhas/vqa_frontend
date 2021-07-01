import React from 'react'
import {Typography,Grid,Box,Card,CardActionArea,CardMedia,CardContent} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Button from './Button'
import {useHistory} from "react-router-dom"

const useStyles = makeStyles({
    vqaheader:{
        position: 'relative',
        height: '100vh',
        background: '#40324f',
        color: '#fff',
    },

    newcolor:{
        background: '#40324f',
        color: '#fff',
        maxWidth: 1000,
    },

    alignItemsAndJustifyContent: {
        height:"30%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

    imageStyle:{
      width: "300px",
      height: "300px",
      margin: "0 auto",
      border: "4px solid purple"
    },

    root: {
        maxWidth: 780,
      },
    media: {
        height: 280,
    },

    boxImg :{
        position: 'relative',
        background: '#f7f5f7',
        color: '#fff',
    },

    vqafooter:{
        height: '20vh',
        background: '#2a0240',
        color: '#fff',
    }

})


export default function Home() {

    const history = useHistory();

    const classes=useStyles();
    return (
        <div>
                <div  className={classes.vqaheader} justifyContent="center">
                    <Box padding="1vh">
                        <Typography variant="h1">Visual Question Anwering </Typography>
                    </Box>

                    <Box padding="1vh">
                        <img src="architecture.gif" />
                    </Box>

                    <Box padding="2vh" width="85vh" height="30vh" marginLeft="57vh">
                            <Typography variant="h4" align="justify">
                                Visual questions selectively target different areas of an image,including background details and underlying context. 
                                As a result,a system that succeeds at Visual Question Answering typically needs a more detailed understanding of the 
                                image and complex reasoning than a system producing generic image captions .
                            </Typography>
                    </Box>

                    <Box padding="2vh">
                        <img src="angle-down-solid.svg"
                         class="animate__animated animate__infinite animate__bounce" 
                        style={{width: "300px",height: "200px"}}
                        />
                    </Box>

                </div>

                <div className={classes.boxImg} justifyContent="center">
                    <Box  padding="7vh" marginLeft="53vh" display="flex">
                         <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.media}
                                image="./simple_images/47.png"
                                title="2D Images"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h4" component="h2">
                                    Simple Images
                                </Typography>
                                <Typography variant="h5" color="textSecondary" component="p">
                                    Try VQA for 2D images. Here there are only simple shapes with 
                                    colors.Questions should be framed with respect to shape and color.
                                </Typography>
                                </CardContent>
                                <Button size="large" variant="contained" color="primary" marginBottom="3vh"  onClick={() => history.push('/simple')}>
                                    Try This
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Box>

                    <Box padding="7vh" marginLeft="53vh" display="flex">
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.media}
                                image="./complex_images/COCO_val2014_000000000208.jpg"
                                title="2D Images"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h4" component="h2">
                                    Real Time Images
                                </Typography>
                                <Typography variant="h5" color="textSecondary" component="p">
                                    Try VQA for Real time images.Here the type of questions
                                    can be complicated.
                                </Typography>
                                </CardContent>
                                <Button size="large" variant="contained" color="primary" marginBottom="3vh"  onClick={() => history.push('/complex')}>
                                    Try This
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Box>

                    <Box padding="7vh" marginLeft="53vh" display="flex">
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.media}
                                image="./satellite_images/6385.JPG"
                                title="2D Images"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h4" component="h2">
                                    Satellite Images
                                </Typography>
                                <Typography variant="h5" color="textSecondary" component="p">
                                    Try VQA for Satellite Images , which consists of pictures
                                    in flooding area and ask relevant questions.
                                </Typography>
                                </CardContent>
                                <Button size="large" variant="contained" color="primary" marginBottom="3vh"  onClick={() => history.push('/satellite')}>
                                    Try This
                                </Button>
                            </CardActionArea>
                        </Card>                     
                    </Box>
                </div>


                <div className={classes.vqafooter}>
                    <Typography variant="h3" paddingTop="10vh">Connect with Us</Typography>
                    <Grid container>
                        <Grid item xs={4}>
                            <img src="linkedin.svg" style={{width: "60px",height: "60px",paddingTop:"35px"}} />
                        </Grid>
                        <Grid item xs={4}>
                            <img src="instagram.svg" style={{width: "60px",height: "60px",paddingTop:"35px"}} />
                        </Grid>
                        <Grid item xs={4}>
                            <img src="github.svg" style={{width: "60px",height: "60px",paddingTop:"35px"}}/>
                        </Grid>
                    </Grid>
                </div>
                
        </div>
    )
}
