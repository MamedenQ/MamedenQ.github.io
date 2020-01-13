<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="6">
        <v-card>
          <v-card-text>得点詳細</v-card-text>
          <v-card-text>
            <bar :labels="labelsSpikePointPercent" :datasets="datasetsSpikePointPercent"></bar>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-text>得点詳細割合</v-card-text>
          <v-card-text>
            <doughnut :labels="labelsSpikePointPercent" :datasets="datasetsSpikePointPercent"></doughnut>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-text>失点詳細</v-card-text>
          <v-card-text>
            <bar :labels="labelsSpikeMissPercent" :datasets="datasetsSpikeMissPercent"></bar>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-text>失点詳細割合</v-card-text>
          <v-card-text>
            <doughnut :labels="labelsSpikeMissPercent" :datasets="datasetsSpikeMissPercent"></doughnut>
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
  name: "analyze_detail_spike",
  props: {
    spikeData: Object
  },
  components: {
    doughnut,
    bar
  },
  data() {
    return {
      labelsSpikePointPercent: [],
      datasetsSpikePointPercent: [],
      labelsSpikeMissPercent: [],
      datasetsSpikeMissPercent: []
    };
  },
  beforeMount() {
    this.formatSpikeData();
  },
  methods: {
    formatSpikeData() {
      this.formatSpikeDataPointDetail();
      this.formatSpikeDataMissDetail();
    },
    formatSpikeDataPointDetail() {
      this.labelsSpikePointPercent = ["イン", "フェイント", "ブロックアウト"];
      var spike_point_detail = this.spikeData.point_detail;
      this.datasetsSpikePointPercent = [
        spike_point_detail.in,
        spike_point_detail.fake,
        spike_point_detail.blockout
      ];
    },
    formatSpikeDataMissDetail() {
      this.labelsSpikeMissPercent = ["ネット", "アウト", "ブロック"];
      var spike_miss_detail = this.spikeData.miss_detail;
      this.datasetsSpikeMissPercent = [
        spike_miss_detail.net,
        spike_miss_detail.out,
        spike_miss_detail.block
      ];
    }
  }
};
</script>


