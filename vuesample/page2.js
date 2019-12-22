const template = `
<div>
    <table>
        <thead>
            <tr>
                <th colspan="2">基本情報</th>
                <th colspan="5">総合</th>
                <th colspan="5" class='serve_cell'>サーブ</th>
                <th colspan="5" class='spike_cell'>スパイク</th>
                <th colspan="5" class='block_cell'>ブロック</th>
                <th colspan="9" class='reception_cell'>レセプション</th>
                <th rowspan="2">そ<br>の<br>他<br>ミ<br>ス</th>
            </tr>
            <tr>
                <th>#</th>
                <th>名前</th>
                <th>得<br>点</th>
                <th>失<br>点</th>
                <th>効<br>果<br>率</th>
                <th>決<br>定<br>率</th>
                <th>開<br>き</th>
                <!--
                <th>勝<br>率</th>
                <th>勝<br>セ<br>ッ<br>ト</th>
                <th>総<br>セ<br>ッ<br>ト</th>
                -->

                <th class='serve_cell'>総<br>数</th>
                <th class='serve_cell'>得<br>点</th>
                <th class='serve_cell'>失<br>点</th>
                <th class='serve_cell sort' data-sort="serve_effect">効<br>果<br>率</th>
                <th class='serve_cell sort' data-sort="serve_det">決<br>定<br>率</th>

                <th class='spike_cell'>総<br>数<br>①</th>
                <th class='spike_cell'>得<br>点<br>②</th>
                <th class='spike_cell'>失<br>点<br>③</th>
                <th class='spike_cell sort' data-sort="spike_effect">効<br>果<br>率<br>(②－③)／①</th>
                <th class='spike_cell sort' data-sort="spike_det">決<br>定<br>率<br>②／①</th>

                <th class='block_cell'>総<br>数</th>
                <th class='block_cell'>得<br>点</th>
                <th class='block_cell'>失<br>点</th>
                <th class='block_cell sort' data-sort="block_effect">効<br>果<br>率</th>
                <th class='block_cell sort' data-sort="block_det">決<br>定<br>率</th>

                <th class='reception_cell'>総<br>数</th>
                <th class='reception_cell'>A<br>カ<br>ッ<br>ト</th>
                <th class='reception_cell'>B<br>カ<br>ッ<br>ト</th>
                <th class='reception_cell'>C<br>カ<br>ッ<br>ト</th>
                <th class='reception_cell'>失<br>点</th>
                <th class='reception_cell'>A<br>率</th>
                <th class='reception_cell'>B<br>率</th>
                <th class='reception_cell'>C<br>率</th>
                <th class='reception_cell'>失<br>点<br>率</th>
            </tr>
        </thead>
        <draggable element="tbody">
            <tr v-for="item, idx of scoreAnalyze">
                <td>{{idx}}</td>
                <td>
                    <a href='#'>
                        {{item.playerid}}:{{item.name}}
                    </a>
                </td>
                <td>{{item.total.point}}</td>
                <td>{{item.total.miss}}</td>
                <td>{{item.total.effect}}%</td>
                <td>{{item.total.determined}}%</td>
                <td>{{-1 * (item.total.effect - item.total.determined)}}%</td>
                <!--
                <td>winper</td>
                <td>win</td>
                <td>set</td>
                -->
                <td>{{item.serve.total}}</td>
                <td>{{item.serve.point}}</td>
                <td>{{item.serve.miss}}</td>
                <td>{{item.serve.effect}}</td>
                <td>{{item.serve.determined}}</td>
                <td>{{item.spike.total}}</td>
                <td>{{item.spike.point}}</td>
                <td>{{item.spike.miss}}</td>
                <td>{{item.spike.effect}}</td>
                <td>{{item.spike.determined}}</td>
                <td>{{item.block.total}}</td>
                <td>{{item.block.point}}</td>
                <td>{{item.block.miss}}</td>
                <td>{{item.block.effect}}</td>
                <td>{{item.block.determined}}</td>
                <td>{{item.receive.total}}</td>
                <td>{{item.receive.a}}</td>
                <td>{{item.receive.b}}</td>
                <td>{{item.receive.c}}</td>
                <td>{{item.receive.miss}}</td>
                <td>{{item.receive.a_rate}}</td>
                <td>{{item.receive.b_rate}}</td>
                <td>{{item.receive.c_rate}}</td>
                <td>{{item.receive.miss_rate}}</td>
                <td>{{item.miss_etc}}</td>
            </tr>
        </draggable>
    </table>
</div>
`;

export default {
    template,
    data() {
        return {
            scoreColor: color,
            scoreAnalyze: [
                {
                    playerid: 0,
                    name: "shinya",
                    total: {
                        point: 3,
                        miss: 2,
                        effect: 30.0,
                        determined: 50.0,
                    },
                    serve: {
                        point: 1,
                        point_detail: {
                            ace: 1,
                        },
                        miss: 1,
                        miss_detail: {
                            net: 2,
                            out: 1,
                        },
                        rally: 2,
                        total: 20,
                        effect: 30.0,
                        determined: 50.0,
                    },
                    spike: {
                        point: 2,
                        point_detail: {
                            in: 1,
                            block_out: 2,
                            fake: 2,
                        },
                        miss: 1,
                        miss_detail: {
                            net: 1,
                            out: 2,
                            block: 3,
                        },
                        rally: 2,
                        total: 10,
                        effect: 30.0,
                        determined: 50.0,
                    },
                    block: {
                        point: 1,
                        miss: 2,
                        // miss_detail: {
                        //     out: 1,
                        //     dyson: 2,
                        // },
                        rally: 1,
                        total: 5,
                        effect: 30.0,
                        determined: 50.0,
                    },
                    receive: {
                        a: 0,
                        b: 1,
                        c: 2,
                        miss: 3,
                        // miss_detail: {
                        //     omiai: 1,
                        // },
                        a_rate: 10,
                        b_rate: 10,
                        c_rate: 10,
                        miss_rate: 10,
                    },
                    miss_etc: 3,
                },
                {
                    playerid: 1,
                    name: "miura",
                    total: {
                        point: 3,
                        miss: 2,
                        effect: 30.0,
                        determined: 50.0,
                    },
                    serve: {
                        point: 1,
                        point_detail: {
                            ace: 1,
                        },
                        miss: 1,
                        miss_detail: {
                            net: 2,
                            out: 1,
                        },
                        rally: 2,
                        total: 20,
                        effect: 30.0,
                        determined: 50.0,
                    },
                    spike: {
                        point: 2,
                        point_detail: {
                            in: 1,
                            block_out: 2,
                            fake: 2,
                        },
                        miss: 1,
                        miss_detail: {
                            net: 1,
                            out: 2,
                            block: 3,
                        },
                        rally: 2,
                        total: 10,
                        effect: 30.0,
                        determined: 50.0,
                    },
                    block: {
                        point: 1,
                        miss: 2,
                        // miss_detail: {
                        //     out: 1,
                        //     dyson: 2,
                        // },
                        rally: 1,
                        total: 5,
                        effect: 30.0,
                        determined: 50.0,
                    },
                    receive: {
                        a: 0,
                        b: 1,
                        c: 2,
                        miss: 3,
                        // miss_detail: {
                        //     omiai: 1,
                        // },
                        a_rate: 10,
                        b_rate: 10,
                        c_rate: 10,
                        miss_rate: 10,
                    },
                    miss_etc: 3,
                }
            ],
        }
    },
    mounted() {
    },
    methods: {
        getPlayerTemplate() {
            return {
                playerid: 0,
                name: "",
                total: {
                    point: 0,
                    miss: 0,
                    effect: 0,
                    determined: 0,
                },
                serve: {
                    point: 0,
                    point_detail: {
                        ace: 0,
                    },
                    miss: 0,
                    miss_detail: {
                        net: 0,
                        out: 0,
                    },
                    rally: 0,
                    total: 0,
                    effect: 0,
                    determined: 0,
                },
                spike: {
                    point: 0,
                    point_detail: {
                        in: 0,
                        block_out: 0,
                        fake: 0,
                    },
                    miss: 0,
                    miss_detail: {
                        net: 0,
                        out: 0,
                        block: 0,
                    },
                    rally: 0,
                    total: 0,
                    effect: 0,
                    determined: 0,
                },
                block: {
                    point: 0,
                    miss: 0,
                    // miss_detail: {
                    //     out: 1,
                    //     dyson: 2,
                    // },
                    rally: 0,
                    total: 0,
                    effect: 0,
                    determined: 0,
                },
                receive: {
                    a: 0,
                    b: 0,
                    c: 0,
                    miss: 0,
                    // miss_detail: {
                    //     omiai: 1,
                    // },
                    a_rate: 0,
                    b_rate: 0,
                    c_rate: 0,
                    miss_rate: 0,
                },
                miss_etc: 0, // お見合いとか
                miss_judge: 0,
                faul: 0,
            };
        }
    },
}