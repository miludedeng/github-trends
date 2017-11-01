/**
 * @file app shell store
 * @author steven hu(huwei@cafetime.cc)
 */

import * as types from '../mutation-types';

let state = {

    /**
     * 是否需要页面切换动画
     *
     * @type {boolean}
     */
    needPageTransition: true,

    /**
     * 多个页面是否处于切换中
     *
     * @type {boolean}
     */
    isPageSwitching: false,

    /**
     * 多个页面切换效果名称
     *
     * @type {string}
     */
    pageTransitionName: '',

    /**
     * 上个页面 scroll 的信息
     *
     * @type {Object}
     */
    historyPageScrollTop: {}
};

let actions = {

    /**
     * 开启页面切换动画
     *
     * @param {Function} commit commit
     */
    enablePageTransition({
        commit
    }) {
        commit(types.ENABLE_PAGE_TRANSITION, true);
    },

    /**
     * 关闭页面切换动画
     *
     * @param {Function} commit commit
     */
    disablePageTransition({
        commit
    }) {
        commit(types.DISABLE_PAGE_TRANSITION, false);
    },

    /**
     * 设置页面是否处于切换中
     *
     * @param {Function} commit commit
     * @param {boolean} isPageSwitching isPageSwitching
     */
    setPageSwitching({
        commit
    }, isPageSwitching) {
        commit(types.SET_PAGE_SWITCHING, isPageSwitching);
    },

    /**
     * 保存页面 scroll 高度
     *
     * @param {[type]} options.commit [description]
     * @param {string} options.path path
     * @param {number} options.scrollTop scrollTop
     */
    saveScrollTop({
        commit
    }, {
        path,
        scrollTop
    }) {
        commit(types.SAVE_SCROLLTOP, {
            path,
            scrollTop
        });
    }
};

let mutations = {
    [types.SET_PAGE_SWITCHING](state, isPageSwitching) {
        state.isPageSwitching = isPageSwitching;
    },
    [types.SET_PAGE_TRANSITION_NAME](state, {
        pageTransitionName
    }) {
        state.pageTransitionName = pageTransitionName;
    },
    [types.SAVE_SCROLLTOP](state, {
        path,
        scrollTop
    }) {
        state.historyPageScrollTop[path] = scrollTop;
    }
};

export default {


    namespaced: true,
    /* eslint-disable */
    actions,
    mutations,
    state,
    /* eslint-enable */
    modules: {
        /**
         * 顶部导航栏的数据
         *
         * @type {Object}
         */
        appHeader: {
            namespaced: true,
            state: {

                /**
                 * 是否展示顶部导航栏
                 *
                 * @type {boolean}
                 */
                show: true,

                /**
                 * 标题内容
                 *
                 * @type {string}
                 */
                title: 'Github Trending',

                /**
                 * logo图标名称
                 *
                 * @type {string}
                 */
                logoIcon: '',

                /**
                 * 是否展示左侧菜单图标
                 *
                 * @type {boolean}
                 */
                showMenu: true,

                /**
                 * 是否展示左侧返回图标
                 *
                 * @type {boolean}
                 */
                showBack: false,

                /**
                 * 是否展示左侧logo
                 *
                 * @type {boolean}
                 */
                showLogo: true,

                /**
                 * 右侧操作按钮数组
                 *
                 * @type {Array}
                 */
                actions: []
            },
            actions: {

                /**
                 * 设置顶部导航条
                 *
                 * @param {Function} commit commit
                 * @param {Object} appHeader appHeader
                 */
                setAppHeader({
                    commit
                }, appHeader) {
                    commit(types.SET_APP_HEADER, appHeader);
                }
            },
            mutations: {
                [types.SET_APP_HEADER](state, appHeader) {
                    state = Object.assign(state, appHeader);
                }
            }
        },

        /**
         * 左侧侧边栏的数据
         *
         * @type {Object}
         */
        appSidebar: {
            namespaced: true,
            state: {
                show: false, // 是否显示sidebar

                // 头部条的相关配置
                title: {
                    imageLeft: '',
                    altLeft: '',
                    svgLeft: '',
                    iconLeft: 'code',
                    text: 'Language',
                    imageRight: '',
                    altRight: '',
                    svgRight: '',
                    iconRight: ''
                },

                // 分块组
                dataList: {
                    // 子列表1
                    selectedList: ['All Language', 'Java', 'Go'],
                    allList: ["1C Enterprise", "ABAP", "ABNF", "ActionScript", "Ada", "Adobe Font Metrics", "Agda", "AGS Script", "Alloy", "Alpine Abuild", "AMPL", "AngelScript", "Ant Build System", "ANTLR", "ApacheConf", "Apex", "API Blueprint", "APL", "Apollo Guidance Computer", "AppleScript", "Arc", "Arduino", "AsciiDoc", "ASN.1", "ASP", "AspectJ", "Assembly", "ATS", "Augeas", "AutoHotkey", "AutoIt", "Awk", "Ballerina", "Batchfile", "Befunge", "Bison", "BitBake", "Blade", "BlitzBasic", "BlitzMax", "Bluespec", "Boo", "Brainfuck", "Brightscript", "Bro", "C", "C#", "C++", "C-ObjDump", "C2hs Haskell", "Cap'n Proto", "CartoCSS", "Ceylon", "Chapel", "Charity", "ChucK", "Cirru", "Clarion", "Clean", "Click", "CLIPS", "Clojure", "Closure Templates", "CMake", "COBOL", "CoffeeScript", "ColdFusion", "ColdFusion CFC", "COLLADA", "Common Lisp", "Component Pascal", "Cool", "Coq", "Cpp-ObjDump", "Creole", "Crystal", "CSON", "Csound", "Csound Document", "Csound Score", "CSS", "CSV", "Cuda", "CWeb", "Cycript", "Cython", "D", "D-ObjDump", "Darcs Patch", "Dart", "DataWeave", "desktop", "Diff", "DIGITAL Command Language", "DM", "DNS Zone", "Dockerfile", "Dogescript", "DTrace", "Dylan", "E", "Eagle", "Easybuild", "EBNF", "eC", "Ecere Projects", "ECL", "ECLiPSe", "edn", "Eiffel", "EJS", "Elixir", "Elm", "Emacs Lisp", "EmberScript", "EQ", "Erlang", "F#", "Factor", "Fancy", "Fantom", "Filebench WML", "Filterscript", "fish", "FLUX", "Formatted", "Forth", "Fortran", "FreeMarker", "Frege", "G-code", "Game Maker Language", "GAMS", "GAP", "GCC Machine Description", "GDB", "GDScript", "Genie", "Genshi", "Gentoo Ebuild", "Gentoo Eclass", "Gerber Image", "Gettext Catalog", "Gherkin", "GLSL", "Glyph", "GN", "Gnuplot", "Go", "Golo", "Gosu", "Grace", "Gradle", "Grammatical Framework", "Graph Modeling Language", "GraphQL", "Graphviz (DOT)", "Groovy", "Groovy Server Pages", "Hack", "Haml", "Handlebars", "Harbour", "Haskell", "Haxe", "HCL", "HLSL", "HTML", "HTML+Django", "HTML+ECR", "HTML+EEX", "HTML+ERB", "HTML+PHP", "HTTP", "Hy", "HyPhy", "IDL", "Idris", "IGOR Pro", "Inform 7", "INI", "Inno Setup", "Io", "Ioke", "IRC log", "Isabelle", "Isabelle ROOT", "J", "Jasmin", "Java", "Java Server Pages", "JavaScript", "JFlex", "Jison", "Jison Lex", "Jolie", "JSON", "JSON5", "JSONiq", "JSONLD", "JSX", "Julia", "Jupyter Notebook", "KiCad Layout", "KiCad Legacy Layout", "KiCad Schematic", "Kit", "Kotlin", "KRL", "LabVIEW", "Lasso", "Latte", "Lean", "Less", "Lex", "LFE", "LilyPond", "Limbo", "Linker Script", "Linux Kernel Module", "Liquid", "Literate Agda", "Literate CoffeeScript", "Literate Haskell", "LiveScript", "LLVM", "Logos", "Logtalk", "LOLCODE", "LookML", "LoomScript", "LSL", "Lua", "M", "M4", "M4Sugar", "Makefile", "Mako", "Markdown", "Marko", "Mask", "Mathematica", "Matlab", "Maven POM", "Max", "MAXScript", "MediaWiki", "Mercury", "Meson", "Metal", "MiniD", "Mirah", "Modelica", "Modula-2", "Module Management System", "Monkey", "Moocode", "MoonScript", "MQL4", "MQL5", "MTML", "MUF", "mupad", "Myghty", "NCL", "Nearley", "Nemerle", "nesC", "NetLinx", "NetLinx+ERB", "NetLogo", "NewLisp", "Nginx", "Nim", "Ninja", "Nit", "Nix", "NL", "NSIS", "Nu", "NumPy", "ObjDump", "Objective-C", "Objective-C++", "Objective-J", "OCaml", "Omgrofl", "ooc", "Opa", "Opal", "OpenCL", "OpenEdge ABL", "OpenRC runscript", "OpenSCAD", "OpenType Feature File", "Org", "Ox", "Oxygene", "Oz", "P4", "Pan", "Papyrus", "Parrot", "Parrot Assembly", "Parrot Internal Representation", "Pascal", "PAWN", "Pep8", "Perl", "Perl 6", "PHP", "Pic", "Pickle", "PicoLisp", "PigLatin", "Pike", "PLpgSQL", "PLSQL", "Pod", "PogoScript", "Pony", "PostScript", "POV-Ray SDL", "PowerBuilder", "PowerShell", "Processing", "Prolog", "Propeller Spin", "Protocol Buffer", "Public Key", "Pug", "Puppet", "Pure Data", "PureBasic", "PureScript", "Python", "Python console", "Python traceback", "QMake", "QML", "R", "Racket", "Ragel", "RAML", "Rascal", "Raw token data", "RDoc", "REALbasic", "Reason", "Rebol", "Red", "Redcode", "Regular Expression", "Ren'Py", "RenderScript", "reStructuredText", "REXX", "RHTML", "Ring", "RMarkdown", "RobotFramework", "Roff", "Rouge", "RPM Spec", "Ruby", "RUNOFF", "Rust", "Sage", "SaltStack", "SAS", "Sass", "Scala", "Scaml", "Scheme", "Scilab", "SCSS", "Self", "ShaderLab", "Shell", "ShellSession", "Shen", "Slash", "Slim", "Smali", "Smalltalk", "Smarty", "SMT", "SourcePawn", "SPARQL", "Spline Font Database", "SQF", "SQL", "SQLPL", "Squirrel", "SRecode Template", "Stan", "Standard ML", "Stata", "STON", "Stylus", "Sublime Text Config", "SubRip Text", "SuperCollider", "SVG", "Swift", "SystemVerilog", "Tcl", "Tcsh", "Tea", "Terra", "TeX", "Text", "Textile", "Thrift", "TI Program", "TLA", "TOML", "Turing", "Turtle", "Twig", "TXL", "Type Language", "TypeScript", "Unified Parallel C", "Unity3D Asset", "Unix Assembly", "Uno", "UnrealScript", "UrWeb", "Vala", "VCL", "Verilog", "VHDL", "Vim script", "Visual Basic", "Volt", "Vue", "Wavefront Material", "Wavefront Object", "wdl", "Web Ontology Language", "WebAssembly", "WebIDL", "wisp", "World of Warcraft Addon Data", "X10", "xBase", "XC", "XCompose", "XML", "Xojo", "XPages", "XPM", "XProc", "XQuery", "XS", "XSLT", "Xtend", "Yacc", "YAML", "YANG", "Zephir", "Zimpl"]
                }
            },
            actions: {

                /**
                 * 展示侧边栏
                 *
                 * @param {Function} commit commit
                 */
                showSidebar({
                    commit
                }) {
                    commit(types.SET_SIDEBAR_VISIBILITY, true);
                },

                /**
                 * 隐藏侧边栏
                 *
                 * @param {Function} commit commit
                 */
                hideSidebar({
                    commit
                }) {
                    commit(types.SET_SIDEBAR_VISIBILITY, false);
                }
            },
            mutations: {
                [types.SET_SIDEBAR_VISIBILITY](state, sidebarVisibility) {
                    state.show = sidebarVisibility;
                }
            }
        },

        /**
         * app shell 底部导航栏的数据
         *
         * @type {Object}
         */
        appBottomNavigator: {
            namespaced: true,
            state: {

                /**
                 * 是否展示底部导航栏
                 *
                 * @type {boolean}
                 */
                show: true,

                /**
                 * 导航按钮列表
                 *
                 * @type {Array.<Object>}
                 */
                navs: [{
                        // 按钮的名字
                        name: 'home',

                        // 显示的 icon
                        icon: 'home',

                        // 显示的文字
                        text: '主页',

                        // 是否是当前激活的
                        active: true,

                        // 路由
                        route: {
                            name: 'home',
                            path: '/'
                        }
                    },
                    {
                        // 按钮的名字
                        name: 'user',

                        // 显示的 icon
                        icon: 'person',

                        // 显示的文字
                        text: '个人中心',

                        // 路由信息
                        route: '/user'
                    }
                ]
            },
            actions: {

                /**
                 * 隐藏底部导航
                 *
                 * @param {Function} commit commit
                 */
                hideBottomNav({
                    commit
                }) {
                    commit(types.SET_APP_BOTTOM_NAV, {
                        show: false
                    });
                },

                /**
                 * 显示底部导航
                 *
                 * @param {Function} commit commit
                 */
                showBottomNav({
                    commit
                }) {
                    commit(types.SET_APP_BOTTOM_NAV, {
                        show: true
                    });
                },

                /**
                 * 激活底部导航
                 *
                 * @param {Function} commit commit
                 * @param {string} name name
                 */
                activateBottomNav({
                    commit
                }, name) {
                    commit(types.ACTIVATE_APP_BOTTOM_NAV, name);
                }
            },
            mutations: {
                [types.ACTIVATE_APP_BOTTOM_NAV](state, name) {
                    state.navs = state.navs.map(nav => {
                        nav.active = nav.name === name;
                        return nav;
                    });
                },
                [types.SET_APP_BOTTOM_NAV](state, appBottomNavigator) {
                    state = Object.assign(state, appBottomNavigator);
                }
            }
        }
    }
};
