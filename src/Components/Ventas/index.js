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

const TableVentas = () => {
    const [sales, setSales] = useState("")
    const [salesSearch, SetSalesSearch] = useState("")
    const [balance, setBalance] = useState("")
    const [date, setDate] = useState("")
    const [page, setPage] = useState(1)
    const [itemsperPage, setItemsPerPage] = useState(8)
    const { form, handleChange } = useForm()
    const [search, setSearch] = useState("")

    const { user, logout, loading } = useAuth()

    const navigate = useNavigate()

    const HanddleSearch = (e) => {
        const searcher = e.target.value
        setSearch(searcher)
        if(searcher != ""){
            const getSales = sales
            const results =  getSales.filter(sale => sale.cliente === searcher.toLowerCase()
                                                    || sale.total === Number(searcher)
                                                    || sale.id.slice(0,5).toLowerCase() === searcher.toLowerCase())
            SetSalesSearch(results)
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
            showCancelButton: true,
            confirmButtonColor: '#3CB371',
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
                Toast.fire({ icon: 'success', title: 'Su archivo ha sido Eliminado!' })
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
            <div className='shadow m-100'>
                <div className='container-fluid rounded bg-white'>
                    <div className='row pb-4 align-items-center justify-content-end'>
                        <div className='col-12 col-xg-3'>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <h1 className='margin-center title-sells'>REGISTRO DE VENTAS</h1>
                        </div>
                        <div className='col-12 col-lg-3 text-end'>
                            {user.reloadUserInfo.photoUrl 
                            ? <>
                                <img src={`${user.reloadUserInfo.photoUrl}`} className="photoUser mx-2" title={`Usuario: ${user.displayName}`} alt="logoUser"/>
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
                    <NavSales filterSalesbyPrice={filterSalesbyPrice} 
                        filterSalesbyDate={filterSalesbyDate} 
                        HanddleSearch={HanddleSearch}
                    />
                    {sales.length 
                        ? 
                        <Table sales={sales}
                            salesSearch={salesSearch}
                            page={page}
                            itemsperPage={itemsperPage}
                            deleteSale={deleteSale}
                            setPage={setPage}
                            maxItems={maxItems}
                            balance={balance}
                            convertTimestamp={convertTimestamp}
                            convertTimestampinHour={convertTimestampinHour}
                        />
                        :   
                        <div className='row justify-content-center'>
                            <div className='col-1 py-3 text-warning'>
                                <Spinner />
                            </div>
                        </div>
                    }
                    <div className='container-fluid'>
                        <div className='row rounded justify-content-center'>
                            <div className='col-6'>
                                <p className='transactions text-center bg-warning rounded shadow py-2 mt-3'>TRANSACCIONES <br/> {sales.length}</p>
                            </div>
                            <div className='col-6'>
                                <p className='transactions text-center bg-warning rounded shadow py-2 mt-3'>BALANCE <br/> ${new Intl.NumberFormat().format(balance)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default TableVentas;
