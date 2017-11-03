<template>
<div>
    <div class="content">
        <md-list class="custom-list md-triple-line">
            <md-list-item v-for="item in trendsList" :key="item.title">
                <div class="md-list-text-container">
                    <span>{{item.title}}</span>
                    <p>{{item.desc}}</p>
                    <span>
                      <span class="repo-language-color ml-0" style="background-color:#f1e05a;"></span>{{item.lang}}
                      <span>
                        <svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
                        {{item.star}}
                      </span>
                      <span>
                        <svg aria-label="fork" class="octicon octicon-repo-forked" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="10"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
                        {{item.fork}}
                      </span>
                      <span>
                        <svg v-if="item.current.length>0" aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
                        {{item.current}}
                      </span>
                    </span>
                </div>
                <md-divider class="md-inset"></md-divider>
            </md-list-item>
        </md-list>

    </div>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import axios from 'axios';

export default {
    name: 'home',
    data() {
        return {
            trendsList: []
        }
    },
    props: [],
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
    },
    mounted() {
      let lang = 'all';
      if('lang' in this.$route.query){
        lang = this.$route.query.lang;
      }
      axios.get('http://www.cafetime.cc:3457/api/'+lang).then(res=>{
        this.trendsList = res.data
      })
    }
};
</script>

<style lang="stylus" scoped>
$text-color := rgba($material-theme.text-color, $material-theme.primary-text-percent)
.repo-language-color {
    position: relative;
    top: 1px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
}
  .md-divider.md-inset
      margin: 0 10px

    h2
        font-size 46px
        font-weight 500

    h2, h4
        color $text-color

</style>
