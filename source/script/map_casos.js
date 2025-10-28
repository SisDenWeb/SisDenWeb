// FUNCOES DE MAPA

const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
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
  },
  center: [-50.25, -20.2833], // Fernandópolis
  zoom: 13,
  maxZoom: 16.4,
});

// Adiciona controles de navegação (zoom e rotação)
map.addControl(new maplibregl.NavigationControl(), "top-right");

function return_all_geo_cases() {
  const cases = recuperarDados("case");

  return cases.map((item) => ({
    lat: parseFloat(item.residencia.geo1),
    lon: parseFloat(item.residencia.geo2),
    display_name: item.notificacao_individual.nome_paciente,
  }));
}

let markers = [];

function markers_on_map(data) {
  // Remove todos os markers antigos
  markers.forEach((m) => m.remove());
  markers = [];

  // Adiciona novos markers
  data.forEach((item) => {
    const marker = new maplibregl.Marker()
      .setLngLat([item.lon, item.lat])
      .setPopup(new maplibregl.Popup().setHTML(`<b>${item.display_name}</b>`))
      .addTo(map);

    markers.push(marker);
  });

  // Centraliza mapa no primeiro marker
  if (data.length > 0) {
    map.flyTo({ center: [data[0].lon, data[0].lat], zoom: 17 });
  }
}


// INIT
const data_geo_case = return_all_geo_cases();
markers_on_map(data_geo_case);