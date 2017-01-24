import React, { Component } from 'react';
import {Sigma, LoadJSON, RandomizeNodePositions, RelativeSize, EdgeShapes, Filter} from 'react-sigma'
import ForceLayoutNoverlap from './ForceLayoutNoverlap';
//import Filter from './Filter'



class Network extends Component {


    constructor(props: Props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);
	}

    handleChange(e){
        this.props.onChange(e.data.node);
    }

  render() {
      
    var _onGraphLoaded = function() {
        var s = this.sigma;
        console.log(s);
        var i,
                nodes = s.graph.nodes(),
                len_n = nodes.length;

        for (i = 0; i < len_n; i++) {
            var id_split = nodes[i].id.split('=');
            nodes[i].ecli = id_split[id_split.length -1];
            nodes[i].articles_s = Object.keys(nodes[i].articles).join(", ");
            nodes[i].title = nodes[i].title===""? nodes[i].ecli : nodes[i].title;
            nodes[i].label = nodes[i].ecli;
            nodes[i].indegree = s.graph.degree(nodes[i].id, 'in');
            
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
    
    var _nodesByIndegree = function(indegree){
        return node => "indegree" in node? (node.indegree >= indegree) : true;
        
    }
      
    const filterInDegree = this.props.filterInDegree;
    console.log(filterInDegree);
    return (
    <div className="Network">
      <Sigma renderer="canvas" style={{maxWidth:"inherit", height:"700px"}}
            settings={{minNodeSize:3, minArrowSize:4, defaultEdgeColor:'#000'}}
            onClickNode={this.handleChange} >
        <EdgeShapes default="arrow"/>
        <LoadJSON path={String(process.env.PUBLIC_URL) + "/data.json"} onGraphLoaded={_onGraphLoaded}> 
            <RandomizeNodePositions>
                <Filter nodesBy={_nodesByIndegree(filterInDegree)}/>
                <ForceLayoutNoverlap iterationsPerRender={1} timeout={3000} nodeMargin={5.0} scaleNodes={1.3} easing='quadraticInOut' duration={500}/>
                <RelativeSize initialSize={15}/>
            </RandomizeNodePositions>
          
        </LoadJSON>
      </Sigma>
    </div>
    );
  }
}

export default Network;
