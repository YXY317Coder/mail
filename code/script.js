document.getElementById('blogin').disabled = true;
    function apt(tin,wm){
	    return '&' + tin + '=' + wm;
    }
    function apd(act){
		var yon = 'https://tinywebdb.appinventor.space/api?user=mail317&secret=bb6dc299&action=' + act;
		return yon;
    }
    function pt(o,...args){
		var xhr = new XMLHttpRequest();
        var url = '';
		if (o === 'count'){
			url = apd(o);
		}
		else if (o === 'get'){
			url = apd(o) + apt('tag',args[0]);
		}
		else if (o === 'delete'){
			url = apd(o) + apt('tag',args[0]);
		}
		else if (o === 'update'){
			url = apd(o) + apt('tag',args[0]) + apt('value',args[1]);
		}
		else if (o === 'search'){
			url = apd(o) + apt('no',args[0]) + apt('count',args[1]) + apt('tag',args[2]) + apt('type',args[3]);
		}
		xhr.open("GET", url, false); 
		xhr.send();
		if (xhr.status === 200) {
		    return(xhr.responseText);
		} else {
		    return(xhr.statusText);
		}
   	};
	function login(){
		var d1 = document.getElementById('naee').value;
		var d2 = document.getElementById('phin').value;
		var d3 = JSON.parse(pt('get',d1 + '_password'));
		if (d3[d1 + '_password'] == '' || d3[d1 + '_password'] == null || d3[d1 + '_password'] == 'null'){
			alert("登陆失败！是不是有什么忘填了？");
		}
		else if (d3[d1 + '_password'] !== d2){
			alert("用户名或密码错误！");
		}
		else{
			window.localStorage.setItem('nowname',d1);
			alert("登陆成功！已登录到此账号：" + d1);
			login_do();
		}
	};
	function lange(){
		var d1 = document.getElementById('naee').value;
		var d2 = document.getElementById('phin').value;
		var d3 = JSON.parse(pt('get',d1 + '_password'));
		if (d2.trim() !== '' || d1.trim() !== ''){
			if (d3[d1 + '_password'] === 'null'){
				var d4 = JSON.parse(pt('update',d1 + '_password',d2));
				if (d4['status'] === 'success'){
					window.localStorage.setItem('nowname',d1);
					alert("创建账号成功！已登录到此账号：" + d1 + "，密码请熟记：" + d2 + " ！");
					login_do();
				}
				else{
					alert("尝试创建账号失败！请检查网络和输入！");
				}
			}
			else if (d3 !== ''){
				alert('已有这个账号！');
			}
			else{
				alert("创建账号失败！");
			}
		}
	};
	function breaklogin(){
		window.localStorage.setItem('nowname','null');
		alert('已退登！正在刷新网页。');
		window.location.href = 'https://yxy317coder.github.io/chatroom/';
	}
	function login_do(){
		var div = document.getElementById('chatdiv');
  		div.style.display = 'block';
		var newDiv = document.createElement('h4');
		newDiv.innerHTML = '当前账户名：' + window.localStorage.getItem('nowname');
		if (div.children.length > 0) {
		    div.insertBefore(newDiv, div.children[0]);
		} else {
		    div.appendChild(newDiv);
		}
		document.getElementById('blogin').disabled = false;
		document.getElementById('login').disabled = true;
		document.getElementById('lange').disabled = true;
	};
	if (window.localStorage.getItem('nowname') !== 'null' && window.localStorage.getItem('nowname') !== null){
		login_do();
	}
