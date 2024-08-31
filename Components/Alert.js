import React from "react";

const Alert = (props) => {
    return (
        <div style={{ height: '50px'}} className='d-block'>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                {props.alert.msg}
            </div>}
        </div>
    )
};

export default Alert;
