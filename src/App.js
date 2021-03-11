import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  // method to call when unmounting, to unsubscribe
  unsubscribeFromAuth = null

  componentDidMount() {
    /* onAuthStateChanged() returns a function for unsubscribing!
      /*this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      // authentication state has changed, change the state information
      this.setState({currentUser: user});*/
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
        // Add this user into out users database table, if not already there
        const userRef = await createUserProfileDocument(userAuth);

        // create a listener to listen for document changes and update state every time; in our case there will be no change just an initial 'update' when the snapshot will be sent to us with the user data, which we will store in the state

        userRef.onSnapshot(snapshot => {
          
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => { console.log( this.state ) });
          // this wont work, setState is async so to accurately display state AFTER update we need to do it in the callback, not in the code below
          //console.log(this.state);
        });
      } else {
        this.setState({ currentUser: userAuth }); // sets to null when user logs off
        //console.log(this.state);
      }      
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={ HomePage }></Route>
          <Route exact path='/shop' component={ ShopPage }></Route>
          <Route exact path='/signin' component={ SignInAndSignUpPage }></Route>
        </Switch>        
      </div>
    )
  }  
};

export default App;
