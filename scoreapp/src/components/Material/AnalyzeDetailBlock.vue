<template>
    <v-container fluid>
        <v-row dense>
            <v-col cols="6">
                <v-card>
                    <v-card-text>失点詳細</v-card-text>
                    <v-card-text>
                        <bar :labels="labelsBlockMissPercent" :datasets="datasetsBlockMissPercent"></bar>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="6">
                <v-card>
                    <v-card-text>失点詳細割合</v-card-text>
                    <v-card-text>
                        <doughnut :labels="labelsBlockMissPercent" :datasets="datasetsBlockMissPercent"></doughnut>
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
    name: "analyze_detail_block",
    props: {
        blockData: Object
    },
    components: {
        doughnut,
        bar
    },
    data() {
        return {
            // labelsBlockPointPercent: [],
            // datasetsBlockPointPercent: [],
            labelsBlockMissPercent: [],
            datasetsBlockMissPercent: []
        };
    },
    beforeMount() {
        this.formatBlockData();
    },
    methods: {
        formatBlockData() {
            // this.formatBlockDataPointDetail();
            this.formatBlockDataMissDetail();
        },
        // formatBlockDataPointDetail() {
        //   this.labelsBlockPointPercent = ["エース"];
        //   var block_point_detail = this.blockData.point_detail;
        //   this.datasetsBlockPointPercent = [block_point_detail.ace];
        // },
        formatBlockDataMissDetail() {
            this.labelsBlockMissPercent = ["アウト", "吸い込み"];
            var block_miss_detail = this.blockData.miss_detail;
            this.datasetsBlockMissPercent = [block_miss_detail.out, block_miss_detail.suikomi];
        }
    }
};
</script>
