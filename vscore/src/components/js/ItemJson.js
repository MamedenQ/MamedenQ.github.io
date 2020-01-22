export default {
  itemAction: [
    { label: "サーブ", name: "serve", id: "action_serve", classGrid: "select-item serve" },
    { label: "スパイク", name: "spike", id: "action_spike", classGrid: "select-item spike" },
    { label: "ブロック", name: "block", id: "action_block", classGrid: "select-item block" },
    { label: "レシーブ ", name: "receive", id: "action_receive", classGrid: "select-item receive" },
    { label: "他ミス", name: "other_miss", id: "action_other_miss", classGrid: "select-item other_miss" },
    { label: "ファウル", name: "faul", id: "action_faul", classGrid: "select-item faul" }
  ],
  itemKindServe: [
    { label: "ポイント", name: "point", id: "kind_1", classGrid: "select-item rally", isEnabled: true },
    { label: "ミス", name: "miss", id: "kind_2", classGrid: "select-item point", isEnabled: true },
    { label: "", name: "-", id: "kind_3", classGrid: "select-item miss", isEnabled: false },
    { label: "", name: "-", id: "kind_4", classGrid: "select-item a", isEnabled: false },
    { label: "", name: "-", id: "kind_5", classGrid: "select-item b", isEnabled: false },
    { label: "", name: "-", id: "kind_6", classGrid: "select-item c", isEnabled: false }
  ],
  itemKindSpike: [
    { label: "ラリー", name: "rally", id: "kind_1", classGrid: "select-item rally", isEnabled: true },
    { label: "ポイント", name: "point", id: "kind_2", classGrid: "select-item point", isEnabled: true },
    { label: "ミス", name: "miss", id: "kind_3", classGrid: "select-item miss", isEnabled: true },
    { label: "", name: "-", id: "kind_4", classGrid: "select-item a", isEnabled: false },
    { label: "", name: "-", id: "kind_5", classGrid: "select-item b", isEnabled: false },
    { label: "", name: "-", id: "kind_6", classGrid: "select-item c", isEnabled: false }
  ],
  itemKindReceive: [
    { label: "ミス", name: "miss", id: "kind_1", classGrid: "select-item rally", isEnabled: true },
    { label: "", name: "-", id: "kind_2", classGrid: "select-item point", isEnabled: false },
    { label: "", name: "-", id: "kind_3", classGrid: "select-item miss", isEnabled: false },
    { label: "", name: "-", id: "kind_4", classGrid: "select-item a", isEnabled: false },
    { label: "", name: "-", id: "kind_5", classGrid: "select-item b", isEnabled: false },
    { label: "", name: "-", id: "kind_6", classGrid: "select-item c", isEnabled: false }
  ],
  itemDetailDefault: [
    { label: "", name: "-", id: "detail_1", classGrid: "select-item detail1 detail_1_label", isEnabled: false },
    { label: "", name: "-", id: "detail_2", classGrid: "select-item detail2 detail_2_label", isEnabled: false },
    { label: "", name: "-", id: "detail_3", classGrid: "select-item detail3 detail_3_label", isEnabled: false },
    { label: "", name: "-", id: "detail_4", classGrid: "select-item detail4 detail_4_label", isEnabled: false },
    { label: "", name: "-", id: "detail_5", classGrid: "select-item detail5 detail_5_label", isEnabled: false },
    { label: "", name: "-", id: "detail_6", classGrid: "select-item detail6 detail_6_label", isEnabled: false }
  ],
  itemDetailServePoint: [
    { label: "エース", name: "ace", id: "detail_1", classGrid: "select-item detail1 detail_1_label", isEnabled: true },
    { label: "", name: "-", id: "detail_2", classGrid: "select-item detail2 detail_2_label", isEnabled: false },
    { label: "", name: "-", id: "detail_3", classGrid: "select-item detail3 detail_3_label", isEnabled: false },
    { label: "", name: "-", id: "detail_4", classGrid: "select-item detail4 detail_4_label", isEnabled: false },
    { label: "", name: "-", id: "detail_5", classGrid: "select-item detail5 detail_5_label", isEnabled: false },
    { label: "", name: "-", id: "detail_6", classGrid: "select-item detail6 detail_6_label", isEnabled: false }
  ],
  itemDetailServeMiss: [
    { label: "アウト", name: "out", id: "detail_1", classGrid: "select-item detail1 detail_1_label", isEnabled: true },
    { label: "ネット", name: "net", id: "detail_2", classGrid: "select-item detail2 detail_2_label", isEnabled: true },
    { label: "", name: "-", id: "detail_3", classGrid: "select-item detail3 detail_3_label", isEnabled: false },
    { label: "", name: "-", id: "detail_4", classGrid: "select-item detail4 detail_4_label", isEnabled: false },
    { label: "", name: "-", id: "detail_5", classGrid: "select-item detail5 detail_5_label", isEnabled: false },
    { label: "", name: "-", id: "detail_6", classGrid: "select-item detail6 detail_6_label", isEnabled: false }
  ],
  itemDetailSpikePoint: [
    { label: "イン", name: "in", id: "detail_1", classGrid: "select-item detail1 detail_1_label", isEnabled: true },
    { label: "フェイント", name: "fake", id: "detail_2", classGrid: "select-item detail2 detail_2_label", isEnabled: true },
    { label: "ブロックアウト", name: "blockout", id: "detail_3", classGrid: "select-item detail3 detail_3_label", isEnabled: true },
    { label: "", name: "-", id: "detail_4", classGrid: "select-item detail4 detail_4_label", isEnabled: false },
    { label: "", name: "-", id: "detail_5", classGrid: "select-item detail5 detail_5_label", isEnabled: false },
    { label: "", name: "-", id: "detail_6", classGrid: "select-item detail6 detail_6_label", isEnabled: false }
  ],
  itemDetailSpikeMiss: [
    { label: "アウト", name: "out", id: "detail_1", classGrid: "select-item detail1 detail_1_label", isEnabled: true },
    { label: "ネット", name: "net", id: "detail_2", classGrid: "select-item detail2 detail_2_label", isEnabled: true },
    { label: "ブロック", name: "block", id: "detail_3", classGrid: "select-item detail3 detail_3_label", isEnabled: true },
    { label: "", name: "-", id: "detail_4", classGrid: "select-item detail4 detail_4_label", isEnabled: false },
    { label: "", name: "-", id: "detail_5", classGrid: "select-item detail5 detail_5_label", isEnabled: false },
    { label: "", name: "-", id: "detail_6", classGrid: "select-item detail6 detail_6_label", isEnabled: false }
  ],
  itemDetailBlockMiss: [
    { label: "アウト", name: "out", id: "detail_1", classGrid: "select-item detail1 detail_1_label", isEnabled: true },
    { label: "吸い込み", name: "suikomi", id: "detail_2", classGrid: "select-item detail2 detail_2_label", isEnabled: true },
    { label: "", name: "-", id: "detail_3", classGrid: "select-item detail3 detail_3_label", isEnabled: false },
    { label: "", name: "-", id: "detail_4", classGrid: "select-item detail4 detail_4_label", isEnabled: false },
    { label: "", name: "-", id: "detail_5", classGrid: "select-item detail5 detail_5_label", isEnabled: false },
    { label: "", name: "-", id: "detail_6", classGrid: "select-item detail6 detail_6_label", isEnabled: false }
  ],
  itemDetailOtherMiss: [
    { label: "ジャッジ", name: "judge", id: "detail_1", classGrid: "select-item detail1 detail_1_label", isEnabled: true },
    { label: "お見合い", name: "omiai", id: "detail_2", classGrid: "select-item detail2 detail_2_label", isEnabled: true },
    { label: "", name: "-", id: "detail_3", classGrid: "select-item detail3 detail_3_label", isEnabled: false },
    { label: "", name: "-", id: "detail_4", classGrid: "select-item detail4 detail_4_label", isEnabled: false },
    { label: "", name: "-", id: "detail_5", classGrid: "select-item detail5 detail_5_label", isEnabled: false },
    { label: "", name: "-", id: "detail_6", classGrid: "select-item detail6 detail_6_label", isEnabled: false }
  ],
  itemTeamA: [
    { key: "a1", team: "a", playerid: "", no: "", name: "", sex: 0, classGrid: "a1", isEmpty: true, isLibero: false, isFront: true },
    { key: "a2", team: "a", playerid: "", no: "", name: "", sex: 0, classGrid: "a2", isEmpty: true, isLibero: false, isFront: true },
    { key: "a3", team: "a", playerid: "", no: "", name: "", sex: 0, classGrid: "a3", isEmpty: true, isLibero: false, isFront: true },
    { key: "a4", team: "a", playerid: "", no: "", name: "", sex: 0, classGrid: "a4", isEmpty: true, isLibero: false, isFront: false },
    { key: "a5", team: "a", playerid: "", no: "", name: "", sex: 0, classGrid: "a5", isEmpty: true, isLibero: false, isFront: false },
    { key: "a6", team: "a", playerid: "", no: "", name: "", sex: 0, classGrid: "a6", isEmpty: true, isLibero: false, isFront: false },
    { key: "a7", team: "a", playerid: "", no: "", name: "", sex: 0, classGrid: "a7", isEmpty: true, isLibero: true, isFront: false },
    { key: "a8", team: "a", playerid: "", no: "", name: "", sex: 0, classGrid: "a8", isEmpty: true, isLibero: true, isFront: false }
  ],
  itemTeamB: [
    { key: "b1", team: "b", playerid: "", no: "", name: "", sex: 0, classGrid: "b1", isEmpty: true, isLibero: false, isFront: true },
    { key: "b2", team: "b", playerid: "", no: "", name: "", sex: 0, classGrid: "b2", isEmpty: true, isLibero: false, isFront: true },
    { key: "b3", team: "b", playerid: "", no: "", name: "", sex: 0, classGrid: "b3", isEmpty: true, isLibero: false, isFront: true },
    { key: "b4", team: "b", playerid: "", no: "", name: "", sex: 0, classGrid: "b4", isEmpty: true, isLibero: false, isFront: false },
    { key: "b5", team: "b", playerid: "", no: "", name: "", sex: 0, classGrid: "b5", isEmpty: true, isLibero: false, isFront: false },
    { key: "b6", team: "b", playerid: "", no: "", name: "", sex: 0, classGrid: "b6", isEmpty: true, isLibero: false, isFront: false },
    { key: "b7", team: "b", playerid: "", no: "", name: "", sex: 0, classGrid: "b7", isEmpty: true, isLibero: true, isFront: false },
    { key: "b8", team: "b", playerid: "", no: "", name: "", sex: 0, classGrid: "b8", isEmpty: true, isLibero: true, isFront: false }
  ]
};
