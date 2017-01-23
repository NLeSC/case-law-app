import React, { Component } from 'react';
import {Sigma, LoadJSON, RandomizeNodePositions, RelativeSize, EdgeShapes} from 'react-sigma'
import ForceLayoutNoverlap from './ForceLayoutNoverlap';



class Network extends Component {


    constructor(props: Props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);
	}

    handleChange(e){
        this.props.onChange(e.data.node);
    }

  render() {
    var make_node_title = function(node){
        var label = node.title === "" ? node.id : node.title;
        var articles = Object.keys(node.articles).join(", ");
        if(articles.length>0){
            label = label + " -- " + articles;
        }
        return label;
    };
      
    var _onGraphLoaded = function() {
        var s = this.sigma;
        console.log(s);
        var i,
                nodes = s.graph.nodes(),
                len_n = nodes.length;

        for (i = 0; i < len_n; i++) {
            nodes[i].x = Math.random();
            nodes[i].y = Math.random();
            nodes[i].size = 2*s.graph.degree(nodes[i].id);
            nodes[i].label = make_node_title(nodes[i]);
            nodes[i].color = '#000';
        }
        s.graph.edges().forEach(function(edge){
            edge.type = "arrow";
            edge.color = '#999';
        });
    }
      
    return (
    <div className="Network">
      <Sigma renderer="canvas" style={{maxWidth:"inherit", height:"700px"}}
            settings={{minNodeSize:3, minArrowSize:4, defaultEdgeColor:'#000'}}
            onClickNode={this.handleChange} >
        <EdgeShapes default="arrow"/>
        <LoadJSON path={String(process.env.PUBLIC_URL) + "/data.json"} onGraphLoaded={_onGraphLoaded}> 
            <RandomizeNodePositions>
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
