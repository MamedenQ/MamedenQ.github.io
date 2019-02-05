
function loadJson(_playerid, _year, _month, _teamid, _sex) {
    // この引数をそのうちjsonオブジェクトにする
    var data = [];

    // そのうちdictの順番を入れ替えて表示順調整する予定のため、
    // dict基準でjson作る
    dict.forEach(function (dictData) {
        if (isDispPlayer(_playerid, _teamid, _sex, dictData.id)) {
            data.push({
                "playerid": dictData.id,
                "isEmpty": true,
                "spike": {
                    "total": 0,
                    "point": 0,
                    "miss": 0,
                    "miss_detail": {
                        "net": 0,
                        "out": 0,
                        "block": 0
                    },
                    "etc": 0,
                },
                "serve": {
                    "total": 0,
                    "point": 0,
                    "miss": 0,
                    "miss_detail": {
                        "net": 0,
                        "out": 0
                    },
                    "etc": 0,
                },
                "block": {
                    "total": 0,
                    "point": 0,
                    "miss": 0,
                    "etc": 0,
                },
                "receive": {
                    "total": 0,
                    "a": 0,
                    "b": 0,
                    "miss": 0,
                    "etc": 0,
                },
            });
            // idx++;
        }
    });

    var yearData = [];
    yearData.push(data2019);
    // yearData.push(data2020);

    yearData.forEach(function (yearData) {
        if (isDispYear(_year, yearData.year)) {
            yearData.data.forEach(function (monthData) {
                if (isDispMonth(_month, monthData.month)) {
                    monthData.data.forEach(function (playerData) {
                        if (isDispPlayer(_playerid, _teamid, _sex, playerData.playerid)) {
                            var dt = getPlayerData(playerData.playerid);
                            if ("playerid" in dt) {
                            } else {
                                console.log('no base data!!');
                                return;
                            }
                            // console.log("dt");
                            // console.log(dt);
                            addSpike(dt.spike, playerData.spike);
                            addServe(dt.serve, playerData.serve);
                            add(dt.block, playerData.block);
                            addReceive(dt.receive, playerData.receive);
                            dt.isEmpty = false;
                        }

                        function add(dt, addDt) {
                            dt.point += addDt.point;
                            dt.miss += addDt.miss;
                            dt.etc += addDt.etc;
                            dt.total += addDt.total;
                        };
                        function addSpike(dt, addDt) {
                            dt.point += addDt.point;
                            dt.miss += addDt.miss;
                            dt.etc += addDt.etc;
                            dt.total += addDt.total;
                            dt.miss_detail.net += addDt.miss_detail.net;
                            dt.miss_detail.out += addDt.miss_detail.out;
                            dt.miss_detail.block += addDt.miss_detail.block;
                        };
                        function addServe(dt, addDt) {
                            dt.point += addDt.point;
                            dt.miss += addDt.miss;
                            dt.etc += addDt.etc;
                            dt.total += addDt.total;
                            dt.miss_detail.net += addDt.miss_detail.net;
                            dt.miss_detail.out += addDt.miss_detail.out;
                        };
                        function addReceive(dt, addDt) {
                            dt.a += addDt.a;
                            dt.b += addDt.b;
                            dt.miss += addDt.miss;
                            dt.etc += addDt.etc;
                            dt.total += addDt.total;
                        };
                    });
                }
            });
        }
    });

    function getPlayerData(playerid) {
        // {}でhash作っておいてそこからアクセスした方が早い？
        var dt = {};
        var hit = false;

        data.forEach(function (playerData) {
            if (!hit) {
                if (playerData.playerid == playerid) {
                    dt = playerData;
                    hit = true;
                }
            }
        });

        return dt;
    }
    // }
    // function getJsonAndFunc(func) {
    return data;
}

//*******************************************
// 判定処理
//*******************************************
function isDispPlayer(_playerid, _teamid, _sex, playerid) {
    var disp = false;
    if (_playerid == -1) {
        if (_teamid == -1) {
            disp = true;
        } else {
            var belongTeamId = getTeamId(playerid);
            if (belongTeamId == _teamid) {
                disp = true;
            }
        }
        if (disp) {
            if (_sex != -1) {
                var sex = getSexId(playerid);
                if (sex != _sex) {
                    disp = false;
                }
            }
        }
    } else if (_playerid == playerid) {
        disp = true;
    }

    // console.log("disp player");
    return disp;
}

function isDispYear(_year, year) {
    var disp = false;

    if (_year == 0) {
        disp = true;
    } else if (year == _year) {
        disp = true;
    }

    return disp;
}
function isDispMonth(_month, month) {
    var disp = false;

    if (_month == 0) {
        disp = true;
    } else if (month == _month) {
        disp = true;
    }

    return disp;
}

//*******************************************
// jsonから抽出
//*******************************************
function getTeamId(playerId) {
    var id = -1;
    dict.forEach(function (value) {
        if (playerId == value.id) {
            id = value.teamid;
        }
    });
    return id;
}
function getSexId(playerId) {
    var id = -1;
    dict.forEach(function (value) {
        if (playerId == value.id) {
            id = value.sex;
        }
    });
    return id;
}

//*******************************************
// クエリ文字列取得
//*******************************************
function getQuery() {
    var data = {};

    var query = $(location).attr('search');
    var params = query.split("?");
    params = params[1].split("&");

    for (i = 0; i < params.length; i++) {
        var vol = params[i].split("=");
        data[vol[0]] = vol[1];
    }

    var hash = $(location).attr('hash');
    var h = hash.split("#");

    data['#'] = h[1];

    return data;
}

function calcEffect(total, point, miss) {
    var v = calcEffectNum(total, point, miss);

    var style = "";
    if (Number(v) < 0) {
        v = "<span style='color:red'>" + v + "%</span>";
    } else {
        console.log(v);
        v = "<span style=''>" + v + "%</span>";
    }

    return v;
}
function calcEffectNum(total, point, miss) {
    var v;
    if (total > 0) {
        v = ((point - miss) / total) * 100;
        v = Math.round(v * 10) / 10;
    } else {
        v = 0;
    }

    return v.toFixed(1);
}
function calcDetermined(total, point) {
    var v;
    if (total > 0) {
        v = (point / total) * 100;
        v = Math.round(v * 10) / 10;
    } else {
        v = 0;
    }
    return v.toFixed(1);
}
