//var _gridLayer = {};
var _glEarth = {};

var _oldData = {};
var _gridVisible = false;

var _map;

$(document).ready(function () {
    _glEarth = new glEarth();
  //  _gridLayer = new GridLayer();
  var _c11_3DGridView = c11_3DGridView();
    _c11_3DGridView.main();
    _map = _c11_3DGridView.getMap();
    var check = setInterval(getEarthData, 50);
 
    //$('.backContainer button').click(setViewWebGLGlobe);


});

function setViewWebGLGlobe() {
    //$('.gridLayer').css("z-index", 0);
    $('.gridLayer').css("z-index", 0);
    _glEarth.setView([_map.getCenter().lat(), _map.getCenter().lng()], _zoomThreshold);
    _gridVisible = false;
}

var _zoomThreshold = 11.5;

function getEarthData() {
    // _map = _gridLayer.getMap();
    var webGLGlobeData = {
        center: _glEarth.getCenter(),
        zoom: parseInt(_glEarth.getZoom())
    };


    if (webGLGlobeData.zoom != _oldData.zoom || webGLGlobeData.center[0] != _oldData.center[0] || webGLGlobeData.center[1] != _oldData.center[1]) {
        if (webGLGlobeData.zoom > _zoomThreshold && !_gridVisible) {

            $('.gridLayer').css("z-index", 999);

            _map.setZoom(webGLGlobeData.zoom + 1);
            _map.setZoom(webGLGlobeData.zoom);
            _map.setCenter(new google.maps.LatLng(webGLGlobeData.center[0], webGLGlobeData.center[1]));

            _gridVisible = true;
            setInterval(function () {
                google.maps.event.trigger(_map, 'zoom_changed');
            }, 500);
        }
        _oldData.zoom = webGLGlobeData.zoom;
        _oldData.center = webGLGlobeData.center;
        //console.log(data.zoom+" - "+_oldData.zoom+"\n"+data.center+" - "+_oldData.center);
    }
    else {
        if (_map != undefined)
            if (_map.getZoom() < _zoomThreshold && _gridVisible) {
                setViewWebGLGlobe();
            }
    }

}