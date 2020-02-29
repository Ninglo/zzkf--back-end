var registerForm = new Vue({
    el: '#registerForm',
    data: {
        userInfo: {
            account: '',
            password: '',
            name: '',
            password2: ''
        },
    },
    computed: {
        tip: function() {
            if (this.userInfo.password != this.userInfo.password2) {
                return "两次输入密码不一致" 
            }
        }
    },
    methods: {
        register() {
            if (this.userInfo.name == '') {
                alert('请输入姓名')
            }
            else if (this.userInfo.account == '') {
                alert('请输入账号')
            }
            else if (this.userInfo.password == '') {
                alert('请输入密码')
            }
            else if (this.userInfo.password != this.userInfo.password2) {
                alert("两次输入密码不一致")
                return false
            }
            else {
                axios.post('../api/post/register', JSON.stringify(this.userInfo))
                    .then(res => {
                        console.log(res)
                        this.$router.push({path:'/'})
                    })
            }
        }
    }
})