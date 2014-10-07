﻿define([
    "esri/map",
    "esri/dijit/BasemapGallery",
    "esri/dijit/HomeButton",
    "esri/dijit/Geocoder",
    "esri/layers/FeatureLayer",
    "esri/InfoTemplate",
    "esri/dijit/Legend",
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
    FeatureLayer,
    InfoTemplate,
    Legend,
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
            this.createLegend();
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
            var map = this.map;
            var basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: map
            }, "basemapGallery");

            basemapGallery.startup();

            //change basemap tool
            on(dom.byId("changeBasemap"), "click", lang.hitch(this, function (e) {      
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

                
            }));
            
        },
        createLayers: function () {
            var map = this.map;
            var workedGIS = new FeatureLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer/0", {infoTemplate: new InfoTemplate("Attributes", "${*}")});
            var privateSector = new FeatureLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer/1", { infoTemplate: new InfoTemplate("Attributes", "${*}") });
            var noneProfitSector = new FeatureLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer/2", { infoTemplate: new InfoTemplate("Attributes", "${*}") });
            var governmentSector = new FeatureLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer/3", { infoTemplate: new InfoTemplate("Attributes", "${*}") });
            var educationSector = new FeatureLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer/4", { infoTemplate: new InfoTemplate("Attributes", "${*}") });
            map.addLayer(workedGIS);
            map.addLayer(privateSector);
            map.addLayer(noneProfitSector);
            map.addLayer(governmentSector);
            map.addLayer(educationSector);
            workedGIS.show();
            privateSector.show();
            noneProfitSector.show();
            governmentSector.show();
            educationSector.show();
        },
        createLegend: function () {
            var map = this.map;
            var legend = new Legend({
                map: map
            }, "legendDiv");
            legend.startup();

            
            $('#legendOpen').click(function () {
                $('#legendDropDown #legendDashboard').slideToggle({
                        direction: "up"
                    }, 300);
                $(this).toggleClass('legendClose');
                }); // end click
            
        },
    });
});