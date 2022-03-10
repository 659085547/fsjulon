var scripts=document.getElementsByTagName("script"),
	scripts_src=scripts[scripts.length-1].getAttribute("src"),
	mypath=scripts_src.substring(0,scripts_src.lastIndexOf('/'))+'/',
	JEXTFN={},
	jLang={},
	language=$('[website-language]:eq(0)').attr('website-language');

// jq扩展
$.extend({

	// 禁止历史返回
	unback:function(fn){
		history.pushState(null,null,document.URL);
        window.addEventListener('popstate',function(){
        	if(typeof(fn)=='function') fn();
            history.pushState(null,null,document.URL);
        });
	},

	// h5修改链接但不跳转
	href:function(url,json,fn,dataType){
		if(typeof(window.history.replaceState)==='function'){
			if(typeof(fn)=='function') $.get(url, json, function(data){
				window.history.replaceState(null,'',url);
				fn(data);
			}, dataType);
		}else location.href=url;
	},

	// H5判断
	h5:function(){
		var el=document.createElement('canvas');
		return !!(el.getContext && el.getContext('2d'));
	},

	// ie判断
	ie:function(){
		var us=navigator.userAgent;
		return (us.indexOf('compatible')>-1 && us.indexOf("MSIE")>-1) || (us.indexOf('Trident')>-1 && us.indexOf("rv:11.0")>-1) || us.indexOf("Edge")>-1;
	},

	// 获取html的内容
	html:function(content){
		var mybody=/<body[^>]*>([\s\S]*)<\/body>/;
        var result=mybody.exec(content);
        if(result&&result.length===2) content=result[1];
        return $('<div>'+content+'</div>');
	},

	// hash改变
	hash:function(fn,hash){
		if(typeof(window.hash_ary)!='object') window.hash_ary={};
		window.hash_ary[hash]=window.hash_ary[hash]||'';
		location.hash=hash;
		setTimeout(function(){
			if(("onhashchange" in window)&&((typeof document.documentMode==="undefined")||document.documentMode==8)){
			    window.onhashchange=fn;
			}else{
				clearInterval(window.hash_ary[hash]);
				window.hash_ary[hash]=setInterval(function(){if(hash!=location.hash)fn();},150);
			}
		},10);
	},

	// 判断移动端
	mobile:function(){
	    var a=navigator.userAgent.toLowerCase(),
	    	b=a.match(/ipad/i)=="ipad",
	    	c=a.match(/iphone os/i)=="iphone os",
	    	d=a.match(/midp/i)=="midp",
	    	e=a.match(/rv:1.2.3.4/i)=="rv:1.2.3.4",
	    	f=a.match(/ucweb/i)=="ucweb",
	    	g=a.match(/android/i)=="android",
	    	h=a.match(/windows ce/i)=="windows ce",
	    	i=a.match(/windows mobile/i)=="windows mobile";
	    return b||c||d||e||f||g||h||i;
	},

	// 记录点击次数，为了避免重复执行函数效果
	clickTimes:function(str){
		str=str||'default';
		window.ClickTimes=window.ClickTimes||{};
		setTimeout(function(){
			window.ClickTimes[str]='0';
		},30);
		if(window.ClickTimes[str]=='1') return 1;
		window.ClickTimes[str]='1';
		return 0;
	},

	// 执行所有效果函数
	all:function(t){
		window.allindex=window.allindex||0;
		if(window.allindex==0) $(window).click(function(){$.all()});
		window.allindex++;
		for(var i in JEXTFN){
			if(typeof(JEXTFN[i])=='function') JEXTFN[i]();
		}
		if(window.allindex<120) setTimeout($.all, 1000);
		else window.allindex=1;
	},

	// 链接采集
	reptile:function(url,l){
		l=$.alert('loading');
		$.include(mypath+'web/reptile.js',function(){
			l.remove(function(){
				WebSiteReptile.c();
				WebSiteReptile.a(url);
			});
		});
	},

	// 弹窗
	alert:function(str,v,t){
		t={
			a:function(){
				if(typeof(str)=='object'){
					v=str;
				}else{
					if(typeof(v)!='object') v={};
					if(!v.str) v.str=str;
				}
				v=$.extend({
					resize:1,
					close:1,
					time:0,
					css:{},
					tv:0,
					xy:[-1,-1],
					wh:[430,0],
					into:0
				}, v);
				v.isloading=(typeof(v.str)=='string' && v.str && v.str.indexOf('loading')>-1 && v.str.length<15);
				t.m();
				$(window).resize(function(){t.s()});
				t.s();
				if(!$.mobile() && !v.max) t.r();
				return this;
			},
			m:function(){
				var s0={position:'fixed',zIndex:'999',opacity:1};
				var bg={left:0,top:0,right:0,bottom:0,background:'rgba(0,0,0,.4)'};
				var bd={background:'#fff',overflow:'hidden',boxShadow:'0 0 15px #888',borderRadius:'4px'};
				var cl={fontSize:'13px',padding:'6px 19px',background:'#eee',margin:'0 0 0 12px',borderRadius:'3px',color:'#666',display:'inline-block',cursor:'pointer',position:'relative',zIndex:2,letterSpacing:'1px'};
				var cx={position:'absolute',right:15,top:7,lineHeight:'32px',fontSize:'30px',cursor:'pointer','user-select':'none','-webkit-user-select':'none',color:'#666'};
				var tip={fontSize:'12px',lineHeight:'20px',height:20,left:18,top:'50%',marginTop:-10,position:'absolute',color:'#ec414d',width:'60%',overflow:'hidden',textAlign:'left'};
				var en={padding:'19px',textAlign:'right',position:'relative','user-select':'none','-webkit-user-select':'none'};
				var co={margin:'0 19px',fontSize:'13px',color:'#666',overflow:'auto',minHeight:$.mobile()?30:46,lineHeight:1.8};
				var ti={fontSize:'15px',lineHeight:'20px',height:20,color:'#777',maxWidth:'80%',overflow:'hidden'};
				var css0='display:inline-block;color:#fff;font-size:12px;background:rgba(0,0,0,.7);border-radius:3px;padding:6px 14px;';
				t.bg=$('<div></div>').css(s0).css(bg).addClass('alertop janimated');
				t.contents=$('<div clean></div>').css(co).css(v.css).html(v.str);
				t.title=$('<div alert-title></div>').css(ti).html(v.title);
				t.tt=$('<div></div>').css({padding:'16px 19px',cursor:'move'});
				t.tt.append(t.title);
				if(!v.title){
					t.title.css({height:0});
					cx.top=3;
					cx.right=14;
				}
				if(v.btn){
					if(typeof(v.btn)=='function'){
						t.btn=$('<div></div>').css(en).html('<span>'+(jLang.cancel?jLang.cancel:'取消')+'</span><span>'+(jLang.ok?jLang.ok:'确定')+'</span>');
						t.not=t.btn.children().eq(0).css(cl);
						t.yes=t.btn.children().eq(1).css(cl).css({background:'#43aafb',color:'#fff'});
						t.yes.click(function(){
							var r=1;
							if(typeof(v.btn)=='function') r=v.btn(t);
							r=parseInt(r);
							t.closes(r);
							if(r!=2) t.remove();
						});
					}else{
						t.btn=$('<div></div>').css(en).html('<span>'+(jLang.ok?jLang.ok:'确定')+'</span>');
						t.not=t.btn.children().eq(0).css(cl).css({background:'#43aafb',color:'#fff'});
					}
					t.tip=$('<div></div>').css(tip).attr({tip:''});
					t.btn.append(t.tip);
					t.not.click(function(){
						var r=1;
						if(typeof(v.not)=='function') r=v.not(t);
						r=parseInt(r);
						t.closes(r);
						if(r!=2) t.remove();
					});
				}else{
					t.close=$('<div></div>').css(cx).mousedown(function(e){e.stopPropagation()});
					t.close.append('×');
					t.tt.append(t.close);
					t.close.click(function(){t.remove()});
				}
				if(v.iframe){
					t.iframe=$('<iframe></iframe>').attr({src:v.iframe,name:'thisiframe',width:'100%',height:'100%',scroll:'no',frameborder:0,allowfullscreen:'allowfullscreen'});
					t.contents=$('<div over></div>').css({borderRadius:'4px'}).append(t.iframe);
				}else if(!v.btn){
					t.contents.css({minHeight:'86px'});
				}
				t.bd=$('<div></div>').css(s0).css(bd).append(t.tt).append(t.contents).append(t.btn).addClass('alertbn janimated');
				t.bd.attr('close',v.close);
				$('html').append(t.bg).append(t.bd);
				$('[alert-remove]').click(function(){t.remove()});
				t.bd.on({contextmenu:function(){return false;}});
				t.bg.on({contextmenu:function(){return false;}});
				t.bg.click(function(){t.remove()});
				t.bg.mine();
				t.bd.mine();
				if(v.isloading){
					var text='<div style="'+css0+'letter-spacing:1px;">Loading...</div>';
					t.tt.css({opacity:0});
					t.tt.css({display:'none'});
					t.bg.css({background:'rgba(225,225,225,.4)'}).off('click');
					t.bd.css({
						background:'none',
						boxShadow:'none',
						textAlign:'center'
					}).html(text);
				}
				if(v.max){
					t.bg.css({background:'none'});
					t.bd.css({borderRadius:0});
				}
				if(v.time>0){
					var text='<div style="'+css0+'padding:7px 15px;min-width:100px;">'+v.str+'</div>';
					t.tt.css({display:'none'});
					t.bg.css({display:'none'});
					t.bd.css({
						background:'none',
						boxShadow:'none',
						textAlign:'center'
					}).html(text);
					setTimeout(function(){t.remove()}, v.time);
				}
				if(v.tv){
					t.tt.css({height:0,padding:0});
					t.close.css({width:32,height:32,background:'#fff',lineHeight:'28px',textAlign:'center',borderRadius:'50%',border:'1px solid #fff'});
					t.bd.css({background:'none',overflow:'visible'});
				}
				if(typeof(v.init)=='function') v.init(t);
			},
			r:function(){
				$(t.tt).move(t.bd,{
					down:function(x,y){
						t.contentsbg=$('<div></div>').css({left:0,right:0,top:0,bottom:0,position:'absolute',zIndex:999});
						t.contents.css({position:'relative'}).append(t.contentsbg);
					},
					up:function(x,y){
						t.contentsbg.remove();
						v.width=parseInt($(t.bd).css('left'))/($(window).width()-v.wh[0]);
						v.height=parseInt($(t.bd).css('top'))/($(window).height()-v.wh[1]);
					}
				});
			},
			c:function(fn){
				setTimeout(function(){
					t.bg.removeClass('janimated').fadeOut(300, function(){
						if(!v.max) t.bg.remove();
					});
					t.bd.removeClass('janimated').fadeOut(300, function(){
						if(!v.max){
							t.bd.remove();
							if(typeof(v.end)=='function') v.end(t);
						}
						if(typeof(fn)=='function') fn();
					});
				},v.isloading?600:0);
			},
			remove:function(fn){
				if(t.bd.attr('close')=='0') return;
				if(v.max){
					history.back();
				}else{
					t.c(fn);
				}
			},
			show:function(fn){
				t.bg.show().addClass('janimated');
				t.bd.show().addClass('janimated');
			},
			closes:function(s){
				t.bd.attr('close',s);
				setTimeout(function(){
					t.bd.attr('close', v.close);
				},30);
				return this;
			},
			s:function(){
				var w0,w1,w2,w3,h0,h1,h2,h3,tv;
				t.contents.css({height:'auto'});
				t.bd.css({height:'auto'});
				w0=$(window).width();
				w2=w0*(v.tv?.96:.9);
				w1=t.bd.outerWidth();
				w3=v.wh[0];
				if(w3==0) w3=w1;
				if(w3>w2&&v.resize) w3=w2;
				v.width=v.width||.5;
				t.bd.css({width:w3});

				if(v.tv){
					tv=v.tv==1?9/16:v.tv;
					v.wh[1]=tv*w3;
				}

				h0=$(window).height();
				h2=h0*.9;
				h1=t.bd.outerHeight();
				h3=v.wh[1];
				if(h3==0) h3=h1;
				if(h3>h2) h3=h2;
				v.height=v.height||(h1+200>h2?.5:.35);
				if($.mobile()){
					v.xy[0]=v.width*(w0-w3)/w0*100+'%';
					v.xy[1]=v.height*(h0-h3)/h0*100+'%';
				}else if(v.xy[0]<0||v.into){
					v.xy[0]=v.width*(w0-w3);
					v.xy[1]=v.height*(h0-h3);
				}
				v.width=v.xy[0]/(w0-w3);
				v.height=v.xy[1]/(h0-h3);
				if(v.max){
					h3=h0;
					w3=w0;
					v.xy=[0,0];
					t.contents.css({height:'auto',borderRadius:0});
				}else{
					t.contents.css({height:h3-(t.tt?t.tt.outerHeight():0)-(t.btn?t.btn.outerHeight():0)});
				}
				if(v.tv && w0<750){
					t.close.css({top:h3+50,right:(w3-32)/2});
					if($.mobile()) t.close.css({lineHeight:'32px'});
				}else if(v.tv){
					t.close.css({top:1,right:-40});
				}
				t.bd.css({width:w3,height:h3,left:v.xy[0],top:v.xy[1]});
				v.into=1;
				return this;
			}
		}
		return t.a();
	},

	// 满屏弹窗
	max:function(str, v, lo){
		if(typeof(max_alert_fn)!='function'){
			$.include(mypath+'web/maxalert.js',true);
		}
		return max_alert_fn(str, v, lo);
	},

	// 导入文件
	include:function(src, callback){
        var css =src.indexOf('.css')>0;
        var tags=css?'link' : 'script';
        var type=css?'text/css':'text/javascript';
        var link=css?'href':'src';
		if(typeof(callback)=='function' || !callback){
			var f, done=false;
	        f=document.createElement(tags);
	        if(css) f.setAttribute('rel','stylesheet');
	        f.setAttribute('type',type);
	        f.setAttribute(link,src);
		   	if(typeof(f)!= 'undefined'){
		        document.getElementsByTagName('head')[0].appendChild(f);
				f.onload=f.onreadystatechange=function(){
					if( !done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
						done=true;
						if(typeof(callback)=='function') callback();
					}
				}
		    }
		}else{
        	var attr=css?'rel="stylesheet"':'language="javascript"';
            var name = '<'+tags+' type="'+type+'" '+attr+link+'="'+src+'"'+'></'+tags+'>';
	    	$(document).append(name);
	    }
	},

	// html 页面的 ajax 更换
	ajax_change:function(htm){
		var ht={},ah;
		$('[ajax-change]').each(function(i,e){
			ah=$(this).attr('ajax-change');
			ht[i]="[ajax-change="+ah+"]";
		});
		htm=$.html(htm);
		$(htm).find('[data-src]').each(function(){
			var i=$(this).attr('data-src');
			if($(this).is('img')) $(this).attr('src', i);
			else $(this).css('background-image', 'url('+i+')');
			$(this).removeAttr('data-src');
		});
		for(var i in ht){
			if($(ht[i]).html()!=$(htm).find(ht[i]).html()) $(ht[i]).html($(htm).find(ht[i]).html());
			else console.log($(htm).find(ht[i]).html());
		}
	}

});


$.fn.extend({
	// 鼠标移的距离
	// $('.title').move('.div',{});
	move:function(a,v){
        var x0,y0,x1,y1,t0,w,h,l,t,start,end,left,top;
        var down=$.mobile()?'touchstart':'mousedown';
        var move=$.mobile()?'touchmove':'mousemove';
        var up=$.mobile()?'touchend':'mouseup';
        	v=$.extend({
            	not:0
        	},v);
        if(v.box){
            var box=$(v.box);
            v.box={
                left:0,
                top:0,
                width:box.width()-this.width(),
                height:box.height()-this.height()
            };
        }
        this.addClass('notcopy').on(down,function(e0){
        	e0.preventDefault();
            x0=e0.pageX?e0.pageX:e0.originalEvent.changedTouches[0].pageX;
            y0=e0.pageY?e0.pageY:e0.originalEvent.changedTouches[0].pageY;
			if($.mobile() && e0.originalEvent.touches.length>1){
				t0=1;
				start=e0.originalEvent.touches;
			}else t0=0;
            w=$(window).width();
            h=$(window).height();
            l=parseInt($(a).css('left'))||0;
            t=parseInt($(a).css('top'))||0;
            $('body').css({'user-select':'none','-webkit-user-select':'none'});
            if(typeof(v.down)=='function') v.down({x:x0,y:y0,left:l,top:t});
            $(window).on(move, function(e1){
				e1.preventDefault();
				if($.mobile() && e1.originalEvent.touches.length>1){
					function distance(p1, p2) {
					    var x=p2.pageX-p1.pageX, y=p2.pageY-p1.pageY;
					    return Math.sqrt((x*x)+(y*y));
					}
					end=e1.originalEvent.touches;
					var hy0=distance(start[0],start[1]),hy1=distance(end[0],end[1]);
					var scale=hy0>hy1?(hy1/hy0/100):(hy0/hy1/100);
					scale=scale>0.005?0.005:scale;
					if(typeof(v.scale)=='function') v.scale(hy0>hy1?-scale:scale);
				}
                if(t0||v.not) return;
                x1=e1.pageX?e1.pageX:e1.originalEvent.changedTouches[0].pageX;
                y1=e1.pageY?e1.pageY:e1.originalEvent.changedTouches[0].pageY;
                if(v.box){
                    left=(l+x1-x0)<v.box.left?v.box.left:(l+x1-x0);
                    left=left>v.box.width?v.box.width:left;
                    top=(t+y1-y0)<v.box.top?v.box.top:(t+y1-y0);
                    top=top>v.box.height?v.box.height:top;
                }else{
                    left=l+x1-x0;
                    top=t+y1-y0;
                }
                if(v.x){
                    $(a).css({left:left});
                }else if(v.y){
                    $(a).css({top:top});
                }else{
                    $(a).css({left:left,top:top});
                }
                if(typeof(v.move)=='function') v.move({x:x0,y:y0,left:left,top:top});
            }).on(up, function(e2){
                t0=1;
                $('body').css({'user-select':'text','-webkit-user-select':'text'});
                if(typeof(v.up)=='function') v.up({x:x0,y:y0,left:left,top:top});
            });
        });
    },

	// 获取图片对象
	file:function(fn){
		var r,f={},t;
		this.change(function(e){
			if($.clickTimes('file_base64_data')) return;
			t=$(this);
			r=new FileReader();
			f=$(this)[0].files;
			r.readAsDataURL(f[0]);
			r.onloadend=function(e){fn(this.result, f[0], t);}
		});
		return this;
	},

	// 自定义滚动条
	mcscroll:function(v,e){
		v=v||{};
		v=$.extend({
			theme: "dark",
		},v);
		if($.mobile() && !v.mobile) return;
		e=this;
		if($.isFunction($.fn.mCustomScrollbar)){
			$(e).mCustomScrollbar(v);
		}else{
			$.include(mypath+'mCustomScrollbar/jquery.mCustomScrollbar.css');
			$.include(mypath+'mCustomScrollbar/jquery.mCustomScrollbar.js', true);
			$(e).mCustomScrollbar(v);
		}
	},

	/*
		// 截取图片
		$('[type=file]').img({
			file:file,
			wh:[400,400],
			end:function(canvas,obj,json){
				//你的表演
			}
		});
	*/
	img:function(v){
		$('[type=file]').file(function(base64,file,obj){
			v.file=file;
			v.obj=obj;
			obj.val('');
			if(!$.isFunction($.fn.cropper)){
				var lo=$.alert('loading');
				$.include(mypath+'cropper/cropper.min.css');
				$.include(mypath+'cropper/cropper.min.js');
				$.include(mypath+'cropper/do.it.js',function(){
					lo.remove(function(){cropperDoIt(v)});
				});
			}else{
				cropperDoIt(v);
			}
		});
	},

	// iframe加载完成后的方法
	iframe:function(fn){
		var ifr=$(this)[0];
		if(ifr.attachEvent){
			ifr.attachEvent('onreadystatechange', function(){
				if(ifr.readyState==='complete' || ifr.readyState=='loaded'){
					ifr.detachEvent('onreadystatechange', arguments.callee);
					fn(ifr.contentWindow.document.body.innerHTML);
				}
			});
		}else{
			ifr.addEventListener('load', function(){
				this.removeEventListener('load', arguments.call, false);
				fn(ifr.contentWindow.document.body.innerHTML);
			}, false);
		}
	},

	/*
	+-----------------------------------------------
	利用iframe实现普通表单提交，支持文件上传
	$('form').form({
		url:'/',
		end:function(data, f){}
	});
	+-----------------------------------------------
	*/
	form:function(v,f){
		f=$.extend({
			x:this,
			check:0,
			type:'post',
			dataType:'json',
			i:function(n){
				f.x.attr('issubmit', n);
				return f;
			},
			a:function(){
				f.x.each(function(i,e,m){
					m=$(this);
					m.off('submit').on('submit',function(){
						var c=$(this).check();
						if(typeof(f.check)=='function'){
							if(!c) c=f.check(m);
						}
						if(c || m.attr('issubmit')=='1') return false;
						else f.i(1);
						$.ajax({
							url:f.url,dataType:f.dataType,type:f.type,data:m.serializeArray(),success:function(data){
								f.i(0); if(typeof f.end=='function' && data) f.end(data, m);
							}
						});
						return false;
					}).find('[submit]').click(function(){
						if($.clickTimes()) return;
						m.submit();
					});
				});
			}
		}, v);
		f.a(); return this;
	},

	// 类型检测
	check:function(v){
		var check = [], v = v || {}, obj=this,
			email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
			mobile= /^1[0-9]{10}$/,
			phone = /^\d{7,8}$/;
		obj.find('[check]').each(function(i,e){
			var isgo, type, val, num, name,
			one = $(this),
			sty = one.attr('check'),
			val = one.val() || '',
			tip = one.attr('tip') && one.attr('tip').replace(/\{val\}/g, '"'+val+'"'),
			to  = one.attr('to') && $(one.attr('to')).size() ? $(one.attr('to')) : '';
			if(sty){
				sty = sty.split('=');
				sty[0] = sty[0]==''?'=':sty[0];
				sty[0] = sty[0].split('-');
				sty[0].length>1 || sty[0].push(1);
				name = sty[1]||'';
				type = sty[0][0];
				num  = sty[0][1] = parseInt(sty[0][1]) || 1;
				if(type=='str')			isgo = val.length>=num || -1;
				else if(type=='email') 	isgo = email.test(val) || -1;
				else if(type=='mobile') isgo = mobile.test(val) || -1;
				else if(type=='phone') 	isgo = phone.test(val) || -1;
				else if(type=='=') 		isgo = val==obj.find('[name="'+name+'"]:last').val() || -1;
				if(one.attr('type')=='radio'||one.attr('type')=='checkbox'){
					isgo = $('[name="'+one.attr('name')+'"]:checked').length>=num || -1;
				}
				if(isgo==-1){
					check.push({'obj':one, 'tip':tip, 'to':to, 'type':type});
					to && to.html(tip).show();
				}
				if(one.attr('type')=='radio'||one.attr('type')=='checkbox'){
					one.parent().parent().on('click',function(){
						to && to.hide().html('');
					});
				}else{
					one.keyup(function(){
						to && to.hide().html('');
					});
				}
			}
		});
		if(check.length>0){
			if(check[0].to) check[0].to.html(check[0].tip);
			else $.alert({
				str:check[0].tip,
				btn:1
			});
		}
		return check.length>0?check:0;
	},

	// 大图展示
	// $('img').click(function(){
	// 		$('img').picture(this,{});
	// });
	picture:function(v,p,e,l){
		e=this;
		e.not('[not=picture]').click(function(t){
			if($.clickTimes()) return;
			t=this;
			e.attr({not:'picture'});
			l=$.alert('loading');
			if(typeof(picture_all_show)!='function'){
				$.include(mypath+'web/picture.js',function(){
					l.remove(function(){picture_all_show(v,p,e,t)});
				});
			}else{
				l.remove(function(){picture_all_show(v,p,e,t)});
			}
		});
	},

	/**************************************************
	独自一人的滚动
	$('.asd').mine();
	**************************************************/
	mine:function(a){
		a = {
			obj: this,
			x: 0,
			y: 0
		},
		s = {
			i: function(){
				if(a.obj.length<=0) return 0;
				var $sj = $.mobile()?'touchmove':'mousewheel';
				a.obj.on('touchstart',function(e){
					a.y = e.pageY?e.pageY:e.originalEvent.changedTouches[0].pageY;
					a.x = e.pageX?e.pageX:e.originalEvent.changedTouches[0].pageX;
				});
				a.obj.on($sj,function(event, delta, x, y){
					return s.m(event, delta, x, y, this);
				});
			},
			m: function(e, delta, x, y, s){
				if($.mobile()){
					y = e.pageY?e.pageY:e.originalEvent.changedTouches[0].pageY;
					x = e.pageX?e.pageX:e.originalEvent.changedTouches[0].pageX;
					s.scrollTop = s.scrollTop - (y-a.y);
					// s.scrollLeft = s.scrollLeft - (x-a.x);
					a.y = y;
					a.x = x;
					e.stopPropagation();
					e.preventDefault();
				}else{
					if(window.mineisbegin) return false;
					window.mineisbegin=1;
					$(s).animate({scrollTop:s.scrollTop - (y>0 ? 120 : -120)}, 150, function(){
						window.mineisbegin=0;
					});
				}
			    return false;
			}
		}
		s.i();
		return this;
	},

	/**************************************************
	div滚动到可视区域
	当标签属性 data-visible=0 时重置滚动响应 
	$('.div').visible({top:10,end:function(v){}});
	**************************************************/
	visible:function(v,a,s){
		v = v || {},
		v = $.extend({
			obj: this,
			end: function(){},
			top: 0
		}, v);
		s = {
			i: function(){
				s.s();
				$(window).on({
					mousewheel:function(){s.s()},
					touchmove:function(){s.s()},
				});
			},
			s: function(h,t,w){
				h = $(window).height();
				w = $(window).width();
				t = $(window).scrollTop()||$('html').scrollTop()||$('body').scrollTop();
				v.k = 0;
				v.obj.each(function(e,i,j,k,l,m){
					e = $(this)
					i = h + t,
					j = e.offset().top,
					k = e.attr('data-visible');
					l = e[0].getBoundingClientRect().left;
					m = e[0].getBoundingClientRect().top;
					clearInterval(v.timeout);
					if(k!='1' && e.is(':visible')) v.k++;
					if( i>=j && k!='1' && e.is(':visible') && (w>l&&l>0) && (h>m&&m>0) ){
						e.attr({'data-visible':'1'});
						v.end(s);
					}else if(v.k>0){
						v.timeout=setInterval(s.s, 100);
					}
				});
			},
			reset:function(t){
				$(t).removeAttr('data-visible');
			}
		}
		s.i();
		return this;
	}

});
$('html').append('<style alertstyle>[alert-title] a{color:#43aafb}[clean]:after,[clean]:before{content:"";display:table}[clean]:after{clear:both}[over]{overflow:hidden}[hide]{display:none}</style>');
$('[alertstyle]').append('@-webkit-keyframes alertbn{0%{opacity:0;-webkit-transform:scale(.3)}100%{opacity:1;-webkit-transform:scale(1)}}@-moz-keyframes alertbn{0%{opacity:0;-moz-transform:scale(.3)}100%{opacity:1;-moz-transform:scale(1)}}@-o-keyframes alertbn{0%{opacity:0;-o-transform:scale(.3);}100%{opacity:1;-o-transform:scale(1);}}@keyframes alertbn{0%{opacity:0;transform:scale(.3)}100%{opacity:1;transform:scale(1)}}.alertbn{-webkit-animation-name:alertbn;-moz-animation-name:alertbn;-o-animation-name:alertbn;animation-name:alertbn}@-webkit-keyframes alertop{0%{opacity:0;}100%{opacity:1;}}@-moz-keyframes alertop{0%{opacity:0;}100%{opacity:1;}}@-o-keyframes alertop{0%{opacity:0;}100%{opacity:1;}}@keyframes alertop{0%{opacity:0;}100%{opacity:1;}}.alertop{-webkit-animation-name:alertop;-moz-animation-name:alertop;-o-animation-name:alertop;animation-name:alertop}.janimated{-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:.3s;-moz-animation-duration:.3s;-ms-animation-duration:.3s;-o-animation-duration:.3s;animation-duration:.3s}');
$.include(mypath+'org/jquery.mousewheel.js', true);
$.include(mypath+'lang/'+(language?language:'cn')+'.js',function(){jLang=ijkLanguage});
// 节点加载完执行
$(window).ready(function(){
	$.include(mypath+'web/common.js');
	if($('[data-number]').size()) $.include(mypath+'web/number.js');
	if($('[data-src]').size()) $.include(mypath+'web/loading.js');
	if($('[ajax-href],[ajax-page],[ajax-append]').size()) $.include(mypath+'web/ajaxpage.js');
	if($('body').html().indexOf('canvas')) $.include(mypath+'canvas/index.js');
});
// 全部加载完执行
$(window).load(function(){
	$.all();
	$.include(mypath+'web/maxalert.js');
});