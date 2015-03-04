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

    $('#showUnderGroundBtn').click(function () {
        if (verticalTraslation < 1) {
            verticalTraslation = 10;
        }
        else {
            verticalTraslation = -10;
        }

        applyVerticalTraslation();

    });

    // Functions

    var verticalTraslation = 0;
    var minVerticalTraslation = 0;
    var maxVerticalTraslation = 0;

    function setDegrees(rotateX, rotateZ) {

        if (rotateX == false) {
            $(overlayCubes).each(function () {
                $(this).css('transform', 'none');
            });
            $('#mapDiv.perspectiveEnabled > div.gm-style').css('transform', 'none');
            return;
        }

        $(overlayCubes).each(function () {
            $(this).css('transform', 'rotateX(' + rotateX + 'deg) rotateZ(' + rotateZ + 'deg) translateZ(' + ($(this).data('_height') * $(this).attr('data-cube-z') - $(this).data('_height') / 2 + verticalTraslation) + 'px)');
        });//  translateZ(-' + overlayCube.data('_height')+'px)
        $('#mapDiv.perspectiveEnabled > div.gm-style').css('transform', 'rotateX(' + rotateX + 'deg) rotateZ(' + rotateZ + 'deg) translateZ(' + verticalTraslation + 'px)');
    }

    function applyVerticalTraslation() {
        if (verticalTraslation < -maxVerticalTraslation)
            verticalTraslation = -maxVerticalTraslation;
        else if (verticalTraslation > -minVerticalTraslation)
            verticalTraslation = -minVerticalTraslation;


        setDegrees(setDegreesRotX, setDegreesRotY);

        if (verticalTraslation > 0) {
            $('#mapDiv').addClass('showUnderGround');
        }
        else {
            $('#mapDiv').removeClass('showUnderGround');
        }
    }

    $('body').on('mousewheel', function (event) {
        if (perspectiveActive) {
            verticalTraslation += -event.deltaY * 20;

            applyVerticalTraslation();
        }
    });

    var cubesAppended = false;

    var perspectiveActive = false;

    function perspectiveCenterMap() {
        var x_long = current_box.long + (current_box.long2 - current_box.long) / 2;
        var y_lat = current_box.lat2;// + (current_box.lat2 - current_box.lat) / 2;

        latLng1 = new google.maps.LatLng(y_lat, x_long);

        map.setCenter(latLng1);

        setTimeout(perspectiveLocateCube, 750);
    }

    var setDegreesRotX = 68, setDegreesRotY = -15;

    function perspectiveLocateCube() {
        var lat_long_s_w = new google.maps.LatLng(current_box.lat, current_box.long);
        //var s_e = new google.maps.LatLng(current_box.lat, current_box.long2);
        //var n_w = new google.maps.LatLng(current_box.lat2, current_box.long);
        var lat_long_n_e = new google.maps.LatLng(current_box.lat2, current_box.long2);

        var p_s_w = perspectiveProjection.fromLatLngToContainerPixel(lat_long_s_w);
        var p_n_e = perspectiveProjection.fromLatLngToContainerPixel(lat_long_n_e);

        var width = p_n_e.x - p_s_w.x;
        var height = p_s_w.y - p_n_e.y;

        $(overlayCubes).each(function () {
            var overlayCube = this;
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
        });


        setDegrees(setDegreesRotX, setDegreesRotY);
    }

    function enablePerspective() {

        verticalTraslation = 0;

        $('#goBackGlobe').fadeIn(250);
        $('#showUnderGroundBtn').fadeIn(250);

        map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
        grid.setEnableBoxClick(false);
        oldZoomLevel = map.getZoom();

        $("#mapDiv").addClass('perspectiveEnabled');

        setTutorialStep(TUTORIAL_STEP_PERSPECTIVE_GENERAL);

        perspectiveCenterMap();

        $('body').removeClass();
        $('body').addClass('perspectiveview');

        perspectiveActive = true;


        var current2DID = current_box.X + '_' + current_box.Y;
        if (checkedOverlayCubes[current2DID]) {
            for (var key in checkedOverlayCubes[current2DID]) {
                if (checkedOverlayCubes[current2DID][key]) {

                }
                $("#mapDiv").find('.cube[data-cube-z=' + key + ']').addClass('checked');
            }
        }

    }

    function disablePerspective(callback) {
        hideCubeStats();
        $('#goBackGlobe').fadeOut(250);
        $('#showUnderGroundBtn').fadeOut(250);

        $(overlayCubes).each(function () {

            $(this).fadeOut(250, function () {
                $(this).hide();
            });
        });

        $('#mapDiv .cube').removeClass('selected');
        $('#mapDiv .cube').removeClass('checked');


        $('body').removeClass();
        $('body').addClass('mapsview');

        setDegrees(false);
        // $("#mapDiv").children('div.gm-style').removeClass("rotated");
        setTimeout(function () {
            $("#mapDiv").removeClass('perspectiveEnabled');

            setTutorialStep(TUTORIAL_STEP_MAPS_GRID);

            if (oldZoomLevel != null) {
                map.setZoom(oldZoomLevel);
                oldZoomLevel = null;
            }

            grid.setEnableBoxClick(true);
            map.setOptions({draggable: true, zoomControl: true, scrollwheel: true, disableDoubleClickZoom: true});

            perspectiveActive = false;

            if ($.isFunction(callback))
                callback();
        }, 500);


    }

    var map = null;
    var data;
    var grid = null;

    var current_box = null;

    var perspectiveOverlay;
    var perspectiveProjection;
    var oldZoomLevel = null;

    var overlayCubes = [];
    var overlayCubesCount = 0;
    var maxOverlayCubesCount = 20;

    var checkedOverlayCubes = {};


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

            var currentOverlayCubeRelativeAltitude = -5;

            minVerticalTraslation = currentOverlayCubeRelativeAltitude * 20;
            maxVerticalTraslation = (maxOverlayCubesCount - Math.abs(currentOverlayCubeRelativeAltitude)) * 20;

            perspectiveProjection = perspectiveOverlay.getProjection();

            if (!cubesAppended) {

                for (; overlayCubesCount <= maxOverlayCubesCount; overlayCubesCount++) {
                    var currentCube = $(cubeHtml);
                    $(currentCube).attr('data-cube-z', currentOverlayCubeRelativeAltitude);
                    $(currentCube).find('div.cube').attr('data-cube-z', currentOverlayCubeRelativeAltitude);

                    // if (currentOverlayCubeRelativeAltitude <= 8) {
                    $(currentCube).css('z-index', overlayCubesCount + 2);
                    /* }
                     else {
                     $(currentCube).css('z-index', maxOverlayCubesCount - overlayCubesCount + 2);
                     }*/

                    if (currentOverlayCubeRelativeAltitude <= 0) {
                        $(currentCube).addClass('underGround');
                    }

                    $("#mapDiv").append(currentCube);
                    overlayCubes.push(currentCube);

                    currentOverlayCubeRelativeAltitude++;


                }

                cubesAppended = true;

            }
        });

        $(window).on('resize', function () {
            if (perspectiveActive) {
                disablePerspective(enablePerspective);
                //perspectiveCenterMap();
            }
        });

        google.maps.event.addListenerOnce(map, "projection_changed", function () {

        });

        $('#goBackGlobe').click(disablePerspective);


    };

    function checkCube(cube2DID, cubeZ) {
        if (!checkedOverlayCubes[cube2DID]) {
            checkedOverlayCubes[cube2DID] = {};
        }

        checkedOverlayCubes[current2DID][cubeZ] = true;
        $("#mapDiv").find('.cube[data-cube-z=' + cubeZ + ']').addClass('checked');


    }

    function unCheckCube(cube2DID, cubeZ) {
        if (!checkedOverlayCubes[cube2DID]) {
            checkedOverlayCubes[cube2DID] = {};
        }
        checkedOverlayCubes[current2DID][cubeZ] = false;
        $("#mapDiv").find('.cube[data-cube-z=' + cubeZ + ']').removeClass('checked');
    }

    var current2DID = null;

    $('body').on('click', '.cube', function () {

        $('.cube.selected').removeClass('selected');

        current2DID = current_box.X + '_' + current_box.Y;

        $(this).addClass('selected');

       showCubeStats();

    });

    function showCubeStats()
    {
        $('#cubeStatsPanel').fadeIn(250);
    }

    function hideCubeStats()
    {
        $('#cubeStatsPanel').fadeOut(250);
    }

    $('#checkCubeBtn').click(function () {
        current2DID = current_box.X + '_' + current_box.Y;

        var cube = $('.cube.selected');

        if (cube.length > 0) {
            var cubeZ = cube.attr('data-cube-z');

            if (cube.hasClass("checked"))
                unCheckCube(current2DID, cubeZ);
            else
                checkCube(current2DID, cubeZ);
        }


    });

    this.getMap = function () {
        return map;
    };


    function dblClickCallback(box, operation) {
        enablePerspective();

    }

    function callBack(box, operation) {

        current_box = box;
        console.log(current_box.fillColor);

        if (operation == 'selected') {
            setTutorialStep(TUTORIAL_STEP_MAPS_GRID_SELECTED);
        }
        else {
            setTutorialStep(TUTORIAL_STEP_MAPS_GRID);
        }


    }

    function getData(minLat, minLng, maxLat, maxLng, no_overhead, callBack) {
        /*if (no_overhead) {
         var url = 'http://hydex11.net/coords/get_coord_data.php?lat=' + minLat + '&lat2=' + maxLat + '&long=' + minLng + '&long2=' + maxLng + '&no_overhead';
         $.getJSON(url, function (data) {
         grid.data(data);
         });
         }
         else {*/
        //data.worldtwoo.com
        $.getJSON('http://data.worldtwoo.com:19110/getCubes?latitude1=' + minLat + '&latitude2=' + maxLat + '&longitude1=' + minLng + '&longitude2=' + maxLng, function (data) { //  + "&overhead=true"
            grid.data(data);
        });
        //}
    }

    this.getCurrentBox = function () {
        return current_box;
    };

    return this;
}