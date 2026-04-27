// features/caso/ui/caso_map_ui.js
// UI Burra do Mapa - Contém tanto o mapa principal quanto o modal de localização

let mapInstance = null; // Mapa principal da página
let mapModal = null; // Mapa dentro do modal
let markerModal = null;
let currentLayer = "markers"; // "markers" ou "heat"
let currentStyle = "satellite";
let currentGeoCords = { lat: -20.2833, lng: -50.25 };

export function getCurrentGeoCords() {
  return currentGeoCords;
}

// IDs constantes
const layerNames = {
  heat: "heatmap-layer",
  markers: "markers-layer",
};

export function initMapaUI(geoData) {
  setupMapaPrincipal(geoData);
  //setupMapaModalEditarLocalizacao();
}

function setupMapaPrincipal(geoData) {
  const container = document.getElementById("map");
  if (!container) {
    console.warn("Container #map não encontrado");
    return;
  }

  mapInstance = new maplibregl.Map({
    container: "map",
    style: getMapStyle("satellite"),
    center: [-50.25, -20.2833],
    zoom: 16.4,
    maxZoom: 16.4,
  });

  mapInstance.on("load", () => {
    console.log("🗺️ Mapa principal carregado");
    updateMapLayers(geoData);
  });

  setupMapaModalEditarLocalizacao();
}

function setupMapaModalEditarLocalizacao() {
  let lat = parseFloat(document.getElementById("res-geo1").value) || -20.2833;
  let lng = parseFloat(document.getElementById("res-geo2").value) || -50.25;

  mapModal = new maplibregl.Map({
    container: "map-modal",
    style: getMapStyle("satellite"),
    center: [lng, lat],
    zoom: 16.4,
    maxZoom: 16.4,
  });

  mapModal.addControl(new maplibregl.NavigationControl(), "top-right");
  mapModal.addControl(new ToggleBaseMapControl(), "top-right");

  if (lat && lng) {
    markerModal = new maplibregl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .addTo(mapModal);
  }

  mapModal.on("click", (e) => {
    const coords = e.lngLat;
    if (!markerModal) {
      markerModal = new maplibregl.Marker({ color: "red" })
        .setLngLat([coords.lng, coords.lat])
        .addTo(mapModal);
    } else {
      markerModal.setLngLat([coords.lng, coords.lat]);
    }

    currentGeoCords = { lat: coords.lat, lng: coords.lng };
    console.debug("Marcador criado no modal em:", coords);
  });
}

export function updateMarkerPosition() {
  if (!mapModal) {
    throw new Error("Mapa do modal não inicializado");
  }

  let lat = parseFloat(document.getElementById("res-geo1")?.value) || currentGeoCords.lat;
  let lng = parseFloat(document.getElementById("res-geo2")?.value) || currentGeoCords.lng;


  // Se já existe marcador, apenas move ele
  if (markerModal) {
    markerModal.setLngLat([lng, lat]);
  } 
  // Se não existe, cria o marcador
  else {
    markerModal = new maplibregl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .addTo(mapModal);
  }
  mapModal.flyTo({
    center: [lng, lat],
    zoom: 16.4,
    essential: true,           // animação suave
    duration: 1200             // 1.2 segundos de animação
  });

  console.log(`📍 Marcador atualizado para: ${lat}, ${lng}`);
}

export function hasContainer() {
  return !!document.getElementById("map");
}

export function updateMapLayers(geoData) {
  if (!mapInstance || !mapInstance.loaded()) return;
  resetLayers();
  currentLayer === "markers"
    ? addMarkersLayer(geoData)
    : addHeatMapLayer(geoData);
}

export function toggleEditarLocalizacaoModal() {
  const modal = document.getElementById("modal-localizacao");
  if (!modal) return;

  modal.classList.toggle("hidden");
}

function resetLayers() {
  [layerNames.markers, layerNames.heat].forEach((id) => {
    if (mapInstance.getLayer(id)) mapInstance.removeLayer(id);
  });
  ["markers-source", "heatmap-source"].forEach((id) => {
    if (mapInstance.getSource(id)) mapInstance.removeSource(id);
  });
}

// =============================================
// LAYERS DO MAPA (MARKERS E HEATMAP)
// =============================================

function addMarkersLayer(geoData) {
  const geojson = {
    type: "FeatureCollection",
    features: geoData.map((item) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [item.lon, item.lat] },
      properties: {
        agravo: item.agravo,
        id: item.id,
        display_name: item.display_name,
      },
    })),
  };

  mapInstance.addSource("markers-source", { type: "geojson", data: geojson });

  mapInstance.addLayer({
    id: layerNames.markers,
    type: "circle",
    source: "markers-source",
    paint: {
      "circle-radius": 8,
      "circle-color": [
        "match",
        ["get", "agravo"],
        "1 - Dengue",
        "#e11d48",
        "2 - Chikungunya",
        "#f97316",
        "#3b82f6",
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
      "circle-opacity": 0.9,
    },
  });

  mapInstance.on("click", layerNames.markers, (e) => {
    const properties = e.features[0].properties;
    const coordinates = e.features[0].geometry.coordinates.slice();

    const { id, display_name, agravo } = properties;

    const popupHTML = `
    <div class="max-w-xs bg-white rounded-2xl shadow-2xl overflow-hidden custom-popup-card">
      
      <!-- Botão de fechar customizado -->
      <button 
        class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-black-900 hover:text-white-600 hover:bg-gray-100 rounded-full transition z-20 close-popup-btn"
        data-action="close-popup">
        ✕
      </button>

      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white">
        <p class="font-semibold text-lg leading-tight">${display_name}</p>
        <p class="text-xs text-blue-100 mt-1">ID: ${id}</p>
      </div>

      <!-- Corpo -->
      <div class="p-5 space-y-4">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-gray-500">Agravo:</span>
          <span class="px-4 py-1.5 text-sm font-medium rounded-full 
                       ${agravo.includes("Dengue") ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}">
            ${agravo}
          </span>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-100 bg-gray-50 px-5 py-4 flex gap-3">
        <button 
          class="btn-editar-caso flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-sm"
          data-id="${id}">
          ✏️ Editar Caso
        </button>
        
        <button 
          class="btn-deletar-caso flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-sm"
          data-id="${id}">
          🗑️ Deletar
        </button>
      </div>
    </div>
  `;

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "340px",
      className: "custom-case-popup", // ← Classe importante
    })
      .setLngLat(coordinates)
      .setHTML(popupHTML)
      .addTo(mapInstance);

    // Fechar popup ao clicar no botão customizado
    const closeHandler = (event) => {
      if (event.target.closest(".close-popup-btn")) {
        popup.remove();
        document.removeEventListener("click", closeHandler);
      }
    };

    setTimeout(() => {
      document.addEventListener("click", closeHandler);
    }, 100);
  });
}

function addHeatMapLayer(geoData) {
  const geojson = {
    type: "FeatureCollection",
    features: geoData.map((point) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [point.lon, point.lat] },
      properties: { weight: 1 },
    })),
  };

  mapInstance.addSource("heatmap-source", { type: "geojson", data: geojson });

  mapInstance.addLayer({
    id: layerNames.heat,
    type: "heatmap",
    source: "heatmap-source",
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

// =============================================
// FUNÇÕES COMPARTILHADAS
// =============================================

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
        { id: "esri-satellite", type: "raster", source: "esri-satellite" },
      ],
    };
  }

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
      { id: "osm-tiles", type: "raster", source: "osm-tiles" },
      {
        id: "place-labels",
        type: "symbol",
        source: "osm-labels",
        "source-layer": "place",
        layout: { "text-field": ["get", "name"], "text-size": 12 },
        paint: {
          "text-color": "#000",
          "text-halo-color": "#fff",
          "text-halo-width": 1.5,
        },
      },
    ],
  };
}

class ToggleBaseMapControl {
  constructor() {
    this.osmIcon = "../../assets/icone_osm.png";
    this.satelliteIcon = "../../assets/icone_satellite.png";

    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    this.button = document.createElement("button");
    this.button.className =
      "w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded";

    this.icon = document.createElement("img");
    this.icon.src = this.satelliteIcon;
    this.icon.className = "w-5 h-5";
    this.button.appendChild(this.icon);
    this.container.appendChild(this.button);

    this.button.addEventListener("click", () => this.toggleStyle());
  }

  onAdd(map) {
    this.map = map;
    return this.container;
  }

  toggleStyle() {
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();

    currentStyle = currentStyle === "satellite" ? "osm" : "satellite";
    this.map.setStyle(getMapStyle(currentStyle));

    this.map.once("styledata", () => {
      this.map.setCenter(center);
      this.map.setZoom(zoom);
    });

    this.icon.src =
      currentStyle === "satellite" ? this.satelliteIcon : this.osmIcon;
  }
}
