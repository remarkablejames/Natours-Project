export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicmVtYXJrYWJsZWphbWVzIiwiYSI6ImNsZXN6d214ejA1bzgzdG10OTl5cGc3azMifQ.xJUcjDDDzGrbme3z3lD-8w";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/remarkablejames/clet0dsjr001601pggd4ztis9",
    center: [-75.695, 45.424721],
    zoom: 12,
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
