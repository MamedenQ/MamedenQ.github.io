<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="6">
        <v-card>
          <v-card-text>得点詳細</v-card-text>
          <v-card-text>
            <bar :labels="labelsTotalPointPercent" :datasets="datasetsTotalPointPercent"></bar>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-text>得点詳細割合</v-card-text>
          <v-card-text>
            <doughnut :labels="labelsTotalPointPercent" :datasets="datasetsTotalPointPercent"></doughnut>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-text>失点詳細</v-card-text>
          <v-card-text>
            <bar :labels="labelsTotalMissPercent" :datasets="datasetsTotalMissPercent"></bar>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-text>失点詳細割合</v-card-text>
          <v-card-text>
            <doughnut :labels="labelsTotalMissPercent" :datasets="datasetsTotalMissPercent"></doughnut>
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
    serveData: Object,
    spikeData: Object,
    blockData: Object,
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
      labelsTotalPointPercent: [],
      datasetsTotalPointPercent: [],
      labelsTotalMissPercent: [],
      datasetsTotalMissPercent: []
    };
  },
  beforeMount() {
    this.formatTotalData();
  },
  methods: {
    formatTotalData() {
      this.formatTotalDataMissDetail();
      this.formatTotalDataPointDetail();
    },
    formatTotalDataPointDetail() {
      this.labelsTotalPointPercent = [
        "サーブポイント",
        "スパイクポイント",
        "ブロックポイント"
      ];
      this.datasetsTotalPointPercent = [
        this.serveData.point,
        this.spikeData.point,
        this.blockData.point
      ];
    },
    formatTotalDataMissDetail() {
      this.labelsTotalMissPercent = [
        "サーブミス",
        "スパイクミス",
        "ブロックミス",
        "レシーブミス",
        "ジャッジミス",
        "お見合い",
        "ファウル"
      ];
      this.datasetsTotalMissPercent = [
        this.serveData.miss,
        this.spikeData.miss,
        this.blockData.miss,
        this.receiveData.miss,
        this.otherMissDetail.judge,
        this.otherMissDetail.omiai,
        this.faul
      ];
    }
  }
};
</script>
