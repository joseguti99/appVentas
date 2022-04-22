import React from 'react'
import { BsCalendarCheck, BsList, BsCashCoin } from "react-icons/bs";
import Search from '../Search';
const NavSales = ({ filterSalesbyPrice, filterSalesbyDate, HanddleSearch}) => {
    return (
        <div className='row justify-content-center bg-dark py-3'>
            <div className='col-4 col-lg-3 rounded'>
            <button className='btn btn-dark text-white border border-white' onClick={filterSalesbyPrice}>Filtro Precio <BsCashCoin className='h5 mx-1 mt-1 text-white' /></button>
            </div>
            <div className='col-4 col-lg-3 rounded'>
            <button className='btn btn-dark text-white border border-white' onClick={filterSalesbyDate}>Filtro Fecha <BsCalendarCheck className='h5 mx-1 mt-1 text-white' /></button>
            </div>
            <div className='col-8 col-lg-5 my-lg-1 my-3'>
                <Search HanddleSearch={HanddleSearch}/>
            </div>
        </div>
    )
}

export default NavSales;