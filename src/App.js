
import searchearchData from './components/search';
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
