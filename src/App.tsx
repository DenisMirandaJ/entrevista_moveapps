import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import FormAuth from './components/router/FormAuth';
import FormPage from './pages/FormPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Route exact path={'/'} component={LoginPage} />
          <Route exact path={'/form'} component={FormPage} />
        </BrowserRouter>
      </div></>
  );
}

export default App;
