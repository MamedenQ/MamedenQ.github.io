<template>
    <v-dialog v-model="isShow" persistent>
        <v-card>
            <v-card-title class="headline primary" style="color:white;" primary-title dark>スコアの保存</v-card-title>
            <v-form v-model="isFormValid" ref="score_save_form">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field dense outlined label="試合名" color="primary" v-model="modelTitle" v-bind:rules="[required]"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-menu v-model="showDatePicker" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="modelDate" readonly v-on="on" dense outlined label="日付"></v-text-field>
                                </template>
                                <v-date-picker v-model="modelDate" @input="showDatePicker = false" v-bind:rules="[required]"></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                dense
                                outlined
                                label="得点A"
                                type="number"
                                color="primary"
                                v-model="modelAPoint"
                                v-bind:rules="[required, limit_length, limit_value]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                dense
                                outlined
                                label="得点B"
                                type="number"
                                color="primary"
                                v-model="modelBPoint"
                                v-bind:rules="[required, limit_length, limit_value]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <v-card-actions>
                <v-spacer></v-spacer>
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
        }
    }
};
</script>

<style lang="scss">
@import "../../style/common.scss";
</style>
