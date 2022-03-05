<template>
  <div>

    <div class="text-center py-10">
      <h1 class="text-4xl font-bold mb-2">Your listings</h1>
    </div>

    <div class="mt-10" v-if="me">
      <job v-for="job in me.jobs" :key="job.id" :job="job" >
        <template slot="actions">
          <nuxt-link :to="{name: 'jobs-id-edit', params: {id: job.id}}" href="" class="font-medium text-blue-500">Edit</nuxt-link>
        </template>
      </job>
    </div>

  </div>
</template>


<script>
  import gql from 'graphql-tag'
  import USER_JOBS from '@/graphql/UserJobs.gql'

  export default {
    apollo: {
      me: {
        query: USER_JOBS,
        fetchPolicy: 'network-only',
        prefetch: false
      }
    }
  }
</script>