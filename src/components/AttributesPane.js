import React, { Component } from 'react';


class AttributesPane extends Component {
  
    constructor(props) {
        super(props);
        this.state = {};
      }
    
    render() {
        if(this.props.activeNode){
            return(
                <div>
                    <h4><a href={this.props.activeNode.id}>{this.props.activeNode.title}</a> </h4>
                    <div> {this.props.activeNode.date} </div>
                    <div> {this.props.activeNode.articles_s} </div>
                    <div> {this.props.activeNode.abstract }</div>
                </div>
            );
        }
        else {
            return (
                <div>{"None selected"}</div>
            );
        }
      }
}

export default AttributesPane;
