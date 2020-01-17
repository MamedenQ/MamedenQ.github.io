<template>
  <div>
    <v-dialog v-model="isShow" persistent>
      <v-card>
        <v-card-title class="headline primary" style="color:white;" primary-title dark>メンバーチェンジ</v-card-title>

        <v-card-text style="padding-top:20px;height:420px">
          <div
            style="overflow-x:hidden; overflow-y:scroll; float:left;height:100%;width:calc(50% - 10px);margin-right:10px;"
          >
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
                    v-bind:style="styleMemberButton"
                    color="primary"
                    dark
                  >空に変更</v-btn>
                  <v-btn
                    v-on:click="modelSelection = -1;onChangeMember(null);"
                    v-show="modelSelection != -1"
                    v-bind:style="styleMemberButton"
                  >空に変更</v-btn>
                  <!-- <span style="left:0;text-align:center;pointer-events:none">空に変更</span> -->
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
                    v-bind:style="styleMemberButton"
                    color="primary"
                    dark
                  >{{member.no}}:{{member.name}}</v-btn>
                  <v-btn
                    v-on:click="modelSelection = member.playerid;onChangeMember(member);"
                    v-show="modelSelection != member.playerid"
                    v-bind:style="styleMemberButton"
                  >{{member.no}}:{{member.name}}</v-btn>
                  <playerSvg v-if="member.sex == 0"></playerSvg>
                  <playerFSvg v-else></playerFSvg>
                  <!-- <span>{{member.no}}:{{member.name}}</span> -->
                </label>
              </li>
            </ul>
          </div>
          <div class="coat" style="float:left;height:100%;width:50%;">
            <player
              v-on:on-click-player="changeMember(item)"
              v-bind:item="item"
              v-bind:class="item.classGrid"
              v-for="item of itemTeamAWork"
              :key="item.key"
            ></player>
            <!-- <rotate class="rotate-a" v-on:on-click-rotate="rotateA"></rotate> -->

            <player
              v-on:on-click-player="changeMember(item)"
              v-bind:item="item"
              v-bind:class="item.classGrid"
              v-for="item of itemTeamBWork"
              :key="item.key"
            ></player>
            <!-- <rotate class="rotate-b" v-on:on-click-rotate="rotateB"></rotate> -->
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-on:click="sendResult(true)" color="primary" dark>OK</v-btn>
          <v-btn v-on:click="sendResult(false)">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <transition v-if="false">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container" style="width:700px">
            <div class="modal-header">
              <h3 slot="header">{{title}}</h3>
            </div>
            <div class="modal-body" style="height:420px">
              <div
                style="overflow-x:hidden; overflow-y:scroll; float:left;height:100%;width:calc(50% - 10px);margin-right:10px;"
              >
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
                        v-bind:style="styleMemberButton"
                        color="primary"
                        dark
                      >空に変更</v-btn>
                      <v-btn
                        v-on:click="modelSelection = -1;onChangeMember(null);"
                        v-show="modelSelection != -1"
                        v-bind:style="styleMemberButton"
                      >空に変更</v-btn>
                      <!-- <span style="left:0;text-align:center;pointer-events:none">空に変更</span> -->
                    </label>
                  </li>
                  <li class="member" v-for="member of members" :key="member.playerid">
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
                        v-bind:style="styleMemberButton"
                        color="primary"
                        dark
                      >{{member.no}}:{{member.name}}</v-btn>
                      <v-btn
                        v-on:click="modelSelection = member.playerid;onChangeMember(member);"
                        v-show="modelSelection != member.playerid"
                        v-bind:style="styleMemberButton"
                      >{{member.no}}:{{member.name}}</v-btn>
                      <playerSvg v-if="member.sex == 0"></playerSvg>
                      <playerFSvg v-else></playerFSvg>
                      <!-- <span>{{member.no}}:{{member.name}}</span> -->
                    </label>
                  </li>
                </ul>
              </div>
              <div class="coat" style="float:left;height:100%;width:50%;">
                <player
                  v-on:on-click-player="changeMember(item)"
                  v-bind:item="item"
                  v-bind:class="item.classGrid"
                  v-for="item of itemTeamAWork"
                  :key="item.key"
                ></player>
                <!-- <rotate class="rotate-a" v-on:on-click-rotate="rotateA"></rotate> -->

                <player
                  v-on:on-click-player="changeMember(item)"
                  v-bind:item="item"
                  v-bind:class="item.classGrid"
                  v-for="item of itemTeamBWork"
                  :key="item.key"
                ></player>
                <!-- <rotate class="rotate-b" v-on:on-click-rotate="rotateB"></rotate> -->
              </div>

              <!-- <div class="coat" style="float:left;height:100%;width:50%;">
                <div
                  v-bind:class="item.classGrid"
                  v-on:click="changeMember(item)"
                  v-for="item of itemTeamAWork"
                  :key="item.key"
                >
                  <span v-show="!item.isEmpty">{{item.no + ":" + item.name}}</span>
                  <br />
                  <playerSvg width="40" height="40" v-if="item.sex == 0" v-show="!item.isEmpty"></playerSvg>
                  <playerFSvg width="40" height="40" v-else v-show="!item.isEmpty"></playerFSvg>
                </div>
                <div
                  v-bind:class="item.classGrid"
                  v-on:click="changeMember(item)"
                  v-for="item of itemTeamBWork"
                  :key="item.key"
                >
                  <span v-show="!item.isEmpty">{{item.no + ":" + item.name}}</span>
                  <br />
                  <playerSvg width="40" height="40" v-if="item.sex == 0" v-show="!item.isEmpty"></playerSvg>
                  <playerFSvg width="40" height="40" v-else v-show="!item.isEmpty"></playerFSvg>
                </div>
              </div>-->
            </div>
            <div class="modal-footer">
              <!-- <button
                class="modal-default-button btn btn-secondary"
                @click="sendResult(false)"
              >{{ negative }}</button>
              <button
                class="modal-default-button btn btn-primary"
                @click="sendResult(true)"
              >{{ positive }}</button>-->
              <v-btn class="modal-default-button" v-on:click="sendResult(false)">{{ negative }}</v-btn>
              <v-btn
                style="margin-right:20px;"
                class="modal-default-button"
                v-on:click="sendResult(true)"
                color="primary"
                dark
              >{{ positive }}</v-btn>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import playerSvg from "../SVG/PlayerSVG";
import playerFSvg from "../SVG/PlayerFSVG";
import player from "../Material/Player";

export default {
  name: "member_change",
  // props: {
  //   title: String,
  //   msg: String,
  //   positive: String,
  //   negative: String,
  //   itemTeamA: Array,
  //   itemTeamB: Array,
  //   members: Array
  // },
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
      styleMemberButton: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        "text-align": "center"
      },
      dialogProp: {},
      isShow: false
    };
  },
  // mounted() {
  //   this.itemTeamAWork = JSON.parse(JSON.stringify(this.itemTeamA));
  //   this.itemTeamBWork = JSON.parse(JSON.stringify(this.itemTeamB));
  // },
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

<style>
.member {
  list-style: none;
  width: 95%;
}

.member input {
  display: none;
}

/* .member input[type="radio"]:checked + label {
  color: #fff;
  background-color: #005ab3;
} */

.member label {
  color: #333;
  /* background: #eee;
  text-align: center; */
  display: inline-block;
  width: 100%;
  height: 40px;
  position: relative;
  /* filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.6));
  border-radius: 2px; */
}

.member label svg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
}

/* .member label span {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  text-align: left;
  line-height: 40px;
  pointer-events: none;
} */
</style>
