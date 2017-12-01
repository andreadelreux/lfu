<template>
  <div class="pages--event">
    <div class="card">
      <div class="card--header">
        <h2 class="title-18">Task management</h2>
      </div>
      <div class="card--body">
        <table ref="eventTable">
          <thead>
            <tr>
              <th v-for="title in titles">{{ title }}</th>
            </tr>
          </thead>
          <tbody ref="eventTableTbody">
            <tr v-for="line in lines" v-on:click="focusLine($event, line)">
              <td><div>{{ line.description }}</div></td>
              <td><div>{{ line.openingDate }}</div></td>
              <td><div>{{ line.closingDate }}</div></td>
              <td><div>{{ line.assigneeTeam }}</div></td>
              <td><div>{{ line.assigneeUser }}</div></td>
              <td><div>{{ line.status }}</div></td>
            </tr>
          </tbody>
        </table>
        <div class="button-primary" v-on:click="addTask">
          <i class="fa fa-plus-circle"></i>Add task
        </div>
        <div ref="taskPannel" class="card--body--pannel">
          <div class="card--body--pannel--header">
            <input ref="pannelInput" type="text" name="" value="" v-model="pannelData.description" v-on:keyup.enter="updateLine" v-on:blur="updateLine">
          </div>
          <div class="card--body--pannel--body">
            In progress <br/>
            Assignee Team <br/>
            Assignee User <br/>
          </div>
          <div class="card--body--pannel--footer">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Event',
  data () {
    return {
      titles: ['Task description', 'Opening date', 'Closing date', 'Assignee team', 'Assignee user', 'Status'],
      team: {
        scr: {
          users: ['Paul', 'Thierry', 'Helene']
        }
      },
      lines: [
        {
          description: 'Analyser l\'évènement',
          openingDate: '24/07/2017',
          closingDate: '25/07/2017',
          assigneeTeam: '-',
          assigneeUser: '-',
          status: 'To do',
          active: false,
          inProgress: false
        },
        {
          description: 'Analyser l\'évènement numéro 02',
          openingDate: '24/07/2017',
          closingDate: '25/07/2017',
          assigneeTeam: '-',
          assigneeUser: '-',
          status: 'To do',
          active: false,
          inProgress: false
        }
      ],
      pannelData: {
        currentElement: '',
        description: '',
        assigneeTeam: '',
        assigneeUser: ''
      },
      newLine: {
        description: '',
        openingDate: '',
        closingDate: '-',
        assigneeTeam: '-',
        assigneeUser: '-',
        status: 'created'
      }
    }
  },
  methods: {
    focusLine: function (event, line) {
      const myDivs = this.$refs.eventTableTbody.children
      const arrFromNodeList = [...myDivs]
      const results = arrFromNodeList.filter(node => [...node.classList].includes('focus')).length > 0

      if (!this.$refs.taskPannel.classList.value.includes('active') && !results) {
        this.pannelData.currentElement = line
        this.pannelData.description = line.description
        this.$refs.taskPannel.classList.toggle('active')
        this.$refs.eventTable.classList.toggle('active')
        setTimeout(() => {
          this.$refs.pannelInput.focus()
        }, 200)
        event.target.parentElement.parentElement.classList.toggle('focus')
      } else if (event.target.parentElement.parentElement.classList.value.includes('focus')) {
        this.pannelData.currentElement = ''
        this.pannelData.description = ''
        this.$refs.taskPannel.classList.toggle('active')
        this.$refs.eventTable.classList.toggle('active')
        this.$refs.pannelInput.blur()
        event.target.parentElement.parentElement.classList.toggle('focus')
      } else {
        this.pannelData.currentElement = line
        this.pannelData.description = line.description
        this.$refs.pannelInput.focus()
        document.getElementsByClassName('focus')[0].classList.remove('focus')
        event.target.parentElement.parentElement.classList.toggle('focus')
      }
    },
    updateLine: function () {
      this.pannelData.currentElement.description = this.pannelData.description
      this.$refs.pannelInput.blur()
    },
    addTask: function () {
      const currentDay = new Date()
      this.newLine.openingDate = currentDay.getDate() + '/' + (currentDay.getMonth() + 1) + '/' + currentDay.getFullYear()
      this.lines.push(this.newLine)

      this.pannelData.currentElement = this.lines[this.lines.length - 1]
      this.pannelData.description = this.lines[this.lines.length - 1].description
      this.$refs.taskPannel.classList.toggle('active')
      this.$refs.eventTable.classList.toggle('active')

      const lastLine = document.getElementsByClassName('card--body')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')
      console.log(lastLine)
      console.log(lastLine[2])
      setTimeout(() => {
        this.$refs.pannelInput.focus()
      }, 200)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-18{
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  text-align: left;
}
.card{
  width: 1170px;/* BG: */
  background: #FFF;
  border: 1px solid #CCCCCC;
  border-radius: 2px;
  margin: auto;
  position: relative;
  overflow: hidden;
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
.button-primary i{
  margin-right: 7px;
}
.button-primary:hover{
  background-color: #DDDEDF;
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
.card--body table.active{
  width: calc(100% - 270px)
}
.card--body table.active tbody td:nth-child(1){
  width: 285px;
}
.card--body table tbody td:last-child{
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
}
</style>
