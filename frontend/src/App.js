import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import Users from './Users';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router> 
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path={`/update/:id`} element={<UpdateUser />} />
        </Routes>
    </Router>
  );
}

export default App;
