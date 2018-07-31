import React, { Component } from 'react';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';

import MarkList from './MarkList';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      ymap: {
        center: [55.76, 37.64],
        zoom: 13
      },
      marks: [],
      route: null
    };

    this.mapRef = React.createRef();

    this.addPlaceMark = this.addPlaceMark.bind(this);
    this.removePlacemark = this.removePlacemark.bind(this);
    this.handlePlacemarkMoving = this.handlePlacemarkMoving.bind(this);
    this.handlePlacemarkNameDrag = this.handlePlacemarkNameDrag.bind(this);
  }

  addPlaceMark(name) {
    let newMark = {
      id: Math.random(),
      coordinates: this.mapRef.getCenter(),
      name: name
    };

    this.setState({
      marks: [...this.state.marks, newMark]
    });
  }

  removePlacemark(id) {
    const marks = this.state.marks.filter(mark => mark.id !== id);

    this.setState({
      marks: marks
    });
  }

  handlePlacemarkMoving(id, coordinates) {
    const marks = this.state.marks.map(mark => {
      let newMark;
      if (mark.id === id) {
        newMark = { ...mark, coordinates };
      } else {
        newMark = mark;
      }
      return newMark;
    });
    
    this.setState({
      marks: marks
    });
  }

  handlePlacemarkNameDrag(id1, id2) {
    let mark = this.state.marks.filter(mark => mark.id === id1)[0];
    let marks = this.state.marks.filter(mark => mark.id !== id1);
    let index = this.state.marks.map(mark => mark.id).indexOf(id2);
    let newMarks = [...marks.slice(0, index), mark, ...marks.slice(index)];

    this.setState({
      marks: newMarks
    });
  }

  render() {
    return (
      <div className="App">
        <MarkList marks={this.state.marks} addPlaceMark={this.addPlaceMark} removePlacemark={this.removePlacemark} handlePlacemarkNameDrag={this.handlePlacemarkNameDrag} />
        <div className="ymap">
          <YMaps>
            <Map width={'100%'} height={'100%'} state={this.state.ymap} instanceRef={elem => this.mapRef = elem}>
              {
                this.state.marks.map(mark => {
                  return (
                    <Placemark
                      key={mark.id}
                      geometry={{
                        coordinates: mark.coordinates
                      }}
                      properties={{
                        balloonContent: mark.name
                      }}
                      options={{
                        draggable: true
                      }}
                      onGeometryChange={(evt) => this.handlePlacemarkMoving(mark.id, evt.originalEvent.target.geometry.getCoordinates())}
                    />
                  );
                })
              }
              {
                <Polyline
                  geometry={{
                    coordinates: this.state.marks.map(mark => mark.coordinates)
                  }}
                />
              }
            </Map>
          </YMaps>
        </div>
      </div>
    );
  }
}

export default App;