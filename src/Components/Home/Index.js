import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='container-fluid bg-dark m-100'>
            <div className='row bg-dark'>
                <h1 className='display-4 text-info'>APP - CRUD - REACT - FIREBASE</h1>
            </div>
            <div className='row'>
                <div className='col-12 bg-white'>
                    <img src='https://github.com/joseguti99/DB-IMG-PUBLIC/blob/main/firebase-app/APP-VENTA.png?raw=true' className="img-fluid" />
                </div>
            </div>
            <div className='row justify-content-center'>
                <Link to="/iniciar-sesion">
                    <div className='col-5 btn btn-warning rounded shadow my-4'>

                        <h3 className='display-6'>COMENZAR AHORA</h3>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default Home