<template>
<sidebar v-model="sidebarStatus" :enable="enableSidebar">
    <!-- sidebar 内容部分 -->
    <div class="app-sidebar-content">
        <!-- 头部 -->
        <div v-if="title" class="app-sidebar-title" @click.stop="closeAndGo('/')">
            <span class="app-sidebar-title-left-icon">
                    <img v-if="title.imageLeft" :src="title.imageLeft" :alt="title.altLeft"></img>
                    <icon v-else-if="title.svgLeft" :name="title.svgLeft"></icon>
                    <v-icon dark v-else-if="title.iconLeft">{{ title.iconLeft }}</v-icon>
                </span>
            <span>{{ title.text }}</span>
            <slot name="logo" class="app-sidebar-title-right-logo">
                <span class="app-sidebar-title-right-logo">
                        <img v-if="title.imageRight" :src="title.imageRight" :alt="title.altRight"></img>
                        <icon v-else-if="title.svgRight" :name="title.svgRight"></icon>
                        <v-icon v-else-if="title.iconRight">{{ title.iconRight }}</v-icon>
                    </span>
            </slot>
        </div>
        <!-- 导航列表分区块 -->
        <div class="app-sidebar-blocks">
            <ul>
                <li class="app-sidebar-block">
                    <ul class="lang-list">
                        <li v-for="item in selectedLang" :key="item">
                            <span class="app-sidebar-block-text" @click.stop="closeAndGo(item)">{{ item }}</span>
                            <md-button v-if="'All Language'!=item" v-show="!editVisible" class="md-accent app-sidebar-block-cancel" @click="delSelectedLang(item)">del</md-button>
                        </li>
                    </ul>
                    <div v-show="editVisible" style="margin-top: 10px;margin-left:10px">
                        <md-button class="md-raised" @click="editVisible=false">Edit</md-button>
                    </div>
                    <div v-show="!editVisible" style="margin-top: 10px;margin-left:10px">
                        <md-button class="md-raised" @click="editVisible=true">Cancel</md-button>
                    </div>
                    <ul v-show="!editVisible">
                        <li v-for="item in filteredLangList" :key="item" @click="addSelectedLang(item)" class="app-sidebar-all-list">
                            <span v-if="item">{{ item }}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</sidebar>
</template>

<script>
import {
    mapState
} from 'vuex';
import Sidebar from './Sidebar';

export default {
    data() {
        return {
            editVisible: true,
            selectedLang: [],
        }
    },
    components: {
        Sidebar
    },
    computed: {
        ...mapState('appShell/appSidebar', [
            'show',
            'title',
            'user',
            'dataList'
        ]),
        filteredLangList: {
            get() {
                var temp = []
                outer: for (let item of this.dataList.allList) {
                    for (let selected of this.selectedLang) {
                        if (item === selected) {
                            continue outer
                        }
                    }
                    temp.push(item)
                }
                return temp
            },
            set(val) {
                this.filteredLangList = val
            }
        },
        sidebarStatus: {
            get() {
                return this.show;
            },
            set(val) {
                if (val) {
                    this.$emit('show-sidebar');
                } else {
                    this.$emit('hide-sidebar');
                }
            }
        },
        enableSidebar() {
            return this.$store.state.appShell.appHeader.show &&
                this.$store.state.appShell.appHeader.showMenu;
        }
    },
    methods: {
        close() {
            this.sidebarStatus = false;
        },
        addSelectedLang(item) {
            this.selectedLang = [...this.selectedLang, item]
            localStorage.setItem('selectLang', this.selectedLang)
        },
        delSelectedLang(item) {
            let temp = []
            for (let selected of this.selectedLang) {
                if (item === selected) {
                    continue
                }
                temp.push(selected)
            }
            this.selectedLang = temp
            localStorage.setItem('selectLang', this.selectedLang)
        },
        closeAndGo(lang) {
            this.$emit('transLang', lang);
            this.close();
        }
    },
    mounted() {
        let selected = localStorage.getItem('selectLang');
        if (!selected) {
            selected = ['All Language']
        } else {
            selected = selected.split(',')
        }
        console.log(selected)
        this.selectedLang = selected
    }
};
</script>
<style lang="stylus" scoped>
.search-key {
  margin: 0 10px;
  margin-top: 10px;
  width: 90%;
}
.app-sidebar-all-list{
  float: left;
  cursor: pointer;
}
.lang-list li {
  border-bottom: 1px #e1e4e8 solid !important;
}
.app-sidebar-all-list {
  display: inline !important;
}
.app-sidebar-block-cancel {
  float: right;
}
.app-sidebar-block-text{
  cursor: pointer;
  min-width: 150px;
}
// 左侧触发滑动宽度
$swipe-width = 20px

ul,li
    padding 0
    margin 0
    list-style none
a
    text-decoration none
    color #333

.app-sidebar-content
    &.app-sidebar-content-right
        box-shadow -3px 0 8px 1px rgba(0, 0, 0, 0.4)

        &.app-sidebar-title,
        &.app-sidebar-blocks
            text-align right

    .app-sidebar-title-left-icon,
    .app-sidebar-block-left-icon
        display inline-block
        width ($app-sidebar-left-icon-size + 10)px
        height 100%

        img
            vertical-align middle
            width ($app-sidebar-left-icon-size)px
            height ($app-sidebar-left-icon-size)px
        svg
            position relative
            left 0
            top 0
            transform none
            vertical-align middle
            height ($app-sidebar-left-icon-size)px
            width ($app-sidebar-left-icon-size)px

        .material-icons
            font-size ($app-sidebar-left-icon-size)px

    .app-sidebar-block-text
        display inline-block
        height 100%
        vertical-align middle

    .app-sidebar-title-right-logo,
    .app-sidebar-block-right-logo
        float right

        img
            width 20px
            height 20px
            margin-right 10px


    .app-sidebar-title
        color #fff
        padding 0 10px
        font-size 16px
        font-weight bold
        height $app-sidebar-title-height
        line-height $app-sidebar-title-height
        background: #24292f
        text-align left

    .app-sidebar-user
        padding 0 10px
        font-size 16px
        .user-avatar
            margin 30px auto 0 auto
            height 100px
            width 100px
            i
                font-size 100px
                color #666
        .user-info
            padding 20px 0
            text-align center
            border-bottom 1px solid #e0e0e0
            >div
                margin 5px 0
                i
                    font-size 18px
                    margin-right 5px

    .app-sidebar-blocks
        text-align left

        .app-sidebar-block
            padding 10px 0
            border-bottom 1px solid #e0e0e0
            color #333

            .sub-list-title
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height
                text-indent ($app-sidebar-left-icon-size)px
                font-weight bold
                color #888

            li
                padding-left 15px
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height


                &:last-child
                    border none

            &:last-child
                border-bottom none
</style>
