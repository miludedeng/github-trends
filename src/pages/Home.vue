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
                        <svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
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

export default {
    name: 'home',
    data() {
        return {
            trendsList: []
        }
    },
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
    },
    mounted() {
        this.trendsList = [{
                "title": "yangshun / tech-interview-handbook",
                "desc": "💯 Algorithms, front end and behavioral content for rocking your coding interview",
                "lang": "JavaScript",
                "star": "14,512",
                "fork": "1,320",
                "current": "8,470 stars this month"
            },
            {
                "title": "alvarcarto / url-to-pdf-api",
                "desc": "Web page PDF rendering done right. Self-hosted service for rendering receipts, invoices, or any content.",
                "lang": "JavaScript",
                "star": "4,739",
                "fork": "283",
                "current": "4,735 stars this month"
            },
            {
                "title": "vuejs / vue",
                "desc": "A progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
                "lang": "JavaScript",
                "star": "72,470",
                "fork": "10,568",
                "current": "3,816 stars this month"
            },
            {
                "title": "Shopify / draggable",
                "desc": "The JavaScript Drag & Drop library your grandparents warned you about.",
                "lang": "JavaScript",
                "star": "8,955",
                "fork": "302",
                "current": "4,047 stars this month"
            },
            {
                "title": "frappe / charts",
                "desc": "Simple, responsive, modern SVG Charts with zero dependencies",
                "lang": "JavaScript",
                "star": "3,676",
                "fork": "84",
                "current": "3,622 stars this month"
            },
            {
                "title": "facebook / react",
                "desc": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
                "lang": "JavaScript",
                "star": "80,049",
                "fork": "15,167",
                "current": "3,075 stars this month"
            },
            {
                "title": "GoogleChrome / puppeteer",
                "desc": "Headless Chrome Node API",
                "lang": "JavaScript",
                "star": "18,114",
                "fork": "841",
                "current": "3,232 stars this month"
            },
            {
                "title": "googlecreativelab / teachable-machine",
                "desc": "Explore how machine learning works, live in the browser. No coding required.",
                "lang": "JavaScript",
                "star": "2,588",
                "fork": "237",
                "current": "2,588 stars this month"
            },
            {
                "title": "SparkPost / heml",
                "desc": "HEML is an open source markup language for building responsive email.",
                "lang": "JavaScript",
                "star": "2,592",
                "fork": "63",
                "current": "2,557 stars this month"
            },
            {
                "title": "ryanburgess / engineer-manager",
                "desc": "A list of engineering manager resource links.",
                "lang": "JavaScript",
                "star": "2,579",
                "fork": "121",
                "current": "2,455 stars this month"
            },
            {
                "title": "nodejs / node",
                "desc": "Node.js JavaScript runtime ✨🐢🚀✨",
                "lang": "JavaScript",
                "star": "41,658",
                "fork": "8,607",
                "current": "2,040 stars this month"
            },
            {
                "title": "nozzle / react-static",
                "desc": "⚛️ 🚀 A progressive static-site framework for React.",
                "lang": "JavaScript",
                "star": "2,338",
                "fork": "61",
                "current": "2,328 stars this month"
            },
            {
                "title": "google / bottery",
                "desc": "",
                "lang": "JavaScript",
                "star": "2,327",
                "fork": "87",
                "current": "2,309 stars this month"
            },
            {
                "title": "fastify / fastify",
                "desc": "Fast and low overhead web framework, for Node.js",
                "lang": "JavaScript",
                "star": "4,919",
                "fork": "208",
                "current": "2,285 stars this month"
            },
            {
                "title": "facebookincubator / create-react-app",
                "desc": "Create React apps with no build configuration.",
                "lang": "JavaScript",
                "star": "36,980",
                "fork": "6,475",
                "current": "1,910 stars this month"
            },
            {
                "title": "freeCodeCamp / guides",
                "desc": "A collection of easy-to-understand guides to programming tools",
                "lang": "JavaScript",
                "star": "1,086",
                "fork": "3,058",
                "current": "825 stars this month"
            },
            {
                "title": "ant-design / ant-design-pro",
                "desc": "👨🏻‍💻👩🏻‍💻 An out-of-box UI solution for enterprise applications",
                "lang": "JavaScript",
                "star": "2,127",
                "fork": "167",
                "current": "2,112 stars this month"
            },
            {
                "title": "axios / axios",
                "desc": "Promise based HTTP client for the browser and node.js",
                "lang": "JavaScript",
                "star": "29,666",
                "fork": "1,985",
                "current": "1,880 stars this month"
            },
            {
                "title": "justjavac / free-programming-books-zh_CN",
                "desc": "📚 免费的计算机编程类中文书籍，欢迎投稿",
                "lang": "JavaScript",
                "star": "23,808",
                "fork": "9,148",
                "current": "1,616 stars this month"
            },
            {
                "title": "airbnb / javascript",
                "desc": "JavaScript Style Guide",
                "lang": "JavaScript",
                "star": "60,398",
                "fork": "11,689",
                "current": "1,623 stars this month"
            },
            {
                "title": "smooth-code / svgr",
                "desc": "Transform SVG into React components 🦁",
                "lang": "JavaScript",
                "star": "1,687",
                "fork": "29",
                "current": "1,653 stars this month"
            },
            {
                "title": "github / accessibilityjs",
                "desc": "Client side accessibility error scanner.",
                "lang": "JavaScript",
                "star": "1,616",
                "fork": "34",
                "current": "1,614 stars this month"
            },
            {
                "title": "facebook / react-native",
                "desc": "A framework for building native apps with React.",
                "lang": "JavaScript",
                "star": "55,327",
                "fork": "12,906",
                "current": "1,410 stars this month"
            },
            {
                "title": "trazyn / ieaseMusic",
                "desc": "这应该是最好的网易云音乐播放器了，没有之一，如果有请打醒 🤘",
                "lang": "JavaScript",
                "star": "2,814",
                "fork": "274",
                "current": "1,456 stars this month"
            },
            {
                "title": "webpackmonitor / webpackmonitor",
                "desc": "A tool for monitoring webpack optimization metrics through the development process",
                "lang": "JavaScript",
                "star": "1,452",
                "fork": "36",
                "current": "1,450 stars this month"
            }
        ]
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
