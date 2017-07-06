import React from 'react';
import {
    Sigma,
    EdgeShapes,
    Filter,
    NOverlap
} from 'react-sigma';
import ForceAtlas2 from './ForceAtlas2';
import GraphProperties from './GraphProperties';
import SizeOnAttribute from './SizeOnAttribute';
import ColorOnAttribute from './ColorOnAttribute';
import EmptyComponent from './utils.js';

class SigmaNetwork extends Sigma {

    constructor(props) {

        super(props);
        this.getVisibleNodes = this.getVisibleNodes.bind(this);
    }


    getVisibleNodes() {
        const visibleNodes = [];
        if (this.props.graph.nodes) {
            this.props.graph.nodes.forEach(node => {
                let sigmaNode = this.sigma.graph.nodes(node.id);
                if (!sigmaNode.hidden) {
                    visibleNodes.push(node);
                }
            });
        }
        return visibleNodes;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filterState !== this.props.filterState) {
            this.props.setVisibleNodes(this.getVisibleNodes());
        }
    }

    componentDidMount() {
        this.props.setVisibleNodes(this.getVisibleNodes());
    }

    render() {
        const nodesByIndegree = indegree => {
            return node => "in_degree" in node && indegree ? (node.in_degree >= indegree[0]) && (node.in_degree <= indegree[1]) : true;
        };

        const nodesBySliderValue = (att, minValue, maxValue) => {
            return node => {
                if (att in node) {
                    let isLarger = minValue == null ? true : (parseInt(node[att], 10) >= minValue);
                    let isSmaller = maxValue == null ? true : (parseInt(node[att], 10) <= maxValue);
                    return isLarger && isSmaller;
                }
                return true;
            };
        };

        const nodesBySubject = subject => {
            const subjects = subject.map(s => s.value);
            return node => {
                if (subjects.length === 0) {
                    return true;
                } else {
                    return subjects.includes(node.subject);
                }
            };
        };

        const nodesByCreator = creator => {
            const creators = creator.map(s => s.value);
            return node => {
                if (creators.length === 0) {
                    return true;
                } else {
                    return creators.includes(node.creator);
                }
            };
        };

        const nodesByCommunity = community => {
            const communities = community.map(s => s.value);
            return node => {
                if (communities.length === 0) {
                    return true;
                } else {
                    return communities.includes(node.community);
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


        const nodesBy = (indegree, subject, creator, community, sliderAttributeValue, minSliderValue, maxSliderValue, filterSelected) => {
            return node => nodesByIndegree(indegree)(node) &&
                nodesBySliderValue(sliderAttributeValue, minSliderValue, maxSliderValue)(node) &&
                nodesBySubject(subject)(node) &&
                nodesByCreator(creator)(node) &&
                nodesByCommunity(community)(node) &&
                nodesBySelected(filterSelected)(node);
        };



        const {
            inDegreeValue,
            subjectValue,
            creatorValue,
            communityValue,
            sliderAttributeValue,
            minSliderValue,
            maxSliderValue,
            sizeAttributeValue,
            colorAttributeValue,
            filterSelected
        } = this.props.filterState;
        const nrNodes = this.props.graph.nodes.length;
        const nrEdges = this.props.graph.edges.length;
        const iterationsPerRender = Math.max(Math.ceil(Math.log(nrEdges) / Math.log(10)), 1);
        const timeout = Math.max(nrNodes * 25, 3000);
        let forceLayout = <EmptyComponent/>; //<span></span>;
        if (this.props.mountLayout) {
            forceLayout = <ForceAtlas2 
                                iterationsPerRender={iterationsPerRender}  timeout={timeout}   gravity={1.5}                
                                scalingRatio={1.3} rerun={false} >    
                            <NOverlap 
                                nodeMargin={1.0} duration={1000} speed={5} maxIterations={50} gridSize={20} easing="quadraticInOut"
                                />
                         </ForceAtlas2>
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
                                    <Filter nodesBy={nodesBy(inDegreeValue, subjectValue, creatorValue, communityValue, sliderAttributeValue, minSliderValue, maxSliderValue, filterSelected)}/>
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
