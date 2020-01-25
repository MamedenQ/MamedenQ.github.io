<template>
    <div class="main-area">
        <div class="view-contents">
            <v-card>
                <v-tabs v-model="tab" background-color="primary accent-4" centered dark>
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab href="#tab-score-settings">スコア設定</v-tab>
                    <v-tab href="#tab-trash-list">削除済みスコア</v-tab>
                    <v-tab href="#tab-master">マスタメンテ</v-tab>
                    <v-tab href="#tab-backup">バックアップ</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" style="margin-bottom:10px;">
                    <v-tab-item value="tab-score-settings" style="padding:10px;">
                        <scoreSettings style="margin-bottom:10px;"></scoreSettings>
                    </v-tab-item>
                    <v-tab-item value="tab-trash-list" style="padding:10px;">
                        <trashList></trashList>
                    </v-tab-item>
                    <v-tab-item value="tab-master" style="padding:10px;">
                        <v-card style="width:100%;margin-bottom:10px;" class="d-inline-block mx-auto">
                            <v-container>
                                <masterMaintenancePlayer></masterMaintenancePlayer>
                            </v-container>
                        </v-card>
                        <v-card style="width:100%;" class="d-inline-block mx-auto">
                            <v-container>
                                <masterMaintenanceTeam></masterMaintenanceTeam>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item value="tab-backup" style="padding:10px;">
                        <backup v-on:route-home="routeHome" style="margin-bottom:10px;"></backup>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </div>
    </div>
</template>

<script>
import trashList from "./Material/TrashList";
import masterMaintenancePlayer from "./Material/MasterMaintenancePlayer";
import masterMaintenanceTeam from "./Material/MasterMaintenanceTeam";
import backup from "./Material/Backup";
import scoreSettings from "./Material/ScoreSettings";

export default {
    name: "settings",
    components: {
        trashList,
        masterMaintenancePlayer,
        masterMaintenanceTeam,
        backup,
        scoreSettings
    },
    props: {
        commonProp: Object
    },
    data() {
        return {
            tab: "tab-score-settings",
            title: "",
            msg: "",
            positive: "OK",
            negative: "キャンセル",
            // styleGrid: {
            //     "grid-template-rows": "1fr",
            // },
            styleNavi: {
                "line-height": "700px"
            }
        };
    },
    mounted() {
        this.commonProp.back = this.onBack;

        var gridHeight = window.innerHeight - 10;
        // this.styleGrid = {
        //     "grid-template-rows": gridHeight + "px",
        // };
        this.styleNavi = {
            "line-height": gridHeight + "px"
        };
    },
    methods: {
        onBack() {
            this.$emit("route-home");
        },
        routeHome() {
            this.$emit("route-home");
        }
    }
};
</script>
