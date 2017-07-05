import React from 'react';
import {
    embedProps
} from 'react-sigma/lib/tools';



class GraphProperties extends React.Component {


    constructor(props: Props) {
        super(props);
        this.getGraphProperties = this.getGraphProperties.bind(this);
        this.getcolorAttributes = this.getcolorAttributes.bind(this);
        this.getSliderAttributes = this.getSliderAttributes.bind(this);
    }


    componentDidMount() {
        const graphProps = this.getGraphProperties();
        this.props.onInitialization(graphProps);
    }

    getGraphProperties() {
        const s = this.props.sigma;
        let minInDegree = Number.MAX_SAFE_INTEGER,
            maxInDegree = 0;
        const subjectCategories = {};
        const creatorCategories = {};
        const communityCategories = {};
        const sliderAttributes = this.getSliderAttributes();
        let sliderMinMaxValues = {};
        sliderAttributes.forEach(att => {
            sliderMinMaxValues[att] = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
        })

        s.graph.nodes().forEach(node => {
            const inDegree = s.graph.degree(node.id, "in");
            maxInDegree = Math.max(maxInDegree, inDegree);
            minInDegree = Math.min(minInDegree, inDegree);
            sliderAttributes.forEach(att => {
                sliderMinMaxValues[att][0] = Math.min(sliderMinMaxValues[att][0], node[att]);
                sliderMinMaxValues[att][1] = Math.max(sliderMinMaxValues[att][1], node[att]);
            })
            const subj_split = node.subject.split("#");
            subjectCategories[node.subject] = subj_split[subj_split.length - 1];
            const creator_split = node.creator.split("/");
            creatorCategories[node.creator] = creator_split[creator_split.length - 1];
            if (node.community) {
                communityCategories[node.community] = node.community;
            }
        });
        return {
            minInDegree: 0,
            maxInDegree: maxInDegree,
            subjectCategories: subjectCategories,
            creatorCategories: creatorCategories,
            communityCategories: communityCategories,
            sizeAttributes: this.getSizeAttributes(),
            colorAttributes: this.getcolorAttributes(),
            sliderMinMaxValues: sliderMinMaxValues
        };
    }

    getSizeAttributes() {
        const attributes = ['degree', 'in_degree', 'out_degree', 'year', 'hubs', 'authorities', 'betweenness_centrality', 'closeness_centrality', 'count_annotation', 'rel_in_degree', 'pagerank'];
        // Check if first node contains these attributes
        const s = this.props.sigma;
        let exampleNode = [];
        if (s.graph.nodes().length > 0) {
            exampleNode = s.graph.nodes()[0];
        }
        const filteredAttributes = attributes.filter(att => {
            return (att in exampleNode);
        });
        return filteredAttributes;
    }

    getcolorAttributes() {
        const attributes = ['creator', 'subject', 'community', 'degree', 'in_degree', 'out_degree', 'year', 'hubs', 'authorities', 'betweenness_centrality', 'closeness_centrality', 'count_annotation', 'rel_in_degree', 'pagerank'];
        // Check if first node contains these attributes
        const s = this.props.sigma;
        let exampleNode = [];
        if (s.graph.nodes().length > 0) {
            exampleNode = s.graph.nodes()[0];
        }
        const filteredAttributes = attributes.filter(att => {
            return (att in exampleNode);
        });
        return filteredAttributes;
    }

    getSliderAttributes() {
        // TODO: include non-discrete attributes
        const attributes = ['degree', 'out_degree', 'year', 'count_annotation'];
        // Check if first node contains these attributes
        const s = this.props.sigma;
        let exampleNode = [];
        if (s.graph.nodes().length > 0) {
            exampleNode = s.graph.nodes()[0];
        }
        const filteredAttributes = attributes.filter(att => {
            return (att in exampleNode);
        });
        return filteredAttributes;
    }

    render() {
        return (
            <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
        );
    }

}

export default GraphProperties;
