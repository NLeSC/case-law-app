import React from 'react';
import {
    Sigma,
    EdgeShapes,
    Filter
} from 'react-sigma';
import ForceLayoutNoverlap from './ForceLayoutNoverlap';
import GraphProperties from './GraphProperties';
import SizeOnAttribute from './SizeOnAttribute';
import ColorOnAttribute from './ColorOnAttribute';
import EmptyComponent from './utils.js';

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

        const nodesBySelected = filterSelected => {
            return node => {
                if (filterSelected) {
                    return node.selected;
                } else {
                    return true;
                }
            };
        };


        const nodesBy = (indegree, subject, minYearValue, maxYearValue, filterSelected) => {
            return node => nodesByIndegree(indegree)(node) &&
                nodesByYear(minYearValue, maxYearValue)(node) &&
                nodesBySubject(subject)(node) &&
                nodesBySelected(filterSelected)(node);
        };

        const {
            inDegreeValue,
            subjectValue,
            minYearValue,
            maxYearValue,
            sizeAttributeValue,
            colorAttributeValue,
            filterSelected
        } = this.props.filterState;

        let forceLayout = <EmptyComponent/>; //<span></span>;
        if (this.props.mountLayout) {
            forceLayout = <ForceLayoutNoverlap 
                                    iterationsPerRender={1} timeout={3000} nodeMargin={5.0} 
                                    scaleNodes={1.3} easing='quadraticInOut' maxIterations={200} 
                                    gridSize={50} duration={500} speed={5}/>
        }
        if (this.props.loading) {
            return null;
        } else {
            return (
                <div ref={this.initRenderer} style={this.props.style}>
                    <EdgeShapes default="arrow" sigma={this.sigma}/>
                    <GraphProperties onInitialization={this.props.updateFilterProps} sigma={this.sigma}>
                        <SizeOnAttribute attribute={sizeAttributeValue}>
                            <ColorOnAttribute attribute={colorAttributeValue}>
                                    <Filter nodesBy={nodesBy(inDegreeValue, subjectValue, minYearValue, maxYearValue, filterSelected)}/>
                                    {forceLayout}
                            </ColorOnAttribute>
                        </SizeOnAttribute>
                    </GraphProperties>
                </div>
            );
        }
    }
}

export default SigmaNetwork;
