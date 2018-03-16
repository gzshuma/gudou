export default {
	// dev
	portalBanner:'/banner', //接口代理配置
	portalGcable:'/api', //接口代理配置
	portalAAA:'/api0', //接口代理配置

	// build
	// portalBanner:'', //接口代理配置
	// portalGcable:'', //接口代理配置
	// portalAAA:'', //接口代理配置
	
	// 公参
	ptype: '5',
	plocation: '001',
	puser: sessionStorage.getItem('user')?sessionStorage.getItem('user'):'freeuser',
	ptoken: sessionStorage.getItem('flag')?sessionStorage.getItem('flag'):Math.random().toString().slice(2),
	pversion: '030101',
	pserverAddress: 'api/PortalServer-App/',
	pserialNumber: '862915030592170',
	pkv: '1',
	authType: '0',
	ot: '0',
	v: '2',
	timestamp: new Date().getTime(),
	nonce: Math.random().toString().slice(2),
	pagesize: 24,
}