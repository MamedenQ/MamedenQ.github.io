<template>
  <pointSvg v-if="name == 'point'"></pointSvg>
  <otherMissSvg v-else-if="name == 'miss'"></otherMissSvg>
  <rallySvg v-else-if="name == 'rally'"></rallySvg>
</template>

<script>
import pointSvg from "./PointSVG";
import otherMissSvg from "./OtherMissSVG";
import rallySvg from "./RallySVG";

export default {
  name: "kind_svg",
  props: {
    name: String
  },
  components: {
    pointSvg,
    otherMissSvg,
    rallySvg
  }
};
</script>
