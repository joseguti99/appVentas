import React, { useState } from 'react'
import { BsCaretLeftFill, BsCaretRightFill  } from "react-icons/bs";

const ContainerPagination = ({ page, setPage, maxItems }) => {
    const [input, setInput] = useState(1)

    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setPage(parseInt(page) + 1);
    };

    const previousPage = () => {
        setInput(parseInt(input) - 1);
        setPage(parseInt(page) - 1);
    };

    const onKeyDown = e => {
        if (e.keyCode == 13) {
            setPage(parseInt(e.target.value));
            if (
                parseInt(e.target.value < 1) ||
                parseInt(e.target.value) > Math.ceil(maxItems) ||
                isNaN(parseInt(e.target.value))
            ) {
                setPage(1);
                setInput(1);
            } else {
                setPage(parseInt(e.target.value));
            }
        }
    };

    const onChange = e => {
        setInput(e.target.value);
    };

    return (
        <div className='container pb-2'>
            <div className='row justify-content-center mb-2'>
                <div className='col-2 col-lg-1'>
                    <button 
                        disabled={page === 1 || page < 1} onClick={previousPage} 
                        className="btn btn-dark">
                        <BsCaretLeftFill className='text-white '/>
                    </button>
                </div>
                <div className='col-2 col-lg-1justify-content-center'>
                    <input
                        onChange={e => onChange(e)}
                        onKeyDown={e => onKeyDown(e)}
                        className="form-control text-center fs-th"
                        name="page"
                        autoComplete="off"
                        value={input}
                    />
                </div>
                <div className='col-2 col-lg-1'>
                    <button
                        disabled={page === Math.ceil(maxItems) || page > Math.ceil(maxItems)}
                        className="btn btn-dark"
                        onClick={nextPage}>
                            <BsCaretRightFill className='text-white '/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContainerPagination