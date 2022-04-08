import React, { Fragment } from 'react';
import { useEffect, useState } from "react";
import db from "../../Firebase/FirebaseConfig";
import { onSnapshot, addDoc, doc, collection, query, deleteDoc, orderBy } from "firebase/firestore";
import { MdLogout } from "react-icons/md";
import Swal from 'sweetalert2';
import NavSales from "./NavSales"
import useForm from '../Hooks/useForm';
import Table from './Table';
import Modal from './Modal';
import { useAuth } from '../../Context/authContext'
import Spinner from '../Spinner'

const TableVentas = () => {
    const [sales, setSales] = useState("")
    const [balance, setBalance] = useState("")
    const [date, setDate] = useState("")
    const [page, setPage] = useState(1)
    const [itemsperPage, setItemsPerPage] = useState(8)
    const { form, handleChange } = useForm()

    const { user, logout, loading } = useAuth()

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
        const sell = { "cliente": client, "total": Number(total), "fecha": new Date() }
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
                <div className='container rounded bg-white'>
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
                    <NavSales filterSalesbyPrice={filterSalesbyPrice} filterSalesbyDate={filterSalesbyDate} />
                    <Table sales={sales}
                        page={page}
                        itemsperPage={itemsperPage}
                        deleteSale={deleteSale}
                        setPage={setPage}
                        maxItems={maxItems}
                        balance={balance}
                    />
                </div>
            </div>
        </>

    )
}

export default TableVentas;
