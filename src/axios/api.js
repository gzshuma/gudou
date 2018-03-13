import { fetch } from "./fetch"; //引用fetch.js
import api from './url'; //引用url.js

// 删除预定url
export function delleteAppointUrl() {
    return api.portalGcable+'/PortalServer-App/new/ptl_ipvp_live_live025';
}

// 修改资料
export function setUserUrl() {
    return api.portalGcable + '/PortalServer-App/new/aaa_usr_usr009';
}

// 上传头像
export function setUserImgUrl() {
    return api.portalGcable + '/PortalServer-App/new/aaa_usr_usr010';
}

// 删除点播收藏url
export function delAllPlayUrl() {
    return api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod033';
}

// 删除直播收藏url
export function delAllPlayLiveUrl() {
    return api.portalGcable + '/PortalServer-App/new/ptl_ipvp_live_live028';
}

// 添加直播收藏url
export function addAllPlayLiveUrl() {
    return api.portalGcable + '/PortalServer-App/new/ptl_ipvp_live_live027';
}

// 添加预定url
export function addAppointUrl() {
    return api.portalGcable + '/PortalServer-App/new/ptl_ipvp_live_live024';
}

export function extend(target, source) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    // console.log(target)
    return target;
}                 

export function paramFunction(source) {
    var param = {
        ptype: api.ptype,
        plocation: api.plocation,
        puser: api.puser,
        ptoken: api.ptoken,
        pserverAddress: api.pserverAddress,
        pserialNumber: api.pserialNumber,
        pversion: api.pversion,
        ptn: api.ptoken,
        pkv: api.pkv, 
        hmac: '',
        nonce: api.nonce,
        timestamp: api.timestamp
    }

    var param1;
    if(source != '') {
        param1 = extend(param, source);
    }else {
        param1 = extend(param);
    }
    return param1
}

//banner直播接口
export function bannerFetch() {
    var data = {
        page: 0,
        parentID: '003'
    }
    return fetch({
        url: api.portalBanner + '/RSWeb/gd/getCards',
        method: 'post',//请求方法
        params: paramFunction(data)
    })
}

//首页点播数据接口
export function pointContentFetch() {
    var data = {
        page: 0,
        parentID: '11',
    }
    return fetch({
        url: api.portalBanner + '/RSWeb/gd/getCards',
        method: 'post',
        params: paramFunction(data)
    })
}
// 点播分类list接口
export function pointClassListFetch(_self) {
    var data = {
        parentID: _self.$route.params.id,
        page: 0,
        contentSize: ''
    }
    return fetch({
        url: api.portalBanner + '/RSWeb/gd/getCards',
        method: 'post',
        params: paramFunction(data)
    })
}

//首页专区数据接口
export function zqDataFetch() {
    var data = {
        mediaAreaList: 'mediaAreaList',
        countyName: ''
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_cmn_cmn017',
        method: 'post',
        params: paramFunction(data)
    })
}

//退出登陆接口
export function logoutDataFetch() {
    var data = '';
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/aaa_usr_usr003',
        method: 'get',
        // params: paramType4
        params: paramFunction(data)
    })
}

// 头部导航接口
export function NavDataFetch() {
    var data = '';
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod008',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 个人中心查询用户信息接口
export function userInfoFetch() {
    var data = '';
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/aaa_usr_usr008',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 个人中心获取用户信息接口
export function userBitrateFetch() {
    var data = '';
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_cmn_cmn009',
        methods: 'post',
        params: paramFunction(data)
    })
}

// tv电视栏目二级菜单接口
export function liveSubMenuFetch() {
    var data = '';
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_live_live003',
        methods: 'post',
        params: paramFunction(data)
    })
}

// tv电视栏目信息接口
export function liveContentFetch(_self) {
    var data = {
        start: '0',
        end: '200',
        channelName: '',
        programName: '',
        sortType: '2',
        categoryID: _self.categoryID
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_live_live005',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 直播列表数据接口
export function liveSubConetnt(_self) {
    var data = {
        cardID: _self.$route.params.id,
        page: _self.page,
        contentSize: '10'
    };
    return fetch({
        url: api.portalBanner + '/RSWeb/gd/getCardContents',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 获取影片详情信息
export function pointDetailData(_self) {
    var data = {
        programID: _self.$route.params.id,
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod013',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 获取直播一周数据
export function liveDetailData(_self) {
    var data = {
        channelID: _self.$route.params.channelid.split('_')[0],
        startTime: _self.startTime,
        endTime: _self.endTime
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_live_live008',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 获取点播列表
export function pointListData(_self) {
    var data = {
        cardID: _self.$route.params.id,
        page: _self.page,
        contentSize: '10'
    };
    return fetch({
        url: api.portalBanner + '/RSWeb/gd/getCardContents',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 获取点播列表更多
export function pListMoreData(_self) {
    var data = {
        cardID: _self.$route.params.id,
        page: _self.page,
        contentSize: '100'
    };
    return fetch({
        url: api.portalBanner + '/RSWeb/gd/getCardContents',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 获取点播列表
export function pListContrentData(_self) {
    var data = {
        columnID: 0? '' : _self.$route.params.id,
        categoryID: _self.categoryID,
        start: (_self.currentPage-1) * _self.currentSizeChange,
        end: (_self.currentPage) * _self.currentSizeChange,
        sortType: _self.sortType,
        year: _self.year,
        location: _self.location
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod011',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 获取点播分类
export function pointClassicData(_self) {
    var source = {
        columnID: _self.$route.params.id
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod010',
        methods: 'get',
        params: paramFunction(source)
    })
}

// 获取点播剧集
export function pointJujiData(_self) {
    var data = {
        programID: _self.$route.params.id
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod012',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 查询预定提醒
export function queryAppointFetch() {
    var data = {
        start: '',
        end: ''
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_live_live023',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 查询直播收藏
export function queryCollectFetch() {
    var data = {
        start: '',
        end: ''
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_live_live026',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 查询点播收藏
export function queryPointCollectFetch() {
    var data = {
        start: '',
        end: ''
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod031',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 删除直播收藏
export function delleteLiveCollectFetch(value) {
    var source = '';
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_live_live028',
        methods: 'post',
        params: paramFunction(source),
        data: {
            channelID: value.channelID,
        }
    })
}

// 删除观看记录
// export function delleteReviewFetch(value) {
//     var source = '';
//     return fetch({
//         url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod030',
//         methods: 'post',
//         params: paramFunction(source),
//         data: {
//             assertID: value.assertID,
//             providerID: value.providerID
//         }
//     })
// }

// 获取码率接口
export function malvDataFetch() {
    var data = '';
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_cmn_cmn009',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 获取点播鉴权
export function authorityFetch(_self,pid,meizi) {
    var data = {
        DRMtoken: '',
        epgID: '',
        authType: api.authType,
        // authType: _self.GLOBAL.config.zero,
        secondAuthid: '',
        t: api.ptoken,
        pid: pid,
        cid: '',
        u: api.puser,
        p: api.ptype,
        l: api.plocation,
        d: api.pserialNumber, // 必填 跟pserialNumber一样
        n: meizi, //dongfang_800
        v:  api.v,
        ot: api.ot,
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/aaa_aut_aut002',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 获取直播鉴权
export function authorityLiveFetch(_self,meizi) {
    var data = {
        DRMtoken: '',
        epgID: '',
        epgID: '',
        authType: api.authType,
        secondAuthid: '',
        t: api.ptoken,

        secondAuthid: '',
        pid: '',
        cid: _self.$route.params.channelid.split('_')[0],
        u: api.puser,
        p: api.ptype,
        l: api.plocation,
        d: api.pserialNumber, // 必填 跟pserialNumber一样
        n: meizi, //dongfang_800
        v:  api.v,
        ot: api.ot,
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/aaa_aut_aut002',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 获取登录流水号
export function serialnoFetch() {
    return fetch({
        url: api.portalAAA + '/AAA/serialNoFromUAP',
        methods: 'get',
        params: {}
    })
}

// 验证码接口
export function getCodeFetch(_self) {
    return fetch({
        url: api.portalAAA + '/AAA/aaaSendRandomCodeUAP',
        methods: 'get',
        params: {
            phoneNum: _self.ruleForm.phoneNum
        }
    })
}

// 注册
export function registerFetch(_self) {
    return fetch({
        url: api.portalAAA + '/AAA/registerFromUAP',
        methods: 'post',
        params: {
            regtype: 1,
            assistparam: '',
            regparam: _self.ruleForm.phoneNum, //字符串注册参数根据regtype的不同传具体的值
            Pwd: _self.$md5(_self.ruleForm.Pwd), //密码加密
            serialno: _self.ruleForm.serialno,
            phoneNumber: _self.ruleForm.phoneNum,
            token: _self.ruleForm.token
        }
    })
}

// 登录接口
export function loginFetch(_self) {
    return fetch({
        url: api.portalAAA + '/AAA/loginFromUAP',
        methods: 'get',
        params: {
            LoginType: '1',
            loginparam: _self.ruleForm.loginparam,
            Pwd: _self.$md5(_self.ruleForm.Pwd),
            serialno: _self.ruleForm.serialno,
            terminalID: api.pserialNumber
        }
    })
}

// 专区bvanner接口
export function zqBannerFetch() {
    var data = {
        mediaAreaList: 'mediaAreaList',
        countyName: ''
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_cmn_cmn017',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 专区list接口
export function zqListFetch(_self) {
    var data = {
        categoryID: _self.categoryID,
        start: (_self.currentPage-1) * _self.currentSizeChange,
        end: (_self.currentPage) * _self.currentSizeChange,
        // end: '1000',
        sortType: _self.sortType,
        location: _self.location
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod011',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 点播list接口
export function pointListFetch(_self) {
    var data = {
        columnID: 0? '' : _self.$route.params.id,
        categoryID: _self.categoryID,
        start: (_self.currentPage-1) * _self.currentSizeChange,
        end: (_self.currentPage) * _self.currentSizeChange,
        sortType: 0
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod011',
        methods: 'post',
        params: paramFunction(data)
    })
}

// 专区分类接口
export function zqClassicFetch(_self) {
    var data = {
        columnID: _self.$route.params.id
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod009',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 专区分类接口
export function zqClassic1Fetch(_self) {
    var data = {
        columnID: _self.columnID
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod009',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 专区分类接口
export function zqClassic2Fetch(_self) {
    var data = {
        columnID: _self.columnID1
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod009',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 专区分类接口
export function zqClassic3Fetch(_self) {
    var data = {
        columnID: _self.columnID2
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod009',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 修改密码
export function setPassWordFetch() {
    var data = {
        oldPassword: self.ruleForm2.passold,
        newPassword: self.ruleForm2.checkPass,
        phoneNumber: self.puser,
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/aaa_usr_usr004',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 观看记录
export function reviewFetch() {
    var data = '';
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod028',
        methods: 'get',
        params: paramFunction(data)
    })
}

// 删除观看记录
export function delleteReviewFetch(value) {
    var source = '';
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod030',
        methods: 'post',
        params: paramFunction(source),
        data: {
            assertID: value.assertID,
            providerID: value.providerID
        }
    })
}

// 搜索热词获取
export function searchFetch() {
    var source = {
        count: '30'
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_vod_vod001',
        methods: 'post',
        params: paramFunction(source)
    })
}

// 搜索内容获取
export function searchContentFetch(_self) {
    var source = {
        keyword: _self.keyword,
        start: 0,
        resultSize: 20,
    };
    return fetch({
        url: api.portalGcable + '/PortalServer-App/new/ptl_ipvp_uba_search003',
        methods: 'post',
        params: paramFunction(source)
    })
}

// 重置密码
export function sresetPasswordFetch(_self) {
    return fetch({
        url: api.portalGcable + '/AAA/aaaResetPasswordUAP',
        methods: 'post',
        params: {
            phoneNum: _self.ruleForm.phoneNum,
            randomCode: _self.ruleForm.randomCode,
            newPwd: _self.$md5(_self.ruleForm.newPwd), //密码加密
            serialNo: _self.ruleForm.serialNo
        }
    })
}