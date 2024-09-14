import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import OSM from "ol/source/OSM";
import { useEffect } from "react";

function MapComponent() {
  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const map = new Map({
      target: "map",
      layers: [osmLayer],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
    return () => map.setTarget(undefined);
  }, []);

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      id="map"
      className="map-container"
    />
  );
}

export default MapComponent;
