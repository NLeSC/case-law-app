import React from 'react';
import {
    Sigma,
    RandomizeNodePositions,
    EdgeShapes,
    Filter,
    LoadJSON
} from 'react-sigma'
import ForceLayoutNoverlap from './ForceLayoutNoverlap';
import GraphProperties from './GraphProperties'
import SizeOnAttribute from './SizeOnAttribute'

class SigmaNetwork extends Sigma {

    render() {
        var _nodesByIndegree = function (indegree) {
            return node => "in_degree" in node ? (node.in_degree >= indegree) : true;
        }
        var _nodesByYear = function (minYearValue, maxYearValue) {
            return function (node) {
                if ("year" in node) {
                    return (parseInt(node.year, 10) >= minYearValue && parseInt(node.year, 10) <= maxYearValue);
                }
                return true;
            }
        }
        var _nodesBySubject = function (subject) {
            return function (node) {
                if (subject === "all") {
                    return true;
                } else {
                    return node.subject === subject;
                }
            }
        }

        var _nodes_by = function (indegree, subject, minYearValue, maxYearValue) {
            return node => _nodesByIndegree(indegree)(node) &&
                _nodesByYear(minYearValue, maxYearValue)(node) &&
                _nodesBySubject(subject)(node);
        }

        const filterInDegree = this.props.filterState.inDegreeValue;
        const filterSubject = this.props.filterState.subjectValue;
        const minYearValue = this.props.filterState.minYearValue;
        const maxYearValue = this.props.filterState.maxYearValue;
        const sizeAttributeValue = this.props.filterState.sizeAttributeValue;
        const emptygraph = (!this.props.graph.edges.length && !this.props.graph.nodes.length)
        if (this.props.loading) {
            return null;
        } else if (emptygraph) {
            return (
                <div ref={this.initRenderer} style={this.props.style}>
                    <EdgeShapes default="arrow" sigma={this.sigma}/>
                    <LoadJSON path={String(process.env.PUBLIC_URL) + "/data.json"} sigma={this.sigma}> 
                        <GraphProperties onInitialization={this.props.updateFilterProps}>
                            <SizeOnAttribute attribute={sizeAttributeValue}>
                                <RandomizeNodePositions>
                                    <Filter nodesBy={_nodes_by(filterInDegree, filterSubject, minYearValue, maxYearValue)}/>
                                    <ForceLayoutNoverlap 
                                                            iterationsPerRender={1} timeout={3000} nodeMargin={5.0} 
                                                            scaleNodes={1.3} easing='quadraticInOut' duration={500}/>

                                </RandomizeNodePositions>
                            </SizeOnAttribute>
                        </GraphProperties>
                    </LoadJSON>
                </div>
            )
        } else {
            return (
                <div ref={this.initRenderer} style={this.props.style}>
                    <EdgeShapes default="arrow" sigma={this.sigma}/>
                    <GraphProperties onInitialization={this.props.updateFilterProps} sigma={this.sigma}>
                        <SizeOnAttribute attribute={sizeAttributeValue}>
                            <RandomizeNodePositions>
                                <Filter nodesBy={_nodes_by(filterInDegree, filterSubject, minYearValue, maxYearValue)}/>
                                <ForceLayoutNoverlap 
                                                iterationsPerRender={1} timeout={3000} nodeMargin={5.0} 
                                                scaleNodes={1.3} easing='quadraticInOut' duration={500}/>

                            </RandomizeNodePositions>
                        </SizeOnAttribute>
                    </GraphProperties>
                </div>
            )
        }
    }
}

export default SigmaNetwork;
