import React, { Fragment } from 'react';
import { useEffect, useState } from "react";
import db from "../../Firebase/FirebaseConfig";
import { onSnapshot, addDoc, doc, collection, query, deleteDoc, orderBy, where } from "firebase/firestore";
import { MdLogout } from "react-icons/md";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {MdBorderColor, MdDeleteForever} from "react-icons/md"
import NavSales from "./NavSales"
import useForm from '../Hooks/useForm';
import Table from './Table';
import Modal from './Modal';
import { useAuth } from '../../Context/authContext'
import Spinner from '../Spinner'
import Search from './Search';
import uniqueElement from './UniqueElementOfTable';

const TableVentas = () => {
    const [sales, setSales] = useState("")
    const [salesSearch, SetSalesSearch] = useState("")
    const [balance, setBalance] = useState("")
    const [date, setDate] = useState("")
    const [page, setPage] = useState(1)
    const [itemsperPage, setItemsPerPage] = useState(8)
    const { form, handleChange } = useForm()
    const [search, setSearch] = useState(false)

    const { user, logout, loading } = useAuth()

    const navigate = useNavigate()

    const HanddleSearch = (e) => {
        //queda permitir la busqueda por ID
        //transformar los datos en minuscula para que el buscado los encuentre
        //mostrar la fila de la venta, con sus botones
        const searcher = e.target.value.toLowerCase()
        console.log(searcher)
        setSearch(searcher)
        if(searcher != ""){
            const getSales = sales
            const results =  getSales.filter(sale => sale.cliente === searcher)
            SetSalesSearch(...results)
        }else{
            SetSalesSearch("")
        }
    }

    const handleLogout = async () => {
        await logout()
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const getData = () => {
        const q = query(collection(db, "ventas"), orderBy("fecha", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const getSales = [];
            querySnapshot.forEach((doc) => {
                getSales.push({ id: doc.id, ...doc.data() });
            });
            setSales(getSales);

            const summation = getSales.map((data) => data.total)
            let sum = 0;
            for (let i = 0; i < summation.length; i++) {
                sum += summation[i];
            }
            setBalance(sum)
            setDate(getSales.fecha)
        });
    }

    useEffect(() => {
        if (loading) return <Spinner />
        getData()
    }, [])

    const convertTimestamp = (seconds) => {
        const miliseconds = seconds * 1000
        const dateObject = new Date(miliseconds)
        let day = dateObject.getDate()
        let month = dateObject.getMonth() + 1
        let year = dateObject.getFullYear()
        const fullDate = `${day}/${month}/${year}`
        return fullDate
    }

    const convertTimestampinHour = (seconds) => {
        const miliseconds = seconds * 1000
        const dateObject = new Date(miliseconds)
        let hour = dateObject.getHours()
        let minutes = dateObject.getMinutes()
        const result = `${hour} : ${minutes}`
        return result
    }

    const deleteSale = async (id) => {
        Swal.fire({
            title: '¿Seguro que desea Eliminar?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                const saleDoc = doc(db, "ventas", id)
                deleteDoc(saleDoc)
                Toast.fire({
                    icon: 'success',
                    title: 'Anulado con exito'
                })
                getData()
                Swal.fire(
                    'Eliminado!',
                    'Su archivo ha sido eliminado.',
                    'success'
                )
            }
        })
    }

    const sendSell = async (e) => {
        e.preventDefault()
        const { client, total } = form
        const sell = { 
            "cliente": client.toLowerCase() , 
            "total": Number(total), 
            "fecha": new Date() 
        }
        const getCollection = collection(db, "ventas")
        await addDoc(getCollection, sell)
            .then(ress => getData())
            .catch(err => err)
        Toast.fire({ icon: 'success', title: 'Se añadio una venta' })
        e.target.reset()
    }

    const filterSalesbyDate = () => {
        const filterDateAsc = sales.sort((a, b) => {
            if (a.fecha > b.fecha) {
                return -1;
            }
            if (a.fecha < b.fecha) {
                return 1;
            }
        })
        setSales([...filterDateAsc])
    }

    const filterSalesbyPrice = () => {
        const filterTotalDesc = sales.sort((a, b) => {
            if (a.total < b.total) {
                return -1;
            }
            if (a.total > b.total) {
                return 1;
            }
        })
        setSales([...filterTotalDesc])
    }

    const maxItems = sales.length / itemsperPage

    return (
        <>
            <div className='shadow'>
                <div className='container rounded bg-white m-100'>
                    <div className='row pt-4 pb-4 align-items-center justify-content-end'>
                        <div className='col-3'>
                        </div>
                        <div className='col-6'>
                            <h1 className='margin-center'>REGISTRO DE VENTAS</h1>
                        </div>
                        <div className='col-3 text-end'>
                            {user.reloadUserInfo.photoUrl 
                            ? <>
                                <img src={user.reloadUserInfo.photoUrl} className="photoUser mx-2" title={`Usuario: ${user.displayName}`} alt="logoUser"/>
                                <button className='btn btn-danger py-2' onClick={handleLogout}>Salir<MdLogout className='h4 my-1 text-white'/></button>
                            </> 
                            :   <>
                                    <button className='btn btn-danger py-2' onClick={handleLogout}>Salir<MdLogout className='h4 my-1 text-white'/></button>
                                    <p className='text-primary fs-3'>Usuario Activo: {user.email.slice(0,4).toUpperCase()}</p>
                                </>
                            } 
                        </div>
                    </div>
                    <Modal sendSell={sendSell} handleChange={handleChange} />
                    <NavSales filterSalesbyPrice={filterSalesbyPrice} filterSalesbyDate={filterSalesbyDate} HanddleSearch={HanddleSearch}/>
                    
                    {salesSearch 
                        ? 
                            <div>
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
                                        <tr>
                                            <th className="col-2">{salesSearch.id.slice(0,5)}</th>
                                            <td className="col-2">{salesSearch.cliente.toUpperCase()}</td>
                                            <td className="col-2">{convertTimestamp(salesSearch.fecha.seconds)+" - "+ convertTimestampinHour(salesSearch.fecha.seconds)}</td>
                                            <td className="col-2">$ {Intl.NumberFormat().format(salesSearch.total)}</td>
                                            <td className="col-2"><Link to={`/sales/${salesSearch.id}`} className='btn btn-success mx-1'><MdBorderColor className='fs-4' /></Link></td>
                                            <td className="col-2"><button className='btn btn-danger' onClick={() => deleteSale(salesSearch.id)} ><MdDeleteForever className='fs-4' /></button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        :   
                            <Table sales={sales}
                            page={page}
                            itemsperPage={itemsperPage}
                            deleteSale={deleteSale}
                            setPage={setPage}
                            maxItems={maxItems}
                            balance={balance}
                            convertTimestamp={convertTimestamp}
                            convertTimestampinHour={convertTimestampinHour}
                        />
                    }
                </div>
            </div>
        </>

    )
}

export default TableVentas;
