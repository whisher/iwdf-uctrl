function c11_3DGridView() {

    // Aux

    MapPerspectiveOverlay.prototype = new google.maps.OverlayView();
    MapPerspectiveOverlay.prototype.onAdd = function () {
    };
    MapPerspectiveOverlay.prototype.onRemove = function () {
    };
    MapPerspectiveOverlay.prototype.draw = function () {
    };
    function MapPerspectiveOverlay(map) {
        this.setMap(map);
    }

    var cubeHtml = "<div class='cubeWrapper' style='display: none'>" +
        "<div class='cube'>" +
        "<div class='front'></div>" +
        "<div class='back'></div>" +
        "<div class='top'></div>" +
        "<div class='bottom'></div>" +
        "<div class='bottom_second_level'></div>" +
        "<div class='left'></div>" +
        "<div class='right'></div>" +
        "</div></div>";

    // Buttons listeners

    $('#setLatLongBtn').click(function () {
        map.setCenter(new google.maps.LatLng($('#newLat').val(), $('#newLong').val()));
        map.setZoom(16);
        setViewWebGLGlobe();
    });

    $('#setPerspectiveViewBtn').click(function () {
        enablePerspective();

    });
    $('#disablePerspectiveViewBtn').click(function () {

        disablePerspective();
    });



    // Functions

    function setDegrees(rotateX, rotateZ) {

        if (rotateX == false) {
            overlayCube.css('transform', 'none');
            $('#mapDiv.perspectiveEnabled > div.gm-style').css('transform', 'none');
            return;
        }

        overlayCube.css('transform', 'rotateX(' + rotateX + 'deg) rotateZ(' + rotateZ + 'deg) translateZ(' + overlayCube.data('_height') / 2 + 'px)'); //  translateZ(-' + overlayCube.data('_height')+'px)
        $('#mapDiv.perspectiveEnabled > div.gm-style').css('transform', 'rotateX(' + rotateX + 'deg) rotateZ(' + rotateZ + 'deg)');
    }

    var cubeAppended = false;
    var overlayCube = undefined;
    var perspectiveActive = false;

    function perspectiveCenterMap()
    {
        var x_long = current_box.long + (current_box.long2 - current_box.long) / 2;
        var y_lat = current_box.lat2;// + (current_box.lat2 - current_box.lat) / 2;

        latLng1 = new google.maps.LatLng(y_lat, x_long);

        map.setCenter(latLng1);

        setTimeout(perspectiveLocateCube, 750);
    }
    function perspectiveLocateCube()
    {
        var lat_long_s_w = new google.maps.LatLng(current_box.lat, current_box.long);
        //var s_e = new google.maps.LatLng(current_box.lat, current_box.long2);
        //var n_w = new google.maps.LatLng(current_box.lat2, current_box.long);
        var lat_long_n_e = new google.maps.LatLng(current_box.lat2, current_box.long2);

        var p_s_w = perspectiveProjection.fromLatLngToContainerPixel(lat_long_s_w);
        var p_n_e = perspectiveProjection.fromLatLngToContainerPixel(lat_long_n_e);

        var width = p_n_e.x - p_s_w.x;
        var height = p_s_w.y - p_n_e.y;


        overlayCube.data('_height', height);
        overlayCube.css("top", p_n_e.y).css("left", p_s_w.x).css('width', width); //.css('transform','rotateX(60deg) rotateZ(-15deg)');//.css('height',height); //  translateZ(-' + height+'px)
        overlayCube.children('div').find('div').css('width', width).css('height', height);
        overlayCube.find('div.back').css('transform', 'translateZ(-' + height / 2 + 'px) rotateY(180deg)');
        overlayCube.find('div.right').css('transform', 'translateX(' + height / 2 + 'px) rotateY(-270deg) rotateZ(-90deg)');
        overlayCube.find('div.left').css('transform', 'translateX(-' + height / 2 + 'px) rotateY(270deg) rotateZ(90deg)');
        overlayCube.find('div.top').css('transform', 'translateY(-' + width / 2 + 'px) rotateX(-90deg) rotateY(180deg)');
        overlayCube.find('div.bottom').css('transform', 'translateY(' + width / 2 + 'px) rotateX(270deg)');
        overlayCube.find('div.bottom_second_level').css('transform', 'translateY(' + width / 3 + 'px) rotateX(270deg)');
        overlayCube.find('div.front').css('transform', 'translateZ(' + height / 2 + 'px)');

        overlayCube.fadeIn(250);

        setDegrees(68, -15);
    }

    function enablePerspective() {

        perspectiveActive = true;

        map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
        grid.setEnableBoxClick(false);
        oldZoomLevel = map.getZoom();

        $("#mapDiv").addClass('perspectiveEnabled');


        perspectiveCenterMap();

    }

    function disablePerspective() {
        overlayCube.fadeOut(250);
        setDegrees(false);
        // $("#mapDiv").children('div.gm-style').removeClass("rotated");
        setTimeout(function () {
            $("#mapDiv").removeClass('perspectiveEnabled');
        }, 500);

        if (oldZoomLevel != null) {
            map.setZoom(oldZoomLevel);
            oldZoomLevel = null;
        }

        grid.setEnableBoxClick(true);
        map.setOptions({draggable: true, zoomControl: true, scrollwheel: true, disableDoubleClickZoom: true});

        perspectiveActive = false;
    }

    var map = null;
    var data;
    var grid = null;

    var current_box = null;

    var perspectiveOverlay;
    var perspectiveProjection;
    var oldZoomLevel = null;

    this.main = function () {

        map = new google.maps.Map($("#mapDiv").get(0), {
            center: new google.maps.LatLng(65.8246416, 21.6917497),
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            panControl: true,
            scaleControl: true,
            streetViewControl: false,
            disableDoubleClickZoom: true,
            tilt: 0
        });

        grid = new MapsGrid(map, getData, callBack, dblClickCallback);

        perspectiveOverlay = new MapPerspectiveOverlay(map);

        google.maps.event.addListenerOnce(map, 'idle', function () {
            var wt_logo = $('<img/>').attr('src', './Images/worldtwoo.png').css('height', '40px').css('position', 'absolute').css('bottom', '0px').css('left', '0px');
            $('#mapDiv').append(wt_logo);


          //  $('#earthLayer').append(wt_logo);

            perspectiveProjection = perspectiveOverlay.getProjection();

            if (!cubeAppended) {
                var currentCube = $(cubeHtml);

                $("#mapDiv").append(currentCube); //children("div:first-child")

                $('#mapDiv').find('div.cubeWrapper').attr('id', 'overlayCube');

                overlayCube = $('#overlayCube');

                cubeAppended = true;
            }
        });

        $(window).on('resize',function(){
            if (perspectiveActive)
                perspectiveCenterMap();
        });

        google.maps.event.addListenerOnce(map,"projection_changed", function() {

        });




    };

    this.getMap = function ()
    {
        return map;
    };


    function dblClickCallback(box, operation) {
        enablePerspective();

    }

    function callBack(box, operation) {

        current_box = box;
        console.log(current_box.fillColor);

        if (operation == 'selected') {
            var text = 'X: ' + box.X + '  Y: ' + box.Y;
            $('#boxId').text(text);
        }
        else {
            $('#boxId').text('');
        }


    }

    function getData(minLat, minLng, maxLat, maxLng, no_overhead, callBack) {
        if (no_overhead) {
            var url = 'http://hydex11.net/coords/get_coord_data.php?lat=' + minLat + '&lat2=' + maxLat + '&long=' + minLng + '&long2=' + maxLng + '&no_overhead';
            $.getJSON(url, function (data) {
                grid.data(data);
            });
        }
        else {
            $.getJSON('http://hydex11.net/coords/get_coord_data.php', {
                lat: minLat,
                lat2: maxLat,
                long: minLng,
                long2: maxLng
            }, function (data) {
                grid.data(data);
            });
        }
    }

    return this;
};