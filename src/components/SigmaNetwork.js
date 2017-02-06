import React from 'react';
import {
    Sigma,
    RandomizeNodePositions,
    EdgeShapes,
    Filter,
    LoadJSON
} from 'react-sigma';
import ForceLayoutNoverlap from './ForceLayoutNoverlap';
import GraphProperties from './GraphProperties';
import SizeOnAttribute from './SizeOnAttribute';

class SigmaNetwork extends Sigma {

    render() {
        const nodesByIndegree = indegree => {
            return node => "in_degree" in node ? (node.in_degree >= indegree) : true;
        };
        const nodesByYear = (minYearValue, maxYearValue) => {
            return node => {
                if ("year" in node) {
                    return (parseInt(node.year, 10) >= minYearValue && parseInt(node.year, 10) <= maxYearValue);
                }
                return true;
            };
        };

        const nodesBySubject = subject => {
            return node => {
                if (subject === "all") {
                    return true;
                } else {
                    return node.subject === subject;
                }
            };
        };

        const nodesBy = (indegree, subject, minYearValue, maxYearValue) => {
            return node => nodesByIndegree(indegree)(node) &&
                nodesByYear(minYearValue, maxYearValue)(node) &&
                nodesBySubject(subject)(node);
        };

        const {
            inDegreeValue,
            subjectValue,
            minYearValue,
            maxYearValue,
            sizeAttributeValue
        } = this.props.filterState;
        const emptygraph = (!this.props.graph.edges.length && !this.props.graph.nodes.length);
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
                                    <Filter nodesBy={nodesBy(inDegreeValue, subjectValue, minYearValue, maxYearValue)}/>
                                    <ForceLayoutNoverlap 
                                                            iterationsPerRender={1} timeout={3000} nodeMargin={5.0} 
                                                            scaleNodes={1.3} easing='quadraticInOut' duration={500}/>

                                </RandomizeNodePositions>
                            </SizeOnAttribute>
                        </GraphProperties>
                    </LoadJSON>
                </div>
            );
        } else {
            return (
                <div ref={this.initRenderer} style={this.props.style}>
                    <EdgeShapes default="arrow" sigma={this.sigma}/>
                    <GraphProperties onInitialization={this.props.updateFilterProps} sigma={this.sigma}>
                        <SizeOnAttribute attribute={sizeAttributeValue}>
                            <RandomizeNodePositions>
                                <Filter nodesBy={nodesBy(inDegreeValue, subjectValue, minYearValue, maxYearValue)}/>
                                <ForceLayoutNoverlap 
                                                iterationsPerRender={1} timeout={3000} nodeMargin={5.0} 
                                                scaleNodes={1.3} easing='quadraticInOut' duration={500}/>

                            </RandomizeNodePositions>
                        </SizeOnAttribute>
                    </GraphProperties>
                </div>
            );
        }
    }
}

export default SigmaNetwork;
