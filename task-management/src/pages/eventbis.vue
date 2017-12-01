<template>
  <div class="pages--event container">
    <h1>Event EA00001</h1>

    <div class="button-primary-blue float-right" v-on:click="closeEvent">
      Close event
    </div>

    <div class="card">
        <div class="card--header">
          <h2 class="title-18">Global informations</h2>
        </div>
        <div class="card--body global-informations height-auto">
          <div class="global-informations--infos-box">
            <div class="global-informations--infos-box--title">
              Deal ID
            </div>
            <div class="global-informations--infos-box--text">
              L1766
            </div>
          </div>
          <div class="global-informations--infos-box">
            <div class="global-informations--infos-box--title">
              ID Facility
            </div>
            <div class="global-informations--infos-box--text">
              FCN00005435
            </div>
          </div>
          <div class="global-informations--infos-box">
            <div class="global-informations--infos-box--title">
              Application
            </div>
            <div class="global-informations--infos-box--text">
              SFL
            </div>
          </div>
          <div class="global-informations--infos-box">
            <div class="global-informations--infos-box--title">
              Category
            </div>
            <div class="global-informations--infos-box--text">
              Deal in default
            </div>
          </div>
          <div class="global-informations--infos-box">
            <div class="global-informations--infos-box--title">
              Date
            </div>
            <div class="global-informations--infos-box--text">
              24/09/2017
            </div>
          </div>
          <div class="global-informations--infos-box">
            <div class="global-informations--infos-box--title">
              Message event
            </div>
            <div class="global-informations--infos-box--text">
              Deal L1766 is in default
            </div>
          </div>
          <div class="separator"></div>
          <div class="global-informations--settings">
            <div class="assets--list">
              <label for="">Owner Team</label>
              <select class="" name="" v-model="events.ownerteam">
                <option value="origin" disabled>Select the team</option>
                <option value="-">-</option>
                <option v-for="team in allTeams" :value="team">
                  {{team}}
                </option>
              </select><br/><br/>
            </div>
            <div class="assets--list">
              <label for="">Owner user</label>
              <select class="" name="" value="-">
                <option value="origin" disabled>Select user</option>
                <option value="-">-</option>
                <option v-for="user in teams[0].users" :value="user">
                  {{user}}
                </option>
              </select><br/><br/>
            </div>
            <div class="assets--list">
              <label for="">Priority</label>
              <select class="" name="" value="-">
                <option value="origin" disabled>Select priority</option>
                <option value="-">-</option>
                <option v-for="priority in priorities" :value="priority">
                  {{priority}}
                </option>
              </select><br/><br/>
            </div>
          </div>
        </div>
    </div>

    <div class="card">
      <div class="card--header">
        <h2 class="title-18">Task management</h2>
      </div>
      <div class="card--body">
        <table ref="eventTable" :class="onFocus">
          <thead>
            <tr>
              <th v-for="title in titles">{{ title }}</th>
            </tr>
          </thead>
          <tbody ref="eventTableTbody">
            <tr v-for="line, index in lines" v-on:click="focusLine($event, line)" :class="{ focus: line.active, current: line.currentTask}" :key="index">
              <td><div>{{ line.description }}</div></td>
              <td><div>{{ line.openingDate }}</div></td>
              <td><div>{{ line.closingDate }}</div></td>
              <td><div>{{ line.assigneeTeam }}</div></td>
              <td><div>{{ line.assigneeUser }}</div></td>
              <td><div><div :class="[getLabelClass(line.status), 'assets--label']">{{ line.status }}</div></div></td>
            </tr>
          </tbody>
        </table>
        <div class="button-primary" v-on:click="addTask">
          <i class="fa fa-plus-circle"></i>Add task
        </div>

        <div ref="taskPannel" :class="[onFocus, 'card--body--pannel']">
          <div class="card--body--pannel--header">
            <input ref="pannelInput" type="text" name="" value="" v-model="currentElement.description" v-on:keyup.enter="updateLine" v-on:blur="updateLine" placeholder="Type task name">
          </div>
          <div class="card--body--pannel--body">
            <div class="card--body--pannel--body--line">
              <label>In progress</label>
              <label class="assets--switch">
                <input type="checkbox" v-model="currentElement.inProgress">
                <span class="slider"></span>
              </label>
            </div>
            Assignee Team
            <select class="" name="" v-model="currentElement.assigneeTeam">
              <option value="origin" disabled>Select the team</option>
              <option value="-">-</option>
              <option v-for="team in allTeams" :value="team">
                {{team}}
              </option>
            </select><br/><br/>

            Assignee User <br/>
            <select class="" name="" v-model="currentElement.assigneeUser">
              <option value="origin" disabled>Select the user</option>
              <option value="-">-</option>
              <option v-for="user in allUsers" :value="user">
                {{user}}
              </option>
            </select><br/><br/>
          </div>
          <div class="card--body--pannel--footer">
            <div class="button-primary" v-on:click="cancelTask">
              <i class="fa fa-trash"></i>
            </div>
            <div :class="[{ disableM: !currentElement.currentTask }, 'button-primary-blue', 'float-right']" v-on:click="closeTask">Close task</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
        <div class="card--header">
          <h2 class="title-18">Comments</h2>
        </div>
        <div class="card--body height-auto">
          <div class="comments">
            <p class="comments--legend">No comment for now</p>
            <div class="comment" v-for="comment in comments">
              <div class="comment--title">{{comment.team}} - {{comment.user}} <span class="thin">{{comment.date}}</span></div>
              <p>{{comment.text}}</p>
            </div>
          </div>
          <div class="comment-post">
            <textarea name="name" v-model="newComment" placeholder="Add a comment"></textarea>
            <div class="button-primary-blue" v-on:click="addComment" v-on:keyup.enter="addComment">
              <i class="fa fa-plus-circle"></i> Post comment
            </div>
          </div>

        </div>
    </div>
  </div>
</template>

<script>

import List from '@/components/List'

export default {
  name: 'Event',
  data () {
    return {
      titles: ['Task description', 'Opening date', 'Closing date', 'Assignee team', 'Assignee user', 'Status'],
      priorities: ['Low', 'Medium', 'High'],
      teams: [
        {
          name: 'SCR',
          users: ['Paul Morreau', 'Thierry Romand', 'Helene Poiler']
        },
        {
          name: 'OPER',
          users: ['Thierry Zen', 'Charles Puka', 'Helene Poiler']
        }
      ],
      events: {
        dealid: 'L1766',
        pec: 'PEC0989',
        idefacility: 'FCN00005435',
        app: 'SFL',
        category: 'Deal in Default',
        date: ['24/09/2017'],
        message: 'Deal L1766 is in default',
        ownerteam: 'SCR',
        owneruser: 'Andréa Delre',
        priority: '',
        statut: 'To Do'
      },
      lines: [
        {
          description: 'Analyser l\'évènement',
          openingDate: '24/07/2017',
          closingDate: '-',
          assigneeTeam: 'SCR',
          assigneeUser: '-',
          status: 'to do',
          active: false,
          inProgress: false,
          currentTask: true
        },
        {
          description: 'Analyser l\'évènement numéro 02',
          openingDate: '24/07/2017',
          closingDate: '-',
          assigneeTeam: 'SCR',
          assigneeUser: '-',
          status: 'created',
          active: false,
          inProgress: false,
          currentTask: false
        }
      ],
      comments: [],
      currentElement: {
        description: '',
        openingDate: '',
        closingDate: '',
        assigneeTeam: '-',
        assigneeUser: '-',
        status: 'created',
        active: false,
        inProgress: false,
        currentTask: false
      },
      newLine: {
        description: '',
        openingDate: '',
        closingDate: '-',
        assigneeTeam: '-',
        assigneeUser: '-',
        status: 'created',
        active: true,
        inProgress: false
      },
      newComment: ''
    }
  },
  methods: {
    focusLine: function (event, line) {
      console.log(line)
      if (!this.$refs.taskPannel.classList.value.includes('active') && !line.active) {
        line.active = true
        this.currentElement = line
        setTimeout(() => {
          this.$refs.pannelInput.focus()
        }, 200)
      } else if (this.$refs.taskPannel.classList.value.includes('active') && !line.active) {
        for (var i in this.lines) {
          this.lines[i].active = false
        }
        line.active = true
        this.currentElement = line
        this.$refs.pannelInput.focus()
      } else if (line.active) {
        line.active = false
      }
    },
    updateLine: function () {
      this.$refs.pannelInput.blur()
    },
    addTask: function () {
      const currentDay = new Date()
      var myLine = {
        description: '',
        openingDate: '',
        closingDate: '-',
        assigneeTeam: '-',
        assigneeUser: '-',
        status: 'created',
        active: true,
        inProgress: false
      }

      for (var i in this.lines) {
        this.lines[i].active = false
      }

      myLine.openingDate = currentDay.getDate() + '/' + (currentDay.getMonth() + 1) + '/' + currentDay.getFullYear()
      this.lines.push(myLine)

      this.currentElement = this.lines[this.lines.length - 1]
      setTimeout(() => {
        this.$refs.pannelInput.focus()
      }, 200)
    },
    deleteTask: function () {
      for (var i in this.lines) {
        if (this.lines[i] === this.currentElement) {
          this.lines.splice(i, 1)
        }
      }
    },
    cancelTask: function () {
      this.currentElement.status = 'canceled'
      this.currentElement.currentTask = false
      for (var i in this.lines) {
        if (this.lines[i] === this.currentElement) {
          console.log(this.lines)
          this.lines[1].status = 'to do'
          this.lines[1].currentTask = true
          break
        }
      }
    },
    closeTask: function () {
      this.currentElement.status = 'done'
      this.currentElement.currentTask = false
      for (var i in this.lines) {
        if (this.lines[i] === this.currentElement) {
          this.lines[1].status = 'to do'
          this.lines[1].currentTask = true
          break
        }
      }
    },
    closeEvent: function () {
      for (var i in this.lines) {
        this.lines[i].status = 'done'
      }
    },
    getLabelClass: function (elmt) {
      return elmt.toLowerCase().replace(/\s/g, '')
    },
    addComment: function () {
      const currentDay = new Date()
      var myComment = {
        text: this.newComment,
        user: 'Andréa Delre',
        team: 'GLFI SCR',
        date: currentDay
      }
      this.comments.push(myComment)
      this.newComment = ''
    }
  },
  computed: {
    onFocus: function () {
      var check = false
      for (var i in this.lines) {
        if (this.lines[i].active) {
          check = true
          break
        }
      }
      return {
        active: check
      }
    },
    allTeams: function () {
      var gTeams = []
      for (var i in this.teams) {
        gTeams.push(this.teams[i].name)
      }
      return gTeams
    },
    allUsers: function () {
      var gUsers = []
      for (var i in this.teams) {
        if (this.teams[i].name === this.currentElement.assigneeTeam) {
          gUsers = this.teams[i].users
        }
      }
      return gUsers
    }
  },
  components: {
    List
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.global-informations{
}
.global-informations--infos-box{
  width: 19.5%;
  display: inline-block;
  margin-bottom: 30px;
}
.global-informations--infos-box--title{
  color: #777777;
}
.global-informations--infos-box--text{
  font-size: 18px;
  color: #444852;
  font-weight: 600;
}
.global-informations--settings{
  margin-top: 30px;
}
.global-informations--settings .assets--list{
  width: 16.4%;
  display: inline-block;
}
.global-informations--settings .assets--list label{
  display: block;
}
.card--body--pannel--body--line {
  margin-bottom: 15px;
}
.card--body--pannel--body--line label:first-child{
  vertical-align: top;
  margin-right: 10px;
}
.button-primary{
  border-radius: 2px;
  padding: 0 15px;
  display: inline-block;
  height: 38px;
  box-sizing: border-box;
  line-height: 38px;
  background: #F5F5F5;
  border: 1px solid #CCCCCC;
  cursor: pointer;
  transition: all 0.1s;
}
.button-primary-blue{
  border-radius: 2px;
  padding: 0 15px;
  display: inline-block;
  height: 38px;
  box-sizing: border-box;
  line-height: 38px;
  background: #23558C;
  border: 1px solid #23558C;
  cursor: pointer;
  transition: all 0.1s;
  color: #FFF;
}
.button-primary i{
  margin-right: 7px;
}
.button-primary:hover{
  background-color: #DDDEDF;
}

.assets--switch{
  position: relative;
  display: inline-block;
  width: 53px;
  height: 22px;
}
.assets--switch input {display:none;}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 5px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #35BD5B;
}
input:focus + .slider {
  box-shadow: 0 0 1px #35BD5B;
}
input:checked + .slider:before {
  -webkit-transform: translateX(27px);
  -ms-transform: translateX(27px);
  transform: translateX(27px);
}

.card--header{
  background: #F5F5F5;
  line-height: 50px;
  padding-left: 15px;
  border-bottom: 1px solid #CCCCCC;
}
.card--body{
  padding: 15px;
  position: relative;
  min-height: 295px;
}
.card--body table{
  width: 100%;
  border-collapse: collapse;
  transition: all 0.3s;
}
.card--body thead th{
  font-size: 12px;
  color: #CCCCCC;
  text-align: left;
  padding-bottom: 10px;
}
.card--body thead th:nth-child(1){
  padding-left: 15px;
}
.card--body tbody tr{
  cursor: pointer;
  opacity: 0.4;
}
.card--body tbody tr.current{
  opacity: 1;
}
.card--body tbody tr.focus{
  opacity: 1;
}
.card--body tbody tr.focus td div{
  background-color: rgba(0, 155, 205, 0.35);
}
.card--body tbody td{
  font-size: 14px;
  color: #777777;
  text-align: left;
  padding: 0;
  border-collapse: collapse;
}
.card--body tbody td div{
  background: #FFFFFF;
  border-style: solid;
  border-width: 1px 0;
  border-color: #CCCCCC;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  margin-bottom: 10px;
}
.card--body tbody td:first-child div{
  border-left: solid 1px #CCCCCC;
  border-radius: 2px 0 0 2px;
  padding-left: 15px;
}

.card--body tbody td:last-child div{
  border-right: solid 1px #CCCCCC;
  border-radius: 0 2px 2px 0;
}
.card--body tbody td:nth-child(1){
  width: 550px;
  transition: all 0.3s;
}

.card--body tbody td div .assets--label{
  background: #DDDEDF;
  border-style: none;
  height: 20px;
  line-height: 20px;
  margin-bottom: 0px;
  font-size: 12px;
  display: inline-block;
  padding: 0 10px;
  color: #333333;
}
.card--body tbody td div .assets--label.todo{
  background-color: #B9292D;
  color: #FFF;
}.card--body tbody td div .assets--label.inprogress{
  background-color: #009BCD;
  color: #FFF;
}.card--body tbody td div .assets--label.done{
  background-color: #35BD5B;
  color: #FFF;
}.card--body tbody td div .assets--label.check{
  background-color: #23558C;
  color: #FFF;
}
.card--body table.active{
  width: calc(100% - 270px)
}
.card--body table.active tbody td:nth-child(1){
  width: 285px;
}
.card--body table tbody td:last-child{
  width: 100px;
}
.card--body table tbody td:nth-child(5){
  width: 100px;
}
.card--body--pannel{
  position: absolute;
  width: 255px;
  min-height: 265px;
  top: 41px;
  right: 15px;
  background: #FAFAFA;
  border: 1px solid #CCCCCC;
  border-radius: 2px;
  margin-right: -280px;
  transition: all 0.3s;
}
.card--body--pannel.active{
  margin-right: 0;
}
.card--body--pannel--header{
  height: 50px;
  background-color: #FFF;
  text-align: left;
  border-bottom: solid 1px #CCCCCC;
}
.card--body--pannel--header input{
  height: 34px;
  width: calc(100% - 30px);
  margin-top: 7px;
  margin-left: 15px;
  box-sizing: border-box;
  border-radius: 2px;
  border: solid 1px transparent;
  padding-left: 10px;
  transition: all 0.1s;
}
.card--body--pannel--header input:focus{
  outline: none;
  background: #FFFFFF;
  border: 1px solid rgba(0,155,205,0.70);
  box-shadow: 0 0 2px 0 rgba(0,155,205,0.40);
}
.card--body--pannel--header input:hover{
  outline: none;
  background: #FFFFFF;
  border: 1px solid rgba(0,155,205,0.70);
  box-shadow: 0 0 2px 0 rgba(0,155,205,0.40);
}
.card--body--pannel--body{
  padding: 15px;
  padding-bottom: 65px;
}
.card--body--pannel--footer{
  height: 50px;
  width: 100%;
  background-color: #FFF;
  text-align: left;
  border-top: solid 1px #CCCCCC;
  position: absolute;
  bottom: 0;
  padding: 5px 15px;
  box-sizing: border-box;
}
.comments{
  position: relative;
  min-height: 20px;
}
.comments--legend{
  position: absolute;
  z-index: 10;
}
.comment{
  padding: 15px;
  background-color: #F5F5F5;
  z-index: 100;
  position: relative;
  margin-bottom: 15px;
}
.comment--title{
  font-weight: bold;
}
.comment p{
  margin-top: 7px;
  color: #333333;
}
.comment-post{
  margin-top: 20px;
}
.comment-post textarea{
  width: calc(85% - 15px);
  font-size: 14px;
  padding: 10px 15px;
  vertical-align: bottom;
  resize: none;
  border: solid 1px #CCCCCC;
  border-radius: 2px;
  margin-right: 15px;
}
.comment-post .button-primary-blue{
}
</style>
