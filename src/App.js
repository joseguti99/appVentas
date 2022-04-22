import './App.scss';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
// import "../node_modules/bootstrap/js/dist/modal"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Index';
import TableSales from "./Components/Ventas"
import EditSales from "./Components/Ventas/Edit"
import ContainerPagination from './Components/Ventas/Pagination/ContainerPagination';
import Search from './Components/Ventas/Search';
import { Register } from './Components/Register';
import { Login } from './Components/Login';
import { AuthProvider } from "./Context/authContext"
import { ProtectedRoute } from './Components/ProtectedRoute';
function App() {
  return (
    <div className='App'>
      <BrowserRouter  basename={process.env.PUBLIC_URL}>
        <AuthProvider>
          <Routes>
            <Route exact={true} path="/" element={<Home />} />
            <Route exact={true} path="/iniciar-sesion" element={<Login />} />
            <Route exact={true} path="/registro" element={<Register />} />
            <Route exact={true} path="/sales" element={ <ProtectedRoute> <TableSales /></ProtectedRoute>} />
            <Route exact={true} path="/sales/:editId" element={<ProtectedRoute> <EditSales /> </ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
