import React from 'react'

const uniqueElement = ({cliente, fecha}) => {
    return (
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
                            <p>{cliente}</p>
                    </tbody>
                </table>
        </div>
    )
}

export default uniqueElement