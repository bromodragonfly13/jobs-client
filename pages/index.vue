<template>
  <div>

    <div class="text-center py-10">
      <h1 class="text-4xl font-bold mb-2">Find the best jobs in the world.</h1>
      <p class="text-gray-600 font-medium">We're the best job board in the entire world.</p>
    </div>

    <div class="mt-10">
      {{jobs}}
    </div>

  </div>
</template>


<script>
  import gql from 'graphql-tag'

  export default {
    apollo: {
      jobs: {
        query: gql`
            {
              jobs(
                orderBy: [{column: CREATED_AT, order: DESC}]
              ){
                id,
                job_title,
                job_location,
                company_name
              }
            }
        `,
        fetchPolicy: 'network-only'
      }
    }
  }
</script>