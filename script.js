
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);


  var data = [];
  var color = d3.scale.category20();
  var id1pt = 0;
  var id2pt = 0;
  var from = 0;
  var serverid = 0;
  //var count;
  var id1timeoutcnt = 0;
  var id2timeoutcnt = 0;
    
function getnextpoint() {

}

function timeout() {

}

// テストデータを追加する。
// 今は動くかわからない。。。
function pushtestdata() {
	  var id1cnt = 0;
  var id2cnt = 0;
  var _from = 0;

  var _timeout = false;

  var i;
  for(i = 0; i < 100; i++) {
    // テスト用にランダムなデータを作成する
    var _id = Math.floor(Math.random() * 2) + 1;
    var _tmptimeout = Math.floor(Math.random() * 10);
    _timeout = false;

    if(i != 0 && _tmptimeout == 0) {
      if(_id == 1 && id1timeoutcnt < 2) {
        _timeout = true;
        id1timeoutcnt++;
      }
    } else if(i != 0 && _tmptimeout == 5) {
      if(_id == 2 && id2timeoutcnt < 2) {
        _timeout = true;
        id2timeoutcnt++;
      }
    }

    var _point = 0;

    var _serverid = Math.floor(Math.random() * 6) + 1;

    if(_timeout) {
      // タイムアウト明けデータを保持しておく 

      // テクニカルタイムアウトに未対応
      
      var _tmpdata = data[data.length - 1];
      // _tmpdata.afttimeout = true;
      // _tmpdata.from = 0;

      data.push(
      {
        id: _id,        // チーム識別ID
        point: _point,  // 得点数
        from: _from,    // 遷移元
        playerid: 0,      // 得点プレーヤー
        playernm: '',     // 得点プレーヤー名
        pointaction: '',		// 得点アクション
        serverid: 0,  // サーバプレーヤー
        servernm: 'test',     // サーバプレーヤー名
        timeout: _timeout,   // タイムアウトフラグ
        afttimeout: false,  // タイムアウト明けフラグ
      });

      // タイムアウト明けのデータを追加しておく
      data.push(
      {
        id: _tmpdata.id,        // チーム識別ID
        point: _tmpdata.point,  // 得点数
        from: _tmpdata.from,    // 遷移元
        playerid: _tmpdata.playerid,      // 得点プレーヤー
        playernm: _tmpdata.playernm,     // 得点プレーヤー名
        pointaction: '',		// 得点アクション
        serverid: _tmpdata.serverid,  // サーバプレーヤー
        servernm: _tmpdata.servernm,     // サーバプレーヤー名
        timeout: _tmpdata.timeout,   // タイムアウトフラグ
        afttimeout: true,  // タイムアウト明けフラグ
      });
    } else {
      if(_id == 1) {
        id1cnt++;
        _point = id1cnt;
      } else {
        id2cnt++;
        _point = id2cnt;
      }

      var _playerid = Math.floor(Math.random() * 6) + 1;

      data.push(
      {
        id: _id,        // チーム識別ID
        point: _point,  // 得点数
        from: _from,    // 遷移元
        playerid: _playerid,      // 得点プレーヤー
        playernm: 'test',     // 得点プレーヤー名
        pointaction: '',		// 得点アクション
        serverid: _serverid,  // サーバプレーヤー
        servernm: 'test',     // サーバプレーヤー名
        timeout: _timeout,   // タイムアウトフラグ
        afttimeout: false,  // タイムアウト明けフラグ
      });

      _from = _id;
    }

    if(id1cnt >= 25 || id2cnt >= 25) {
      if(Math.abs(id1cnt - id2cnt) >= 2) {
        // どちらかが２５点以上で２点差ついていれば終了
        break;
      }
    }
  }
  //count = i;
}

var i = -1;
function createtransition() {
  // var id1x = 200;     // 左側の開始位地
  // var id2x = 400;     // 右側の開始位置
  var id1x = 400;     // 左側の開始位地
  var id2x = 500;     // 右側の開始位置
  var pady = 100;      // 上部のマージン
  var spacey = 75;    // 間隔

  var radius = 30;    // 半径

  // var startx = 0;     // 円と被らない場所から線を伸ばすための位置
  // var starty = 0;     // 〃
  // var angle = 90 - (Math.tan((id2x - id1x) / -spacey) * 180 / Math.PI);
  // alert(angle);

  // 斜辺
  // var c = Math.sqrt((id2x - id1x) * (id2x - id1x) + spacey * spacey);
  // var anglecos = Math.cos((id2x - id1x) / c);
  // var anglesin = Math.sin(spacey / c);

  // // 円周上の座標を計算
  // var xoncirle = radius * anglecos;
  // alert(xoncirle);
  // var yoncircle = radius * anglesin;
  // alert(yoncircle);

  // 合わないから固定で
  var xoncircle = 40;
  var yoncircle = 15;

  // var data = [];

  //data = [];
  //pushtestdata();

  // ログ出力
  // for(var j = 0; j < data.length; j++) {
  //   console.log(data[j]);
  // }
	i++;
	
	//alert(i);
	
  var campus_x = window.innerWidth;
  // 上部余白＋感覚＊要素数（ループ数＋１）
  var campus_y = pady + spacey * (i + 1 + id1timeoutcnt + id2timeoutcnt);
	d3.select("svg").remove();
  var svg = d3.select("#example").append("svg")
    .attr({
      width: campus_x,
      height: campus_y,
      // 'overflow': 'scroll',
    });

  // var color = d3.scale.category10();

  // グループ生成
  var g = svg.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr({
      // 座標設定を動的に行う
      transform: function(d, i) {
        var x;
        var y;

        if(d.id == 1) {
          x = id1x;
        } else {
          x = id2x;
        }
        
        y = pady + (i * spacey);

        return "translate(" + x + "," + y + ")";
      },
    });

  // 矢印生成
  // var line2 = g.append('line');
  // line2.attr({
  //   x1: function(d, i) {
  //     if(d.from == 0) {
  //       return 0;
  //     } else {
  //       // 元のX座標
  //       if(d.id == d.from) {
  //         return 0;
  //       } else if(d.id == 1) {
  //         return id2x - id1x;
  //       } else {
  //         return -(id2x - id1x);
  //       }
  //     }
  //   },
  //   y1: function(d, i) {
  //     if(d.from == 0) {
  //       return 0;
  //     } else {
  //       return -spacey;
  //     }
  //   },
  //   // x2: function(d, i) {
  //   //   if(d.from == 0) {
  //   //     return 0;
  //   //   } else {
  //   //     // 元のX座標
  //   //     if(d.id == 1) {
  //   //       return id1x;
  //   //     } else {
  //   //       return id2x;
  //   //     }
  //   //   }
  //   // },
  //   x2: 0,
  //   // y2: function(d, i) {
  //   //   if(d.from == 0) {
  //   //     return 0;
  //   //   } else {
  //   //     return pady + (spacey * i);
  //   //   }
  //   // },
  //   y2: 0,
  //   'stroke': function(d, i) {
  //     // return color(d.from);
  //     return color(3);
  //   },
  //   'stroke-width': 5,
  // });
  var line = g.append('line');
  line.attr({
    x1: function(d, i) {
      if(d.from == 0 || d.afttimeout || d.timeout) {
      // if(d.from == 0 || d.afttimeout) {
      // if(d.from == 0) {
        return 0;
      } else {
        // 元のX座標
        if(d.id == d.from) {
          return 0;
        } else if(d.id == 1) {
          return id2x - id1x - xoncircle;
        } else {
          return -(id2x - id1x - xoncircle);
        }
      }
    },
    y1: function(d, i) {
      if(d.from == 0 || d.afttimeout || d.timeout) {
      // if(d.from == 0 || d.afttimeout) {
      // if(d.from == 0) {
        return 0;
      } else {
        if(d.id == d.from) {
          return 0;
        } else {
         return -(spacey - yoncircle);
        }
     }
    },
    x2: function(d, i) {
      if(d.from == 0 || d.afttimeout || d.timeout) {
      // if(d.from == 0 || d.afttimeout) {
      // if(d.from == 0) {
        return 0;
      } else {
        if(d.id == d.from) {
          return 0;
        } else {
          if(d.id == 1) {
            return xoncircle;
          } else {
            return -xoncircle;
          }
        }
      }
    },
    y2: function(d, i) {
      if(d.from == 0 || d.afttimeout || d.timeout) {
      // if(d.from == 0 || d.afttimeout) {
      // if(d.from == 0) {
        return 0;
      } else {
        return -yoncircle;
      }
    },
    'stroke': function(d, i) {
      // return color(d.from);
      return color(4);
    },
    'stroke-width': 5,
    'visibility': function(d, i) {
      if(d.timeout) {
        return 'hidden';
      } else {
        return '';
      }
    },
  });
  // .on('dblclick', function(d, i) {
  //   d3.select(this).attr({
  //     visibility: 'hidden',
  //   });
  // });
  // .on('click', function(d, i) {
  //   alert()
  // });

  // タイムアウト用のセパレータライン
  var linetimeout = g.append('line');
  linetimeout.attr({
    x1: function(d, i) {
      if(d.timeout) {
        if(d.id == 1) {
          return -radius;
        } else {
          return -(id2x - id1x + radius);
        }
      } else {
        return 0;
      }
    },
    y1: function(d, i) {
      if(d.timeout) {
        return 0;
      } else {
        return 0;
      }
    },
    x2: function(d, i) {
      if(d.timeout) {
        if(d.id == 1) {
          return id2x - id1x + radius;
        } else {
          return radius;
        }
      } else {
        return 0;
      }
    },
    y2: function(d, i) {
      if(d.timeout) {
        return 0;
      } else {
        return 0;
      }
    },
    'stroke': function(d, i) {
      return color(d.id);
    },
    'stroke-width': 5,
  });

  // 円生成　idで色分け
  var circle = g.append('circle')
  circle.attr({
      // 'r': radius,
      'r': function(d, i) {
        // return d.r;
        return radius;
      },
      'fill': function(d, i) { return color(d.id); },
      // 'fill': none,
      // 'stroke': function(d, i) { return color(d.id); },
      'visibility': function(d, i) {
        if(d.timeout) {
          return 'hidden';
        } else {
          return '';
        }
      },
    })
  .on('mouseover', function(d) {
    // d3.select(this).attr({
    //   r: radius + 5,
    // });
  })
  .on('mouseout', function(d) {
    // d3.select(this).attr({
    //   r: radius,
    // });
  })/*
  .on('dblclick', function(d) {
    // alert(d.point);
    d.func();
  })*/
  .on('click', function(d) {
    // alert(d.point);
    d.func();
  })
  ;
  
  // onに指定できるイベント
  // http://vesna-memo.com/?p=1106

  // テキスト生成
  g.append('text')
    .attr({
      // 真ん中若干下に配置されるように、文字色は白に。
      'text-anchor': "middle",
      'dy': ".35em",
      'fill': "white",
      'cursor':"default",
      'visibility': function(d, i) {
        if(d.timeout) {
          return 'hidden';
        } else {
          return '';
        }
      },
    })
  // .text(function(d,i) { return d.point(); });
  .text(function(d,i) { return d.point; })
  // .on('mouseover', function(d) {
  //   // d.r = 5;
  //   // d3.selectAll('circle').attr({
  //   //   r: radius + 10,
  //   // });

  //   // d3.select(this).selectAll('circle').attr({
  //   //   r: radius + 10,
  //   // });

  //   // circle[i].attr('fill': 'white');
  // })
  // .on('mouseout', function(d) {
  //   // d3.select(this).attr({
  //   //   r: radius,
  //   // });
  // })
  .on('click', function(d) {
    // alert(d.point);
    d.func();
  })
  //.on('dblclick', function(d) {
  //  // alert(d.point);
  //  d.func();
  //})
  ;
  
  // 得点者IDの表示
  g.append('text')
    .attr({
      // 真ん中若干下に配置されるように、文字色は白に。
      // 'text-anchor': "middle",
      'dy': ".15em",
      'fill': function(d, i) { return color(d.id); },
      'cursor':"default",
      'visibility': function(d, i) {
        if(d.timeout) {
          return 'hidden';
        } else {
          return '';
        }
      },
      transform: function(d, i) {
        var x;
        var y;

        if(d.id == 1) {
          x = -45;
        } else {
          x = 40;
        }
        
        y = 25;

        return "translate(" + x + "," + y + ")";
      },
    })
  // .text(function(d,i) { return d.point(); });
  .text(function(d,i) { return d.playerid; })

  // 得点者IDの表示
  g.append('text')
    .attr({
      // 真ん中若干下に配置されるように、文字色は白に。
      // 'text-anchor': "middle",
      'dy': ".15em",
      'fill': function(d, i) { return color(d.id); },
      'cursor':"default",
      'visibility': function(d, i) {
        if(d.timeout) {
          return 'hidden';
        } else {
          return '';
        }
      },
      transform: function(d, i) {
        var x;
        var y;

        if(d.id == 1) {
          x = -45;
        } else {
          x = 40;
        }
        
        y = 5;

        return "translate(" + x + "," + y + ")";
      },
    })
  // .text(function(d,i) { return d.point(); });
  .text(function(d,i) { return d.serverid; })
  
  
  // テキスト生成
  g.append('text')
    .attr({
      // 真ん中若干下に配置されるように、文字色は白に。
      'text-anchor': "middle",
      'dy': ".15em",
      'fill': "white",
      'cursor':"default",
      'visibility': function(d, i) {
        if(d.timeout) {
          return 'hidden';
        } else {
          return '';
        }
      },
      transform: function(d, i) {
        var y;
        
        y = 18;

        return "translate(0," + y + ")";
      },
    })
  .text(function(d,i) { return d.pointaction; });

  // // タイムアウトテキスト生成
  // g.append('text')
  //   .attr({
  //     // // 真ん中若干下に配置されるように、文字色は白に。
  //     // 'text-anchor': "middle",
  //     // 'dy': ".35em",
  //     // 'fill': "white",
  //     'cursor':"default",
  //     'visibility': function(d, i) {
  //       if(!d.timeout) {
  //         return 'hidden';
  //       } else {
  //         return '';
  //       }
  //     },
  //     transform: function(d, i) {
  //       var x;
  //       var y;

  //       if(d.id == 1) {
  //         x = 0;
  //       } else {
  //         x = id2x;
  //       }
        
  //       y = pady + (i * spacey);

  //       return "translate(" + x + "," + y + ")";
  //     },
  //   })
  // .text(function(d,i) { return d.id + 'のタイムアウト'; })

  // .on('click', function(d) {
  //   alert(d.point);
  // });

  // for(var k = 0; k < circle.length; k++) {
  //   console.log(circle[k]);
  // }

  // circle[2].attr({'fill': 'white'},);
};

function createbubble() {
  // var campus_x = 1280;
  // var campus_y = 480;
  var campus_x = window.innerWidth;
  var campus_y = window.innerHeight;
  var svg = d3.select("#example").append("svg")
      .attr({
        width: campus_x,
        height: campus_y
      });

  // 指定を２つに
  // var c1 = [{x:100, y:90, r:30}];
  // var c2 = [{x:200, y:120, r:20}];

  // // 指定した値を配列にする
  // var carray = [c1, c2];
  // Object.prototype.func2 = function() {
  //   alert(this.id);
  // };

  // var carray = [{cx:100, cy:90, r:30, id:'A001'},
  //               {cx:200, cy:120, r:20, id:'B001'}];
  var margin = 10;
  var minradius = 30;
  var carray = [];
  for(var i = 0; i < 30; i++) {
    var _id = 'id' + (i + 1);
    var _name = 'name' + (i + 1);
    var _x = (Math.random() * 1000) % campus_x;
    var _y = (Math.random() * 1000) % campus_y;
    var _r = Math.random() * 150;

    // 半径が最小の値よりも小さい場合は最小値にする
    if(_r < minradius) {
      _r = minradius;
    }

    // xの下限、上限
    if((_x - _r - margin) <= 0) {
      _x = _r + margin;
    }
    if((_x + _r + margin) > campus_x) {
      _x = campus_x - _r - margin;
    }

    // yの下限、上限
    if((_y - _r - margin) <= 0) {
      _y = _r + margin;
    }
    if((_y + _r + margin) > campus_y) {
      _y = campus_y - _r - margin;
    }

    var retry = false;
    for(var j = 0; j < i; j++) {
      // 三平方の定理で斜辺の長さを求める
      var cx = Math.abs(carray[j].cx - _x);
      var cy = Math.abs(carray[j].cy - _y);

      var h = Math.sqrt((cx * cx) + (cy * cy));
      if((carray[j].r + _r) > (h - 10)) {
        retry = true;
        console.log('retry' + h);
        break;
      }
    }

    if(!retry) {
      carray.push(
        {
          cx:_x,
          cy:_y,
          r:_r,
          id:_id,
          name:_name,
          test: [i, i + 1],
        }
      );
    } else {
      i--;
    }
  }

  var color = d3.scale.category20();
  // var color = d3.scale.category10();

  // dataに上で作成した配列を入れる
  // var circle = svg.selectAll('circle').data(carray).enter().append('circle')
  //   .attr({
  //     // ここに定義することでプロパティのようにアクセスできる
  //     'cx': function(d) { return d.cx; },
  //     'cy': function(d) { return d.cy; },
  //     'r': function(d) { return d.r; },
  //     'id': function(d) { return d.id; },
  //     'fill': function(d, i) { return color(i); },
  //   });

  // circle.on('mouseover', function(d) {
  //   d3.select(this).attr({
  //     r: d.r + margin - 2,
  //   });
  // })
  // .on('mouseout', function(d) {
  //   d3.select(this).attr({
  //     r: d.r,
  //   });
  // })
  // .on('click', function(d) {
  // });

  // 円の中に文字を書くサンプル
  var g = svg.selectAll('g').data(carray).enter().append('g')
  .attr({
      // 座標設定を動的に行う
      transform: function(d) {
        return "translate(" + d.cx + "," + d.cy + ")";
      },
    });

  g.append('circle').attr({
  //     'cx': function(d) { return d.cx; },
  //     'cy': function(d) { return d.cy; },
      'r': function(d) { return d.r; },
      'id': function(d) { return d.id; },
      'fill': function(d, i) { return color(i); },
    });
  // .on('mouseover', function(d) {
  //   d3.select(this).attr({
  //     r: d.r + margin - 2,
  //   });
  // })
  // .on('mouseout', function(d) {
  //   d3.select(this).attr({
  //     r: d.r,
  //   });
  // })
  // .on('click', function(d) {
  // });

  g.append('text').attr({
      // 真ん中若干下に配置されるように、文字色は白に。
      'text-anchor': "middle",
      'dy': ".35em",
      'fill': "white",
      // 'cursor':"default",
    })
  .text(function(d,i) { return d.id; });
  // .on('mouseover', function(d) {
  //   d.r = d.r + 10;
  //   // d3.select(this).attr({
  //   //   r: d.r + margin - 2,
  //   // });
  // })
  // .on('mouseout', function(d) {
  //   d.r = d.r - 10;
  //   // d3.select(this).attr({
  //   //   r: d.r,
  //   // });
  // })
  // .on('click', function(d) {
  // });

  // -----------------------------------------------------------
  // appendする際は、親要素からのクライアント座標をしていすることになる。
  // しかも親の中心座標から？
  // g.append('text').attr({
  //     'text-anchor': "middle",
  //     'dy': ".35em",
  //     'fill': "black",
  //     transform: function(d) {
  //       return "translate(0," + (d.r - 10) + ")";
  //     },
  //   })
  // .text(function(d,i) { return d.name; });
  //
  // g.append('g').selectAll('text')
  // .data(function(d) { return d.test;})
  // .enter()
  // .append('text')
  // .attr({
  //     'fill': "black",
  //     'dx' : function(d, i) { return 25 * i;},
  // })
  // .text(function(d,i) { return d});
  // -----------------------------------------------------------
};

function createtable() {
  var list = [
    {
      id: 'A001',
      name: 'name1',
      score: [
        {
          point:100,
        },
        {
          point:90,
        },
        // 100,90
      ],
    },
    {
      id: 'A002',
      name: 'name2',
      score: [
        {
          point:90,
        },
        // 90,0
      ],
    },
    {
      id: 'A003',
      name: 'name3',
      // score: [1,2],
    },
  ];

  var tr = d3.select("#example")
      .append("table")
      .selectAll("tr")
      .data(list)
      .enter()
      .append("tr");
  tr.append("td")
      .text(function(d){
          return d.id;
      });
  var td = tr.append("td");
  td.text(function(d){
          return d.name;
      });
  td.selectAll('text')
    .data(function(d) {
      if(d.hasOwnProperty('score')) {
        return d.score;
      } else {
        return [];
      }
    })
    .enter()
    .append('text')
    .attr({
      'fill': "black",
    })
  .text(function(d,i) { return d.point + '+'; });
};
