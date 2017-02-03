import React, { Component } from 'react';
import SigmaNetwork from './SigmaNetwork'


class Network extends Component {


    constructor(props: Props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);
        this.updateFilterProps = this.updateFilterProps.bind(this);
	}
    
    componentDidUpdate(prevProps) {
        if(this.props.data !== prevProps.data) {
          this.props.doneLoading();
        }
      }

    handleChange(e){
        this.props.onChange(e.data.node);
    }
    
    updateFilterProps(graphProps){
        this.props.onInitialization(graphProps);
    }
    
      
    _onGraphLoaded(data) {
        var i,
                nodes = data.nodes,
                len_n = nodes.length;
        
        for (i = 0; i < len_n; i++) {
            nodes[i].articles_s = nodes[i].articles.join(", ");
            nodes[i].title = nodes[i].title===""? nodes[i].ecli : nodes[i].title;
            nodes[i].label = nodes[i].ecli;
            
            // layout attributes
            nodes[i].x = Math.random();
            nodes[i].y = Math.random();
            nodes[i].size = 2*(nodes[i].degree);
            nodes[i].color = '#000';
            
        }
        data.edges.forEach(function(edge){
            edge.type = "arrow";
            edge.color = '#999';
        });
        
        return data;
    }

  render() {
    
    var data = this._onGraphLoaded(this.props.data);
  if(this.props.loading ){
        return null;
    }
    else {
        return (
        <div className="Network">
          <SigmaNetwork renderer="canvas" style={{maxWidth:"inherit", height:"700px"}}
                graph={data}
                settings={{minNodeSize:3, minArrowSize:4, defaultEdgeColor:'#000'}}
                onClickNode={this.handleChange} 
                updateFilterProps={this.updateFilterProps}
                filterState={this.props.filterState}
                loading={false}
                doneLoading={this.props.doneLoading}
            >
          </SigmaNetwork>
        </div>
        );
    }
  }
}

export default Network;
