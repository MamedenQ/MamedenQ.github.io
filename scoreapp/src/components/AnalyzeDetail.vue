<template>
    <div class="main-area">
        <div class="view-contents">
            <v-card>
                <v-tabs v-model="tab" background-color="primary accent-4" centered dark>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#tab-total">総合</v-tab>
                    <v-tab href="#tab-serve">サーブ</v-tab>
                    <v-tab href="#tab-spike">スパイク</v-tab>
                    <v-tab href="#tab-block">ブロック</v-tab>
                    <v-tab href="#tab-receive-etc">レシーブ他</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item value="tab-total">
                        <detailTotal
                            :serveData="analyzePlayerData.serve"
                            :spikeData="analyzePlayerData.spike"
                            :blockData="analyzePlayerData.block"
                            :receiveData="analyzePlayerData.receive"
                            :otherMissDetail="analyzePlayerData.other_miss_detail"
                            :faul="analyzePlayerData.faul"
                        ></detailTotal>
                    </v-tab-item>
                    <v-tab-item value="tab-serve">
                        <detailServe :serveData="analyzePlayerData.serve"></detailServe>
                    </v-tab-item>
                    <v-tab-item value="tab-spike">
                        <detailSpike :spikeData="analyzePlayerData.spike"></detailSpike>
                    </v-tab-item>
                    <v-tab-item value="tab-block">
                        <detailBlock :blockData="analyzePlayerData.block"></detailBlock>
                    </v-tab-item>
                    <v-tab-item value="tab-receive-etc">
                        <detailReceiveEtc
                            :receiveData="analyzePlayerData.receive"
                            :otherMissDetail="analyzePlayerData.other_miss_detail"
                            :faul="analyzePlayerData.faul"
                        ></detailReceiveEtc>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </div>
    </div>
</template>

<script>
import detailTotal from "./Material/AnalyzeDetailTotal";
import detailSpike from "./Material/AnalyzeDetailSpike";
import detailServe from "./Material/AnalyzeDetailServe";
import detailBlock from "./Material/AnalyzeDetailBlock";
import detailReceiveEtc from "./Material/AnalyzeDetailReceiveEtc";

export default {
    name: "analyze_detail",
    props: {
        analyzePlayerData: Object,
        commonProp: Object,
        isMatchFrom: Boolean
    },
    components: {
        detailTotal,
        detailServe,
        detailSpike,
        detailBlock,
        detailReceiveEtc
    },
    data() {
        return {
            tab: "tab-total"
        };
    },
    mounted() {
        this.commonProp.back = this.backScoreList;
    },
    methods: {
        backScoreList() {
            if (this.isMatchFrom) {
                this.$emit("route-analyze-list-match", null);
            } else {
                this.$emit("route-analyze-list-player", null);
            }
        }
    }
};
</script>

<style lang="scss">
@import "../style/common.scss";
</style>
