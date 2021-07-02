var taskList = new Vue({
  el:'#taskList',
  data:{
    title:{
      taskList: 'Things where I could safe money',
      completedTasks: 'Completed Tasks'
    },
    tasks: [
      { description: "Don't let the refrigerator open.", completed: false },
      { description: "Turn PC off during the night.", completed: false },
      { description: "Try to not flush so often.", completed: false },
    ],
    editTaskIndex: -1
  },
  methods:{
    addTask(){
      this.tasks.push({description: this.$refs.newTask.value , completed: false});
      this.$refs.newTask.value = '';

      toastr.success('New task added to the task list !!!')

    },

    deleteTask(index){
      this.tasks.splice(index,1);
      toastr.error('Task deleted');
    },
    edited(){
      toastr.success('Task updated !!!')
    }
  },
  computed: {
    // incompleteTasks: function(){
    //  return this.tasks.filter( rayhan =>  !rayhan.completed );
    // },
    completeTasks: function(){
      return this.tasks.filter( task =>  task.completed );
    }
  }

});
