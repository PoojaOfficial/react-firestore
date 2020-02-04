import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
	this.boards = [];
	this.count = '';
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { name, email, password, role } = doc.data();
      this.boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name, email, password, role
      });
    });
  }
  onSubmit= (e) => {
    e.preventDefault();

    const {email_log, password_log } = this.state;

    this.boards.forEach((doc) => {
      const { name, email, password, role } = doc;
		if(email === email_log && password === password_log){
			this.count = doc.key;
			this.props.history.push(`/dashboard/${doc.key}`);
		}else{
			this.props.history.push("/");
		}
		
    });
	if(this.count != ''){
		this.props.history.push(`/dashboard/${this.count}`);
	}
  };
  
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
	  const { name, email_log, password_log, role} = this.state;
    return (
	<Box>
		<Container fixed  component="main" maxWidth="xs">
			<Grid>
				
        <Typography component="h1" variant="h5">
          Login Form
        </Typography>
				<form onSubmit = {this.onSubmit}>
					<TextField label="Email" variant="outlined" name="email_log" title={email_log} onChange={this.onChange} /> <br/>
					<TextField label="Password" variant="outlined" name="password_log" title={password_log} onChange={this.onChange}  /> <br/>
					<Button type="submit" variant="contained" color="primary">
					  Sign In
					</Button>
				</form>
				<span>Don't have an account? <Link to={`/register`}>Sign Up</Link></span>
			</Grid>
		</Container>
	</Box>
	
    );
  }
}

export default App;