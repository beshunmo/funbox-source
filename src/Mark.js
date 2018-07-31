import React, { Component } from 'react';

import './Mark.css';

class Mark extends Component {
    _removePlacemark = () => {
        this.props.removePlacemark(this.props.id);
    }

    handleDragStart = (evt) => {
        evt.dataTransfer.setData("id", this.props.id);
    }

    handleDragOver = (evt) => {
        evt.preventDefault();
    }

    handleDrop = (evt) => {
        let id = evt.dataTransfer.getData("id");
        let fallId = this.props.id;

        this.props.handlePlacemarkNameDrag(+id, +fallId);
    }
    
    render() {
        return (
            <div
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
                draggable="true"
                className="mark-name"
            >
                <span>{ this.props.name }</span>
                <button onClick={this._removePlacemark}>x</button>
            </div>
        );
    }
}

export default Mark;