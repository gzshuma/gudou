<template>
  <section class="index-wrap">
    <banner class="clearfix" :bannerData="bannerList"></banner>
    <div class="wrap mar-top">
      <crumb :crumbTxt="crumbTxt.txtList2">
        <submenu :subList="liveSubList" @showCategoryID="showCategoryID"></submenu>
      </crumb>
      <piclist :ContentInfo="liveContent"></piclist>
      <crumb :crumbTxt="crumbTxt.txtList1">
        <submenupoint :subList="pointSubList" @showCategoryID="showCategoryID"></submenupoint>
      </crumb>
      <piclistpoint :ContentInfo="pointContent" @showMoreID="showMoreID"></piclistpoint>
      <crumb :crumbTxt="crumbTxt.txtList3" class="mar-top1"></crumb>
      <zhuanqupic :zhuanquData="zhuanquData"></zhuanqupic>
    </div>
  </section>
</template>

<script>
import Vuex from 'vuex'
import $ from 'jquery'
import { bannerFetch, pointContentFetch, zqDataFetch } from '@/axios/api'
// banner
import banner from 'components/common/banner'
// 面包title
import crumb from 'components/common/crumb'
// 图文组件
import piclist from 'components/common/piclist'
import piclistpoint from 'components/common/piclistpoint'
// 关联菜单
import submenu from 'components/common/submenuindex'
import submenupoint from 'components/common/submenupoint'
import zhuanqupic from 'components/common/zhuanqupic'

export default {
  components: {
    banner,
    crumb,
    piclist,
    piclistpoint,
    submenu,
    submenupoint,
    zhuanqupic
  },
  data () {
    return {
      bannerList: [],
      crumbTxt: {
        'txtList1': '点播',
        'txtList2': '直播',
        'txtList3': '专区'
      },
      pointSubList: [],
      liveSubList:[],
      liveContent: [],
      pointContent: [],
      zhuanquData: [],
      nameData:'',
      flag: false
    }
  },
  mounted () {
    // this._getBnnerData()
    this._getLiveContentInfo()
    this._getPointContentInfo()
    this._getZhuanquData()
  },
  methods: {
      showCategoryID (val) {
        this.categoryID = val
      },
      showMoreID (val) {
        this.showMoreID = val
      },
      _getLiveContentInfo () {
        bannerFetch().then( res => {
          var self = this
          if(res.data.status == 0) {
            const dataCard = res.data.data.cards
            dataCard.forEach(function (value, key) {
              if(value.type === 'category') {
                self.liveSubList = value.contents
              }
              if(value.type === 'live') {
                self.liveContent = value.contents.slice(0,7)
              }
            })
          }
        }).catch( res => {
          console.log(res.data.errorMessage)
        })
      },
      _getPointContentInfo () {
        pointContentFetch().then( res => {
          var self = this
          if(res.data.status == 0) {
            const dataCard = res.data.data.cards
            dataCard.forEach(function (value, key) {
              if(value.type === 'category') {
                self.pointSubList = value.contents
              }

              if(value.type === 'carousel') {
                self.bannerList =  value.contents
              }
              if(value.type === 'vod') {
                self.pointContent.push(value)
              }
            })
          }
        }).catch( res => {
          console.log(res.data.errorMessage)
        })
      },

      // 专区数据
      _getZhuanquData () {
        zqDataFetch().then( res => {
          var self = this
          if(res.data.status == 0) {
            self.zhuanquData = res.data.data.mediaAreaList.mediaAreaList
            console.log(JSON.stringify(self.zhuanquData))
          }
        }).catch( res => {
          console.log(res.data.errorMessage)
        })
      }
  }
}
</script>

<style scoped>
.index-wrap { padding-bottom: 30px; min-width: 1200px; }
.mar-top { margin-top: -30px; }
.mar-top1 { margin-top: 30px; }
</style>
