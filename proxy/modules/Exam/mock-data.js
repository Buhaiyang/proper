module.exports = {
  "GET:/exam": {
    "name": "沈阳普日软件公司前端考试题",
    "total": 20,
    "list": [
      {
        questionId: "1",
        questionName: "声明一个对象，给它加上name属性和show方法显示其name值，以下代码中正确的是（）",
        choice: [
          {choiceId: "101", choiceName: "var obj = [name:”zhangsan”,show:function(){alert(name);}];"},
          {choiceId: "102", choiceName: "var obj = {name:”zhangsan”,show:”alert(this.name)”};"},
          {choiceId: "103", choiceName: "var obj = {name:”zhangsan”,show:function(){alert(name);}};"},
          {choiceId: "104", choiceName: "var obj = {name:”zhangsan”,show:function(){alert(this.name);}};"}
        ],
        type: "SELECT_ONE"
      },
      {
        questionId: "2",
        questionName: "以下关于Array数组对象的说法不正确的是（）",
        choice: [
          {choiceId: "201", choiceName: "对数组里数据的排序可以用sort函数，如果排序效果非预期，可以给sort函数加一个排序函数的参数"},
          {choiceId: "202", choiceName: "reverse用于对数组数据的倒序排列"},
          {choiceId: "203", choiceName: "向数组的最后位置加一个新元素，可以用pop方法"},
          {choiceId: "204", choiceName: "unshift方法用于向数组删除第一个元素"}
        ],
        type: "SELECT_MORE"
      },
      {
        questionId: "3",
        questionName: "要将页面的状态栏中显示“已经选中该文本框”，下列JavaScript语句正确的是（）",
        choice: [
          {choiceId: "301", choiceName: "window.status=”已经选中该文本框”"},
          {choiceId: "302", choiceName: "document.status=”已经选中该文本框”"},
          {choiceId: "303", choiceName: "window.screen=”已经选中该文本框”"},
          {choiceId: "304", choiceName: "document.screen=”已经选中该文本框”"}
        ],
        type: "SELECT_ONE"
      },
      {
        questionId: "4",
        questionName: " 分析下面的代码：<pre><html><head><script type=”text/javascript”>function writeIt (value) { document.myfm.first_text.value=value;}</script></head><body bgcolor=”#ffffff”><form name=”myfm”><input type=”text” name=”first_text”><input type=”text” name=”second_text”></form></body></html></pre>以下说法中正确的是（）",
        choice: [
          {choiceId: "401", choiceName: "在页面的第二个文本框中输入内容后，当鼠标离开第二个文本框时，第一个文本框的内容不变"},
          {choiceId: "402", choiceName: "在页面的第一个文本框中输入内容后，当鼠标离开第一个文本框时，将在第二个文本框中复制第一个文本框的内容"},
          {choiceId: "403", choiceName: "在页面的第二个文本框中输入内容后，当鼠标离开第二个文本框时，将在第一个文本框中复制第二个文本框的内容"},
          {choiceId: "404", choiceName: "在页面的第一个文本框中输入内容后，当鼠标离开第一个文本框时，第二个文本框的内容不变"}
        ],
        type: "SELECT_MORE"
      },
      {
        questionId: "5",
        questionName: "关于JavaScript里的xml处理，以下说明正确的是（）",
        choice: [
          {choiceId: "501", choiceName: "Xml是种可扩展标记语言，格式更规范，是作为未来html的替代"},
          {choiceId: "502", choiceName: "Xml一般用于传输和存储数据，是对html的补充，两者的目的不同"},
          {choiceId: "503", choiceName: "在JavaScript里解析和处理xml数据时，因为浏览器的不同，其做法也不同"},
          {choiceId: "504", choiceName: "在IE浏览器里处理xml，首先需要创建ActiveXObject对象"}
        ],
        type: "SELECT_MORE"
      },
      {
        questionId: "6",
        questionName: "《朝花夕拾》原名《_________》,是鲁迅的回忆性散文集,请简介一下其中的一篇（课内学过的除外）的主要内容 ：___________________________________.",
        type: "FILL_IN"
      },
      {
        questionId: "7",
        questionName: "什么是跨域？跨域请求资源的方法有哪些？",
        type: "SUBJECTIVE_ITEM"
      }
    ]
  },
}