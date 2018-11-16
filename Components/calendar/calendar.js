// calendar.js
Component({
    //初始默认为当前日期
    properties: {
        defaultValue: {
            type: String,
            value: ''
        },
        //星期数组
        weekText: {
            type: Array,
            value: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        },
        lastMonth: {
            type: String,
            value: '◀'
        },
        nextMonth: {
            type: String,
            value: '▶'
        }
    },

    // 组件的初始数据
    data: {
        //当月格子
        thisMonthDays: [],
        //上月格子
        empytGridsBefore: [],
        //下月格子
        empytGridsAfter: [],
        //显示日期
        title: '',
        //格式化日期
        format: '',

        year: 0,
        month: 0
    },
    ready: function () {
        this.today();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        today: function () {
            let DATE = this.data.defaultValue ? new Date(this.data.defaultValue) : new Date(),
                year = DATE.getFullYear(),
                month = DATE.getMonth() + 1,
                date = DATE.getDate(),
                select = year + '-' + this.zero(month) + '-' + this.zero(date);
            this.setData({
                format: select,
                select: select
            })
            //发送事件监听 & 选中当天
            this.triggerEvent('select', select);

            //初始化日历组件UI
            this.display(year, month);
        },
        //选择
        select: function (e) {
            let date = e.currentTarget.dataset.date,
                select = this.data.year + '-' + this.zero(this.data.month) + '-' + this.zero(date);
            this.setData({
                title: this.data.year + '年' + this.zero(this.data.month) + '月' + this.zero(date) + '日',
                select: select
            });

            //发送事件监听
            this.triggerEvent('select', select);
        },
        //上个月
        lastMonth: function () {
            let month = this.data.month == 1 ? 12 : this.data.month - 1;
            let year = this.data.month == 1 ? this.data.year - 1 : this.data.year;
            //初始化日历组件UI
            this.display(year, month);
        },
        //下个月
        nextMonth: function () {
            let month = this.data.month == 12 ? 1 : this.data.month + 1;
            let year = this.data.month == 12 ? this.data.year + 1 : this.data.year;
            //初始化日历组件UI
            this.display(year, month);
        },
        //初始化
        display: function (year, month) {
            this.setData({
                year,
                month,
                title: year + '年' + this.zero(month) + '月'
            })
            this.createDays(year, month);
            this.createEmptyGrids(year, month);
        },
        //补全0
        zero: function (i) {
            return String(i).length === 1 ? '0' + i : i;
        },
        //获取当月天数
        getThisMonthDays: function (year, month) {
            return new Date(year, month, 0).getDate();
        },
        // 绘制当月天数占的格子
        createDays: function (year, month) {
            let thisMonthDays = [],
                days = this.getThisMonthDays(year, month);
            for (let i = 1; i <= days; i++) {
                thisMonthDays.push({
                    date: i,
                    dateFormat: this.zero(i),
                    monthFormat: this.zero(month),
                    week: this.data.weekText[new Date(Date.UTC(year, month - 1, i)).getDay()]
                });
            }
            this.setData({
                thisMonthDays
            })
        },
        //获取当月空出的天数
        createEmptyGrids: function (year, month) {
            let week = new Date(Date.UTC(year, month - 1, 1)).getDay(),
                empytGridsBefore = [],
                empytGridsAfter = [],
                emptyDays = (week == 0 ? 7 : week);
            //当月天数
            var thisMonthDays = this.getThisMonthDays(year, month);
            //上月天数
            var preMonthDays = month - 1 < 0 ? this.getThisMonthDays(year - 1, 12) : this.getThisMonthDays(year, month - 1);

            //空出日期
            for (let i = 1; i <= emptyDays; i++) {
                empytGridsBefore.push(preMonthDays - (emptyDays - i));
            }
            for (let i = 1; i <= (42 - thisMonthDays - emptyDays); i++) {
                empytGridsAfter.push(i);
            }
            this.setData({
                empytGridsAfter,
                empytGridsBefore
            })
        }
    }
})