import React from 'react';
import './App.css';

import Network from './components/Network';
import AttributesPane from './components/AttributesPane';
import FilterPane from './components/FilterPane';
import LoadData from './components/LoadData';
import DownloadData from './components/DownloadData';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleActiveNodeChange = this.handleActiveNodeChange.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.setFilterValues = this.setFilterValues.bind(this);
        this.setDefaultStateValues = this.setDefaultStateValues.bind(this);
        this.handleLoadData = this.handleLoadData.bind(this);
        this.doneLoading = this.doneLoading.bind(this);
        this.doneRemounting = this.doneRemounting.bind(this);
        this.resetFilterValues.bind(this);
        this.getDefaultFilterValues = this.getDefaultFilterValues.bind(this);
        this.getNrVisibleNodes = this.getNrVisibleNodes.bind(this);
        this.setVisibleNodes = this.setVisibleNodes.bind(this);
        this.deactivate = this.deactivate.bind(this);
        const data = require('./data/data.json');
        this.state = {
            data: data,
            loading: false,
            mountLayout: true,
            activeNode: {},
            filterState: this.getDefaultFilterValues(),
            graphProps: {},
            visibleNodes: []
        };
    }

    handleActiveNodeChange(activeNode) {
        this.setState({
            activeNode
        });
    }

    clearSelection() {
        console.log('Clear selection');
    }

    handleFilterChange(newFilterState) {
        // If the layout needs to be adjust, unmount the layout
        if (newFilterState.minSliderValue || newFilterState.maxSliderValue) {
            if (this.state.filterState.adjustLayout) {
                this.setState({
                    "mountLayout": false
                });
            }
        }

        // Merge the new filter state into the old one
        this.setState((prevState, props) => {
            const mergedFilterState = {};
            const prevFilterState = prevState.filterState;
            for (let attrname in prevFilterState) {
                if ({}.hasOwnProperty.call(prevFilterState, attrname)) {
                    mergedFilterState[attrname] = prevFilterState[attrname];
                }
            }
            for (let attrname in newFilterState) {
                if ({}.hasOwnProperty.call(newFilterState, attrname)) {
                    mergedFilterState[attrname] = newFilterState[attrname];
                }
            }
            return {
                filterState: mergedFilterState
            };

        });
    }

    setFilterValues(graphProps) {
        this.setState({
            graphProps: graphProps
        });
        this.setDefaultStateValues();

    }

    setDefaultStateValues() {
        const defaultValues = this.getDefaultFilterValues();
        this.setState((prevState, props) => {
            const filterState = prevState.filterState;
            filterState.sliderAttributeValue = filterState.sliderAttributeValue || defaultValues.sizeAttributeValue;
            filterState.minSliderValue = filterState.minSliderValue || defaultValues.minSliderValue;
            filterState.maxSliderValue = filterState.maxSliderValue || defaultValues.maxSliderValue;
            filterState.inDegreeValue = filterState.inDegreeValue || [prevState.graphProps.minInDegree, prevState.graphProps.maxInDegree];
            filterState.subjectValue = filterState.subjectValue || defaultValues.subjectValue;
            filterState.creatorValue = filterState.creatorValue || defaultValues.creatorValue;
            filterState.communityValue = filterState.communityValue || defaultValues.communityValue;
            filterState.sizeAttributeValue = filterState.sizeAttributeValue || defaultValues.sizeAttributeValue;
            filterState.colorAttributeValue = filterState.colorAttributeValue || defaultValues.colorAttributeValue;
            return {
                filterState: filterState
            };
        });
    }

    getDefaultFilterValues() {
        const filterState = {
            sizeAttributeValue: "in_degree",
            colorAttributeValue: "community",
            sliderAttributeValue: "year",
            subjectValue: [],
            creatorValue: [],
            communityValue: [],
            adjustLayout: false,
            filterSelected: false,
            minSliderValue: null,
            maxSliderValue: null
        };
        return filterState;

    }
    resetFilterValues() {
        this.setState({
            filterState: this.getDefaultFilterValues()
        });
    }

    handleLoadData(data) {
        console.log("Load new data");
        this.resetFilterValues();
        this.setState({
            data: data,
            loading: true
        });
    }

    doneLoading() {
        this.setState({
            loading: false
        });
    }

    doneRemounting() {
        this.setState({
            mountLayout: true
        });
    }


    getNrVisibleNodes() {
        const nrNodes = this.state.data.nodes.length;
        const nrVisibleNodes = this.state.visibleNodes.length;
        return [nrNodes, nrVisibleNodes];
    }

    setVisibleNodes(visibleNodes) {
        this.setState({
            visibleNodes: visibleNodes
        })
    }

    deactivate() {
        this.setState({
            activeNode: {}
        });
    }

    render() {
        const {
            activeNode,
            filterState,
            graphProps,
            data,
            loading,
            mountLayout,
            visibleNodes
        } = this.state;
        const title = data.title || "Network";
        const version = require('./../package.json').version;
        const version_url = "https://github.com/NLeSC/case-law-app/releases";

        return (
            <div className="App">
                <div className="App-header">
                    <div className="App-title">
                      <h3>Case Law Analytics - {title}</h3>
                    </div>
                    <div className="App-info">
                      <p><a href={version_url} target="_blank">Version {version}</a></p>
                     <p> <a href="https://github.com/NLeSC/case-law-app" target="_blank">Source code</a> </p>
                    </div>
                </div>
            
                <div className="App-filter-pane">
                    <div className="App-form">
                        <LoadData
                          onClick={this.handleLoadData}
                        />
                    <DownloadData data={visibleNodes}/>
                    </div>
                    Showing {visibleNodes.length} / {data.nodes.length} nodes
                    <FilterPane onChange={this.handleFilterChange}
                                filterState={filterState}
                                graphProps={graphProps} 
                                clearSelection={this.clearSelection}/>
            
                 </div>   
                <div className="App-network">
                    <Network onChange={this.handleActiveNodeChange} filterState={filterState} selectedNode={activeNode}
                            onInitialization={this.setFilterValues} loading={loading} doneLoading={this.doneLoading}
                            doneRemounting={this.doneRemounting}
                            mountLayout={mountLayout}
                            data={data}
                            setVisibleNodeFunction={this.setVisibleNodeFunction}
                            setVisibleNodes={this.setVisibleNodes}
                            />
                </div>
                <div className="App-attribute-pane">
                    <AttributesPane activeNode={activeNode} deactivate={this.deactivate}/>
                </div>
            </div>
        );
    }
}

export default App;
