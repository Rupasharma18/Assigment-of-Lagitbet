import React, { Component } from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import Select from 'react-select';
import { withStyles } from "@material-ui/core/styles";
// import {FormControl,TextField} from '@material-ui/core'
import { FormControl, Input, MenuItem } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// import { Container } from './styles';
const Styles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
      listOfCategoiresId: '',
      subCategoriesId: '',
      topiesId: '',
      sDate:'',
      eDate:''
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
      listOfCategoiresId: categoryId
    })

  }

  subCategoriesIdIdHandler (event, newValue) {
    console.log(newValue, "Rvakuetrw")
    const subCategoryId = parseInt(newValue.id)
    this.setState({
      subCategoriesId: subCategoryId
    })

  }
  topicesIdHandler(e, newValue){
    if (newValue) {
      const topicId = parseInt(newValue.id)
      this.setState({
        topiesId: topicId
      })
    }
  }
  handleChange(e){
    console.log(e.target.value)

    const { name, value } = e.target;
    this.setState({[name]: value});
 }
 handleSubmit(e) {
    e.preventDefault()
    
  const { name, imageUrl, listOfCategoiresId, subCategoriesId, topiesId } = this.state;
  Axios.post('http://18.220.240.163:8080/rest/admin/matches', { name, imageUrl, listOfCategoiresId, subCategoriesId, topiesId })
      .then(res => {
        console.log(res, "submitdata")
      })

  }


  render() {
    // const { name } = this.state;
    console.log(this.state, "------------------------")
    const { classes } = this.props;
    return <>
      <Container component="main" maxWidth="xs">
        
        <Typography style={{ fontSize: 16, fontWeight: 'bold', marginTop: '4%' }}>
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

          <Grid container spacing={3}>
            <Grid item xs={6}>

              <TextField
                label='start Date'
                type="date" id="start"
                name="sDate"
                value={this.state.sDate}
                min="2018-01-01"
                max="2018-12-31"
                variant="outlined"
                margin="normal"
                onChange={(e) => this.handleChange(e)}
              />
            </Grid>


            <Grid item xs={6}>

              <TextField
                label='End Date'
                type="date"
                id="start"
                name="eDate"
                value={this.state.eDate}
                min="2018-01-01"
                max="2018-12-31"
                variant="outlined"
                margin="normal"
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
            // onClick={this.onClick}
            className={classes.submit}>
            Submit
        </Button>


        </form>
      </Container>
    </>




  }
}

export default withStyles(Styles)(Categories);



// import React, { useState,useEffect } from 'react';
// import { Container, Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Axios from 'axios';
// import Select from 'react-select';
// import { withStyles } from "@material-ui/core/styles";
// // import { Container } from './styles';
// const Styles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));
// class Categories extends React.Component(){
//   constructor(props) {
//     super(props);

//   }

  // render(){

  //   const { classes } = this.props;
  //   return <div >
  //   <Container component="main" maxWidth="sm">
  //   <div className={classes.paper}>
  //     Categories
  //   </div>
  //   <Grid container spacing={3}>
  //   <form className={classes.form} noValidate >
  //     <Grid item xs={12}>
  //     <TextField
  //              variant="outlined"
  //              margin="normal"
  //              required
  //              fullWidth
  //              id="name"
  //              label="Name"
  //              name="name"
  //              autoComplete="Name"
  //              autoFocus
  //              // defaultValue={useLogin.userName}
  //              // onChange={handleChange}
  //            />
  //     </Grid>
  //     <Grid item xs={12}>
  //            <TextField
  //              variant="outlined"
  //              margin="normal"
  //              required
  //              fullWidth
  //              name="imageUrl"
  //              label="Image"
  //              type="imageUrl"
  //              id="imageUrl"
  //              autoComplete="current-password"
  //              // defaultValue={useLogin.userName}
  //              // onChange={handleChange}


  //            />
  //         </Grid>
  //  <Grid item xs={12}>
  //  <label htmlFor="coffee_beans_countries">Country</label>
  //              <Select id="country" name="coffee_beans" />

  //  </Grid>




  //            <Button
  //              type="submit"
  //              fullWidth
  //              variant="contained"
  //              color="primary"
  //              className={classes.submit}

  //            > Submit
  //            </Button>

  //          </form>
  //  </Grid>
  //   </Container>

  //    </div>;
  // }


// }

// //  useEffect(() =>{
  // Axios.get('http://18.220.240.163:8080/rest/admin/subcategories', {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
// //   }).then(res =>{
// //     console.log(res.data.result.list, "$$$$$$$$$$$$$$$$4")
// //     setCategories(res.data.result.list.map(item => console.log(item.name)))
// //   })
//   // .then(res => {
//   //   console.log(res, "$$$$$$$$$$$$44")
//   //   setCategories(res );
//   // });

// // })






// export default withStyles(Styles)(Categories);
























































// // import React from 'react';
// // import { makeStyles } from '@material-ui/core/styles';
// // import CssBaseline from '@material-ui/core/CssBaseline';
// // import AppBar from '@material-ui/core/AppBar';
// // import Toolbar from '@material-ui/core/Toolbar';
// // import Paper from '@material-ui/core/Paper';
// // import Button from '@material-ui/core/Button';
// // import Link from '@material-ui/core/Link';
// // import Typography from '@material-ui/core/Typography';
// // import TextField from '@material-ui/core/TextField';
// // import Grid from "@material-ui/core/Grid";
// // import Container from '@material-ui/core/Container';

// // const useStyles = makeStyles((theme) => ({
// //   appBar: {
// //     position: 'relative',
// //   },
// //   layout: {
// //     width: 'auto',
// //     marginLeft: theme.spacing(2),
// //     marginRight: theme.spacing(2),
// //     [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
// //       width: 600,
// //       marginLeft: 'auto',
// //       marginRight: 'auto',
// //     },
// //   },
// //   paper: {
// //     marginTop: theme.spacing(3),
// //     marginBottom: theme.spacing(3),
// //     padding: theme.spacing(2),
// //     [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
// //       marginTop: theme.spacing(6),
// //       marginBottom: theme.spacing(6),
// //       padding: theme.spacing(3),
// //     },
// //   },
// //   stepper: {
// //     padding: theme.spacing(3, 0, 5),
// //   },
// //   buttons: {
// //     display: 'flex',
// //     justifyContent: 'flex-end',
// //   },
// //   button: {
// //     marginTop: theme.spacing(3),
// //     marginLeft: theme.spacing(1),
// //   },
// // }));


// // export default function Form() {
// //     const classes = useStyles();




// //   return (
// //       <>

// // <React.Fragment>
// // <AppBar position="absolute" color="default" className={classes.appBar}>
// //         <Toolbar>
// //           <Typography variant="h6" color="inherit" noWrap>
// //             Movies Details
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>
// // </React.Fragment>
// //     <Container component="main" maxWidth="md">
// //     <CssBaseline />
// //     <div className={classes.paper}>
// //     <React.Fragment>
// //     <Grid container spacing={3}>
// //       <form className={classes.form} noValidate>
// //       <Grid item xs={12}>
// //           <TextField
// //             variant="outlined"
// //             margin="normal"
// //             required
// //             fullWidth
// //             id="userName"
// //             label="UserName"
// //             name="userName"
// //             autoComplete="userName"
// //             autoFocus

// //           />
// //           </Grid>
// //           <Grid item xs={12}>
// //           <TextField
// //             variant="outlined"
// //             margin="normal"
// //             required
// //             fullWidth
// //             name="password"
// //             label="Password"
// //             type="password"
// //             id="password"
// //             autoComplete="current-password"
// //           />
// //        </Grid>
// //           <Button
// //             type="submit"
// //             fullWidth
// //             variant="contained"
// //             color="primary"


// //           > LogIn
// //           </Button>

// //         </form>
// // </Grid>




// //     </React.Fragment>

// //     </div>
// //     </Container>
// //     </>
// //   );
// // }



























// // import React, { useEffect } from 'react';
// // import Axios from 'axios';

// // // import { Container } from './styles';

// // function FormDetails() {

// // const token = localStorage.getItem('Token')
// // console.log(token)


// // const handleClick=()=>{
// //     console.log(token)

// //     Axios.get('http://18.220.240.163:8080/rest/admin/subcategories',

// //     .then(res=>{
// //         console.log(res, "$$$$$$$$$$$$$$$$4")
// //     })

// // }

// //   return <div >

// //   </div>;
// // }

// // export default FormDetails;



// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import axios from 'axios'
// import Select from 'react-select';
// import fetch from 'cross-fetch';

// // import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import CircularProgress from '@material-ui/core/CircularProgress';

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignUp() {
//   const classes = useStyles();


//   const [open, setOpen] = React.useState(false);
//   const [options, setOptions] = React.useState([]);
//   const [subCategorie, setSubCategorie] = React.useState([])
//   const loading = open && options.length === 0;
//   const subLoading =open && subCategorie.length === 0;

//   // const token = localStorage.getItem('Token')

//   // const subcategoriHandle=()=>{
    //  axios.get('http://18.220.240.163:8080/rest/admin/subcategories', {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // }).then(res =>{
    //   console.log(res.data.result.list, "$$$$$$$$$$$$$$$$4")
    //   setSubCategorie(res.data.result.list)
    // })
//   // }




//   React.useEffect(() => {
//     let active = true;

//     if (!loading || !subLoading) {
//       return undefined;
//     }



//     (async () => {
//       const token = localStorage.getItem('Token')
//       const response = await fetch('http://18.220.240.163:8080/rest/admin/categories', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       await sleep(1e3);
//       const categories = await response.json();

//       if (active) {
//         setOptions(Object.values(categories.result.list).map((item) => item.name));
//       }
//     })();


//     (async () => {
//       const token = localStorage.getItem('Token')
//       const response = await fetch('http://18.220.240.163:8080/rest/admin/subcategories', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       await sleep(2e3);
//       const subCategories = response.json();
//       console.log(subCategorie.data.result, "%%%%%%%%%%%%%%%%%%%%%%")

//       if(active){setSubCategorie(Object.values(subCategories).map((item) => item.name));}


//     })();


//     return () => {
//       active = false;
//     };
//   }, [loading]);


//   React.useEffect(() => {
//     if (!open) {
//       setOptions([]);
//       setSubCategorie([]);


//     }
//   }, [open]);


//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>


//         <form className={classes.form} noValidate >
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="fname"
//                 name="name"
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="name"
//                 label="Name"
//                 autoFocus
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="imageUrl"
//                 label="ImageUrl"
//                 name="imageUrl"
//                 autoComplete="lname"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Autocomplete
//                 id="asynchronous-demo"
//                 style={{ width: 400 }}
//                 open={open}
//                 onOpen={() => {
//                   setOpen(true);
//                 }}
//                 onClose={() => {
//                   setOpen(false);
//                 }}
//                 getOptionSelected={(option, value) => option === value}
//                 getOptionLabel={(option) => option}
//                 options={options}
//                 loading={loading}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Select Categories"
//                     variant="outlined"
//                     InputProps={{
//                       ...params.InputProps,
//                       endAdornment: (
//                         <React.Fragment>
//                           {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                           {params.InputProps.endAdornment}
//                         </React.Fragment>
//                       ),
//                     }}
//                   />
//                 )}
//               />

//             </Grid>

//             <Grid item xs={12}>
//             <Autocomplete
//                 id="asynchronous-demo"
//                 style={{ width: 400 }}
//                 open={open}
//                 onOpen={() => {
//                   setOpen(true);
//                 }}
//                 onClose={() => {
//                   setOpen(false);
//                 }}
//                 getOptionSelected={(option, value) => option === value}
//                 getOptionLabel={(option) => option}
//                 options={subCategorie}
//                 loading={subLoading}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Select Sub Categories"
//                     variant="outlined"
//                     InputProps={{
//                       ...params.InputProps,
//                       endAdornment: (
//                         <React.Fragment>
//                           {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                           {params.InputProps.endAdornment}
//                         </React.Fragment>
//                       ),
//                     }}
//                   />
//                 )}
//               />

//             </Grid>

//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign Up
//           </Button>

//         </form>
//       </div>

//     </Container>
//   );
// }