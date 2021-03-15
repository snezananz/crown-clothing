import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser  } from './redux/user/user.actions.js';

import './App.css';

class App extends React.Component {

  /* dont need this any more
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  } */

  // method to call when unmounting, to unsubscribe
  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

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

          /* we will replace this with redux a functon that produces an action object, and takes a user parameter:

          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => { console.log(this.state) }); */
          // if we need to display something AFTER setState, just logggin after this line wont work, setState is async so to accurately display state AFTER update we need to do it in the callback, not in the code below
          //console.log(this.state);

          // we are now using redux and updating state directly: we will just produce an action object for type SET_CURRENT_USER

          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });          
        });

      } else {

        console.log('logged off' );
        // same here, using redux

        //this.setState({ currentUser: userAuth }); // sets to null when user logs off
        setCurrentUser(userAuth); // userAuth is null  
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route 
            exact 
            path='/signin' 
            render={() =>{
              console.log('this.props.currentUser:', this.props.currentUser);
              return this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage/>)
            }} />
        </Switch>
      </div>
    );
  }
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
