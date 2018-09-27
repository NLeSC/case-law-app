import React from 'react';

const modal = ( props ) => (
    <div>
        <div
            className="Modal"
            style={{
                transform: (props.show ? 'translateY(0)' : 'translateY(-60px)'),
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </div>
);

export default modal;