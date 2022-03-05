<template>
    <div class="mt-10 flex justify-center">
        <form action="" class="w-6/12" v-if="me" @submit.prevent="submit">
            <div class="mb-10">
                <h2 class="mb-4 text-2xl font-bold">Listing details</h2>

                <div class="mb-4">
                    <label for="job_title" class="inline-block mb-1 font-medium">Job title</label>
                    <input type="text" name="job_title" id="job_title" class="bg-gray-200 border-2
                    border-gray-200 rounded-lg w-full h-10 px-4" :class="{'border-red-500': errors['input.job_title']}" v-model="me.jobs[0].job_title">

                    <div class="text-sm text-red-500 mt-1" v-if="errors['input.job_title']">
                        {{errors['input.job_title'][0]}}
                    </div>
                </div>

                <div class="mb-4">
                    <label for="job_location" class="inline-block mb-1 font-medium">Job location</label>
                    <input type="text" name="job_location" id="job_location" class="bg-gray-200 border-2
                    border-gray-200 rounded-lg w-full h-10 px-4" :class="{'border-red-500': errors['input.job_location']}" v-model="me.jobs[0].job_location ">

                    <div class="text-sm text-red-500 mt-1" v-if="errors['input.job_location']">
                        {{errors['input.job_location'][0]}}
                    </div>
                </div>

                <div class="mb-4">
                    <label for="job_link" class="inline-block mb-1 font-medium">Job application URL</label>
                    <input type="text" name="job_link" id="job_link" class="bg-gray-200 border-2
                    border-gray-200 rounded-lg w-full h-10 px-4" :class="{'border-red-500': errors['input.job_link']}" v-model="me.jobs[0].job_link">

                    <div class="text-sm text-red-500 mt-1" v-if="errors['input.job_link']">
                        {{errors['input.job_link'][0]}}
                    </div>
                </div>

                <div class="mb-4">

                    <label for="tags" class="inline-block mb-1 font-medium">Tags</label>
                    <v-select inputId="tags" label="title"
                        :options="tags" multiple class="border-2 border-gray-200 rounded-lg" :class="{'border-red-500': errors['input.tags.sync']}" v-model="me.jobs[0].tags"> </v-select>

                    <div class="text-sm text-red-500 mt-1" v-if="errors['input.tags.sync']">
                            {{errors['input.tags.sync'][0]}}
                    </div>
                </div>

                <div class="mb-4">
                    <label for="company_name" class="inline-block mb-1 font-medium">Company name</label>
                    <input type="text" name="company_name" id="company_name" class="bg-gray-200 border-2
                    border-gray-200 rounded-lg w-full h-10 px-4" :class="{'border-red-500': errors['input.company_name']}" v-model="me.jobs[0].company_name">

                    <div class="text-sm text-red-500 mt-1" v-if="errors['input.company_name']">
                        {{errors['input.company_name'][0]}}
                    </div>
                </div>

                <div class="mb-4">
                    <label for="company_logo" class="inline-block mb-1 font-medium">Company logo URL</label>
                    <input type="text" name="company_logo" id="company_logo" class="bg-gray-200 border-2
                    border-gray-200 rounded-lg w-full h-10 px-4" :class="{'border-red-500': errors['input.company_logo']}" v-model="me.jobs[0].company_logo">

                    <div class="text-sm text-red-500 mt-1" v-if="errors['input.company_logo']">
                        {{errors['input.company_logo'][0]}}
                    </div>
                </div>

                <div class="mb-4">
                    <input type="checkbox" name="highlighted" id="highlighted" v-model="me.jobs[0].highlighted">
                    <label for="highlighted">Highlighted listing</label>
                </div>

                <div class="mb-4">
                    <input type="checkbox" name="pinned" id="pinned" v-model="me.jobs[0].pinned">
                    <label for="pinned">Pinned</label>
                </div> 

            </div> 
            <button type="submit" class="p-4 bg-blue-500 text-white font-medium rounded-lg">Edit listing</button>

        </form>
    </div>
</template>

<script>
    import USER_JOB_BY_ID from '@/graphql/UserJobById.gql'
    import ALL_TAGS from '@/graphql/AllTags.gql'
    import UPDATE_JOB from '@/graphql/UpdateJob.gql'
    export default {
        data(){
            return {
                errors: {

                }
            }
        },
        computed: {
            tagsIds(){
                return this.me.jobs[0].tags.map(t => t.id)
            }
        },
        apollo: {
            me: {
                prefetch: false,
                query: USER_JOB_BY_ID,
                variables(){
                    return {
                        id: this.$route.params.id
                    }
                }
            },
            tags: {
                query: ALL_TAGS
            }
        },
        methods: {
            submit(){
                this.$apollo.mutate({
                    mutation: UPDATE_JOB,
                    variables: {...this.me.jobs[0], tags: this.tagsIds}
                }).then(() =>{
                    this.$router.replace({name: 'user-listings'})
                }).catch(e =>{
                    this.errors = e.graphQLErrors[0].extensions.validation

                })
            }
        }
    }
</script>