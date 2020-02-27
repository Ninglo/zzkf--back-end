var loginForm = new Vue({
    el: '#loginForm',
    data: {
        userInfo: {
            account: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (this.userInfo.account == '') {
                alert('请输入账号')
            }
            else if (this.userInfo.password == '') {
                alert('请输入密码')
            }
            else {
                axios.post('../api/post/login', JSON.stringify(this.userInfo))
                    .then(res => {
                        console.log(res)
                        this.$router.push({path:'/'})
                    })
            }
        }
    }
})