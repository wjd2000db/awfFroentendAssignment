/* 
FILE          : search.css
PROJECT       : SENG3080 - Frontend programming assignment
PROGRAMMER    : Yujin Jeong
FIRST VERSION : 2025-02-08
DESCRIPTION   : App.js renders SearchData to provide a subreddit search feature and displays a header.
*/

import SearchData from './components/search';
import logo from "./assets/logo.png";
import "./css/app.css";

function App() {
  return (
    <>
      <div className="header">
        <img src={logo} alt="Reddit Logo"/>
        <h1>Subreddit Search</h1>
      </div>
      <SearchData />
    </>

  );
}

export default App;
