const template = `
    <div>
        <transition>
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container" style="width:50%">
                        <div class="modal-header">
                            <h3 slot="header">{{title}}</h3>
                        </div>
                        <div class="modal-body" style="height:500px">
                            <ul style="float:left;height:100%;width:50%;"> 
                                <li style="text-align: center;" v-bind:class="item.classGrid" v-on:click="changeMember(item)" v-for="item of itemTeamAWork" :key="item.key" class="grid_style_team">
                                    <span v-show="!item.isEmpty">{{item.no + ":" + item.name}}</span><br>
                                    <player v-if="item.sex == 0" v-show="!item.isEmpty"></player>
                                    <player_f v-else v-show="!item.isEmpty"></player_f>
                                </li>
                                <li style="text-align: center;" v-bind:class="item.classGrid" v-on:click="changeMember(item)" v-for="item of itemTeamBWork" :key="item.key" class="grid_style_team">
                                    <span v-show="!item.isEmpty">{{item.no + ":" + item.name}}</span><br>
                                    <player v-if="item.sex == 0" v-show="!item.isEmpty"></player>
                                    <player_f v-else v-show="!item.isEmpty"></player_f>
                                </li>
                            </ul>

                            <div style="overflow-x:hidden; overflow-y:scroll; float:left;height:100%;width:50%;">
                                <ul>
                                    <li class="member" v-for="member of members" :key="member.no">
                                        <input type="radio" v-bind:id="'mem_' + member.no" name="member" v-on:change="onChangeMember(member)" v-bind:value="member.no">
                                        <label v-bind:for="'mem_' + member.no">
                                            <span v-if="member.no != -1">{{member.no}}</span><br>{{member.name}}<br>
                                            <player v-if="member.sex == 0"></player>
                                            <player_f v-else></player_f>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="modal-default-button" @click="sendResult(false)">
                                {{ negative }}
                            </button>
                            <button class="modal-default-button" @click="sendResult(true)">
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
            if (this.selectedMember.no == -1) {
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
