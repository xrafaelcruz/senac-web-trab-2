import React from "react";

const Errors = ({ error, field }) => (
    <div className="invalid-feedback">
        {error && error.type === 'required' && (
            <>Campo obrigatório</>
        )}
    </div>
);

export default Errors;
