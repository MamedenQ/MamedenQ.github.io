<template>
  <v-card>
    <v-dialog v-model="isShow" persistent>
      <v-card>
        <v-card-title class="headline primary" style="color:white;" primary-title dark>メンバーチェンジ</v-card-title>

        <v-container>
          <v-row>
            <v-col cols="6" class="member-select-area">
              <ul>
                <li class="member">
                  <input
                    type="radio"
                    id="mem_x"
                    name="member"
                    v-on:change="onChangeMember(null)"
                    value="-1"
                    v-model="modelSelection"
                  />
                  <label for="mem_x">
                    <v-btn
                      v-show="modelSelection == -1"
                      class="button-member"
                      style="height:100%;"
                      color="primary"
                      dark
                    >空に変更</v-btn>
                    <v-btn
                      v-on:click="modelSelection = -1;onChangeMember(null);"
                      v-show="modelSelection != -1"
                      class="button-member"
                      style="height:100%;"
                    >空に変更</v-btn>
                  </label>
                </li>
                <li class="member" v-for="member of dialogProp.members" :key="member.playerid">
                  <input
                    type="radio"
                    v-bind:id="'mem_' + member.playerid"
                    name="member"
                    v-on:change="onChangeMember(member)"
                    v-bind:value="member.playerid"
                    v-model="modelSelection"
                  />
                  <label v-bind:for="'mem_' + member.playerid">
                    <v-btn
                      v-show="modelSelection == member.playerid"
                      class="button-member"
                      style="height:100%;"
                      color="primary"
                      dark
                    >{{member.no}}:{{member.name}}</v-btn>
                    <v-btn
                      v-on:click="modelSelection = member.playerid;onChangeMember(member);"
                      v-show="modelSelection != member.playerid"
                      class="button-member"
                      style="height:100%;"
                    >{{member.no}}:{{member.name}}</v-btn>
                    <playerSvg v-if="member.sex == 0"></playerSvg>
                    <playerFSvg v-else></playerFSvg>
                  </label>
                </li>
              </ul>
            </v-col>
            <v-col cols="6" class="coat" style="height:420px;">
              <player
                v-on:on-click-player="changeMember(item)"
                v-bind:item="item"
                v-bind:class="item.classGrid"
                v-for="item of itemTeamAWork"
                :key="item.key"
              ></player>

              <player
                v-on:on-click-player="changeMember(item)"
                v-bind:item="item"
                v-bind:class="item.classGrid"
                v-for="item of itemTeamBWork"
                :key="item.key"
              ></player>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-on:click="sendResult(true)" color="primary" dark>OK</v-btn>
          <v-btn v-on:click="sendResult(false)">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import playerSvg from "../SVG/PlayerSVG";
import playerFSvg from "../SVG/PlayerFSVG";
import player from "../Material/Player";

export default {
  name: "member_change",
  components: {
    playerSvg,
    playerFSvg,
    player
  },
  data() {
    return {
      modelSelection: -1,
      selectedMember: null,
      itemTeamAWork: Array,
      itemTeamBWork: Array,
      dialogProp: {},
      isShow: false
    };
  },
  methods: {
    open(dialogProp) {
      this.dialogProp = dialogProp;
      this.itemTeamAWork = JSON.parse(JSON.stringify(dialogProp.itemTeamA));
      this.itemTeamBWork = JSON.parse(JSON.stringify(dialogProp.itemTeamB));
      this.isShow = true;
    },
    onChangeMember(member) {
      this.selectedMember = member;
    },
    changeMember(item) {
      if (this.selectedMember == null) {
        item.playerid = "";
        item.no = "";
        item.name = "";
        item.sex = 0;
        item.isEmpty = true;
      } else {
        item.playerid = this.selectedMember.playerid;
        item.no = this.selectedMember.no;
        item.name = this.selectedMember.name;
        item.sex = this.selectedMember.sex;
        item.isEmpty = false;
      }
    },
    sendResult(flg) {
      this.isShow = false;

      if (flg) {
        this.dialogProp.itemTeamA = this.itemTeamAWork;
        this.dialogProp.itemTeamB = this.itemTeamBWork;
      }

      this.dialogProp.callback(flg);
    }
  }
};
</script>

<style lang="scss">
.member-select-area {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 420px;
}

.member {
  list-style: none;
  width: 95%;

  input {
    display: none;
  }

  label {
    color: #333;
    display: inline-block;
    width: 100%;
    height: 40px;
    position: relative;

    .button-member {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      // height: 100%; なぜか反映されない　直指定だと反映される
      text-align: center;
    }

    svg {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      height: 100%;
      pointer-events: none;
    }
  }
}
</style>
