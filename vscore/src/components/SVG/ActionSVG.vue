<template>
  <serveSvg v-if="id == 'action_serve'"></serveSvg>
  <spikeSvg v-else-if="id == 'action_spike'"></spikeSvg>
  <blockSvg v-else-if="id == 'action_block'"></blockSvg>
  <receiveSvg v-else-if="id == 'action_receive'"></receiveSvg>
  <faulSvg v-else-if="id == 'action_faul'"></faulSvg>
  <otherMissSvg v-else-if="id == 'action_other_miss'"></otherMissSvg>
</template>

<script>
import serveSvg from "./ServeSVG";
import spikeSvg from "./SpikeSVG";
import blockSvg from "./BlockSVG";
import receiveSvg from "./ReceiveSVG";
import faulSvg from "./FaulSVG";
import otherMissSvg from "./OtherMissSVG";

export default {
  name: "action_svg",
  props: {
    id: String
  },
  components: {
    serveSvg,
    spikeSvg,
    blockSvg,
    receiveSvg,
    faulSvg,
    otherMissSvg
  }
};
</script>
