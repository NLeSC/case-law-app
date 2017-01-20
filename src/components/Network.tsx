import * as React from 'react';
import {public_url} from '../public_url';
const {Sigma, LoadJSON, ForceAtlas2, RandomizeNodePositions, RelativeSize, EdgeShapes, NOverlap} = require('react-sigma');
//import ForceLayoutNoverlap from './ForceLayoutNoverlap';

class Network extends  React.Component<{}, {}>  {
  render() {
    return (
    <div className="Network">
      <Sigma renderer="canvas" style={{maxWidth:"inherit", height:"700px"}}
            settings={{minNodeSize:3, minArrowSize:4, defaultEdgeColor:'#000'}}>
        <EdgeShapes default="arrow"/>
        <LoadJSON path={"../../data.json"}> 
            <RandomizeNodePositions>
                <ForceAtlas2 timeout={3000}/>
                <RelativeSize initialSize={15}/>
            </RandomizeNodePositions>
          
        </LoadJSON>
      </Sigma>
    </div>
    );
  }
}

export default Network;
