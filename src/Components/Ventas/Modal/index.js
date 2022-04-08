import React from 'react'
import { MdAddCircleOutline } from "react-icons/md";
const Modal = ({sendSell, handleChange}) => {
    return (
        <>
            <div className='container bg-white'>
                <div className='row justify-content-end'>
                    <button type="button" className="btn btn-warning rounded-pill col-5 col-lg-3 mb-3 mx-3 fs-5" data-bs-toggle="modal" data-bs-target="#CreateSale">
                        Crear Venta <MdAddCircleOutline className='text-black fs-4' />
                    </button>
                    <div className='row'>
                        <div>
                            <div className="modal fade" id="CreateSale" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <div className='container'>
                                                <div className='row'>
                                                    <h4 className="text-center display-6 fs-3" id="exampleModalLabel">Crear Venta</h4>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">X</button>
                                        </div>
                                        <div className="modal-body text-center">
                                            <div className='container-fluid'>
                                                <form className='row my-3' onSubmit={sendSell}>
                                                    <div className='col-5'>
                                                        <input type="text"
                                                            className='col-5 form-control'
                                                            placeholder='Cliente'
                                                            name='client'
                                                            onChange={handleChange}
                                                            required />
                                                    </div>
                                                    <div className='col-5'>
                                                        <input type="number"
                                                            className='col-5 form-control'
                                                            placeholder='Total'
                                                            name='total'
                                                            onChange={handleChange}
                                                            required />
                                                    </div>
                                                    <button type="submit" className="btn btn-warning col-2 text-center" data-bs-dismiss="modal"> Add</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal