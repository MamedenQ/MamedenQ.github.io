<template>
  <netSvg v-if="name == 'net'"></netSvg>
  <inSvg v-else-if="name == 'in' || name == 'ace'"></inSvg>
  <fakeSvg v-else-if="name == 'fake'"></fakeSvg>
  <judgeSvg v-else-if="name == 'judge'"></judgeSvg>
  <outSvg v-else-if="name == 'out'"></outSvg>
  <blockSvg v-else-if="name == 'block' || name == 'blockout'"></blockSvg>
  <suikomiSvg v-else-if="name == 'suikomi'"></suikomiSvg>
  <omiaiSvg v-else-if="name == 'omiai'"></omiaiSvg>
</template>

<script>
import netSvg from "./NetSVG";
import inSvg from "./InSVG";
import fakeSvg from "./FakeSVG";
import judgeSvg from "./JudgeSVG";
import outSvg from "./OutSVG";
import blockSvg from "./BlockSVG";
import suikomiSvg from "./SuikomiSVG";
import omiaiSvg from "./OmiaiSVG";

export default {
  name: "detail_svg",
  props: {
    name: String
  },
  components: {
    netSvg,
    inSvg,
    fakeSvg,
    judgeSvg,
    outSvg,
    blockSvg,
    suikomiSvg,
    omiaiSvg
  }
};
</script>
