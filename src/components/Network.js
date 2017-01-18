import React, { Component } from 'react';
import {Sigma, LoadJSON, ForceAtlas2, RandomizeNodePositions, RelativeSize, EdgeShapes, NOverlap} from 'react-sigma'
import ForceLayoutNoverlap from './ForceLayoutNoverlap';

class Network extends Component {
  render() {
    return (
    <div className="Network">
      <Sigma renderer="canvas" style={{maxWidth:"inherit", height:"700px"}}
            settings={{minNodeSize:3, minArrowSize:4, defaultEdgeColor:'#000'}}>
        <EdgeShapes default="arrow"/>
        <LoadJSON path={String(process.env.PUBLIC_URL) + "/data.json"}> 
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
