import React from 'react';

/*
This helper component can be used if a component should be unmountent,
so you want to render an empty component. Just rendering 'null' gives errors in some cases.
*/
class EmptyComponent extends React.Component {

    render() {
        return null;
    }
}

export default EmptyComponent;
