!function(t){var e=["January","February","Mach","April","May","June","July","August","September","October","November","September"],n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],o={state:{items:[]},newItem:function(t,e,n){this.state.items.unshift({text:t,status:e,label:n,isEditing:!0})},load:function(){var t=window.localStorage.getItem("todo-list");return t&&(this.state.items=JSON.parse(t)),!0},push:function(){window.localStorage.setItem("todo-list",JSON.stringify(this.state.items))}},i=Vue.extend({template:"#todo-header",data:function(){return{date:"",weekDay:"",month:""}},ready:function(){var t=new Date;this.date=t.getDate(),this.weekDay=n[t.getDay()],this.month=e[t.getMonth()]},methods:{add:function(){o.newItem("Type a new task and hit enter","editing","urgent")}}}),s=Vue.extend({template:"#todo-report",data:function(){return{listState:o.state}},computed:{taskRemain:function(){return this.listState.items.length}}}),a=Vue.extend({template:"#todo-item",props:["model"],data:function(){return{tempText:""}},computed:{isDone:function(){return"done"==this.model.status}},methods:{save:function(){this.model.text=this.tempText,this.model.isEditing=!1,o.push()},markDone:function(){this.model.status="done",o.push()},edit:function(){this.model.isEditing=!0,this.$nextTick(function(){t(this.$el).find("input").focus()}),this.tempText=this.model.text},"delete":function(){this.$dispatch("item-deleted",this.model),this.$nextTick(function(){o.push()})},showAction:function(e){var n=t(e.currentTarget),o=n.find(".action-list");o.hasClass("show")?o.removeClass("show"):(t(".action-list").removeClass("show"),o.addClass("show"))}}}),d=Vue.extend({template:"#todo-list",props:["collection"],components:{"todo-item":a},events:{"item-deleted":function(t){this.collection.$remove(t)}}});new Vue({el:"#app",data:function(){return{listState:o.state}},ready:function(){o.load()},components:{"todo-header":i,"todo-report":s,"todo-list":d}})}(jQuery);