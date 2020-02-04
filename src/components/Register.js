import React, {Component} from 'react';
import firebase from '../Firebase';
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class Register extends Component{
	
	constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      name: '',
      email: '',
      password: '',	  
      role: 0
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, role } = this.state;

    this.ref.add({
      name, email, password, role
    }).then((docRef) => {
      this.setState({
		  name: '',
		  email: '',
		  password: '',	  
		  role: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  
	render(){
    const { name, email, password, role } = this.state;
		return (
			<Box>
				<Container fixed  component="main" maxWidth="xs">
					<Grid>
						<h1>Registeration Form</h1>
						<form onSubmit={this.onSubmit}>
							<TextField label="Name" variant="outlined" value={name} name="name" onChange={this.onChange} /> <br/>
							<TextField label="Email" variant="outlined" value={email} name="email" onChange={this.onChange} /> <br/>
							<TextField label="Password" variant="outlined" value={password} name="password" onChange={this.onChange} /> <br/>
							<Select label="Role" variant="outlined" value={role} name="role" onChange={this.onChange} >
								<MenuItem value={0}><em>None</em></MenuItem>
								<MenuItem value="Admin">Admin</MenuItem>
								<MenuItem value="Lenderer">Lenderer</MenuItem>
								<MenuItem value="Borrower">Borrower</MenuItem>
							</Select> <br/>
							<Button type="submit" variant="contained" color="primary">
							  Sign Up
							</Button>
						</form>
						<span>Already have an account? <Link to={`/`}>Sign In</Link></span>
					</Grid>
				</Container>
			</Box>
		
		);
	}		
  
}

export default Register;