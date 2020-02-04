import React, {Component} from 'react';
import firebase from '../Firebase';
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Dashboard extends Component{
	
	constructor(props){
		super(props);
		this.reff = firebase.firestore().collection('boards');
		this.unsubscribe = null;
		this.state = {
		  board: {},
		  key: ''
		};
		this.boards = [];
		this.admin=[];
		this.lenderer = [];
		this.borrower = [];
	}
	
	onCollectionUpdate = (querySnapshot) => {
		
		this.boards = [];
		this.admin=[];
		this.lenderer = [];
		this.borrower = [];
		querySnapshot.forEach((doc) => {
		  const { name, email, password, role } = doc.data();
		  if(role === 'Admin'){
			this.admin.push({
				key: doc.id,
				doc, // DocumentSnapshot
				name, email, password, role
			});
		  }else if(role === 'Lenderer'){
			  this.lenderer.push({
				key: doc.id,
				doc, // DocumentSnapshot
				name, email, password, role
			  })
		  }else if(role === 'Borrower'){
			  this.borrower.push({
				key: doc.id,
				doc, // DocumentSnapshot
				name, email, password, role
			  })
		  }
		  this.boards.push({
				key: doc.id,
				doc, // DocumentSnapshot
				name, email, password, role
			  })
		});
		const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
		 this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
	  }
	  
	componentDidMount() {
    
    this.unsubscribe = this.reff.onSnapshot(this.onCollectionUpdate);
  }
  
  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      this.reff.onSnapshot(this.onCollectionUpdate);
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  componentWillUnmount() {
  // we have to unsubscribe when component unmounts, because we don't need to check for updates
  this.unsubscribe()
}
	  
	  render(){
		  const { name, email, password, role } = this.state.board;
			return (
			<Box component="main" maxWidth="xs">
				<h1>Welcome {name}!</h1>
				<h1>Role: {role}</h1>
				<h3>Admin</h3>
				<TableContainer >
				  <Table size="small" aria-label="a dense table">
					<TableHead>
					  <TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Password</TableCell>
					  </TableRow>
					</TableHead>
					<TableBody>
					  {this.admin.map(row => (
						<TableRow key={row.key}>
						  <TableCell component="th" scope="row">
							{row.name}
						  </TableCell>
						  <TableCell align="right">{row.email}</TableCell>
						  <TableCell align="right">{row.password}</TableCell>
						</TableRow>
					  ))}
					</TableBody>
				  </Table>
				</TableContainer>
				<h3>Lenderer</h3>
				<TableContainer >
				  <Table size="small" aria-label="a dense table">
					<TableHead>
					  <TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Password</TableCell>
					  </TableRow>
					</TableHead>
					<TableBody>
					  {this.lenderer.map(row => (
						<TableRow key={row.key}>
						  <TableCell component="th" scope="row">
							{row.name}
						  </TableCell>
						  <TableCell align="right">{row.email}</TableCell>
						  <TableCell align="right">{row.password}</TableCell>
						</TableRow>
					  ))}
					</TableBody>
				  </Table>
				</TableContainer>
				<h3>Borrower</h3>
				<TableContainer >
				  <Table size="small" aria-label="a dense table">
					<TableHead>
					  <TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Password</TableCell>
					  </TableRow>
					</TableHead>
					<TableBody>
					  {this.borrower.map(row => (
						<TableRow key={row.key}>
						  <TableCell component="th" scope="row">
							{row.name}
						  </TableCell>
						  <TableCell align="right">{row.email}</TableCell>
						  <TableCell align="right">{row.password}</TableCell>
						</TableRow>
					  ))}
					</TableBody>
				  </Table>
				</TableContainer>
				<h3>All</h3>
				<TableContainer >
				  <Table size="small" aria-label="a dense table">
					<TableHead>
					  <TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Password</TableCell>
						<TableCell align="right">Role</TableCell>
						<TableCell align="right">Action</TableCell>
					  </TableRow>
					</TableHead>
					<TableBody>
					  {this.boards.map(p => (
						<TableRow key={p.key}>
						  <TableCell component="th" scope="row">
							{p.name}
						  </TableCell>
						  <TableCell align="right">{p.email}</TableCell>
						  <TableCell align="right">{p.password}</TableCell>
						  <TableCell align="right">{p.role}</TableCell>
						<td><button onClick={this.delete.bind(this, p.key)} class="btn btn-danger">Delete</button></td>
						</TableRow>
					  ))}
					</TableBody>
				  </Table>
				</TableContainer>
			</Box>
			);
		}	
	
}

export default Dashboard;