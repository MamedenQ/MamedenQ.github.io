<template>
  <div>
    <transition>
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
                    />
                    <label for="mem_x">
                      <span style="left:0;text-align:center;">空に変更</span>
                    </label>
                  </li>
                  <li class="member" v-for="member of members" :key="member.no">
                    <input
                      type="radio"
                      v-bind:id="'mem_' + member.no"
                      name="member"
                      v-on:change="onChangeMember(member)"
                      v-bind:value="member.no"
                    />
                    <label v-bind:for="'mem_' + member.no">
                      <playerSvg v-if="member.sex == 0"></playerSvg>
                      <playerFSvg v-else></playerFSvg>
                      <span>{{member.no}}:{{member.name}}</span>
                    </label>
                  </li>
                </ul>
              </div>
              <div class="coat" style="float:left;height:100%;width:50%;">
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
              </div>
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

export default {
  name: "member_change",
  props: {
    title: String,
    msg: String,
    positive: String,
    negative: String,
    itemTeamA: Array,
    itemTeamB: Array,
    members: Array
  },
  components: {
    playerSvg,
    playerFSvg
  },
  data() {
    return {
      selectedMember: null,
      itemTeamAWork: Array,
      itemTeamBWork: Array
    };
  },
  mounted() {
    this.itemTeamAWork = JSON.parse(JSON.stringify(this.itemTeamA));
    this.itemTeamBWork = JSON.parse(JSON.stringify(this.itemTeamB));
  },
  methods: {
    onChangeMember(member) {
      this.selectedMember = member;
    },
    changeMember(item) {
      if (this.selectedMember == null) {
        item.no = "";
        item.name = "";
        item.sex = 0;
        item.isEmpty = true;
      } else {
        item.no = this.selectedMember.no;
        item.name = this.selectedMember.name;
        item.sex = this.selectedMember.sex;
        item.isEmpty = false;
      }
    },
    sendResult(flg) {
      this.$emit(
        "member-change-result",
        flg,
        this.itemTeamAWork,
        this.itemTeamBWork
      );
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

.member input[type="radio"]:checked + label {
  color: #fff;
  background-color: #005ab3;
}

.member label {
  color: #333;
  background: #eee;
  text-align: center;
  display: inline-block;
  width: 100%;
  height: 40px;
  position: relative;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.6));
  border-radius: 2px;
}

.member label svg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
}

.member label span {
  position: absolute;
  left: 60px;
  top: 0;
  right: 0;
  bottom: 0;
  text-align: left;
  line-height: 40px;
}
</style>
