import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SignIn from './src/signin';
import Meteor, {createContainer, Accounts} from 'react-native-meteor';
import PokeMap from './src/PokeMap';

const SERVER_URL = 'ws://192.168.1.114:3000/websocket';

export default class App extends React.Component {
  state = {
    loggedIn: false
  }
  componentWillMount() {
    console.log('connecting')
    Meteor.connect(SERVER_URL);
    console.log(Meteor.userId())
    // if(Meteor.userId()){
    //   this.flipLogin(true)
    // }
  }
  // flipLogin = (x) =>{
  //   this.setState({loggedIn: x});
  
  signIn = (email,password) =>{
    // if(Meteor.userId()){
    //   this.flipLogin(true);
    // }
    Meteor.loginWithPassword(email, password, (error,data) => {
        if(error){
          if(error.reason === "User not found"){
            console.log('there was no email');
            Accounts.createUser( {email,password }, (error) => {
                console.log(error);
            });
          }
        }
        else{
          console.log('Email found');
          // this.flipLogin(true);
        }
    });
    console.log(Meteor.userId(), "User id");
  }
  // renderView = () =>{
  //   if(!this.state.loggedIn){
  //     return(
  //       <SignIn signIn={this.signIn}/>
  //     )
  //   }
  //   else{
  //     return(
  //       <PokeMap flipLogin={this.flipLogin} />
  //     )
  //   }
  // }
  render() {
    return (
      <View style={styles.container}>
        <SignIn signIn={this.signIn}/>
        {/* {this.renderView()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  img: {
    height: 400,
    width: 400
  }
});
