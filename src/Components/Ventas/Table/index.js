import React from 'react'
import { MdBorderColor, MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner';
import ContainerPagination from '../Pagination/ContainerPagination';

const index = ({ sales, salesSearch, page, itemsperPage, deleteSale, setPage, maxItems, balance, convertTimestamp, convertTimestampinHour }) => {
    return (
        <div>
            <div className='container-fluid rounded py-2'>
                <div className='row table-reponsive'>
                <table className="table table-striped">
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
                    {salesSearch ? salesSearch.map((item, index) => 
                        <tr key={index}>
                            <th className="col-2">{item.id.slice(0,5)}</th>
                                <td className="col-2">{item.cliente.toUpperCase()}</td>
                                <td className="col-2">{convertTimestamp(item.fecha.seconds)+" - "+ convertTimestampinHour(item.fecha.seconds)}</td>
                                <td className="col-2">$ {Intl.NumberFormat().format(item.total)}</td>
                                <td className="col-2"><Link to={`/sales/${item.id}`} className='btn btn-success mx-1'><MdBorderColor className='fs-4' /></Link></td>
                                <td className="col-2"><button className='btn btn-danger' onClick={() => deleteSale(item.id)} ><MdDeleteForever className='fs-4' /></button></td>
                        </tr>)
                        : sales.slice(
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
                                    </tr>)
                    }
                    </tbody>
                </table>
                <ContainerPagination page={page} setPage={setPage} maxItems={maxItems} />
            </div>
            </div>
        </div>
    )
}

export default index