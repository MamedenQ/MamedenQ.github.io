<template>
  <v-dialog v-model="isShow" persistent>
    <v-card>
      <v-card-title
        class="headline primary"
        style="color:white;"
        primary-title
        dark
      >{{dialogProp.title}}</v-card-title>

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
  props: {
    // title: String,
    // msg: String,
    // positive: String,
    // negative: String,
    // dialogProp: Object
  },
  data() {
    return {
      dialogProp: {},
      isShow: false
    };
  },
  // mounted() {
  //   this.dialog = this.dialogProp;
  // },
  methods: {
    open(dialogProp) {
      this.dialogProp = dialogProp;
      this.isShow = true;
    },
    sendResult(flg) {
      this.isShow = false;
      // console.log(this.dialogProp);
      // this.dialogProp.isShow = false;
      // console.log(this.dialogProp);
      // this.$emit("dialogResult", flg);
      this.dialogProp.callback(flg);
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>
