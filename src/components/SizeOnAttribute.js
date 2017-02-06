import React from 'react';
import {
    embedProps
} from 'react-sigma/lib/tools';

//type Props = {
//    attribute: String,
//    sigma ? : sigma
//};

/**
 **/

class SizeOnAttribute extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
        this.updateSize(props);
    }

    componentWillReceiveProps(props: Props) {
        this.updateSize(props);
    }

    updateSize(props) {
        const s = props.sigma;
        let minSize = Number.MAX_SAFE_INTEGER;
        s.graph.nodes().forEach(node => {
            minSize = Math.min(minSize, node[props.attribute]);
        });
        s.graph.nodes().forEach(node => {
            node.size = node[props.attribute] - minSize;
        });
    }

    render() {
        return (
            <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
        );
    }
}

export default SizeOnAttribute;
