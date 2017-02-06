import React from 'react';


class AttributesPane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.data.node);
    }

    render() {
        const {
            title,
            id,
            date,
            articles_s,
            abstract
        } = this.props.activeNode;
        if (this.props.activeNode.id) {
            return (
                <div>
                    <h4><a href={id}>{title}</a> </h4>
                    <div> <b>Date: </b>{date} </div>
                    <div> <b>Articles: </b> {articles_s} </div>
                    <div> <b>Abstract: </b>{abstract}</div>
                </div>
            );
        } else {
            return (
                <div>{"Click on node"}</div>
            );
        }
    }
}

export default AttributesPane;
