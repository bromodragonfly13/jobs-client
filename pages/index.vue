<template>
  <div>

    <div class="text-center py-10">
      <h1 class="text-4xl font-bold mb-2">Find the best jobs in the world.</h1>
      <p class="text-gray-600 font-medium">We're the best job board in the entire world.</p>
    </div>

    <div class="mt-10">
      <job v-for="job in jobs" :key="job.id" :job="job" />
    </div>

  </div>
</template>


<script>
  import gql from 'graphql-tag'
  import ALL_JOBS from '@/graphql/AllJobs.gql'

  export default {
    apollo: {
      jobs: {
        query: ALL_JOBS,
        fetchPolicy: 'network-only'
      }
    }
  }
</script>