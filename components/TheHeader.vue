<template>
    <header class="py-6 flex items-center justify-between">
        <nuxt-link :to="{name: 'index'}" exact-active-class="text-blue-500">Jobs</nuxt-link>
        <div class="-mx-4 flex items-center flex-wrap">
            <a href="" class="mx-4" exact-active-class="text-blue-500">Post a job</a>

            <template v-if="$auth.loggedIn">
                <span class="mx-4 font-bold">{{$auth.user.name}}</span>
                <nuxt-link :to="{name: 'user-listings'}" class="mx-4" exact-active-class="text-blue-500">Manage listings</nuxt-link>
                <a href="" class="mx-4" exact-active-class="text-blue-500" @click.prevent="logout">Logout</a>
            </template>

            <template v-if="!$auth.loggedIn">
                <nuxt-link :to="{name: 'login'}" class="mx-4" exact-active-class="text-blue-500">Login</nuxt-link>
            </template>

        </div>
    </header>
</template>

<script>
    export default{
        methods: {
            async logout(){
                 await this.$auth.logout()

                 this.$router.replace({name: 'index'})
            }
        }
    }
</script>