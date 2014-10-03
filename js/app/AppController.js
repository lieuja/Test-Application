define([
    "esri/map",
    "esri/dijit/BasemapGallery",
    "esri/dijit/HomeButton",
    "esri/dijit/Geocoder",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "dojo/parser",
    "dojo/dom",
    "dojo/on",
    "dojo/dom-style",
    "dojo/fx",
    "dojo/fx/easing",
    "dojo/_base/fx",
    "dojo/html",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-class",
],
function (
    Map,
    BasemapGallery,
    HomeButton,
    Geocoder,
    ArcGISDynamicMapServiceLayer,
    parser,
    dom,
    on,
    domStyle,
    coreFx,
    easing,
    baseFx,
    html,
    BorderContainer,
    ContentPane,
    declare,
    lang,
    domConstruct,
    domClass

    ) {
    return declare(null, {
        map: null,
        init: function () {
            this.createMap();
            this.changeBasemap();
            this.createLayers();
        },
        createMap: function () {
            var map = new Map("mapDiv", {
                center: [-85, 35],
                zoom: 6,
                basemap: "streets"
            });
            this.map = map;
            var home = new HomeButton({
                map: map
            }, "HomeButton");
            home.startup();

            var geocoder = new Geocoder({
                arcgisGeocoder: {
                    placeholder: "find address"
                },
                autoComplete: true,
                map: map,
            }, "geocoder");
            geocoder.startup();
        },
        changeBasemap: function () {
            //change basemap tool
            on(dom.byId("changeBasemap"), "click", function (e) {
                if (domStyle.get(dom.byId("basemapGalleryContainer"), "display") === "block") {

                    coreFx.wipeOut({
                        node: "basemapGalleryContainer",
                        duration: 800,
                        easing: easing.expoOut
                    }).play();
                    domStyle.set(dom.byId("basemapGalleryContainer"), "display", "");
                } else {

                    coreFx.wipeIn({
                        node: "basemapGalleryContainer",
                        duration: 800,
                        easing: easing.expoOut
                    }).play();
                    domStyle.set(dom.byId("basemapGalleryContainer"), "display", "block");
                }
            });
            var map = this.map;
            var basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: map
            }, "basemapGallery");
        },
        createLayers: function () {
            var map = this.map;
            var layer1 = new ArcGISDynamicMapServiceLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer", { id: "0" });
            map.addLayer(layer1);
        },
    });
});