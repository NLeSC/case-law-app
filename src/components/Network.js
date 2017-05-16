import React from 'react';
import SigmaNetwork from './SigmaNetwork';


class Network extends React.Component {


    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateFilterProps = this.updateFilterProps.bind(this);
        this.setVisibleNodeFunction = this.setVisibleNodeFunction.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.props.doneLoading();
        }
        if (this.props.filterState.minYearValue !== prevProps.filterState.minYearValue) {
            this.props.doneRemounting();
        }
        if (this.props.filterState.maxYearValue !== prevProps.filterState.maxYearValue) {
            this.props.doneRemounting();
        }
    }

    handleChange(e) {
        const node = e.data.node;
        console.log(node);
        if (node.selected) {
            node.selected = false;
        } else {
            node.selected = true;
        }
        this.props.onChange(node);
    }

    updateFilterProps(graphProps) {
        this.props.onInitialization(graphProps);
    }

    setVisibleNodeFunction(visibleNodeFunction) {
        this.props.setVisibleNodeFunction(visibleNodeFunction);
    }


    onGraphLoaded(data) {
        data.nodes.forEach(node => {
            node.articles_s = node.articles.join(", ");
            node.title = node.title === "" ? node.ecli : node.title;
            let ecli_split = node.ecli.split(":");
            node.label = ecli_split[2] + ' ' + ecli_split[3];

            // layout attributes
            node.x = node.x || Math.random();
            node.y = node.y || Math.random();
            node.size = 2 * (node.degree);
            node.color = '#000';

        });
        data.edges.forEach(edge => {
            edge.type = "arrow";
            edge.color = '#999';
        });

        return data;
    }

    render() {


        if (this.props.loading) {
            return null;
        } else {
            const data = this.onGraphLoaded(this.props.data);
            return (
                <div className="Network">
                    <SigmaNetwork renderer="canvas" style={{maxWidth:"inherit", height:"700px"}}
                                    graph={data}
                                    settings={{minNodeSize:3, minArrowSize:4, defaultEdgeColor:'#000'}}
                                    onClickNode={this.handleChange} 
                                    updateFilterProps={this.updateFilterProps}
                                    filterState={this.props.filterState}
                                    loading={false}
                                    mountLayout={this.props.mountLayout}
                                    setVisibleNodeFunction={this.setVisibleNodeFunction}
                                    >           
                    </SigmaNetwork>
                </div>
            );
        }
    }
}

export default Network;
