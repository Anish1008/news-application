import './App.css';
import Main from './components/Main';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Archives from './components/Archives';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/archives" element={<Archives />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
