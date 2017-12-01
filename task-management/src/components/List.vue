<template>
  <div class="assets--list">
    <select class="" name="" v-model="selected">
      <option value="origin" disabled>{{placeholder}}</option>
      <option v-for="option in options" :value="option">
        {{option}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    selected: {
      default: 'origin'
    },
    options: {
      default: function () {
        return ['option 1', 'option 2', 'option 3']
      }
    },
    placeholder: {
      default: 'Please write placeholder-props'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
