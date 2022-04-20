import React from 'react'
import { useState } from 'react'
import { Register } from '../../Register'

const Search = ({HanddleSearch}) => {
    return (
        <div className='input-group'>
            <input  type="text" 
                    className='form-control rounded'
                    onChange={HanddleSearch}
                    placeholder='Buscar por Nombre del Cliente' />
        </div>
    )
}

export default Search