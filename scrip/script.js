function init() {
  let InserisciPop = document.getElementById("popupContent")
  const Popuphtml = document.getElementById("popup");
  const overlay = new ol.Overlay({ //oggetto overlay di tipo ol.Overlay, rappresenta un elemento sovrapposto alla mappa che è usato per mostrare il popup 
    element: Popuphtml, 
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });


  ol.proj.useGeographic();
  const place =[11.55531775200576,45.55214462997935];         //le variabili contengono le coordinate dei marker
  const place2 = [11.533228829104571, 45.40236744076732];
  const iconFeature = new ol.Feature({
    geometry: new ol.geom.Point([11.55531775200576, 45.55214462997935]),
  });                                                                     //oggetti iconFeature e iconFeature2 di tipo ol.Feature, rappresentano i marker nel punto geografico
  const iconFeature2 = new ol.Feature({
    geometry: new ol.geom.Point([11.533228829104571, 45.40236744076732]),
  });


  StileMarker = new ol.style.Style({  //Viene creato lo stile del marker, StileMarker di tipo ol.style.Style, contenente un'icona di tipo ol.style.Icon
    image: new ol.style.Icon({
      src: "style/img/105.png",
      anchor: [0.5,1],
      scale: 0.1
    })
  })


  layerMarker = new ol.layer.Vector({ //Viene creato uno strato layerMarker di tipo ol.layer.Vector contenente i due oggetti iconFeature e iconFeature2, viene applicato lo stile StileMarker ad entrambi gli oggetti.
    source: new ol.source.Vector({
    features:[iconFeature,iconFeature2,]
    })
  })
  layerMarker.setStyle(StileMarker)


  let lat = 45.55214462997935
  let long = 11.55531775200576
  ol.proj.useGeographic();
  const map = new ol.Map({ //oggetto map di tipo ol.Map, che rappresenta la mappa.Viene definita una vista iniziale con una determinata center (longitudine e latitudine) e un certo zoom, vengono aggiunti uno strato di sfondo ol.layer.Tile contenente le immagini delle mappe OpenStreetMap e lo strato layerMarker.
    target: "mappa",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      layerMarker
      ],
    view: new ol.View({
      center: [long, lat],
      zoom: 20,
      }),
    overlays: [overlay] 
  });
  

  function ClickSchermo(click){ //iene definita una funzione ClickSchermo che viene chiamata quando l'utente clicca sulla mappa. Questa funzione controlla se l'utente ha cliccato su uno dei marker creati, e se è così, mostra le informazioni relative a quel punto sulla mappa tramite l'oggetto overlay. 
    Features = map.getFeaturesAtPixel(click.pixel)
    if (Features.length != 0){
      coordFeature = Features[0].values_.geometry.flatCoordinates
    }
    if(coordFeature[0] == place[0] && coordFeature[1] == place[1] ){
      overlay.setPosition(coordFeature)
      InserisciPop.innerHTML = "I.T.I.S. Rossi. Via Legione Gallieno, 52, 36100 Vicenza VI" //La funzione aggiorna il contenuto dell'oggetto InserisciPop, che rappresenta il contenuto dell'elemento HTML che viene visualizzato nell'overlay.
    }
            
    else if(coordFeature[0] == place2[0] && coordFeature[1] == place2[1] ){
      overlay.setPosition(coordFeature)
      InserisciPop.innerHTML = "Trattoria Sabrina.        Via G. Verdi, 10, 36021 Villaga VI"
    }
    if(coordFeature[0] != place2[0] && coordFeature[1] != place2[1] && coordFeature[0] != place[0] && coordFeature[1] != place[1] ){
      overlay.setPosition(undefined)
      InserisciPop.innerHTML = ""
    }
  }
  map.on("singleclick",ClickSchermo) //viene assegnata la funzione ClickSchermo all'evento singleclick dell'oggetto map, in modo che venga chiamata ogni volta che l'utente clicca sulla mappa.
}
   

  