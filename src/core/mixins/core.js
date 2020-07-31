export const  Core= {
    data() {
        return {
            routeName: ""
        }
    },
    mounted() {
        this.routeName = this.$route.meta.label;
    }
}