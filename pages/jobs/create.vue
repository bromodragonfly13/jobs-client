<template>
    <div class="mt-10 flex justify-center">
        <form action="" class="w-6/12" @submit.prevent="submit">
            <div class="mb-10">
                <h2 class="mb-4 text-2xl font-bold">Listing details</h2>

                {{form}}
                
                <div class="mb-4">
                    <label for="job_title" class="inline-block mb-1 font-medium">Job title</label>
                    <input type="text" name="job_title" id="job_title" class="bg-gray-200 border-2
                    border-gray-200 rounded-lg w-full h-10 px-4" v-model="form.job_title">
                </div>

                <div class="mb-4">
                    <label for="job_location" class="inline-block mb-1 font-medium">Job location</label>
                    <input type="text" name="job_location" id="job_location" class="bg-gray-200 border-2
                    border-gray-200 rounded-lg w-full h-10 px-4" v-model="form.job_location ">
                </div>

                <div class="mb-4">
                    <label for="job_link" class="inline-block mb-1 font-medium">Job application URL</label>
                    <input type="text" name="job_link" id="job_link" class="bg-gray-200 border-2
                    border-gray-200 rounded-lg w-full h-10 px-4" v-model="form.job_link">
                </div>

                <div class="mb-4">
                    <label for="tags" class="inline-block mb-1 font-medium">Tags</label>
                    <v-select inputId="tags" label="title" :reduce="tag => tag.id" 
                        :options="tags" multiple v-model="form.tags"> </v-select>
                </div>

                <div class="mb-4">
                    <label for="company_name" class="inline-block mb-1 font-medium">Company name</label>
                    <input type="text" name="company_name" id="company_name" class="bg-gray-200 border-2
                    border-gray-200 rounded-lg w-full h-10 px-4" v-model="form.company_name">
                </div>

                <div class="mb-4">
                    <label for="company_logo" class="inline-block mb-1 font-medium">Company logo URL</label>
                    <input type="text" name="company_logo" id="company_logo" class="bg-gray-200 border-2
                    border-gray-200 rounded-lg w-full h-10 px-4" v-model="form.company_logo">
                </div>

                <div class="mb-4">
                    <input type="checkbox" name="highlighted" id="highlighted" v-model="form.highlighted">
                    <label for="highlighted">Highlighted listing</label>
                </div>

                <div class="mb-4">
                    <input type="checkbox" name="pinned" id="pinned" v-model="form.pinned">
                    <label for="pinned">Pinned</label>
                </div>
            </div>

            <dir class="mb-10">
                <h2 class="mb-4 text-2xl font-bold">Create an account to manage your listings</h2>

                <div class="bg-gray-400 p-6 rounded-lg">

                    <div class="mb-4">
                        <label for="email" class="inline-block mb-1 font-medium">Email</label>
                        <input type="email" name="email" id="email" class="bg-gray-200 border-2
                        border-gray-200 rounded-lg w-full h-10 px-4" v-model="form.user_email">
                    </div>

                    <div class="mb-4">
                        <label for="email" class="inline-block mb-1 font-medium">Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-200 border-2
                        border-gray-200 rounded-lg w-full h-10 px-4" v-model="form.user_name">
                    </div>

                    <div class="mb-4">
                        <label for="password" class="inline-block mb-1 font-medium">Password</label>
                        <input type="password" name="name" id="password" class="bg-gray-200 border-2
                        border-gray-200 rounded-lg w-full h-10 px-4" v-model="form.user_password">
                    </div>

                </div>
            </dir>



            <button type="submit" class="p-4 bg-blue-500 text-white font-medium rounded-lg">Create listing</button>

        </form>
    </div>
</template>

<script>
    import ALL_TAGS from '@/graphql/AllTags.gql'
    import CREATE_JOB_WITH_USER from '@/graphql/CreateJobWithUser.gql'
    export default{
        data() {
            return{
                form:{
                    job_title: '',
                    job_location: '',
                    job_link: '',
                    tags: [],
                    company_name: '',
                    company_logo: '',
                    highlighted: false,
                    pinned: false,
                    user_name: '',
                    user_email: '',
                    user_password: '',
                }
            }
        },

        apollo: {
            tags: {
                query: ALL_TAGS
            }
        },

        methods:{
            createListingWithUser(){
                this.$apollo.mutate({
                    mutation: CREATE_JOB_WITH_USER,
                    variables: this.form

                }).then(() => {
                    this.$axios.$get('/sanctum/csrf-cookie').then(responce => {
                        this.$auth.loginWith('local',{
                            data: {
                                email: this.form.user_email,
                                password: this.form.user_password,
                            }
                    }).then(() => {
                        this.$router.replace({ name: 'index'})
                    })
                })
            })
            },
            submit(){
                this.createListingWithUser()
            }
        }
    }
</script>
