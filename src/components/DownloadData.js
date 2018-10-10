import React from 'react';
import Papa from 'babyparse';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from './Icons';
class DownloadData extends React.Component {

    constructor(props) {
        super(props);
        this.dataToCSV = this.dataToCSV.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.onDownload = this.onDownload.bind(this);
    }

    dataToCSV(data) {
        //TODO: filter columns to download
        const csvtext = Papa.unparse(data);
        return csvtext;
    }


    // from http://stackoverflow.com/questions/283956/
    saveAs(uri, filename) {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            document.body.appendChild(link); //Firefox requires the link to be in the body
            link.download = filename;
            link.href = uri;
            link.click();
            document.body.removeChild(link); //remove the link when done
        } else {
            location.replace(uri);
        }
    }

    onDownload() {
        const data = this.props.data;
        const csvContent = this.dataToCSV(data);
        const fileName = "nodes.csv";
        let blob = new Blob([csvContent], {
            type: "application/csv"
        })
        const url = URL.createObjectURL(blob)
        this.saveAs(url, fileName)
    }

    render() {
        /*<button type="button" onClick={this.onClick}>Load new data</button>*/
        return (
            // <button onClick={this.onDownload}>
            //   Download filtered nodes
            //   </button>
            
                <FABButton colored mini onClick={this.onDownload}>
                    <Icon  icon="download" />
                </FABButton>
           
        );
    }
}

export default DownloadData;
