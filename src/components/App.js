import React, { useState, useEffect } from 'react';

import './App.css';

import {
  getSomething
  //getLinks
  //createTags
  //getTags
  //countClicks
} from '../api';

/*
import {
  App,
  form
} from './components';
*/

const App = () => {
    return (
      <body>
        <header>
          <h1>The Great Linkerator <span role="img" aria-label="chain">🔗</span></h1>
          <h2>Bookmark your favorite pages <span role="img" aria-label="pages">📖</span></h2>
        <br></br>
        </header>
        <main>
          <div id="top">
          <form>
            <div id="link">
                <h2>enter a link: <span role="img" aria-label="chain">🔗</span></h2>
                <input type="text" placeholder="https://google.com"></input>
            </div>

            <div id="comment">
                <h2>enter your comment: <span role="img" aria-label="hand">✍️</span></h2>
                <input type="text" placeholder="This site is the best!"></input>
            </div>

            <div id="tag">
                <h2>enter a tag: <span role="img" aria-label="tag">🏷️</span></h2>
                <input type="text" placeholder="news, helpful, etc."></input>
            </div>
            <br></br>
            <button type="submit">SUBMIT</button>
            </form>
          </div>

          <div id="bottom">
            <div id="chosen">
              <div><h2><a href="#">Sample Link</a></h2></div>
              <button type="button">ADD</button>   <button type="button">REMOVE</button>
            </div>
          </div>
        </main>

      </body>
    )
  }


export default App;