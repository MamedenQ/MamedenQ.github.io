<template>
    <div class="player-button">
        <v-btn style="height: 100%;" class="background-button" v-on:click="onClickPlayer" v-bind:color="buttonColor"></v-btn>
        <span v-show="!item.isEmpty" class="player-name">{{ item.no + ":" + item.name }}</span>
        <playerSvg v-show="item.sex == 0 && !item.isEmpty"></playerSvg>
        <playerFSvg v-show="item.sex == 1 && !item.isEmpty"></playerFSvg>
        <span class="libero" v-if="item.isLibero">L</span>
    </div>
</template>

<script>
import playerSvg from "../SVG/PlayerSVG";
import playerFSvg from "../SVG/PlayerFSVG";

export default {
    name: "player",
    components: {
        playerSvg,
        playerFSvg
    },
    props: {
        item: Object
    },
    data() {
        return {
            buttonColor: "#d6edbe"
        };
    },
    mounted() {
        if (!this.item.isFront) {
            this.buttonColor = "#edd5be";
        }
    },
    methods: {
        onClickPlayer() {
            this.$emit("on-click-player", this.item);
        }
    }
};
</script>

<style lang="scss">
@import "../../style/common.scss";
</style>
