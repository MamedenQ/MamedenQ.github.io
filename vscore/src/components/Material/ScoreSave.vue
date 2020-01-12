<template>
  <v-dialog v-model="isShow" persistent>
    <v-card>
      <v-card-title class="headline primary" style="color:white;" primary-title dark>スコアの保存</v-card-title>

      <v-card-text style="padding-top:20px;height:200px;">
        <v-form v-model="isFormValid" ref="score_save_form">
          <!-- <input style="width:100%" type="text" v-model="modelTitle"/><br> -->
          <v-text-field
            dense
            outlined
            label="試合名"
            color="primary"
            v-model="modelTitle"
            v-bind:rules="[required]"
          ></v-text-field>
          <!-- 日付<br> -->
          <!-- <input style="width:100%" type="date" v-model="modelDate" /><br> -->
          <v-menu
            v-model="showDatePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="modelDate" readonly v-on="on" dense outlined label="日付"></v-text-field>
            </template>
            <v-date-picker
              v-model="modelDate"
              @input="showDatePicker = false"
              v-bind:rules="[required]"
            ></v-date-picker>
          </v-menu>
          <!-- 得点<br> -->
          <div style="position:relative;">
            <v-text-field
              style="display:inline-block;width:45%;position:absolute;left:0;top:0;bottom:0;"
              dense
              outlined
              label="得点A"
              type="number"
              color="primary"
              v-model="modelAPoint"
              v-bind:rules="[required, limit_length, limit_value]"
            ></v-text-field>
            <v-text-field
              style="display:inline-block;width:45%;position:absolute;right:0;top:0;bottom:0;"
              dense
              outlined
              label="得点B"
              type="number"
              color="primary"
              v-model="modelBPoint"
              v-bind:rules="[required, limit_length, limit_value]"
            ></v-text-field>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn class="modal-default-button" v-on:click="sendResult(false)">キャンセル</v-btn>
                <v-btn
                  style="margin-right:20px;"
                  class="modal-default-button"
                  v-on:click="sendResult(true)"
                  color="primary"
                  dark
        >保存</v-btn>-->
        <v-btn v-on:click="sendResult(true)" color="primary" dark>保存</v-btn>
        <v-btn v-on:click="sendResult(false)">キャンセル</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "score_save",
  props: {},
  data() {
    return {
      dialogProp: {},
      isShow: false,
      isFormValid: false,
      showDatePicker: false,
      modelTitle: "",
      modelDate: "",
      modelAPoint: "0",
      modelBPoint: "0",
      required: value => !!value || "必須入力",
      limit_length: value => value.length <= 2 || "2文字以内",
      limit_value: value => (value >= 0 && value <= 99) || "0-99の整数"
    };
  },
  // computed: {
  //   isFormError() {
  //     return this.$refs.score_save_form.validate();
  //   }
  // },
  // mounted() {
  //   // this.isFormValid = this.$refs.score_save_form.validate();
  // },
  methods: {
    open(dialogProp) {
      this.dialogProp = dialogProp;
      this.modelTitle = dialogProp.modelTitle;
      this.modelDate = dialogProp.modelDate;
      this.modelAPoint = String(dialogProp.modelAPoint);
      this.modelBPoint = String(dialogProp.modelBPoint);
      this.isShow = true;
    },
    sendResult(flg) {
      if (flg) {
        this.isFormValid = this.$refs.score_save_form.validate();
        if (!this.isFormValid) {
          return;
        }
      }

      if (flg) {
        this.dialogProp.modelTitle = this.modelTitle;
        this.dialogProp.modelDate = this.modelDate;
        this.dialogProp.modelAPoint = this.modelAPoint;
        this.dialogProp.modelBPoint = this.modelBPoint;
      }

      this.isShow = false;
      this.dialogProp.callback(flg);

      // this.$emit(
      //   "dialogResult",
      //   flg,
      //   this.modelTitle,
      //   this.modelDate,
      //   this.modelAPoint,
      //   this.modelBPoint
      // );
    }
  }
};
</script>

<style src="../../style/style.css" lang="css">
</style>
