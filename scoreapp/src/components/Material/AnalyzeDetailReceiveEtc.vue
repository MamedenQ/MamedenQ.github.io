<template>
    <v-container fluid>
        <v-row dense>
            <v-col cols="6">
                <v-card>
                    <v-card-text>失点詳細</v-card-text>
                    <v-card-text>
                        <bar :labels="labelsReceiveEtcMissPercent" :datasets="datasetsReceiveEtcMissPercent"></bar>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="6">
                <v-card>
                    <v-card-text>失点詳細割合</v-card-text>
                    <v-card-text>
                        <doughnut :labels="labelsReceiveEtcMissPercent" :datasets="datasetsReceiveEtcMissPercent"></doughnut>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import doughnut from "../Chart/Doughnut";
import bar from "../Chart/Bar";

export default {
    name: "analyze_detail_receive_etc",
    props: {
        receiveData: Object,
        otherMissDetail: Object,
        faul: Number
    },
    components: {
        doughnut,
        bar
    },
    data() {
        return {
            labelsReceiveEtcMissPercent: [],
            datasetsReceiveEtcMissPercent: []
        };
    },
    beforeMount() {
        this.formatReceiveEtcData();
    },
    methods: {
        formatReceiveEtcData() {
            this.formatReceiveEtcDataMissDetail();
        },
        formatReceiveEtcDataMissDetail() {
            this.labelsReceiveEtcMissPercent = ["レシーブミス", "ジャッジミス", "お見合い", "ファウル"];
            this.datasetsReceiveEtcMissPercent = [this.receiveData.miss, this.otherMissDetail.judge, this.otherMissDetail.omiai, this.faul];
        }
    }
};
</script>
