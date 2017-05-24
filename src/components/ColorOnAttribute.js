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
        this.updateColor(props);
        this.updateColorCategorical = this.updateColorCategorical.bind(this);
        this.updateColorNumerical = this.updateColorNumerical.bind(this);
    }

    componentWillReceiveProps(props: Props) {
        this.updateColor(props);
    }

    updateColor(props) {
        const s = props.sigma;
        const att = props.attribute;
        const nodes = s.graph.nodes();
        if (att === 'none') {
            nodes.forEach(node => {
                node.color_selected = 'green';
                node.color_unselected = 'dimgray';
                if (node.selected) {
                    node.color = node.color_selected;
                } else {
                    node.color = node.color_unselected;
                }
            });
        } else if (nodes.length > 0) {
            if (typeof nodes[0][att] === 'string') {
                this.updateColorCategorical(nodes, att);
            } else {
                this.updateColorNumerical(nodes, att);
            }

        }

    }

    updateColorNumerical(nodes, att) {
        let minValue = Number.MAX_SAFE_INTEGER;
        let maxValue = 0;
        nodes.forEach(node => {
            minValue = Math.min(minValue, node[att]);
            maxValue = Math.max(maxValue, node[att]);
        });

        //update color
        const nshades = 16;
        // Don't use 2 most extreme values
        const scale = (nshades - 4) / (maxValue - minValue)
        const cm_unselected = colormap({
            colormap: 'greys', // pick a builtin colormap or add your own 
            nshades: nshades, // how many divisions 
            format: 'hex', // "hex" or "rgb" or "rgbaString" 
            alpha: 1 // set an alpha value or a linear alpha mapping [start, end] 
        });
        const cm_selected = colormap({
            colormap: 'greens', // pick a builtin colormap or add your own 
            nshades: nshades, // how many divisions 
            format: 'hex', // "hex" or "rgb" or "rgbaString" 
            alpha: 1 // set an alpha value or a linear alpha mapping [start, end] 
        });
        nodes.forEach(node => {
            const index = 2 + (node[att] - minValue) * scale;
            node.color_selected = cm_selected[Math.floor(index)];
            node.color_unselected = cm_unselected[Math.floor(index)];
            if (node.selected) {
                node.color = node.color_selected;
            } else {
                node.color = node.color_unselected;
            }
        });
    }

    updateColorCategorical(nodes, att) {
        let values = [];
        nodes.forEach(node => {
            let value = node[att];
            if (values.indexOf(value) === -1) {
                values.push(value);
            }
        });

        //update color
        const nshades = Math.max(11, values.length);
        const scale = nshades / values.length;
        const cm_unselected = colormap({
            colormap: 'jet', // pick a builtin colormap or add your own 
            nshades: nshades, // how many divisions 
            format: 'rgbaString', // "hex" or "rgb" or "rgbaString" 
            alpha: 0.5 // set an alpha value or a linear alpha mapping [start, end] 
        });

        const cm_selected = colormap({
            colormap: 'jet', // pick a builtin colormap or add your own 
            nshades: nshades, // how many divisions 
            format: 'rgbaString', // "hex" or "rgb" or "rgbaString" 
            alpha: 1 // set an alpha value or a linear alpha mapping [start, end] 
        });

        nodes.forEach(node => {
            const index = Math.floor(scale * values.indexOf(node[att]));
            node.color_selected = cm_selected[index]; //'black';
            node.color_unselected = cm_unselected[index];
            if (node.selected) {
                node.color = node.color_selected;
            } else {
                node.color = node.color_unselected;
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
