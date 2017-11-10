<script type="text/javascript">
const config = {
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
export default {
	config
}
</script>