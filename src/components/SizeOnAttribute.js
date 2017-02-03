import React from 'react'
import sigma from 'react-sigma/sigma/main'
import {
    embedProps
} from 'react-sigma/lib/tools'

type Props = {
    attribute: String,
    sigma ? : sigma
};

/**
 **/

class SizeOnAttribute extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
        this._updateSize(props);
    }

    componentWillReceiveProps(props: Props) {
        this._updateSize(props);
    }

    _updateSize(props) {
        var s = props.sigma;
        var minSize = Number.MAX_SAFE_INTEGER;
        s.graph.nodes().forEach(function (n) {
            minSize = Math.min(minSize, n[props.attribute]);
        });
        s.graph.nodes().forEach(function (n) {
            n.size = n[props.attribute] - minSize;
        });
    }

    render() {
        return (
            <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
        );
    }
}

export default SizeOnAttribute;
