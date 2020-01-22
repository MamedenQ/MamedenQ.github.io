<template>
    <div>
        <div style="margin-bottom:10px;">チームマスタ編集</div>
        <v-data-table :headers="headersTeam" :items="teams" item-key="id" disable-sort hide-default-footer style="margin-bottom:10px;">
            <template v-slot:item.no="{ item }">{{ item.no }}</template>
            <template v-slot:item.name="{ item }">
                <v-text-field color="primary" v-model="item.name"></v-text-field>
            </template>
        </v-data-table>
        <div>
            <v-container>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                        <v-btn v-on:click="onClickSaveTeam" color="primary" dark>保存</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <confirm ref="confirm"></confirm>
    </div>
</template>

<script>
import confirm from "./Confirm";

export default {
    name: "master_maintenance_team",
    components: {
        confirm
    },
    data() {
        return {
            dialogProp: {
                title: "",
                msg: "",
                positive: "",
                negative: "",
                callback: null
            },
            teams: [],
            headersTeam: [
                {
                    text: "番号",
                    align: "center",
                    value: "no",
                    width: "20%"
                },
                {
                    text: "チーム名",
                    align: "center",
                    value: "name",
                    width: "80%"
                }
            ]
        };
    },
    mounted() {
        this.refresh();
    },
    methods: {
        refresh() {
            this.teams = this.getTeamsData();
        },
        onClickSaveTeam() {
            this.dialogProp = {
                title: "保存確認",
                msg: "保存しますか？",
                positive: "OK",
                negative: "キャンセル",
                callback: this.callbackSaveTeam
            };
            this.$refs.confirm.open(this.dialogProp);
        },
        callbackSaveTeam(result) {
            if (!result) {
                return;
            }
            this.setTeamsData(this.teams);
        }
    }
};
</script>

<style lang="scss">
@import "../../style/common.scss";
</style>
