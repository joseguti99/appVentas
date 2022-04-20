import React from 'react'
import { MdBorderColor, MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner';
import ContainerPagination from '../Pagination/ContainerPagination';

const index = ({ sales, page, itemsperPage, deleteSale, setPage, maxItems, balance, convertTimestamp, convertTimestampinHour }) => {
    return (
        <div>
            <div className='container rounded py-2'>
                <table className="table table-light">
                    <thead>
                        <tr>
                            <th className='col-2'>ID</th>
                            <th className='col-2'>CLIENTE</th>
                            <th className='col-2'>FECHA</th>
                            <th className='col-2'>TOTAL</th>
                            <th className='col-2'>EDITAR</th>
                            <th className='col-2'>ANULAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales ? sales.slice(
                            (page - 1) * itemsperPage,
                            (page - 1) * itemsperPage + itemsperPage)
                            .map((data, index) =>
                                <tr key={index}>
                                    <th className="col-2">{data.id.slice(0,5)}</th>
                                    <td className="col-2">{data.cliente.toUpperCase()}</td>
                                    <td className="col-2">{convertTimestamp(data.fecha.seconds)+" - "+ convertTimestampinHour(data.fecha.seconds)}</td>
                                    <td className="col-2">$ {Intl.NumberFormat().format(data.total)}</td>
                                    <td className="col-2"><Link to={`/sales/${data.id}`} className='btn btn-success mx-1'><MdBorderColor className='fs-4' /></Link></td>
                                    <td className="col-2"><button className='btn btn-danger' onClick={() => deleteSale(data.id)} ><MdDeleteForever className='fs-4' /></button></td>
                                </tr>
                            ) : <tr>
                                    <td className='col-1 py-2 text-primary'>
                                        <Spinner />
                                    </td>
                        </tr>
                        }
                    </tbody>
                </table>
                <ContainerPagination page={page} setPage={setPage} maxItems={maxItems} />
                <div className='row rounded my-2 justify-content-center'>
                    <div className='col-6'>
                        <p className='fs-4 text-center bg-warning rounded shadow-lg py-2 mt-3'>TRANSACCIONES <br/> {sales.length}</p>
                    </div>
                    <div className='col-6'>
                        <p className='fs-4 text-center bg-warning rounded shadow-lg py-2 mt-3'>BALANCE <br/> ${new Intl.NumberFormat().format(balance)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index