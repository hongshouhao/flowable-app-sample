import Server from "../utils/server";
import { GridToTable } from "../js/GridToTable";

export const  Table= {
    data() {
        return {
            loading: false,
            columns: [],
            data: [],
            total: 0,
            page: {
                page: 1,
                pageSize: 20
            },
            params: {}
        }
    },
    methods: {
        _initColumns({gridName, columns = [], render}) {
            return new Promise(resolve => {
                let server = new Server({
                    url: App.SERVICES.grid.cols + gridName
                });
                server.get().then(rsp => {
                    let _columns = GridToTable.render(rsp.data, render);
                    this.columns = _columns.concat(columns);
                    resolve(true);
                });
            });
        },
        _initData(gridName) {
            this.loading = true;
            let form = Object.assign(this.params, this.page);
            let server = new Server({
                url: App.SERVICES.grid.data + gridName || this.gridName,
                params: form
            });
            server.get().then(rsp => {
                this.data = rsp.data.rows;
                this.total = rsp.data.total;
                this.loading = false;
            });
        },
        _onPageChange(cur) {
            this.page.page = cur;
            this._initData(this.gridName);
        },
        _onPageSizeChange(pageSize) {
            this.page.pageSize = pageSize;
            this._initData(this.gridName);
        }
    }
};