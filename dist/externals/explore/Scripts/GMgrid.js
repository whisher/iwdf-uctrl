/*****
 **  GMgrid.js
 **  Griglia per Google Maps
 **  Author: Carlo Mezzanotte (carlo.mezzanotte@tidiemme.mi.it)
 **
 *****/

function MapsGrid(map, getData, callBack, dblClickCallback) {
    var _enableBoxClick = true;
    var _showGrid = true;       // griglia abilitata o no
    var _hideGrid = true;       // per showGrid(): true nasconde la griglia/false elimina solo il riempimento
    var _waitingData = false;   // flag per segnlare l'attesa di dati
    var _map = map;             // identifcativo dell'oggetto Google Maps
    var _callBack = callBack;   // procedura da richiamare quando si clicca su un riquadro
    var _dblClickCallback = dblClickCallback;
    var _getData = getData;     // procedura da chiamare per richiedere i dati
    var _gridBounds = null;     // estremi della griglia
    var _viewBounds = null;     // estremi della viewport
    /****   Opzioni grafiche per le linee   ****/
    var _options = {
        strokeColor: 'white',
        strokeOpacity: 0.25,
        strokeWeight: 1,

        fillOpacity: 0.005,//25,
        map: _map
    };
    var _boxRows = new Array();
    var _highlightedBox = null;
    var _visible = true;
    var _side = '';
    var _safetyMargin = 0.0002;     // overhead per aggiunta righe/colonne
    var _trimOverhead = 2.0;        // parametro per la riduzione della griglia

    /*                                  // timers
     var _reqTime;
     var _callBackTime;
     var _startTime, _midTime, _endTime;
     */
    /*$(_map.getDiv()).after(
        '<div class="wait" style="margin:auto; position:absolute; top:0; left:0; bottom:0; right:0; width:32px; height:32px; display:none;">' +
        '<img src="./Images/ajax-loader.svg" />' +
        '</div>');*/


    function drawGrid() {
        if (!_showGrid || _waitingData) {
//            if (_waitingData)
//                alert("Un attimo...");
            return;
        }

//        _reqTime = Date.now();                          // timer

        waitIcon(true);
        var zoom = _map.getZoom();
        if (zoom <= 18) { // 18
//            _callBackTime = _startTime = _midTime = Date.now();         // timer
            showGrid(false);
//            _endTime = Date.now();                      // timer
//            showTime();                                 // timer
            waitIcon(false);
            return;
        }

        var bounds = _map.getBounds();
        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();
        _viewBounds = {S: sw.lat(), W: sw.lng(), N: ne.lat(), E: ne.lng()};

        // se non ho una griglia, la carico
        if (_gridBounds == null) {
            reload(_viewBounds.S, _viewBounds.W, _viewBounds.N, _viewBounds.E);
            return;
        }

        // se la viewport è dentro la griglia la visualizzo (se era nascosta per zoom out)
        if (_viewBounds.S >= _gridBounds.S && _viewBounds.W >= _gridBounds.W && _viewBounds.N <= _gridBounds.N && _viewBounds.E <= _gridBounds.E) {
//            _callBackTime = _startTime = _midTime = Date.now();         // timer
            if (!_visible)
                showGrid(true);
//            _endTime = Date.now();                      // timer
//            showTime();                                 // timer
            waitIcon(false);
            return;
        }

        // se la viewport è tutta fuori dalla griglia la ricarico
        if (_viewBounds.N <= _gridBounds.S || _viewBounds.S >= _gridBounds.N || _viewBounds.E <= _gridBounds.W || _viewBounds.W >= _gridBounds.E) {
            reload(_viewBounds.S, _viewBounds.W, _viewBounds.N, _viewBounds.E);
            return;
        }

        // se sono uscito verso il basso carico delle righe sotto
        if (_viewBounds.S < _gridBounds.S) {
            newRows(0, _viewBounds.S, _gridBounds.W, _gridBounds.S, _gridBounds.E);
            return;
        }
        else {
            // se sono uscito sopra carico delle righe sopra
            if (_viewBounds.N > _gridBounds.N) {
                newRows(1, _gridBounds.N, _gridBounds.W, _viewBounds.N, _gridBounds.E);
                return;
            }
            else {
                // se sono uscito verso a sinistra carico delle colonne a sinistra
                if (_viewBounds.W < _gridBounds.W) {
                    newCols(0, _gridBounds.S, _viewBounds.W, _gridBounds.N, _gridBounds.W);
                    return;
                }
                else {      // se sono uscito verso destra (o non sono uscito in orizzontale) carico delle colonne a destra
                    newCols(1, _gridBounds.S, _gridBounds.E, _gridBounds.N, _viewBounds.E);
                    return;
                }
            }
        }
    };

    // richiedo i dati per l'intera griglia
    function reload(latMin, lngMin, latMax, lngMax) {
//        _reqTime = Date.now();                        // timer
        _side = '';
        _getData(latMin, lngMin, latMax, lngMax, false);
        _waitingData = true;
        clearGrid();
    }

    // richiedo i dati per nuove righe da aggiungere
    function newRows(side, latMin, lngMin, latMax, lngMax) {
//        _reqTime = Date.now();                        // timer
        _side = (side == 1) ? 'N' : 'S';
        _getData(latMin - _safetyMargin, lngMin - _safetyMargin, latMax + _safetyMargin, lngMax + _safetyMargin, true);
        _waitingData = true;
    }

    // richiedo i dati per nuove colonne da aggiungere
    function newCols(side, latMin, lngMin, latMax, lngMax) {
//        _reqTime = Date.now();                        // timer
        _side = (side == 1) ? 'E' : 'W';
        _getData(latMin - _safetyMargin, lngMin - _safetyMargin, latMax + _safetyMargin, lngMax + _safetyMargin, true);
        _waitingData = true;
    }

    // disegno la griglia ex-novo
    function draw(data) {
//        _startTime = Date.now();                      // timer
        clearGrid();
//        _midTime = Date.now();                        // timer
        if (data && !data.error) {

            $(data).each(function (index, row) {
                _options.Y = row.idY;
                var boxRow = createRow(row);
                _boxRows.push(boxRow);
            });

//            _endTime = Date.now();                    // timer
            updateBounds();
//            showTime(data);                           // timer
            data = null;
            waitIcon(false);
        }
    }

    // aggiungo delle nuove righe
    function addRows(data) {
//        _startTime = _midTime = Date.now();           // timer
        if(_boxRows.length == 0) return;

        if (_side == 'N') {
              // aggiungo le righe sopra
            var lastRow = _boxRows.length - 1;
            var lastY = _boxRows[lastRow][0].Y;
            var minX = _boxRows[lastRow][0].getBounds().getSouthWest().lng();
            var maxX = _boxRows[lastRow][_boxRows[lastRow].length - 1].getBounds().getNorthEast().lng();

            $(data).each(function (index, row) {
                if (row.idY > lastY) {
                    _options.Y = row.idY;
                    var boxRow = createRow(row, minX, maxX);
                    _boxRows.push(boxRow);
                    minX = boxRow[0].getBounds().getSouthWest().lng();
                    maxX = boxRow[boxRow.length - 1].getBounds().getNorthEast().lng();
                }
            });
        }
        else {                          // aggiungo le righe sotto
            data.reverse();
            var lastY = _boxRows[0][0].Y;
            var minX = _boxRows[0][0].getBounds().getSouthWest().lng();
            var maxX = _boxRows[0][_boxRows[0].length - 1].getBounds().getNorthEast().lng();

            $(data).each(function (index, row) {
                if (row.idY < lastY) {
                    _options.Y = row.idY;
                    var boxRow = createRow(row, minX, maxX);
                    _boxRows.unshift(boxRow);
                    minX = boxRow[0].getBounds().getSouthWest().lng();
                    maxX = boxRow[boxRow.length - 1].getBounds().getNorthEast().lng();
                }
            });
        }

//        _endTime = Date.now();                  // timer
        updateBounds();
//        showTime(data);                         // timer
        data = null;

        // se sono uscito anche verso sinistra carico delle colonne a sinistra
        if (_viewBounds.W < _gridBounds.W) {
            newCols(0, _gridBounds.S, _viewBounds.W, _gridBounds.N, _gridBounds.W);
            return;
        }
        else {
            // se sono uscito anche verso destra carico delle colonne a destra
            if (_viewBounds.E > _gridBounds.E) {
                newCols(1, _gridBounds.S, _gridBounds.E, _gridBounds.N, _viewBounds.E);
                return;
            }
            else {
                trimGrid();
            }
        }
        waitIcon(false);
    }

    // creo una riga
    function createRow(row, minX, maxX) {
        var boxRow = new Array();

        $(row.cubes).each(function (index, elem) {
            var deltaX;
            deltaX = (elem.longitudeEast - elem.longitudeWest) / 3.0;
        //   if ((minX == null || minX <= (elem.long2 - deltaX)) && (maxX == null || maxX >= (elem.long + deltaX))) {
                var box = createBox(row, elem);
                boxRow.push(box);
         //   }
        });

        return (boxRow);
    }


    // creo un singolo riquadro
    function createBox(row, elem) {
        _options.X = elem.idX;
        _options.fillColor = elem.color || "#2C70AF";
        _options.bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(row.latitudeSouth, elem.longitudeWest),
            new google.maps.LatLng(row.latitudeNorth, elem.longitudeEast));

        var box = new google.maps.Rectangle(_options);
        box.lat = parseFloat(row.latitudeSouth);
        box.lat2 = parseFloat(row.latitudeNorth);
        box.long = parseFloat(elem.longitudeWest);
        box.long2 = parseFloat(elem.longitudeEast);
        google.maps.event.addListener(box, 'click', boxClicked);
        google.maps.event.addListener(box, 'dblclick', _dblClickCallback);

        return (box);
    }

    // aggiungo nuove colonne
    function addCols(data) {
//        _startTime = _midTime = Date.now();     // timer

        var minY = _boxRows[0][0].Y;
        var boxIx = dataIx = 0;
        while (data[dataIx].idY > _boxRows[boxIx][0].Y) {
            boxIx++;
        }

        while (dataIx < data.length && boxIx < _boxRows.length) {
            if (data[dataIx].idY < _boxRows[boxIx][0].Y) {
                dataIx++;
                continue;
            }
            _options.Y = data[dataIx].idY;
            if (_side == 'E')              // aggiungo le celle a destra
                addElems(data[dataIx], _boxRows[boxIx]);
            else
                insertElems(data[dataIx], _boxRows[boxIx]);
            dataIx++;
            boxIx++;
        }

//        _endTime = Date.now();                  // timer
        updateBounds();
//        showTime(data);                         // timer
        data = null;

        trimGrid();
        waitIcon(false);
    }

    // aggiungo dei riquadri alla fine di una riga
    function addElems(row, boxRow) {
        var lastX = boxRow[boxRow.length - 1].X;
        $(row.cubes).each(function (index, elem) {
            if (elem.idX > lastX) {
                var box = createBox(row, elem);
                boxRow.push(box);
            }
        });
    }

    // inserisco dei riquadri all'inizio di una riga
    function insertElems(row, boxRow) {
        row.cubes.reverse();
        var lastX = boxRow[0].X;
        $(row.cubes).each(function (index, elem) {
            if (elem.idX < lastX) {
                var box = createBox(row, elem);
                boxRow.unshift(box);
            }
        });
    }

    // aggiorno i valori minimi e massimi della griglia
    function updateBounds() {
        if (_boxRows.length > 0) {
            var bounds = _boxRows[0][0].getBounds();
            var sw = bounds.getSouthWest();
            bounds = _boxRows[_boxRows.length - 1][_boxRows[_boxRows.length - 1].length - 1].getBounds();
            var ne = bounds.getNorthEast();

            _gridBounds = {
                S: sw.lat(),
                W: sw.lng(),
                N: ne.lat(),
                E: ne.lng()
            };
        }
    }

    // elimino righe e/o colonne in eccesso
    function trimGrid() {
        var zoomFactor = _map.getZoom() - 17;
        var vBounds = _map.getBounds();
        var vLarg = vBounds.getNorthEast().lng() - vBounds.getSouthWest().lng();
        var vAlt = vBounds.getNorthEast().lat() - vBounds.getSouthWest().lat();
        var gLarg = _gridBounds.E - _gridBounds.W;
        var gAlt = _gridBounds.N - _gridBounds.S;

        // se la griglia è oltre il doppio rispetto alla mappa (a zoom 18)
        vLarg = vLarg * zoomFactor * _trimOverhead;
        vAlt = vAlt * zoomFactor * _trimOverhead;
        if ((_gridBounds.E - _gridBounds.W) > vLarg ||
            (_gridBounds.N - _gridBounds.S) > vAlt) {
            var vCenter = _map.getCenter();
            var trimS = vCenter.lat() - (vAlt / 2.0);
            var trimW = vCenter.lng() - (vLarg / 2.0);
            var trimN = vCenter.lat() + (vAlt / 2.0);
            var trimE = vCenter.lng() + (vLarg / 2.0);

            // Elimino eventuali righe in basso
            while (_boxRows[0][0].getBounds().getSouthWest().lat() < trimS) {
                deleteRow(_boxRows[0]);
                _boxRows.shift();
            }

            // elimino eventuali righe in alto
            while (_boxRows[_boxRows.length - 1][0].getBounds().getNorthEast().lat() > trimN) {
                deleteRow(_boxRows[_boxRows.length - 1]);
                _boxRows.pop();
            }

            $(_boxRows).each(function (index, row) {
                // elimino eventuali colonne a sinistra
                while (row[0].getBounds().getSouthWest().lng() < trimW) {
                    deleteElem(row[0]);
                    row.shift();
                }
                // elimino eventuali colonne a destra
                while (row[row.length - 1].getBounds().getNorthEast().lng() > trimE) {
                    deleteElem(row[row.length - 1]);
                    row.pop();
                }
            });
        }
    }

    // elimino un'intera riga
    function deleteRow(row) {
        $(row).each(function (index, elem) {
            deleteElem(this);
        });
    }

    // elimino un riquadro
    function deleteElem(elem) {
        elem.setMap(null);
        google.maps.event.clearListeners(elem, 'click');
    }

    // visualizzo/nascondo l'icona di attesa
    function waitIcon(flag) {
        if (flag)
            $('#loadingDiv').show();
        else
            $('#loadingDiv').hide();
    }

    /*
     function showTime(data) {
     $('#timeId').text("Download: " + Math.round(_callBackTime - _reqTime) + " (Processing: " +
     Math.round((data) ? data.elapsed * 1000.0 : 0.0) + ") | Delete: " +
     Math.round(_midTime - _startTime) + " | Draw: " +
     Math.round(_endTime - _midTime) + " | Rows: " +
     ((data) ? data.rows.length : 0) + " | Columns: " + ((data) ? data.[0].cubes.length : 0));
     };
     */
    // rispondo al click su un riquadro
    function boxClicked() {
        if (!_enableBoxClick) return;

        if (this.fillOpacity == 0.7) {
            this.setOptions({fillOpacity: 0.25});
            _highlightedBox = null;
            _callBack(this, 'released');
        }
        else {
            if (_highlightedBox != null) {
                _highlightedBox.setOptions({fillOpacity: 0.25});
                _callBack(_highlightedBox, 'released');
            }
            this.setOptions({fillOpacity: 0.7});
            _highlightedBox = this;
            _callBack(this, 'selected');
        }
    }

    // cancello l'intera griglia
    function clearGrid() {
        if (_highlightedBox) {
            _callBack(_highlightedBox, 'released');
            _highlightedBox = null;
        }
        $(_boxRows).each(function () {
            var boxCols = this;
            $(boxCols).each(function () {
                this.setMap(null);
                google.maps.event.clearListeners(this, 'click');
            });
            this.length = 0;
        });

        _boxRows.length = 0;
        _gridBounds = null;
    };

    // visualizzo/nascondo la griglia
    function showGrid(show) {
        if (_visible != show) {
            $(_boxRows).each(function () {
                var boxCols = this;
                $(boxCols).each(function () {
                    if (_hideGrid)
                        this.setVisible(show);      // nascondo/visualizzo
                    else
                        this.setOptions({fillOpacity: ((show) ? 0.005 : 0.0)});    // elimino/rispristino il riempimento
                })
            });
            _visible = show;
        }


        if(show && _gridVisible)
        {
            setTutorialStep(TUTORIAL_STEP_MAPS_GRID);
        }
        else
        {
            if(_gridVisible)
            {
                setTutorialStep(TUTORIAL_STEP_MAPS_GENERAL);
            }
            else
            {
               // setTutorialStep(TUTORIAL);
            }
           //
        }
    }

    // bounds_changed e idle possono venir chiamati più volte in successione quando si fanno degli zoom o dei trascinamenti
    /*
     google.maps.event.addListener(_map, 'bounds_changed', function () { drawGrid(); });
     google.maps.event.addListener(_map, 'idle', function () { drawGrid(); });
     */
    google.maps.event.addListener(_map, 'zoom_changed', function () {
        drawGrid();
    });
    google.maps.event.addListener(_map, 'dragend', function () {
        drawGrid();
    });

    // metodo per la ricezione dei dati
    this.data = function (data) {
//        _callBackTime = Date.now();           // timer
        _waitingData = false;
        switch (_side) {
            case 'S':
            case 'N':
                addRows(data);
                break;
            case 'E':
            case 'W':
                addCols(data);
                break;
            default:
                draw(data);
                break;
        }
    };
    // metodo per la richiesta di visualizzazione della griglia
    this.show = function () {
        _waitingData = false;
        _showGrid = true;
        drawGrid();
    };
    // metodo per la richiesta l'eliminazione della griglia e il blocco di nuove visualizzazione
    this.hide = function () {
        clearGrid();
        _showGrid = false;
        _waitingData = false;
    };
    // metodo per la cancellazione della griglia (non impedisce nuove visualizzazioni)
    this.clear = function () {
        clearGrid();
        _waitingData = false;
    };

    this.setEnableBoxClick = function(enableClick)
    {
      _enableBoxClick = enableClick;
    };

    // procedura di inizializzazione
    // se la mappa non risponde ancora aspetto il primo evento 'bounds_changed' per visualizzare la griglia
    if (_map.getBounds() === undefined)
        google.maps.event.addListenerOnce(_map, 'bounds_changed', function () {
            drawGrid();
        });
    else
        drawGrid();
}
