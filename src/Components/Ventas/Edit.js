import React, { useEffect, useState } from 'react'
import db from "../../Firebase/FirebaseConfig";
import {getDoc, updateDoc, doc } from "firebase/firestore";
import {useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    const [client, setClient] = useState("")
    const [total, setTotal] = useState("")

    const params = useParams()
    const navigate = useNavigate()
    const id = params.editId

    const getDataSale = async () => {
        const saleDoc = await getDoc(doc(db, "ventas", id))
        if (saleDoc.exists()) {
            const sale = saleDoc.data()
            setClient(sale.cliente)
            setTotal(sale.total)
        } else {
            navigate("/sales")
        }
    }

    const updateSale = async (e) => {
        e.preventDefault()

        const sale = doc(db, "ventas", id)

        const update = {
            "cliente": client,
            "total": Number(total)
        }

        await updateDoc(sale, update)

        navigate("/sales")
    }

    const editClose = () => {
        navigate("/sales")
    }

    useEffect(() => {
        getDataSale()
    }, [])
    
    return (
        <>
            <div className='container mt-5 rounded shadow bg-white border'>
                <div className='row'>
                    <div className='col-12  text-end'>
                        <button className='btn btn-danger m-2' onClick={editClose}>X</button>
                    </div>
                    <h1 className='mb-3'>EDICION DE VENTA</h1>
                </div>
                <div className='row justify-content-center rounded my-5'>
                    <div className='col-7'>
                        <p className='h4 text-left'>Nombre del Cliente</p>
                    </div>
                    <div className='col-7 py-3'>
                        <input type="text"
                            className='form-control py-3'
                            placeholder='Cliente'
                            onChange={(e) => setClient(e.target.value)}
                            value={client}
                            required />
                    </div>
                    <div className='col-7'>
                        <p className='h4 text-left'>Total Venta</p>
                    </div>
                    <div className='col-7 py-3'>
                        <input type="number"
                            className='form-control py-3'
                            placeholder='Total'
                            onChange={(e) => setTotal(e.target.value)}
                            value={total}
                            required />
                    </div>
                    <div className='col-12 py-3'>
                        <button className='btn btn-warning col-3 py-3' disabled={client === "" || total === ""  ? true : false} onClick={updateSale}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit