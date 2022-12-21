import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';

function App() {
  return (
    <div>
      <h1> B2B </h1>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
