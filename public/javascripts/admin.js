var findForm = new Vue({
    el: '#findForm',
    data: {
        seen: false,
        info: {
            name: 'xx',
            gender: 'xxx',
            disease: 'xxx'
        }
    }
})

var insertForm = new Vue({
    el: '#insertForm',
    data: {
        seen: false
    }
})

var nav = new Vue({
    el: '#nav',
    data: {
        list: {
            '个人信息': [
                '修改信息',
                '会话信息',
                '挂号信息',
                '注销账号'
            ],
            '患者信息': [
                '信息查询',
                '信息修改',
                '信息添加',
            ],
            '医院信息': [
                '绑定医院',
                '科室查询',
                '其他医生'
            ],
            '药品信息': [
                '查询药品',
                '申请药品',
                '药房信息'
            ]
        },
        className: [
            ['xxxx', 'hhxx', 'ghxx', 'zxxx'],
            ['xxcx', 'xxxg', 'xxtj'],
            ['bdyy', 'kscx', 'qtys'],
            ['cxyp', 'sqyp', 'yfxx']
        ]
    },
    methods: {
        show: function(id) {
            switch(id) {
                case '21': {
                    console.log(this.className[1][0])
                    findForm.seen = true
                    insertForm.seen = false
                    break
                }
                case '23': {
                    console.log(this.className[1][2])
                    findForm.seen = false
                    insertForm.seen = true
                    break
                }
            }
        }
    }
});

(function () {
    var oList = document.querySelectorAll('.list h2'),
        oHide = document.querySelectorAll('.hide'),
        oIcon = document.querySelectorAll('.list i'),
        lastIndex = 0;
    for(var i = 0; i < oList.length; i++){
        oList[i].index = i;//自定义属性
        oList[i].isClick = false;
        oList[i].initHeight = oHide[i].clientHeight;
        oHide[i].style.height = '0';
        oList[i].onclick = function () {
            if(this.isClick){
                oHide[this.index].style.height = '0';
                oIcon[this.index].className = '';
                oList[this.index].className = '';
                oList[this.index].isClick = false;
            }
            else{
                oHide[lastIndex].style.height = '0';
                oIcon[lastIndex].className = '';
                oList[lastIndex].className = '';
                oHide[this.index].style.height = '220px';
                oIcon[this.index].className = 'on';
                oList[this.index].className = 'on';
                oList[lastIndex].isClick = false;
                oList[this.index].isClick = true;
                lastIndex = this.index;
            }
        }
    }
})();