import React, { Component } from 'react';


class AttributesPane extends Component {
  
    constructor(props) {
        super(props);
        this.state = {};
      }
    
    render() {
        return (
            <div>{(this.props.activeNode)? this.props.activeNode.title : "None selected"}</div>
        );
      }
}

export default AttributesPane;
