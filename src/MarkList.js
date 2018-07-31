import React, { Component } from 'react';
import Mark from './Mark';

import './MarkList.css';

class MarkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPlacemarkName: ''
        };
    }

    handleInputPress = (evt) => {
        if (evt.keyCode === 13) {
            this.props.addPlaceMark(this.state.newPlacemarkName);
            this.setState({
                newPlacemarkName: ''
            });
        } 
    }

    handleInputChange = (evt) => {
        this.setState({
            newPlacemarkName: evt.target.value
        });
    }

    render() {
        return (
            <div className="mark-list">
                <span>Список меток на карте</span>
                <input type="text" className="mark_name" placeholder="Название метки" onKeyDown={this.handleInputPress} value={this.state.newPlacemarkName} onChange={this.handleInputChange} /><br/>
                {
                    this.props.marks.map(mark => {
                        return (
                            <Mark 
                                key={mark.id}
                                id={mark.id}
                                name={mark.name}
                                removePlacemark={this.props.removePlacemark}
                                handlePlacemarkNameDrag={this.props.handlePlacemarkNameDrag}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default MarkList;