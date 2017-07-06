import React from 'react';


class AttributesPane extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.data.node);
    }

    handleClose() {
        this.props.deactivate()
    }

    render() {
        const {
            title,
            id,
            date,
            articles,
            community,
            abstract
        } = this.props.activeNode;
        const articles_s = articles ? articles.join(", ") : "";
        if (this.props.activeNode.id) {
            return (
                <div>
                    <button className='close' onClick={this.handleClose}>x</button>
                    <h4><a href={id} target="_blank">{title}</a> </h4>
                    <div> <b>Date: </b>{date} </div>
                    <div> <b>Articles: </b> {articles_s} </div>
                    <div> <b>Community: </b> {community} </div>
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
