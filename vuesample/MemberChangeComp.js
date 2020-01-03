const template = `
    <div>
        <transition>
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container" style="width:900px">
                        <div class="modal-header">
                            <h3 slot="header">{{title}}</h3>
                        </div>
                        <div class="modal-body" style="height:420px">
                            <div style="overflow-x:hidden; overflow-y:scroll; float:left;height:100%;width:calc(50% - 10px);margin-right:10px;">
                                <ul>
                                    <li class="member">
                                        <input type="radio" id="mem_x" name="member" v-on:change="onChangeMember(null)" value="-1">
                                        <label for="mem_x">
                                            <span style="left:0;text-align:center;">空に変更</span>
                                        </label>
                                    </li>
                                    <li class="member" v-for="member of members" :key="member.no">
                                        <input type="radio" v-bind:id="'mem_' + member.no" name="member" v-on:change="onChangeMember(member)" v-bind:value="member.no">
                                        <label v-bind:for="'mem_' + member.no">
                                            <player v-if="member.sex == 0"></player>
                                            <player_f v-else></player_f>
                                            <!--
                                            <span><span v-if="member.no != -1">{{member.no}}:</span>{{member.name}}</span>
                                            -->
                                            <span>{{member.no}}:{{member.name}}</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div class="coat" style="float:left;height:100%;width:50%;">
                                <div v-bind:class="item.classGrid" v-on:click="changeMember(item)" v-for="item of itemTeamAWork">
                                    <span v-show="!item.isEmpty">{{item.no + ":" + item.name}}</span><br>
                                    <player width="40" height="40" v-if="item.sex == 0" v-show="!item.isEmpty"></player>
                                    <player_f width="40" height="40" v-else v-show="!item.isEmpty"></player_f>
                                </div>
                                <div v-bind:class="item.classGrid" v-on:click="changeMember(item)" v-for="item of itemTeamBWork">
                                    <span v-show="!item.isEmpty">{{item.no + ":" + item.name}}</span><br>
                                    <player width="40" height="40" v-if="item.sex == 0" v-show="!item.isEmpty"></player>
                                    <player_f width="40" height="40" v-else v-show="!item.isEmpty"></player_f>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="modal-default-button btn btn-secondary" @click="sendResult(false)">
                                {{ negative }}
                            </button>
                            <button class="modal-default-button btn btn-primary" @click="sendResult(true)">
                                {{ positive }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
`;

import player from './player.js'
import player_f from './player_f.js'

export default {
    template,
    props: {
        title: String,
        msg: String,
        positive: String,
        negative: String,
        itemTeamA: Array,
        itemTeamB: Array,
        members: Array,
    },
    components: {
        player,
        player_f,
    },
    data() {
        return {
            selectedMember: null,
            itemTeamAWork: Array,
            itemTeamBWork: Array,
        }
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
            this.$emit("member-change-result", flg, this.itemTeamAWork, this.itemTeamBWork);
        },
    },
};
