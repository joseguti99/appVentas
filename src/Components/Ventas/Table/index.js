import React from 'react'
import { MdBorderColor, MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner';
import ContainerPagination from '../Pagination/ContainerPagination';

const index = ({ sales, salesSearch, page, itemsperPage, deleteSale, setPage, maxItems, balance, convertTimestamp, convertTimestampinHour }) => {
    return (
                <div className='table-responsive'>
                <table className="table table-striped ">
                    <thead>
                        <tr scope="row">
                            <th scope='col'className='fs-th'>ID </th>
                            <th scope='col'className='fs-th'>CLIENTE </th>
                            <th scope='col'className='fs-th'>FECHA </th>
                            <th scope='col'className='fs-th'>TOTAL </th>
                            <th scope='col'className='fs-th'>EDITAR </th>
                            <th scope='col'className='fs-th'>ANULAR </th>
                        </tr>
                    </thead>
                    <tbody>
                    {salesSearch ? salesSearch.map((item, index) => 
                        <tr key={index} scope="row">
                            <th className='fs-th' scope='col'>{item.id.slice(0,5)}</th>
                            <td className='fs-th' scope='col'>{item.cliente.toUpperCase()}</td>
                            <td className='fs-th' scope='col'>{convertTimestamp(item.fecha.seconds)+" - "+ convertTimestampinHour(item.fecha.seconds)}</td>
                            <td className='fs-th' scope='col'>$ {Intl.NumberFormat().format(item.total)}</td>
                            <td className='fs-th' scope='col'><Link to={`/sales/${item.id}`} className='btn btn-success'><MdBorderColor className='fs-th' /></Link></td>
                            <td className='fs-th' scope='col'><button className='btn btn-danger' onClick={() => deleteSale(item.id)} ><MdDeleteForever className='fs-th' /></button></td>
                        </tr>)
                        : sales.slice(
                            (page - 1) * itemsperPage,
                            (page - 1) * itemsperPage + itemsperPage)
                                .map((data, index) =>
                                    <tr key={index}>
                                        <th className="fs-th" scope="col">{data.id.slice(0,5)}</th>
                                        <td className="fs-th" scope="col">{data.cliente.toUpperCase()}</td>
                                        <td className="fs-th" scope="col">{convertTimestamp(data.fecha.seconds)+" - "+ convertTimestampinHour(data.fecha.seconds)}</td>
                                        <td className="fs-th" scope="col">$ {Intl.NumberFormat().format(data.total)}</td>
                                        <td className="fs-th" scope="col"><Link to={`/sales/${data.id}`} className='btn btn-success mx-1'><MdBorderColor className='fs-4' /></Link></td>
                                        <td className="fs-th" scope="col"><button className='btn btn-danger' onClick={() => deleteSale(data.id)} ><MdDeleteForever className='fs-4' /></button></td>
                                    </tr>)
                    }
                    </tbody>
                </table>
                <ContainerPagination page={page} setPage={setPage} maxItems={maxItems} />
            </div>
    )
}

export default index