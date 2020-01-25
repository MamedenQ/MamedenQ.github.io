<template>
    <v-dialog v-model="isShow" persistent>
        <v-card>
            <v-card-title class="headline primary" style="color:white;" primary-title dark>{{ dialogProp.title }}</v-card-title>

            <v-card-text style="padding-top:20px;">{{ dialogProp.msg }}</v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="sendResult(true)" color="primary" dark>{{ dialogProp.positive }}</v-btn>
                <v-btn v-on:click="sendResult(false)">{{ dialogProp.negative }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "confirm",
    data() {
        return {
            dialogProp: {},
            isShow: false
        };
    },
    methods: {
        open(dialogProp) {
            this.dialogProp = dialogProp;
            this.isShow = true;
        },
        sendResult(flg) {
            this.isShow = false;
            this.dialogProp.callback(flg);
        }
    }
};
</script>

<style lang="scss">
@import "../../style/common.scss";
</style>
