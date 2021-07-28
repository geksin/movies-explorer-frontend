import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {



  return (
      <>
      <Header isAuth={true} />
      <Router>
        <Route exact path='/' component={Main} />
        <Route exact path='/movies' component={Movies} />
      </Router>
      <Footer />
      </>
  );
}

export default App;
