<template>
    <div>

        <div class="text-center py-10" v-if="tag">
            <h1 class="text-4xl font-bold mb-2">{{tag.title}} jobs</h1>
            <p class="text-gray-600 font-medium">The best {{tag.title}} jobs in the world.</p>
        </div>

        <div class="mt-10">
            <job v-for="job in jobs" :key="job.id" :job="job" />
        </div>
    </div>
</template>

<script>
import ALL_JOBS_BY_TAG from '@/graphql/AllJobsByTag.gql'
import TAG_BY_SLUG from '@/graphql/TagBySlug.gql'
    export default{
        apollo:{
            tag: {
                variables() {
                    return{
                        slug: this.$route.params.slug
                    }
                }, 
                query: TAG_BY_SLUG
            },
            jobs:{
                variables() {
                    return{
                        slug: this.$route.params.slug
                    }
                }, 
                query: ALL_JOBS_BY_TAG
            }
        }
    }

</script>