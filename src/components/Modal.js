import React from 'react';

const modal = ( props ) => (
    <div>
        <div
            className="Modal"
            style={{
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </div>
);

export default modal;