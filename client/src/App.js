import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <img src={logo} className="App-logo" alt="logo" />
      <h1>
        Testicals
      </h1>
    </div>
  );
}

export default App;
