import React from 'react';
import ReactDOM from 'react-dom';
import objectAssign from 'object-assign';
import MapEvents from '../events/map';
import Listener from '../mixins/listener';
import GoogleMaps from '../utils/google-maps';
import compareProps from '../utils/compare-props';

const Gmaps = React.createClass({

    mixins: [Listener],

    map: null,

    getInitialState() {
        return {
            isMapCreated: false
        };
    },

    componentDidMount() {
        this.setState({
            callbackIndex: GoogleMaps.load(this.props.params, this.mapsCallback)
        });
    },

    componentWillUnmount() {
        GoogleMaps.removeCallback(this.state.callbackIndex);
        this.removeListeners();
    },

    componentWillReceiveProps(nextProps) {
        if (this.map && !compareProps(this.props, nextProps)) {
            this.map.setOptions({
                ...nextProps,
                center: new google.maps.LatLng(nextProps.lat, nextProps.lng)
            });
        }
    },

    getMap() {
        return this.map;
    },

    mapsCallback() {
        this.createMap();
        this.addListeners(this.map, MapEvents);
    },

    createMap() {
        const node = ReactDOM.findDOMNode(this);
        this.map = new google.maps.Map(node, {
            ...this.props,
            center: new google.maps.LatLng(this.props.lat, this.props.lng)
        });
        // Create the search box and link it to the UI element.
        const input = document.getElementById('pac-input');
        if (!!input && google.maps.places) {
            const searchBox = new google.maps.places.SearchBox(input);
            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var self = this;

            // Bias the SearchBox results towards current map's viewport.
            this.map.addListener('bounds_changed', function () {
                searchBox.setBounds(self.map.getBounds());
            });

            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: self.map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                self.map.fitBounds(bounds);

            });
        }
        this.setState({
            isMapCreated: true
        });
        if (this.props.onMapCreated) {
            this.props.onMapCreated(this.map);
        }
    },

    getChildren() {
        return React.Children.map(this.props.children, (child) => {
            if (!React.isValidElement(child)) {
                return child;
            }
            return React.cloneElement(child, {
                ref: child.ref,
                map: this.map
            });
        });
    },

    render() {
        const style = objectAssign({
            width: this.props.width,
            height: this.props.height
        }, this.props.style);
        return (
            <div style={style} className={this.props.className}>
                {this.props.loadingMessage || 'Loading...'}
                {this.state.isMapCreated ? this.getChildren() : null}
            </div>
        );
    },

});

export default Gmaps;
