<script>
export default {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        getScoreData() {
          return this.getData("score");
        },
        getTrashScoreData() {
          var scoreList = this.getScoreData();
          var filterData = scoreList.filter(function(data) {
            if (data.isTrash) return true;
          });

          return filterData;
        },
        getTeamsData() {
          var data = JSON.parse(localStorage.getItem("teams"));
          if (data == null) {
            return this.getDefaultDataMembers();
          }
          return data;
        },
        getMembersData() {
          return this.getData("members");
        },
        getScoreSettingsData() {
          var data = JSON.parse(localStorage.getItem("score_settings"));
          if (data == null) {
            return this.getDefaultDataScoreSettings();
          }
          return data;
        },
        getBkDateData() {
          var data = localStorage.getItem("bk_date");
          if (data == null) {
            return "";
          }
          return data;
        },
        getScoreBkData() {
          return JSON.parse(localStorage.getItem("score_bk"));
        },
        getTeamsBkData() {
          return JSON.parse(localStorage.getItem("teams_bk"));
        },
        getMembersBkData() {
          return JSON.parse(localStorage.getItem("members_bk"));
        },
        getScoreSettingsBkData() {
          return JSON.parse(localStorage.getItem("score_settings_bk"));
        },
        getData(key) {
          var data = JSON.parse(localStorage.getItem(key));
          if (data == null) {
            return [];
          }
          return data;
        },
        setScoreData(data) {
          this.setData("score", data);
        },
        setTeamsData(data) {
          this.setData("teams", data);
        },
        setMembersData(data) {
          this.setData("members", data);
        },
        setScoreSettingsData(data) {
          this.setData("score_settings", data);
        },
        setBkDateData(data) {
          localStorage.setItem("bk_date", data);
        },
        setScoreBkData(data) {
          this.setData("score_bk", data);
        },
        setTeamsBkData(data) {
          this.setData("teams_bk", data);
        },
        setMembersBkData(data) {
          this.setData("members_bk", data);
        },
        setScoreSettingsBkData(data) {
          this.setData("score_settings_bk", data);
        },
        trashScoreData(id) {
          var scoreList = this.getScoreData();
          var filterData = scoreList.filter(function(data, index) {
            if (data.id == id) return true;
          });
          filterData[0].isTrash = true;

          this.setScoreData(scoreList);
        },
        restoreScoreData(id) {
          var scoreData = this.getScoreData();
          var filterData = scoreData.filter(function(data, index) {
            if (data.id == id) return true;
          });
          filterData[0].isTrash = false;
          this.setScoreData(scoreData);
        },
        deleteScoreData(id) {
          var scoreData = this.getScoreData();
          var filterData = scoreData.filter(function(data, index) {
            if (data.id != id) return true;
          });
          this.setScoreData(filterData);
        },
        setData(key, data) {
          localStorage.setItem(key, JSON.stringify(data));
        },
        getDefaultDataTeams() {
          return [
            { no: 1, name: "" },
            { no: 2, name: "" },
            { no: 3, name: "" },
            { no: 4, name: "" },
            { no: 5, name: "" },
            { no: 6, name: "" },
            { no: 7, name: "" },
            { no: 8, name: "" },
            { no: 9, name: "" },
            { no: 10, name: "" }
          ];
        },
        getDefaultDataScoreSettings() {
          return {
            isLibero: false
          };
        }
      }
    });
  }
};
</script>
