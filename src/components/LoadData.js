import React, {
    Component
} from 'react';
import FileInput from 'react-simple-file-input';


class LoadData extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onClick = this.onClick.bind(this);
    }

    onClick(e, file) {
        var filetxt = e.target.result; //fileReader.readAsDataURL(file);
        var data = JSON.parse(filetxt);
        this.props.onClick(data);
    }

    render() {

        /*<button type="button" onClick={this.onClick}>Load new data</button>*/
        return (
            <form>
                <FileInput  readAs="text" 
                            className="inputClass"
                            onLoad={this.onClick}/>
            </form>
        )
    }
}

export default LoadData;
