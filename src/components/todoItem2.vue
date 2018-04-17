<template>
  <div>
    <input v-model="newTodo"  @keyup.enter="addTodo()"/>
    <ul>
      <li
        v-for="(todo, index) in todos"
        v-bind:key="index">
        今天的任务是:{{todo.text}}
        <button v-on:click="remove(index)">X</button>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  data () {
     return {
        title: '今天的任务是'+this.title,
        newTodo:'',
        loading:false,
        todos: [
          { id: 0, text: '吃饭' },
          { id: 1, text: '睡觉' },
          { id: 2, text: '学习' }
        ],
        list:[1,2,3,4]
     }
  },
  methods: {
    addTodo:function () {
        this.todos.push({
          id:this.nextTodoId++,
          text:this.newTodo,
        })
        this.newTodo=''
    },
    remove:function (index) {
        this.todos.splice(index,1)
    },
  },
}
</script>
