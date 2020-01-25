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
    ]
};
