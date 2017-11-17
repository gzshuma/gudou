<template>
  <div class="crumb-bd">
  	<h2 class="crumb-title">{{crumbTxt}}</h2>
  	<!-- <i class="icon-enter-arror el-icon-arrow-right"></i> -->
  	<slot></slot>
  </div>
</template>

<script>
export default {
	name: 'crumb',
	props: {
		crumbTxt: {
			type: String
		}
	},
	data () {
		return {}
	}
}
</script>

<style>
.crumb-bd { position: relative; font-size: 0; margin: 60px 0 30px; }
.crumb-bd .crumb-title, .crumb-bd .icon-enter-arror { display: inline-block; vertical-align: middle; font-size: 27px; color: #445560; font-weight: 400; }
.crumb-bd .icon-enter-arror { font-size: 18px; color: #9ba2a7; }
</style>