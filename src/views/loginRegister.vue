<template>
	<div class="login-register">
		<div class="ptitle"><h1>某系统配套积雪监测和极端天气识别应用</h1></div>	
		<div class="contain">
			
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" key="bigContainLogin" v-if="!isLogin">
					<!-- <div class="btitle">账户登录</div> -->
					<div class="bform">
							<div class="btitle">账户登录</div>
							<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
								<el-form-item  prop="username" >
									<el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
								</el-form-item>
								<el-form-item  prop="password">
									<el-input :type="'password'" v-model="ruleForm.password" placeholder="密码"></el-input>
								</el-form-item>
								<el-form-item class = "btn"> 
									<!-- <el-button style="background-color: rgb(57,167,176);" type="primary" @click="submitForm('ruleForm')" round>立即登录</el-button> -->
									<el-button style="background-color: rgb(57,167,176);" type="primary" @click="login('ruleForm')" round>立即登录</el-button>
									<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
								</el-form-item>
							</el-form>
					</div>
					<!-- <button class="bbutton" @click="login">登录</button> -->
				</div>
				<div class="big-contain" key="bigContainRegister" v-else>
					<!-- <div class="btitle">创建账户</div> -->
						<div class="bform">
							<div class="btitle">创建账户</div>
							<el-form :model="ruleForm" :rules="rules" ref="form" label-width="200px" class="demo-ruleForm">
								<el-form-item  prop="username" >
									<el-input v-model="form.username" placeholder="用户名"></el-input>
								</el-form-item>
								<el-form-item  prop="email" >
									<el-input v-model="form.email" placeholder="邮箱"></el-input>
								</el-form-item>
								<el-form-item  prop="password">
									<el-input :type="'password'" v-model="form.password" placeholder="密码"></el-input>
								</el-form-item>
								<el-form-item class = "btn"> 
									<el-button style="background-color: rgb(57,167,176);" type="primary" @click="reject" round>立即注册</el-button>
									<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
								</el-form-item>
							</el-form>
						</div>
					<!-- <button class="bbutton" @click="register">注册</button> -->
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" key="smallContainRegister" v-if="!isLogin">
					<div class="stitle">你好，朋友!</div>
					<p class="scontent">欢迎你的注册~</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" key="smallContainLogin" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">欢迎使用我们的系统~</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'login-register',
		data(){
			return {
				isLogin:false,
				emailError: false,
				passwordError: false,
				existed: false,
				form:{
					username:'',
					useremail:'',
					userpwd:''
				},
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }

					],
					password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				}
			}
		},
		methods:{
			
			changeType() {
				this.isLogin = !this.isLogin
				this.form.username = ''
				this.form.useremail = ''
				this.form.userpwd = ''
			},
			reject(){
				// alert("暂不开放注册，请联系管理员！");
				this.$message({
					message: '暂不开放注册',
					// type: 'warning'
					type: 'error'
					})
			},
			// register(){
			// 	const self = this;
			// 	if(self.form.username != "" && self.form.useremail != "" && self.form.userpwd != ""){
			// 		self.$axios({
			// 			method:'post',
			// 			url: 'http://127.0.0.1:10520/api/user/add',
			// 			data: {
			// 				username: self.form.username,
			// 				email: self.form.useremail,
			// 				password: self.form.userpwd
			// 			}
			// 		})
			// 		.then( res => {
			// 			switch(res.data){
			// 				case 0:
			// 					alert("注册成功！");
			// 					this.login();
			// 					break;
			// 				case -1:
			// 					this.existed = true;
			// 					break;
			// 			}
			// 		})
			// 		.catch( err => {
			// 			console.log(err);
			// 		})
			// 	} else {
			// 		alert("注册信息填写不能为空！");
			// 	}
			// },
			//静态模拟登入
			login(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						const _this = this;
						if((this.ruleForm.username != 'admin') && this.ruleForm.username.length !=0){
							this.$message({
								message: '用户名不存在',
								// type: 'warning'
								type: 'error'
							})
						}else if(this.ruleForm.password !='111111' && this.ruleForm.password.length != 0 && this.ruleForm.username.length !=0){
							this.$message({
							message: '密码错误',
							// type: 'warning'
							type: 'error'
							})
						}else if(this.ruleForm.username.length !=0 && this.ruleForm.password.length != 0){
							localStorage.setItem('isLoggedIn', 'true');
							_this.$router.push("/")	
						}
					}

				})
				
			},
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const _this = this;//获取整个vue的this
						// console.log("校验成功")
						//  alert('submit!');
						_this.$axios.post("http://localhost:8080/login", _this.ruleForm).then(res => {

							console.log(res)
							const jwt = res.headers['authorization'];
							const userInfo = res.data.data
							//存储(共享)全局变量jwt和userInfo
							_this.$store.commit("SET_TOKEN", jwt);
							_this.$store.commit("SET_USERINFO", userInfo);
							_this.$router.push("/")	
							//获取token和getUser
							// console.log(_this.$store.getters.getToken)
							// console.log(_this.$store.getters.getUser) 
						})

						} else {
						console.log('error submit!!');
						return false;
						}
					});
				},
				resetForm (formName) {
				this.$refs[formName].resetFields();
				// console(formName)
				}
		}
	}
</script>

<style scoped="scoped">
	.login-register{
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}
	.ptitle{
		position: fixed ! important;
		top: 10%;
		left:28%;
		background-color: #f5f5f5;
	}
	.ptitle h1{
		font-size: 300%;
	}
	.contain{
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
					0 0 6px #f0f0f0;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		line-height: 60px;
		padding-bottom: 50px;
		color: rgb(57,167,176);
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(57,167,176);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,rgb(57,167,176),rgb(56,183,145));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	
	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}

	.el-form{
		color: #333;
		text-align: center;
		line-height: 160px;
		width: 50%;
	}
	.demo-ruleForm {
		/* width: 50%; */
		max-width: 500px;
		margin: 0 auto;
	}
	.demo-ruleForm>>>.el-form-item__content {
		margin-left:0px !important;
	}
</style>
