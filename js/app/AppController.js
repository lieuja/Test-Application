define([
    "esri/map",
    "esri/dijit/BasemapGallery",
    "esri/dijit/HomeButton",
    "esri/dijit/Geocoder",
    "esri/layers/FeatureLayer",
    "esri/InfoTemplate",
    "esri/dijit/Legend",
    "esri/dijit/Print",
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
    Print,
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
            this.print();
        },
        createMap: function () {
            var map = new Map("mapDiv", {
                center: [-93, 35],
                zoom: 4,
                basemap: "hybrid"
            });
            this.map = map;
            var home = new HomeButton({
                map: map
            }, "homeButton");
            home.startup();

            var geocoder = new Geocoder({
                arcgisGeocoder: true,
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
            var workedGis = new FeatureLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer/0", {infoTemplate: new InfoTemplate("Attributes", "${*}"),  visible:false});
            var privateSector = new FeatureLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer/1", { infoTemplate: new InfoTemplate("Attributes", "${*}"), visible:false});
            var nonProfitSector = new FeatureLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer/2", { infoTemplate: new InfoTemplate("Attributes", "${*}"), visible: false });
            var governmentSector = new FeatureLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer/3", { infoTemplate: new InfoTemplate("Attributes", "${*}"), visible: false });
            var educationSector = new FeatureLayer("http://services.arcgis.com/hH0XfIGQ1CoXSpuI/arcgis/rest/services/GISForWomen/FeatureServer/4", { infoTemplate: new InfoTemplate("Attributes", "${*}"), visible: false });
            map.addLayer(workedGis);
            map.addLayer(privateSector);
            map.addLayer(nonProfitSector);
            map.addLayer(governmentSector);
            map.addLayer(educationSector);      
                      
            //layer functionality
            on(dom.byId("educationSector"), "change", function (value) {
                if (value.target.checked) {
                    //map.addLayer(educationSector);
                    educationSector.show();
                } else {
                    educationSector.hide();
                }
            });
            on(dom.byId("governmentSector"), "change", function (value) {
                if (value.target.checked) {
                   // map.addLayer(governmentSector);
                    governmentSector.show();
                } else {
                    governmentSector.hide();
                }
            });
            on(dom.byId("nonProfitSector"), "change", function (value) {
                if (value.target.checked) {
                   // map.addLayer(nonProfitSector);
                    nonProfitSector.show();
                } else {
                    nonProfitSector.hide();
                }
            });
            on(dom.byId("privateSector"), "change", function (value) {
                if (value.target.checked) {
                   // map.addLayer(privateSector);
                    privateSector.show();
                } else {
                    privateSector.hide();
                }
            });
            on(dom.byId("workedGis"), "change", function (value) {
                if (value.target.checked) {
                   // map.addLayer(workedGis);
                    workedGis.show();
                } else {
                    workedGis.hide();
                }
            });
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
        print: function () {
            var map = this.map;
            var printer = new Print({
                map: map,
                url: "http://servicesbeta4.esri.com/arcgis/rest/services/Utilities/ExportWebMap/GPServer/Export Web Map Task"
            }, dom.byId("print"));

            printer.startup();
        },
    });
});