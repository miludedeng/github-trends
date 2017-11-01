<template>
    <div>
        <div class="content">
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'home',
    props: {},
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav',
            'activateBottomNav'
        ])
    },
    async asyncData() {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 500);
        });
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: 'Github Trending',
            showMenu: true,
            showBack: false,
            showLogo: true,
        });

        this.activateBottomNav('home');
        this.showBottomNav();
    }
};
</script>

<style lang="stylus" scoped>
$text-color := rgba($material-theme.text-color, $material-theme.primary-text-percent)

.content
    width 100%
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)

    h2
        font-size 46px
        font-weight 500

    h2, h4
        color $text-color

</style>
