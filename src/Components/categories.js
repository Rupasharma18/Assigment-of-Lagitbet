import React, { Component } from 'react';

import { Container, Grid ,Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import { Autocomplete } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContentText } from '@material-ui/core';


const Styles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfCategoires: [],
      subCategories: [],
      topies: [],
      name: '',
      imageUrl: '',
      categoryId: '',
      subCategoryId: '',
      topicId: '',
      startDate:'',
      endDate:'',
      open:false,

    }
  }

  componentDidMount() {
    const token = localStorage.getItem('Token');

    Axios.get('http://18.220.240.163:8080/rest/admin/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data.result.list, "rrrrrrrrrr")
      this.setState({ listOfCategoires: res.data.result.list })
    })


    Axios.get('http://18.220.240.163:8080/rest/admin/subcategories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data.result.list, "rrrrrrrrrr")
      this.setState({ subCategories: res.data.result.list })

    })

    Axios.get('http://18.220.240.163:8080/rest/admin/topics', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data.result.list, "rrrrrrrrrr")
      this.setState({ topies: res.data.result.list })
    })
  }

  listOfCategoiresIdHandler(event, value){
    const categoryId = parseInt(value.id)
    this.setState({
      categoryId: categoryId
    })

  }

  subCategoriesIdIdHandler (event, newValue) {
    console.log(newValue, "Rvakuetrw")
    const subCategoryId = parseInt(newValue.id)
    this.setState({
      subCategoryId: subCategoryId
    })

  }
  topicesIdHandler(e, newValue){
    if (newValue) {
      const topicId = parseInt(newValue.id)
      this.setState({
        topicId: topicId
      })
    }
  }
  handleChange(e){
    console.log(e.target.value)

    const { name, value } = e.target;
    this.setState({[name]: value});
 }
 handleSubmit(e) {
  const token = localStorage.getItem('Token');
  e.preventDefault()
    
  const { name, imageUrl, categoryId, subCategoryId, topicId,startDate,endDate } = this.state;
  Axios.post('http://18.220.240.163:8080/rest/admin/matches',
   { name, imageUrl, categoryId, subCategoryId, topicId,startDate,endDate },{ 
    headers: {
    'Authorization': `Bearer ${token}`
  }})
      .then(res => {
        console.log(res, "submitdata")

        // if(res.data.success === true){
        //   window.location.href = "/";
        // }
        // else{
        //   window.location.href = "/category";
        // }
      })
      
      


  }
  
 handleClickOpen = () => {
    this.setState({open:true});
  };

  handleClose = () => {
    this.setState({open:false});
    window.location.reload();
  };

  render() {
    // const { sDate } = this.state;
    // console.log(this.state, "------------------------")
    const { classes } = this.props;
    return <>
      <Container component="main" maxWidth="md" style={{padding:'40px'}}>
      <Card className={classes.root} style={{paddingLeft:"25%", paddingRight:'25%', paddingBottom:"10%"}}>
        <Typography style={{ fontSize: 16, fontWeight: 'bold', marginTop: '4%' , textAlign:'center'}}>
          <h3>Categories</h3>
        </Typography>

        <form className={classes.form} noValidate onSubmit={this.handleSubmit.bind(this)}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={this.state.name}
            onChange={(e) => this.handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="imageUrl"
            label="ImageUrl"
            type="imageUrl"
            id="imageUrl"
            autoComplete="current-password"
            value={this.state.imageUrl}
            onChange={(e) => this.handleChange(e)}


          />

          <Autocomplete
            id="disable-portal"

            onChange={this.listOfCategoiresIdHandler.bind(this)}
            options={this.state.listOfCategoires}
            getOptionLabel={option => option.name}
            disablePortal
            renderInput={params => <TextField {...params} label="Categories" margin="normal" />}
          />

          <Autocomplete
            id="disable-portal"
            onChange={this.subCategoriesIdIdHandler.bind(this)}

            options={this.state.subCategories}
            getOptionLabel={option => option.name}
            disablePortal
            renderInput={params => <TextField {...params} label="Sub Categories" margin="normal" />}
          />

          <Autocomplete
            id="disable-portal"
            onChange={this.topicesIdHandler.bind(this)}
            options={this.state.topies}
    
            getOptionLabel={option => option.name}
            disablePortal
            renderInput={params => <TextField {...params} label="Topics" margin="normal" />}
          />

          <Grid container spacing={12}>
            <Grid item xs={12}>
            <Typography style={{ fontSize: 16, fontWeight: 'bold', marginTop: '4%' }}>
          <h6>start Date</h6>
        </Typography>
              <TextField
                // label='start Date'
                type="datetime-local" id="start"
                name="startDate"
                value={this.state.startDate}
                min="2018-01-01T00:00:00.000Z"
                max="2018-12-31T00:00:00.000Z"
                variant="outlined"
                margin="normal"
                onChange={(e) => this.handleChange(e)}
                style={{width:'100%'}}
              />
            </Grid>


            <Grid item xs={12}>
            <Typography style={{ fontSize: 16, fontWeight: 'bold', marginTop: '4%' }}>
          <h6>End Date</h6>
        </Typography>
              <TextField
                // label='End Date'
                type="datetime-local"
                id="start"
                name="endDate"
                value={this.state.endDate}
                min="2018-01-01T00:00:00.000Z"
                max="2018-12-31T00:00:00.000Z"
                variant="outlined"
                margin="normal"
                style={{width:'100%'}}
                onChange={(e) => this.handleChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            justifyContent='center'
            color="primary"
            onClick={this.handleClickOpen}
            className={classes.submit}
            >
            Submit
        </Button>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title"  open={this.state.open}>
          <DialogContentText id="alert-dialog-slide-description"  onClose={this.handleClose} >
            <h4 style={{padding:'3%'}}>succesfully Submit</h4>
          </DialogContentText>
          <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            close
          </Button>
         
        </DialogActions>
      </Dialog>

        </form>
        </Card>
      </Container>
    </>




  }
}

export default withStyles(Styles)(Categories);


