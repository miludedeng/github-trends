<template>
<transition name="slide-down">
    <header class="app-header-wrapper" v-show="show">
        <div class="app-header-left">
            <v-btn icon dark v-if="showMenu" @click.native="handleClick('menu')">
                <v-icon class="app-header-icon">menu</v-icon>
            </v-btn>
            <v-btn icon dark v-if="showBack" @click.native="handleClick('back')">
                <v-icon class="app-header-icon">arrow_back</v-icon>
            </v-btn>
            <div v-if="showLogo" @click="handleClick('logo')">
                <slot name="logo">
                    <icon v-if="logoIcon" :name="logoIcon" class="app-header-icon"></icon>
                </slot>
            </div>
        </div>
        <div class="app-header-middle" v-cloak>
            <slot name="title">
                {{ title }}
            </slot>
        </div>
        <div v-if="showLogo" class="app-header-right">
            <md-select name="since" id="since" v-model="since" @change="changeSince">
                <md-option value="">today</md-option>
                <md-option value="weekly">this week</md-option>
                <md-option value="monthly">this month</md-option>
            </md-select>
        </div>
        <div v-if="showBack" class="app-header-right">
            <a :href="'https://github.com/'+title.replace(/ /g, '')" target="_blank" style="color:#ccc; text-decoration:none">Open with Browser</a>
        </div>
    </header>
</transition>
</template>

<script>
import {
    mapState
} from 'vuex';
import EventBus from '@/event-bus';

export default {
    name: 'appHeader',
    data() {
        return {
            since: '',
        }
    },
    computed: {
        ...mapState('appShell/appHeader', [
            'show',
            'showMenu',
            'showBack',
            'showLogo',
            'logoIcon',
            'title',
            'actions'
        ]),
        ...mapState('appShell', [
            'isPageSwitching'
        ])
    },
    methods: {
        changeSince() {
            this.$emit('transSince', this.since);
        },
        handleClick(source, {
            actionIdx,
            route
        } = {}) {

            // 页面正在切换中，不允许操作，防止滑动效果进行中切换
            if (this.isPageSwitching) {
                return;
            }
            let eventData = {};

            // 点击右侧动作按钮，事件对象中附加序号
            if (source === 'action') {
                eventData.actionIdx = actionIdx;
            }

            // 发送给父组件，内部处理
            this.$emit(`click-${source}`, eventData);

            // 发送全局事件，便于非父子关系的路由组件监听
            EventBus.$emit(`app-header:click-${source}`, eventData);

            // 如果传递了路由对象，进入路由
            if (route) {
                this.$router.push(route);
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.md-theme-default.md-select:after{
  color: #ccc
}
.md-select{
  min-width: 80px
}
.app-header-wrapper
    display flex
    justify-content space-between
    align-items center
    height $app-header-height
    background: #24292f
    color #ccc
    padding 0
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)
    transition transform 0.3s ease-out

    &.slide-down-enter,
    &.slide-down-leave-to
        transform translate(0, -100%)

    & > div
        display flex
        align-items center

    .app-header-middle
        flex 1
        font-size 1.2em

    // 改变 icon 大小
    .app-header-icon
        color #ccc
        width 20px
        height 20px

</style>
