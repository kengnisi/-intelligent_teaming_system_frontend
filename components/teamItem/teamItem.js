// components/teamItem/teamItem.js
import {quitTeam, deleteTeam} from "../../services/team-service"
import Toast from '@vant/weapp/toast/toast';
Component({
  properties: {
    teamItemInfo: {
      type: Object,
      value: {}
    },
    userInfo: {
      type: Object,
      value: {}
    },
    btnAuth: {
      type: Object,
      value: {}
    }
  },
  data: {
  },
  methods: {
    addTeam(event) {
      const {teamId, status} = event.mark
      console.log(teamId, status)
      this.triggerEvent('addTeam', {teamId, status})
    },
    updateTeam(event) {
      const {teamId} = event.mark
      wx.navigateTo({
        url: `/pages/updateTeam/updateTeam?teamId=${teamId}`,
      })
    },
    async quitTeam(event) {
      const {teamId } = event.mark
      const res = await quitTeam(teamId)
      console.log(res)
      if(res.code == 200) {
        Toast.success(res.description);
        this.triggerEvent('renew')
        return
      }
      Toast.fail(res.description);
    },
    async deleteTeam(event) {
      const {teamId } = event.mark
      const res = await deleteTeam(teamId)
      console.log(res)
      if(res.code == 200) {
        Toast.success(res.description);
        this.triggerEvent('renew')
        return
      }
      Toast.fail(res.description);
    },
    toTeamDetail(event) {
      const {teamId } = event.mark
      wx.navigateTo({
        url: `/pages/teamDetail/teamDetail?teamId=${teamId}`,
      })
    }
  },
  lifetimes: {
  }
})
