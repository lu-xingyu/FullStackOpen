- Part 0 - Running application logic in the browser
```js
//创建 XMLHttpRequest对象（是浏览器提供的 内置 API（接口），专门用来向服务器发送HTTP 请求）
var xhttp = new XMLHttpRequest() 

/* onreadystatechange-XMLHttpRequest 对象的一个内置属性，专门用来接收“状态改变时的处理函数”
0: `UNSENT`（请求还没初始化）
1: `OPENED`（`open()` 已经调用了）
2: `HEADERS_RECEIVED`（`send()` 已经调用，服务器响应头已收到）
3: `LOADING`（正在下载响应体，数据可能还没完全到达）
4: `DONE`（操作完成，整个响应已就绪）
*/
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText)
    console.log(data)

    var ul = document.createElement('ul')
    ul.setAttribute('class', 'notes')

    data.forEach(function(note) {
      var li = document.createElement('li')

      ul.appendChild(li)
      li.appendChild(document.createTextNode(note.content))
    })

    document.getElementById('notes').appendChild(ul)
  }
}

xhttp.open('GET', '/data.json', true) // 告诉xhhtp对象请求地址
xhttp.send() // 发送请求
```
- Part 0 - Document Object Model or DOM
```js
/* document 是浏览器自动提供的一个对象，代表整个网页（HTML文档）
createElement的入参正常必须是合法的 HTML 标签名字符串 */
var ul = document.createElement('ul')

// foreach：对于data中的每个element, 逐个执行入参的函数
data.forEach(function(note) {
  var li = document.createElement('li')   // 创建列表元素

  ul.appendChild(li)   // 将列表元素加到ul中
  li.appendChild(document.createTextNode(note.content))   
  // 把note的content内容作为Text加到li中
  // DOM is a tree, content of li is child of li
})

document.getElementById('notes').appendChild(ul)  // find the elemnt whose id is notes, and make ul his child
```
- Part 0 - Manipulating the document object from console
```js
list = document.getElementsByTagName('ul')[0] 
//返回所有Tag Name为ul的元素array, [0]取第一个

newElement = document.createElement('li')
newElement.textContent = 'Page manipulation from console is easy'

list.appendChild(newElement)  // 默认在最后append
```
## HTML
- Structure of HTML 
	- `<!doctype html>`:  declare that this is a HTML5 file
	- `<html lang="en-US"></html>`: root element - wraps all the content on the entire page
	- `<head></head>`: container for meta info / configuration  (not showing on the web page)
		- keywords, description, charset, viewpoint,  css, javascript......
	- `<body></body>`: container for all elements showing on the page
- Element:
	- structure of normal elements
		- `<element_name attr1=1 attr2=2>element_content</element_name> `
	- empty elements / void elements:  have no content or closing tag; e.g.: `<img src="" alt="My test image" />`  / 可以不写，alt - 图片描述
- Common Elements
	- `<h1></h1>` , in total 6 levels
	- paragraph: `<p></p>`
	- list: `<ul></ul>`; `<ol></ol>`
	- elements of lists: `<li></li>`
	- links: `<a href="">ShowingName</a>`
	- form: `<form action="URL to send submitted data" method="post">...</form>
		- label: `<label for="id of the input">Label Name</label>
		- input: void elements `<input type="text" value="default value"/>` there are many types for input element: password, file, number......
		- text area: normal elements `<textarea>default text</textarea>`
		- button: there are 3 types
			- submit: by default, click the button sends the form's data to the web page defined by the `action` attribute of the `<form>` element.
			- reset: button resets all the form widgets to their default value immediately. 
			- button: does nothing (combine with javascript)
		- Post method sends name-value pair data to the server
		- ```html
		  <form action="/my-handling-form-page" method="post"> 
			  <p> 
				  <label for="name">Name:</label> 
				  <input type="text" id="name" name="user_name" /> 
			  </p> 
			  <p> 
				  <label for="msg">Message:</label> 
				  <textarea id="msg" name="user_message"></textarea> 
			  </p> 
			  <p class="button"> 
				  <button type="submit">Send your message</button>
			  </p>
		  </form>
		  ```
## CSS
- add css to html: `<link href="styles/style.css" rel="stylesheet"/>` href 可以是index.html的相对路径
- use google font
	- download the font, in `<head></head> `
		```css
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link href="https://fonts.googleapis.com/css2?.." rel="stylesheet" />
		```
	- in css file, use the font on class, type, id...
		- `font-family: PLACEHOLDER;`
- css selector:
	- ```css
	  p,                  /* type selector */
	  .my-class,          /* class selector */
	  #my-id {            /* id selectore */
		  color: red; 
		  width: 500px;
	  }
	  ```
- css properties:
	- padding: space between content and border
		- top right bottom left; / top-bottom, right-left; / on value for all; - units: px
		- auto: a special value that divides the available horizontal space evenly ==between left and right==
	- border: solid border outside the content
		- width, style(e.g.: solid), colour; 
	- margin: space outside the border, between and other elements
		- top right bottom left; / top-bottom, right-left; / on value for all; - units: px
		- auto: a special value that divides the available horizontal space evenly ==between left and right==
	- width: width of element, by default not include padding, border, and margin - unit: px
	- background-color
	- color: for content
	- text-shadow: a drop shadow on the text inside an element
		- horizontal offset(right>0), vertical offset(down>0), blur radius (阴影的模糊程度), color of the shadow
	- display: display mode of an element
		- block：块级元素，独占一行， 宽度默认 100%
		- inline：行内元素，不独占一行，只占内容大小
		- inline-block： 类似 inline，但可以设置宽高
		- flex：弹性盒子布局，子元素可灵活排列
		- grid：网格布局，子元素按行列排列
		- none：不显示，元素从页面消失（不占空间）
	- ```css
	  h1 {
		  margin: 0;
		  padding: 20px 0;
		  color: #00539f;
		  text-shadow: 3px 3px 1px black;
	  }
	  
	  body {
	      width: 600px;
		  margin: 0 auto;
		  background-color: #ff9500;
		  padding: 0 20px 20px 20px;
		  border: 5px solid black;
	  }
	  
	  /* <img> elements are inline elements by default, they don't accept margin           values in the same way block elements do. For the auto-margin trick to work on       this image, we must give it block-level behavior by using display: block;*/
	  img { 
		  display: block;
		  margin: 0 auto;
		  max-width: 100%; 
		  /*if the image is larger than the `width` set on the body (600 pixels), i
		  t will be constrained to `600px` and won't stretch wider. */
	  }
	  ```
- 关于px：
	- 一张图片有物理像素：宽 * 高，例，iPhone相机的照片像素是: 3024 * 4032 px
	- CSS px与实际物理像素之间存在映射：例：1 CSS px = 2 physical px (浏览器根据浏览器根据屏幕 像素密度（DPI / PPI） 做映射)
	- 展示图片时，限定max-width之后，浏览器会确保讲图片压缩至对应的CSS px width之内
## JavaScript
- arrow function: `const function_name = (parameter) => {expression}`
- dynamically typed language: there is no need to define type when declaring a variable, the type of the variable is determined while running, instead of compilation
	- let: normal variable, can be reassigned, block scope
	- const: constant, can not be reassigned to a different value, but the contents of the object it references can still be modified
	- var: can be reassigned, function scope
- Array: `const t = [1, 2, 3]`
	- add value to original array: `t.push(5)`
	- get a new array by add value: `const t2 = t.concat(5)` => original t is not changed
	- get the length: `t.length`
	- get element by index: `t[1]` => 2
	- join: `t.join(s)` join all items into a single string, separated by input parameter
	- iterate: `t.forEach(callbackFn, thisArg)`
		- `callbackFn` can have three parameters: `element, index, fullArray` 
		- ```javascript
		  const arr = [1, 2, 3];
		  const context = { name: "Esther" }
		  
		  arr.forEach(function(element) { // arrow function also works
			  console.log(this.name, element);  //this: context, this.name: Esther
		  }, context);
		  ```
	- creates new array based on old array `const m1 = t.map(callbackFn)` (callbackFn同上，3个入参)
	- destructuring: 
		- `const [a, b, c] = t` => a=1, b=2, c=3
		- `const[first, sencond, ...rest] = t` => `rest = [3, 5]`
		- `const[a, , c] = t` => a = 1, c = 3
		- `const[a, , , d]` => a = 1, d = 5
- object: 
	- create: `const ob1 = { attr1: v1, attr2: v2, attr3: v3, }
	- reference property: `o1.attr1` or `ob[attr1]`
	- destructure object 
		- `{attr1, attr2, attr3} = ob1` name in {} must be the same as attr of object
		- `{attr1: newname1, attr2: newname2, attr3: newname3} = ob1
	- objects are always references, so unless something is explicitly copying the object, mutations to an object would be visible to the outside.
	- change /add property: `ob1.attr1 = v11` `ob[attr1] = v11` (attr can not have space or starts with number if you want to use dot syntax, but with square bracket, it's okay to have attr name  like "secret number")
	- object methods: define method by defining properties that are functions
		- this in object method: this is the object who calls the function
		- ```js
		  const arto = {
			  name: 'Arto Hellas',
			  age: 35,
			  education: 'PhD',
			  greet: function() {    
				  console.log('hello, my name is ' + this.name)  
			  },
		  }
		  
		  arto.growOlder = function() {
			  this.age += 1
		  } // Methods can be assigned to objects after the creation of the object
		  
		  arro.greet() // prints "hello, my name is Arto Hellas"
		  
		  const referenceToGreet = arto.greet
          referenceToGreet() // prints "hello, my name is undefined"
          // No object calls the function, indeed JavaScript engine, so "this" is              global object. 
          setTimeout(arto.greet, 1000)  // also undefined
          setTimeout(arto.greet.bind(arto), 1000) // Arto
          //arto.greet.bind(arto) creates a new function where "this" is bound to              point to Arto, independent of where and how the method is being called.
		 ```
	- class: new way to define object: constructor functions
		- ```javascript
		  class Person {
			  constructor(name, age) {
				  this.name = name;
				  this.age = age;
			  }
			  greet() {
				  console.log(`Hi, I am ${this.name}`);
			  }
		  }
		  
		  const p1 = new Person('Alice', 20);
		  const p2 = new Person('Bob', 30);
		  
		  p1.greet(); // Hi, I'm Alice
		  p2.greet(); // Hi, I'm Bob
		  ```
- functions: functions aren't special data structures in JavaScript — they are just a special type of object that can be called.
	- arrow function:
		- `const sum = (p1, p2) => {return p1 + p2}`
		- if there is just a single parameter, () can be omitted: `const suqare = p => {return p * p}`
		- if the function only contains a single expression, {} can be omitted: `const square = p => p * p
	- function declaration: `function product(a, b) {return a * b}` hoisting => the function can be called before declaration
	- function expression: `const product = function(a, b) {return a * b}` no hoisting => function can not be called before declaration
- object spread syntax: `{...a}` spreads all the key-value pares from a into a new object
	- `ob3 = {...ob1, ...ob2}`: create a new object, copy all the attributes in ob1 and ob2 to ob3, if there are same attribute name in ob1 and ob2, take the value of ob1
	- `ob2 = {...ob1, attr2: v2}`: create a new object, copy all the attributes in ob1 into ob2, and change value of attr2 to v2
### React
- library of Java Script, a class or function which returns UI description 
- react component is react function or react class
- react function can only have one ==object== as input (can not be primitive value) but the object can have multiple attributes)
	- `const func_name = (props) => { } `
	- `const func_name = ({ attr1, attr2, attr3 }) => { } `
- call react function: 
	- `<func_name attr1=v1 attr2=v2 attr3=v3/>`
	- compile:  `React.createElement(func_name, { attr1: v1, attr2: v2, attr3: v3 })`
	- compile: `func_name({ attr1: v1, attr2: v2, attr3: v3 })` => multiple attributes will be wrapped as a single ==object== as input (can not be primitive value)
- react can not render object, it can only render primitive values. If an array`[ ]` is inserted and the element of it is primitive, it can render the elements one by one
- 以上：react arrow function 的入参必须是一个object, 但输出在页面时，必须直接展示primitive value （即object的属性）
### JSX (JavaScript XML)
- React 提供的一种语法糖，可以写 HTML 一样写界面，但本质上会被编译为JavaScript 调用：`React.createElement()` 
	- Return a single root element: to return multiple elements from a component, wrap them with a single parent tag. 
		- `<div></div>` or `<></>` (latter will not generate extra DOM element)
	- Close all the tags: `<img />`, / can not be omitted
	- camelCase most of the things 
		- 由于编译时会被转化为 JS，有些在HTML种可以使用的变量名在 JS 不合法或与 JS 关键字冲突，`stroke-width` => `strokeWidth`, `class` => `classNmae`
- use { } to insert JavaScript expression
- button: `<button onClick={function}>text</button>`

