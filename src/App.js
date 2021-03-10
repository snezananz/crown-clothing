import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  // method to call when unmounting, to unsubscribe
  unsubscribeFromAuth = null

  componentDidMount(){
    // onAuthStateChanged() returns a function for unsubscribing!
      this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      // authentication state has changed, change the state information
      this.setState({currentUser: user});
    }) 
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
