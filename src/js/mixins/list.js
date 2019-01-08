/**
 *  描述：混合类
 */

export default {
    data () {
        return {
            loadingText: '加载中',
            list: [],                                           // 列表展示
            searchData: {                                       // 搜索条件
                page: this.$store.state.page,              // 当前页码
                limit: this.$store.state.limit            // 分页大小
            },
            totalElement: this.$store.state.totalElement        // 总数量
        };
    },
    computed: {
        // 分页是否展示
        pageShow () {
            return !!this.totalElement;
        }
    },
    created () {
        this.currentChange(1);
    },
    methods: {
        currentChange (val) {
            this.loading = true;
            this.searchData.page = val;
            // 获取列表
            this._getList();
        },
        search () {
            this.currentChange(1);
        }
    }
};
