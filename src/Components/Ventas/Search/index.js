import React from "react";
const Search = ({ HanddleSearch }) => {
    return (
        <div className="input-group">
        <input
            type="text"
            className="form-control rounded"
            onChange={HanddleSearch}
            placeholder="Buscar por ID, Cliente o Total"
        />
        </div> 
    );
};

export default Search;
