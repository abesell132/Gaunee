import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "350px"
};

class ApartmentMap extends Component {
  render() {
    return (
      <div style={{ height: "300px", width: "100%" }}>
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          mapTypeControl={false}
          streetViewControl={false}
          initialCenter={{
            lat: 46.499102,
            lng: -87.611803
          }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAAtkEJhkyEFjEUSArBoFZ4PgfC_mXDNyI"
})(ApartmentMap);
