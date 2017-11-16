<template>
  <div>
  </div>
</template>

<script>
export default {

    data() {
        return {

        };
    },

    methods: {
        register() {
            console.log('Register button was clicked.');
        },
    },

    watch: {

    },

    mounted() {
        setTimeout(() => {
            console.log('Register component mounted');
        }, 0);
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
