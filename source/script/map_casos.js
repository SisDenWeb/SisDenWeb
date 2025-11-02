// FUNCOES DE MAPA

// const map = new maplibregl.Map({
//   container: "map",
//   style: {
//     version: 8,
//     sources: {
//       "esri-satellite": {
//         type: "raster",
//         tiles: [
//           "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//         ],
//         tileSize: 256,
//       },
//     },
//     layers: [
//       {
//         id: "esri-satellite",
//         type: "raster",
//         source: "esri-satellite",
//       },
//     ],
//   },
//   center: [-50.25, -20.2833], // Fernandópolis
//   zoom: 13,
//   maxZoom: 16.4,
// });

// const map = new maplibregl.Map({
//   container: "map",
//   style: {
//     version: 8,
//     glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
//     sources: {
//       // Fundo de satélite
//       "esri-satellite": {
//         type: "raster",
//         tiles: [
//           "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//         ],
//         tileSize: 256,
//       },
//       // Dados vetoriais públicos com labels
//       "openmaptiles": {
//         type: "vector",
//         tiles: [
//           "https://osm2vectortiles.tileserver.com/v2/{z}/{x}/{y}.pbf"
//         ],
//       },
//     },
//     layers: [
//       {
//         id: "esri-satellite",
//         type: "raster",
//         source: "esri-satellite",
//       },
//       {
//         id: "place-labels",
//         type: "symbol",
//         source: "openmaptiles",
//         "source-layer": "place",
//         layout: {
//           "text-field": ["get", "name"],
//           "text-size": 12,
//           "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
//           "text-anchor": "top",
//         },
//         paint: {
//           "text-color": "#ffffff",
//           "text-halo-color": "#000000",
//           "text-halo-width": 1.2,
//         },
//       },
//       {
//         id: "road-labels",
//         type: "symbol",
//         source: "openmaptiles",
//         "source-layer": "transportation_name",
//         layout: {
//           "text-field": ["get", "name"],
//           "text-size": 10,
//           "symbol-placement": "line",
//           "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
//         },
//         paint: {
//           "text-color": "#e3e3e3",
//           "text-halo-color": "#000000",
//           "text-halo-width": 1,
//         },
//       },
//     ],
//   },
//   center: [-50.25, -20.2833],
//   zoom: 16.4
// });

let currentStyle = "satellite";

const map = new maplibregl.Map({
  container: "map",
  style: getMapStyle("satellite"),
  center: [-50.25, -20.2833], // Fernandópolis - SP
  zoom: 16.4,
  maxZoom: 16.4,
});

function getMapStyle(type) {
  if (type === "satellite") {
    return {
      version: 8,
      glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      sources: {
        "esri-satellite": {
          type: "raster",
          tiles: [
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          ],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: "esri-satellite",
          type: "raster",
          source: "esri-satellite",
        },
      ],
    };
  }

  // === OSM com labels ===
  return {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      "osm-tiles": {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
      },
      "osm-labels": {
        type: "vector",
        tiles: ["https://demotiles.maplibre.org/tiles/{z}/{x}/{y}.pbf"],
      },
    },
    layers: [
      {
        id: "osm-tiles",
        type: "raster",
        source: "osm-tiles",
      },
      {
        id: "place-labels",
        type: "symbol",
        source: "osm-labels",
        "source-layer": "place",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 12,
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        },
        paint: {
          "text-color": "#000",
          "text-halo-color": "#fff",
          "text-halo-width": 1.5,
        },
      },
    ],
  };
}

function return_all_geo_cases() {
  const cases = recuperarDados("case");

  return cases.map((item) => ({
    lat: parseFloat(item.residencia.geo1),
    lon: parseFloat(item.residencia.geo2),
    display_name: item.notificacao_individual.nome_paciente,
    agravo: item.dados_gerais.agravo_doenca,
  }));
}

function reset_layers(layer_names) {
  const heat_source_name = "heatmap-source";
  const markers_source_name = "markers-source";

  if (map.getLayer(layer_names.markers)) {
    console.debug("removendo layer markers");
    map.removeLayer(layer_names.markers);
  }

  if (map.getLayer(layer_names.heat)) {
    console.debug("removendo layer heat");
    map.removeLayer(layer_names.heat);
  }

  if (map.getSource(markers_source_name)) {
    console.debug("removendo source markers");
    map.removeSource(markers_source_name);
  }

  if (map.getSource(heat_source_name)) {
    console.debug("removendo source heat");
    map.removeSource(heat_source_name);
  }
}

function addMarkersLayer(layer_name, data) {
  console.debug("Running: addMarkersLayer()");
  const source_name = "markers-source";

  // Cria o GeoJSON
  const geojson = {
    type: "FeatureCollection",
    features: data.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.lon, item.lat],
      },
      properties: {
        agravo: item.agravo,
        display_name: item.display_name,
      },
    })),
  };

  map.addSource(source_name, {
    type: "geojson",
    data: geojson,
  });

  map.addLayer({
    id: layer_name,
    type: "circle",
    source: source_name,
    paint: {
      "circle-radius": 3, // tamanho da bolinha
      "circle-color": [
        "match",
        ["get", "agravo"],
        "1 - Dengue",
        "#e11d48", // vermelho
        "2 - Chikungunya",
        "#f97316", // laranja
        "#3b82f6", // azul padrão
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff", // borda branca como o marker padrão
      "circle-opacity": 0.9,
    },
  });

  map.on("click", layer_name, (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const { display_name } = e.features[0].properties;

    new maplibregl.Popup()
      .setLngLat(coordinates)
      .setHTML(`<b>${display_name}</b>`)
      .addTo(map);
  });

  map.on("mouseenter", layer_name, () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", layer_name, () => {
    map.getCanvas().style.cursor = "";
  });
}

function addHeatMapLayer(layer_name, heatmapData) {
  console.debug("Running: addHeatMapLayer()");
  const geojson = {
    type: "FeatureCollection",
    features: heatmapData.map((point) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.lon, point.lat],
      },
      properties: {
        // você pode adicionar intensidade se quiser
        weight: 1,
      },
    })),
  };

  map.addSource("heatmap_source", {
    type: "geojson",
    data: geojson,
  });

  map.addLayer({
    id: layer_name,
    type: "heatmap",
    source: "heatmap_source",
    maxzoom: 16.5,
    paint: {
      "heatmap-weight": ["get", "weight"],
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 15, 3],
      "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 15, 20],
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(0,0,255,0)",
        0.2,
        "blue",
        0.4,
        "cyan",
        0.6,
        "lime",
        0.8,
        "yellow",
        1,
        "red",
      ],
      "heatmap-opacity": 0.6,
    },
  });
}

class ToggleLayerControl {
  constructor(map, layers, icons) {
    this.map = map;
    this.layers = layers; // { heat: "heatmap-layer-id", markers: "point-layer-id" }
    this.icons = icons; // { heat: "icons/heatmap.png", markers: "icons/markers.png" }
    this.current = "markers"; // camada inicial
  }

  onAdd(map) {
    this.map = map;
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    // Cria o botão principal
    this.button = document.createElement("button");
    this.icon = document.createElement("img");
    this.icon.src = this.icons.markers;
    this.icon.alt = "Trocar camada";
    this.icon.style.width = "24px";
    this.icon.style.height = "24px";
    this.button.title = "Trocar visualização";

    this.button.appendChild(this.icon);
    this.container.appendChild(this.button);

    const legenda = document.getElementById("map-legend");

    map.setLayoutProperty(this.layers.markers, "visibility", "visible");
    map.setLayoutProperty(this.layers.heat, "visibility", "none");

    // Ação do botão
    this.button.onclick = () => {
      if (this.current === "markers") {
        // Desativa pontos, ativa heatmap
        map.setLayoutProperty(this.layers.markers, "visibility", "none");
        map.setLayoutProperty(this.layers.heat, "visibility", "visible");

        legenda.classList.add("hidden");
        this.icon.src = this.icons.heat;
        this.current = "heat";

        currentLayer = layers.HEATMAP;
      } else {
        // Desativa heatmap, ativa pontos
        map.setLayoutProperty(this.layers.heat, "visibility", "none");
        map.setLayoutProperty(this.layers.markers, "visibility", "visible");

        legenda.classList.remove("hidden");
        this.icon.src = this.icons.markers;
        this.current = "markers";

        currentLayer = layers.MARKERS;
      }
    };

    return this.container;
  }

  onRemove() {
    this.container.remove();
    this.map = undefined;
  }

  reload_layer() {
    const legenda = document.getElementById("map-legend");

    if (this.current === "markers") {
      // Desativa heatmap, ativa pontos
      map.setLayoutProperty(this.layers.heat, "visibility", "none");
      map.setLayoutProperty(this.layers.markers, "visibility", "visible");

      legenda.classList.remove("hidden");
      this.icon.src = this.icons.markers;
      this.current = "markers";
    } else {
      // Desativa pontos, ativa heatmap
      map.setLayoutProperty(this.layers.markers, "visibility", "none");
      map.setLayoutProperty(this.layers.heat, "visibility", "visible");

      legenda.classList.add("hidden");
      this.icon.src = this.icons.heat;
      this.current = "heat";
    }
  }
}

class ToggleBaseMapControl {
  constructor(layerControl) {
    this.osmicon = "../../assets/icone_osm.png";
    this.satelliteicon = "../../assets/icone_satellite.png"

    this.layerControl = layerControl;
    this.container = document.createElement("div");
    this.container.className =
      "maplibregl-ctrl maplibregl-ctrl-group flex items-center justify-center";

    this.button = document.createElement("button");
    this.button.className =
      "w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition rounded";

    this.icon = document.createElement("img");
    this.icon.src = this.satelliteicon
    this.icon.alt = "Alternar camada";
    this.icon.className = "w-5 h-5";
    this.button.appendChild(this.icon);
    this.container.appendChild(this.button);

    this.button.addEventListener("click", () => this.toggleStyle());
  }

  onAdd(mapInstance) {
    this.map = mapInstance;
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }

  toggleStyle() {
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();

    currentStyle = currentStyle === "satellite" ? "osm" : "satellite";
    this.map.setStyle(getMapStyle(currentStyle));

    this.map.once("styledata", () => {
      this.map.setCenter(center);
      this.map.setZoom(zoom);

      const data = return_all_geo_cases();
      if (typeof addMarkersLayer === "function")
        addMarkersLayer(layer_names.markers, data);
      if (typeof addHeatMapLayer === "function")
        addHeatMapLayer(layer_names.heat, data);

      this.layerControl.reload_layer();
    });

    // Alterna o ícone
    if (currentStyle === "satellite") {
      this.icon.src = this.satelliteicon
    } else {
      this.icon.src = this.osmicon
    }
  }
}

function debug_map() {
  console.debug("Sources:", map.getStyle().sources);
  console.debug(
    "Layers:",
    map.getStyle().layers.map((l) => l.id)
  );
}

// INIT
const layer_names = {
  heat: "heatmap-layer",
  markers: "markers-layer",
};

map.on("load", () => {
  reset_layers(layer_names);
  const data_geo_case = return_all_geo_cases();
  addMarkersLayer(layer_names.markers, data_geo_case);
  addHeatMapLayer(layer_names.heat, data_geo_case);

  const layerControl = new ToggleLayerControl(
    map,
    {
      heat: layer_names.heat,
      markers: layer_names.markers,
    },
    {
      heat: "../../assets/heat-map.png",
      markers: "../../assets/map-marker.png",
    }
  );

  map.addControl(new maplibregl.NavigationControl(), "top-right");

  map.addControl(new ToggleBaseMapControl(layerControl), "top-right");

  map.addControl(layerControl, "top-right");

  debug_map();
  console.debug("data_geo_case: ", data_geo_case);
});
