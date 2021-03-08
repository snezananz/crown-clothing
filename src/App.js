import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

const TopicsPage = () => (
  <div>
    <h1>TOPICS PAGE</h1>
  </div>
);

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

const TopicDetailPage = (props) => (
  <div>
    <h1>TOPIC DETAIL PAGE: {props.match.params.topicId}</h1>
  </div>
);

function App() {
  return (
    <div>
      <Link to='/topics'>Topics</Link>
      <Route exact path='/' component={ HomePage }></Route>
      <Route exact path='/topics' component={ TopicsPage }></Route>
      <Route exact path='/hats' component={ HatsPage }></Route>
      <Route path='/topics/:topicId' component={ TopicDetailPage }></Route>
    </div>
  );
}

export default App;
