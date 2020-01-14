<template></template>
<script>
export default {
  name: "data_access",
  data() {
    return {
      score: null,
      teams: null,
      members: null
    };
  },
  mounted() {},
  methods: {
    getScore() {
      console.log("getScore");
      if (this.score == null) {
        console.log("getScore first");
        this.score = this.getData("score");
      }

      return this.score;
    },
    getTeams() {
      if (this.teams == null) {
        this.teams = this.getData("teams");
      }

      return this.teams;
    },
    getMembers() {
      if (this.teams == null) {
        this.teams = this.getData("members");
      }

      return this.teams;
    },
    getBkDate() {
      return this.getData("bk_date");
    },
    getScoreBk() {
      return this.getData("score_bk");
    },
    getTeamsBk() {
      return this.getData("teams_bk");
    },
    getMembersBk() {
      return this.getData("members_bk");
    },
    getData(key) {
      var data = JSON.parse(localStorage.getItem(key));
      if (data == null) {
        data = [];
      }
      return data;
    },
    setScore(data) {
      this.score = data;
      this.setData("score", data);
    },
    setTeams(data) {
      this.score = data;
      this.setData("teams", data);
    },
    setMembers(data) {
      this.score = data;
      this.setData("members", data);
    },
    setScoreBk(data) {
      this.setData("score_bk", data);
    },
    setTeamsBk(data) {
      this.setData("teams_bk", data);
    },
    setMembersBk(data) {
      this.setData("members_bk", data);
    },
    setData(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
};
</script>
