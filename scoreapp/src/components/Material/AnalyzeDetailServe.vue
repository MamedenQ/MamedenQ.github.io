<template>
    <v-container fluid>
        <v-row dense>
            <!-- <v-col cols="6">
        <v-card>
          <v-card-text>得点詳細</v-card-text>
          <v-card-text>
            <bar :labels="labelsServePointPercent" :datasets="datasetsServePointPercent"></bar>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-text>得点詳細割合</v-card-text>
          <v-card-text>
            <doughnut :labels="labelsServePointPercent" :datasets="datasetsServePointPercent"></doughnut>
          </v-card-text>
        </v-card>
      </v-col>-->

            <v-col cols="6">
                <v-card>
                    <v-card-text>失点詳細</v-card-text>
                    <v-card-text>
                        <bar :labels="labelsServeMissPercent" :datasets="datasetsServeMissPercent"></bar>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="6">
                <v-card>
                    <v-card-text>失点詳細割合</v-card-text>
                    <v-card-text>
                        <doughnut :labels="labelsServeMissPercent" :datasets="datasetsServeMissPercent"></doughnut>
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
    name: "analyze_detail_serve",
    props: {
        serveData: Object
    },
    components: {
        doughnut,
        bar
    },
    data() {
        return {
            // labelsServePointPercent: [],
            // datasetsServePointPercent: [],
            labelsServeMissPercent: [],
            datasetsServeMissPercent: []
        };
    },
    beforeMount() {
        this.formatServeData();
    },
    methods: {
        formatServeData() {
            // this.formatServeDataPointDetail();
            this.formatServeDataMissDetail();
        },
        // formatServeDataPointDetail() {
        //   this.labelsServePointPercent = ["エース"];
        //   var serve_point_detail = this.serveData.point_detail;
        //   this.datasetsServePointPercent = [serve_point_detail.ace];
        // },
        formatServeDataMissDetail() {
            this.labelsServeMissPercent = ["アウト", "ネット"];
            var serve_miss_detail = this.serveData.miss_detail;
            this.datasetsServeMissPercent = [serve_miss_detail.out, serve_miss_detail.net];
        }
    }
};
</script>
