<template>
  <div class="player-btm">
    <div class="p-btm-list s-hover p-btm-border coll" :class="isSelect ? 'collSelect' : ''" @click="collClick">
      <span class="icon-btm el-icon-star-off"></span>
      <span>收藏</span>
    </div>
    <!-- <div v-if="!collectData.isZhibo" class="p-btm-list s-hover p-btm-border" @click="praise">
      <span class="icon-btm icon-thumbs-up"></span>
      <span>点赞(1584)</span>
    </div>  -->



    <!-- <div class="p-btm-list s-hover p-ri-0">
      <span class="icon-btm icon-share2"></span>
      <span>分享：</span>
    </div>
     <div class="p-btm-list p-le-0 share-bd bdsharebuttonbox" data-tag="share_0">
      <a class="icon-btm icon-qq2 bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
      <a class="icon-btm icon-qq bds_sqq" data-cmd="sqq" title="分享给QQ好友"></a>
      <a class="icon-btm icon-wechat bds_weixin" data-cmd="weixin" title="分享给微信"></a>
      <a class="icon-btm icon-sina-weibo bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
    </div>  -->



  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import {getDay, Monday,dateComparate} from '@/util'
import $ from 'jquery'
export default {
  props:{
    collectData:{
      type: Object
    }
  },
  data () {
    return {
       
       changeColl: false,//默认没选中
       praiseData: '',
       puser:sessionStorage.getItem('user'),
      //ptoken:'',
       ptoken:sessionStorage.getItem('flag')

    }
  },
  computed:{
    //是否默认收藏状态
    isSelect: function(){
        let sdf = false;
        this.collectData.collectArr.forEach(function(item,index){
         if ( this.collectData.id == item.channelID ){
                sdf = true;
          }else if( this.collectData.id == item.programID ){
                sdf = true;
          }
        }.bind( this ))
        return sdf;
      },
  },
  created(){
      
  },
  mounted () {
    setTimeout(function() {
      if(  $( '.collSelect' ).length > 0){
        this.changeColl = true;
      }
    }.bind( this ), 150);

  },
  methods: {
      collClick(){
        if (!this.puser) { // 未登录跳到登录页
          this.$message.warning( '您还没有登录请先登录！' );
          return false;
        }
        this.changeColl = !this.changeColl;
      
        // console.log( this.changeColl )
        if( this.changeColl ){
           this.collectData.isZhibo ? this.addCollect() :  this.addDian();
           
        }else{

          this.collectData.isZhibo ?  this.delCollect() : this.delDian();
        }
      },
      //添加直播收藏
      addCollect(){
        var self = this;
        this.$http({
            method: 'post',
            url: '/api/PortalServer-App/new/ptl_ipvp_live_live027',
            params: {
              ptype: self.GLOBAL.config.ptype,
              plocation: self.GLOBAL.config.plocation,
              puser: self.GLOBAL.config.puser,
              ptoken: self.GLOBAL.config.ptoken,
              pserverAddress: self.GLOBAL.config.pserverAddress,
              pserialNumber: self.GLOBAL.config.pserialNumber,
              pversion:  self.GLOBAL.config.pversion,
              ptn: self.GLOBAL.config.ptoken,
              pkv: self.GLOBAL.config.pkv, 
              hmac: '',
              nonce: self.GLOBAL.config.nonce,
              timestamp: self.GLOBAL.config.timestamp,
            },
            //post用data
            data:{
              channelID: self.collectData.id,
            }
          })
          .then((res) => {
              if(res.data.status == 0) {
                this.$message( '收藏成功!' );
                document.querySelector( '.coll' ).classList.add( 'collSelect' )
            }
          })
          .catch((res) => {
            // console.log( res )
            this.$message.warning(res.data.errorMessage)
          })

      },
      
      //删除直播收藏
      delCollect(){
         var self = this;
        this.$http({
            method: 'post',
            url: '/api/PortalServer-App/new/ptl_ipvp_live_live028',
            params: {
              ptype: self.GLOBAL.config.ptype,
              plocation: self.GLOBAL.config.plocation,
              puser: self.GLOBAL.config.puser,
              ptoken: self.GLOBAL.config.ptoken,
              pserverAddress: self.GLOBAL.config.pserverAddress,
              pserialNumber: self.GLOBAL.config.pserialNumber,
              pversion:  self.GLOBAL.config.pversion,
              ptn: self.GLOBAL.config.ptoken,
              pkv: self.GLOBAL.config.pkv, 
              hmac: '',
              nonce: self.GLOBAL.config.nonce,
              timestamp: self.GLOBAL.config.timestamp,
            },
            //post用data
            data:{
              channelID: self.collectData.id,
            }
          })
          .then((res) => {
              if(res.data.status == 0) {
                this.$message( '取消收藏!' );
                document.querySelector( '.coll' ).classList.remove( 'collSelect' )
            }
          })
          .catch((res) => {
            // console.log( res )
            this.$message.warning(res.data.errorMessage)
          })

      },
       //添加点播收藏
      addDian(){
        var self = this;
        this.$http({
            method: 'post',
            url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod032',
            params: {
              ptype: self.GLOBAL.config.ptype,
              plocation: self.GLOBAL.config.plocation,
              puser: self.GLOBAL.config.puser,
              ptoken: self.GLOBAL.config.ptoken,
              pserverAddress: self.GLOBAL.config.pserverAddress,
              pserialNumber: self.GLOBAL.config.pserialNumber,
              pversion:  self.GLOBAL.config.pversion,
              ptn: self.GLOBAL.config.ptoken,
              pkv: self.GLOBAL.config.pkv, 
              hmac: '',
              nonce: self.GLOBAL.config.nonce,
              timestamp: self.GLOBAL.config.timestamp,
            },
            //post用data
            data:{
              programID: self.collectData.id,
              columnID:  self.$store.state.player.clickPlayer.columnID,
              columnName:  self.$store.state.player.clickPlayer.columnName
            }
          })
          .then((res) => {
              if(res.data.status == 0) {
                this.$message( '收藏成功!' );
                document.querySelector( '.coll' ).classList.add( 'collSelect' )
            }
          })
          .catch((res) => {
            console.log( res )
            this.$message.warning(res.data.errorMessage)
          })

      },
       //删除点播收藏
      delDian(){
        var self = this;
        this.$http({
            method: 'post',
            url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod033',
            params: {
              ptype: self.GLOBAL.config.ptype,
              plocation: self.GLOBAL.config.plocation,
              puser: self.GLOBAL.config.puser,
              ptoken: self.GLOBAL.config.ptoken,
              pserverAddress: self.GLOBAL.config.pserverAddress,
              pserialNumber: self.GLOBAL.config.pserialNumber,
              pversion:  self.GLOBAL.config.pversion,
              ptn: self.GLOBAL.config.ptoken,
              pkv: self.GLOBAL.config.pkv, 
              hmac: '',
              nonce: self.GLOBAL.config.nonce,
              timestamp: self.GLOBAL.config.timestamp,
            },
            //post用data
            data:{
              programID: self.collectData.id,
              columnID: self.$store.state.player.clickPlayer.columnID,
            }
          })
          .then((res) => {
              if(res.data.status == 0) {
                this.$message( '取消收藏!' );
                document.querySelector( '.coll' ).classList.remove( 'collSelect' )
            }
          })
          .catch((res) => {
            console.log( res )
            this.$message.warning(res.data.errorMessage)
          })

      },
      //点赞接口
      praise(){
           if (!this.puser) { // 未登录跳到登录页
            this.$message.warning( '您还没有登录请先登录！' );
            return false;
          }
         var self = this;
         self.$http({
              method: 'post',
              url: '/api/PortalServer-App/new/ptl_ipvp_cmn_cmn014',
              params: {
                ptype: self.GLOBAL.config.ptype,
                plocation: self.GLOBAL.config.plocation,
                puser: self.GLOBAL.config.puser,
                ptoken: self.GLOBAL.config.ptoken,
                pserverAddress: self.GLOBAL.config.pserverAddress,
                pserialNumber: self.GLOBAL.config.pserialNumber,
                pversion:  self.GLOBAL.config.pversion,
                ptn: self.GLOBAL.config.ptoken,
                pkv: self.GLOBAL.config.pkv, 
                hmac: '',
                nonce: self.GLOBAL.config.nonce,
                timestamp: self.GLOBAL.config.timestamp,
                operateType: '1',
                programID: '520',
                channelID: '68',
                programItemID: '-1'
              }
            })
            .then((res) => {
                if(res.data.status == 0) {
                  this.praiseData = res.data.data.likeOrNot;
                 
              }
            })
            .catch((res) => {
              alert(res.data.errorMessage)
            })
      } 
  }
}
</script>

<style>
.player-btm { width: 100%; text-align: right; padding: 0; }
.p-btm-list { padding: 0 15px; }
.p-btm-list a:hover { color: #ff9c01; cursor: pointer; }
.p-btm-list, .p-btm-list span { display: inline-block; vertical-align: middle; color: #aaa; }
.p-btm-list .icon-sina-weibo { font-size: 24px; }
.icon-btm { font-size: 20px; }
.p-btm-0 { padding: 0; }
.p-le-0 { padding-left: 0; }
.p-ri-0 { padding-right: 0; }
.p-btm-border { border-right: #aaa 1px solid; cursor: pointer;}
.p-btm-border:last-child { border-right: 0; }
.p-btm-border:hover span{ color: #ef9914; }
.share-bd span { margin-right: 10px; }
.s-hover:hover { color: #ef9914; }

.collSelect span{
  color: #ef9914
}

.tabs-hd-list i { display: block; margin-bottom: 5px; }
.icon-p-tabs { position: absolute; right: 15px; top: 5px; font-size: 20px; }
.bdshare-button-style0-24 .bds_qzone, .bdshare-button-style0-24 .bds_sqq, .bdshare-button-style0-24 .bds_weixin, .bdshare-button-style0-24 .bds_tsina { background: none; color: #aaa; font-size: 24px; padding: 0; margin: 0 10px 0 5px; }
.bdshare-button-style0-24 .bds_tsina
.share-bd .bdshare-button-style0-24 a, .bdshare-button-style0-24 .bds_more { padding-left: 0; }
.bdshare-button-style0-24 .bds_tsina { font-size: 26px; }
.bdshare-button-style0-24 .bds_qzone:hover, .bdshare-button-style0-24 .bds_sqq:hover, .bdshare-button-style0-24 .bds_weixin:hover, .bdshare-button-style0-24 .bds_tsina:hover { color: #ff9c01; opacity: 1; }
.share-component, .social-share-icon { display:inline-block; vertical-align: middle; }
.social-share-icon { width: 30px; height: 30px; }
</style>