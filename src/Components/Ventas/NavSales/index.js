import React from 'react'
import { BsCalendarCheck, BsList, BsCashCoin } from "react-icons/bs";

const NavSales = ({ filterSalesbyPrice, filterSalesbyDate }) => {
    return (
        <div className='container bg-white'>
                <div className='row justify-content-center bg-dark py-3'>
                    <div className='col-4 col-lg-3 rounded'>
                    <button className='btn btn-dark text-white border border-white' onClick={filterSalesbyPrice}>Filtro Precio <BsCashCoin className='h5 mx-1 mt-1 text-white' /></button>
                    </div>
                    <div className='col-4 col-lg-3 rounded'>
                    <button className='btn btn-dark text-white border border-white' onClick={filterSalesbyDate}>Filtro Fecha <BsCalendarCheck className='h5 mx-1 mt-1 text-white' /></button>
                    </div>
                    <div className='col-8 col-lg-5 my-lg-1 my-3'>
                        <div className='input-group'>
                            <input type="text" className='form-control rounded' placeholder='Buscar' />
                            <button className="btn btn-outline-light mx-1 rounded" type="button">Button</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default NavSales;