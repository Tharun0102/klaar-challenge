
import './App.css';
import BankList from './components/BankList';


function App() {
  console.log("start");
  return (
    <div className="App">
      <nav className="title">
        <h1 style={{ textAlign: 'center' }}>Bank Search App</h1>
      </nav>
      <BankList />
    </div>
  );
}

export default App;
