//var _gridLayer = {};
var _glEarth = {};

var _oldData = {};
var _gridVisible = false;

var _map;
var _c11_3DGridView = null;

$(document).ready(function () {
    _glEarth = new glEarth();

    _c11_3DGridView = c11_3DGridView();
    _c11_3DGridView.main();
    _map = _c11_3DGridView.getMap();
    var check = setInterval(getEarthData, 50);


});

function setViewWebGLGlobe() {
    //$('.gridLayer').css("z-index", 0);
    $('.gridLayer').css("z-index", 0);
    _glEarth.setView([_map.getCenter().lat(), _map.getCenter().lng()], _zoomThreshold);
    _gridVisible = false;

    $('body').removeClass();
    $('body').addClass('globeview');
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

            $('.gridLayer').css("z-index", 3);

            _map.setCenter(new google.maps.LatLng(webGLGlobeData.center[0], webGLGlobeData.center[1]));
            _map.setZoom(webGLGlobeData.zoom + 1);
            _map.setZoom(webGLGlobeData.zoom);

            _gridVisible = true;
            setTutorialMapsEnabled();
            setInterval(function () {
                google.maps.event.trigger(_map, 'zoom_changed');
            }, 500);

            $('body').removeClass();
            $('body').addClass('mapsview');
        }
        else
        {
            if(webGLGlobeData.zoom > 5)
            {
                setTutorialStep(TUTORIAL_STEP_GLOBE_APPROACHING_MAPS_VIEW);
            }
            else
            {
                setTutorialStep(TUTORIAL_STEP_GLOBE_GENERAL);
            }
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

function setTutorialMapsEnabled()
{
    setTutorialStep(TUTORIAL_STEP_MAPS_GENERAL);
}

function setGoogleMapsLocation(lat, lng) {
    var webGLGlobeData = {
        center: _glEarth.getCenter(),
        zoom: parseInt(_glEarth.getZoom())
    };

    if (_map != undefined) {
        webGLGlobeData.zoom = _zoomThreshold + 0.5;

        $('.gridLayer').css("z-index", 3);
        _map.setCenter(new google.maps.LatLng(lat, lng));
        _map.setZoom(19);

        _gridVisible = true;
        setTutorialMapsEnabled();
        setInterval(function () {
            google.maps.event.trigger(_map, 'zoom_changed');
        }, 500);

        $('body').removeClass();
        $('body').addClass('mapsview');

        _oldData.zoom = webGLGlobeData.zoom;
        _oldData.center = webGLGlobeData.center;
    }
}

