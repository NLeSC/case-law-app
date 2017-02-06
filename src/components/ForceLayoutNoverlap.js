import React from 'react'
import sigma from 'react-sigma/sigma/main'
import {
    embedProps
} from 'react-sigma/lib/tools'
import 'react-sigma/sigma/layout.forceAtlas2'
import 'react-sigma/sigma/plugins.animate'
import 'react-sigma/sigma/layout.noverlap'

type State = {
    running: boolean,
    forceAtlasRunning: boolean,
    noverlapRunning: boolean,
    timer ? : number,
    drawEdges ? : ? boolean
};

type Props = {
    //forceatlas2 props
    worker: boolean,
    barnesHutOptimize ? : boolean,
    barnesHutTheta ? : number,
    adjustSizes ? : boolean,
    iterationsPerRender ? : number,
    linLogMode: boolean,
    outboundAttractionDistribution ? : boolean,
    edgeWeightInfluence ? : number,
    scalingRatio ? : number,
    strongGravityMode ? : boolean,
    slowDown ? : number,
    gravity ? : number,
    timeout ? : number,

    // noverlap props
    nodes ? : Array < Sigma$Node > ,
    nodeMargin ? : number,
    scaleNodes ? : number,
    gridSize ? : number,
    permittedExpansion ? : number,
    speed ? : number,
    maxIterations ? : number,
    easing ? : Sigma$Easing,
    duration ? : number,

    sigma ? : sigma
};

type DefaultProps = {
    worker: boolean,
    linLogMode: boolean
};

/**
ForceLayoutNoverlap component, starts ForceAtlas2 sigma plugin once component is mounted.
When it's finished it starts the Noverlap layout.

A large part of this code is copied from https://github.com/dunnock/react-sigma/blob/master/src/ForceAtlas2.js

It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.
It accepts all the parameters of ForceAtlas2 and Noverlap described on its github page:
@param {boolean} [worker=true]           Use a web worker to run calculations in separate thread
@param {boolean} barnesHutOptimize  Use the algorithm's Barnes-Hut to improve repulsion's scalability
									This is useful for large graph but harmful to small ones.
@param {number} barnesHutTheta
@param {boolean} adjustSizes
@param {number} iterationsPerRender
@param {boolean} [linLogMode=true]
@param {boolean} outboundAttractionDistribution
@param {number} edgeWeightInfluence
@param {number} scalingRatio
@param {boolean} strongGravityMode
@param {number} gravity
@param {number} slowDown
@param {number} timeout   how long algorythm should run. default=graph.nodes().length * 10
@param {number} [nodeMargin=5]    additional minimum space to apply around each and every node
@param {number} [scaleNodes=1.2]  multiplier,  larger nodes will have more space around
@param {number} [gridSize=20]   number of rows and columns to use when dividing the nodes up into cell
@param {number} [permittedExpansion=1.1]  maximum ratio to apply to the bounding box
@param {number} speed     larger value increases the speed at the cost of precision
@param {number} maxIterations  iterations to run the algorithm for before stopping it
@param {number} easing     camera easing type for camera transition
@param {number} duration     duration of the transition for the easing method
[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.forceAtlas2)
**/


class ForceLayoutNoverlap extends React.Component {
    state: State;
    props: Props;
    static defaultProps: DefaultProps = {
        worker: true,
        linLogMode: true
    }

        constructor(props: Props) {
        super(props)
        this.state = {
            running: false,
            forceAtlasRunning: false,
            noverlapRunning: false
        }
        this._isMounted = false;
    }

        componentDidMount() {
        this._isMounted = true;
        this._refreshGraph();
    }

        componentDidUpdate(prevProps: Props, prevState: State) {
        let s = this.props.sigma
        if (prevState.running && !this.state.running && s) {
            s.stopForceAtlas2()
            s.settings({
                drawEdges: prevState.drawEdges === false ? false : true
            })
            s.refresh();
        }
    }

        componentWillUnmount() {
        if (this.props.sigma) {
            this.props.sigma.killForceAtlas2()
            this.props.sigma.stopNoverlap()
        }
        if (this.state.timer) clearTimeout(this.state.timer);
        this._isMounted = false;
    }

    //TODO: Add composition of child components after timeout
        render() {
        if (this.state.running)
            return null
        return <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
    }


        _refreshGraph() {
        let s = this.props.sigma
        if (!sigma || !s) return

        let drawEdges = s.settings("drawEdges")
        if (s.graph.edges().length > 1000)
            s.settings({
                drawEdges: false
            })

        s.startForceAtlas2(this._stripOptions(this.props));
        // TODO: convert running status to state
        let timer = setTimeout(() => {
            console.log('stop force layout');
            let listener = s.configNoverlap(this._stripOptions(this.props))
            listener.bind('stop', () => {
                console.log('stop noverlap');
                if (this._isMounted) {
                    this.setState({
                        running: false
                    })
                }

            })
            s.startNoverlap()
            this.setState({
                timer: undefined
            })
        }, this.props.timeout || s.graph.nodes().length * 8);
        this.setState({
            running: true,
            timer,
            drawEdges
        })
    }

    //strip force atlas options from component props
        _stripOptions(props: Props): Props {
        return Object.assign({}, props, {
            sigma: undefined
        })
    }

}

export default ForceLayoutNoverlap;
