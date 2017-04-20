import React from 'react';
import {
    embedProps
} from 'react-sigma/lib/tools';
import colormap from 'colormap';

//type Props = {
//    attribute: String,
//    sigma ? : sigma
//};

/**
 **/

class ColorOnAttribute extends React.Component {
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
        let minValue = Number.MAX_SAFE_INTEGER;
        let maxValue = 0;
        s.graph.nodes().forEach(node => {
            minValue = Math.min(minValue, node[props.attribute]);
            maxValue = Math.max(maxValue, node[props.attribute]);
        });

        //update color
        const nshades = 16;
        const scale = (nshades - 1) / (maxValue - minValue)
        const options = {
            colormap: 'chlorophyll', // pick a builtin colormap or add your own 
            nshades: nshades, // how many divisions 
            format: 'hex', // "hex" or "rgb" or "rgbaString" 
            alpha: 1 // set an alpha value or a linear alpha mapping [start, end] 
        };
        const cg = colormap(options);
        s.graph.nodes().forEach(node => {
            const index = (node[props.attribute] - minValue) * scale;
            node.oldcolor = cg[Math.floor(index)];
            if (!node.selected) {
                node.color = node.oldcolor;
            }
        });

    }


    render() {
        return (
            <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
        );
    }
}

export default ColorOnAttribute;
