# 微信小程序日历组件

------


## 使用

```
<!--index.wxml-->
<Calendar bind:select="select"></Calendar>

```
使用组件并为其绑定监听事件
```
//index.js
select: function (e) {
    this.setData({
        selectVal:e.detail
    })
}

```
在js文件中添加事件监听函数，获取选中的日期

## 配置属性
| 参数        | 说明   |  类型  |  默认  |
| --------   | -----  | ----  | ----  |
| default-value="{{value}}" | 设置指定日期，如"2018-11-11" |string|当前时间|
| week-text="{{week}}" | 星期标题 |array|["周六",..."周日"]|
| last-month="{{lastMonth}}" | 按钮，上个月 |string|"◀"|
| next-month="{{nextMonth}}" | 按钮，下个月 |string|"▶"|
