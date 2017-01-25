import React, { Component } from 'react';
import {Sigma, LoadJSON, RandomizeNodePositions, RelativeSize, EdgeShapes, Filter} from 'react-sigma'
import ForceLayoutNoverlap from './ForceLayoutNoverlap';
import GraphProperties from './GraphProperties'



class Network extends Component {


    constructor(props: Props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);
        this.updateFilterProps = this.updateFilterProps.bind(this);
        //this.componentDidUpdate = this.componentDidUpdate.bind(this);
	}

    handleChange(e){
        this.props.onChange(e.data.node);
    }
    
    updateFilterProps(graphProps){
        //const minInDegree = 0;
        //const maxInDegree = 5;
        this.props.onInitialization(graphProps);
    }

  render() {
      
    var _onGraphLoaded = function() {
        var s = this.sigma;
        var i,
                nodes = s.graph.nodes(),
                len_n = nodes.length;
        
        var maxInDegree = 0;
        for (i = 0; i < len_n; i++) {
            var id_split = nodes[i].id.split('=');
            nodes[i].ecli = id_split[id_split.length -1];
            nodes[i].articles_s = Object.keys(nodes[i].articles).join(", ");
            nodes[i].title = nodes[i].title===""? nodes[i].ecli : nodes[i].title;
            nodes[i].label = nodes[i].ecli;
            nodes[i].indegree = s.graph.degree(nodes[i].id, 'in');
            maxInDegree = Math.max(maxInDegree, nodes[i].indegree); 
            
            // layout attributes
            nodes[i].x = Math.random();
            nodes[i].y = Math.random();
            nodes[i].size = 2*s.graph.degree(nodes[i].id);
            nodes[i].color = '#000';
            
        }
        s.graph.edges().forEach(function(edge){
            edge.type = "arrow";
            edge.color = '#999';
        });
        
    }
    
    const filterInDegree = this.props.filterState.inDegreeValue;
    var _nodesByIndegree = function(indegree){
        return node => "indegree" in node? (node.indegree >= indegree) : true;
    }
    return (
    <div className="Network">
      <Sigma renderer="canvas" style={{maxWidth:"inherit", height:"700px"}}
            settings={{minNodeSize:3, minArrowSize:4, defaultEdgeColor:'#000'}}
            onClickNode={this.handleChange} 
            updateFilterProps={this.updateFilterProps}>
        <EdgeShapes default="arrow"/>
        <LoadJSON path={String(process.env.PUBLIC_URL) + "/data.json"} onGraphLoaded={_onGraphLoaded}> 
            <GraphProperties onInitialization={this.updateFilterProps}>
                <RandomizeNodePositions>
                        <Filter nodesBy={_nodesByIndegree(filterInDegree)}/>
                        <ForceLayoutNoverlap iterationsPerRender={1} timeout={3000} nodeMargin={5.0} scaleNodes={1.3} easing='quadraticInOut' duration={500}/>
                        <RelativeSize initialSize={15}/>
                    </RandomizeNodePositions>
            </GraphProperties>
          
        </LoadJSON>
      </Sigma>
    </div>
    );
  }
}

export default Network;
