import React from "react";
import { useState } from "react";

const useForm = () => {
    const [form, setForm] = useState({
        client:"",
        total:""
    })

    const handleChange = ({target}) => {
        const {name, value} = target

        setForm({...form, 
            [name]: value
        });
    }

    return {
        form,
        handleChange
    }
}

export default useForm;
