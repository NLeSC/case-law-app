import React, { Component } from 'react';


class AttributesPane extends Component {
  
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
	}

    handleChange(e){
        this.props.onChange(e.data.node);
    }
    
    render() {
        if(this.props.activeNode.title){
            return(
                <div>
                    <h4><a href={this.props.activeNode.id}>{this.props.activeNode.title}</a> </h4>
                    <div> <b>Date: </b>{this.props.activeNode.date} </div>
                    <div> <b>Articles: </b> {this.props.activeNode.articles_s} </div>
                    <div> <b>Abstract: </b>{this.props.activeNode.abstract }</div>
                </div>
            );
        }
        else {
            return (
                <div>{"Click on node"}</div>
            );
        }
      }
}

export default AttributesPane;
