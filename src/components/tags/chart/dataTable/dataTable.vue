<!--
* DataTable
* @author tangxiaomi <81195314@qq.com>
* @date 2023-05-06 09:03:07
* @since 0.0.0
-->

<template>
    <div class="table-wrapper">
        <div class="toolbar">
            <div class="left">
                <el-upload :before-upload="beforeUpload">
                    <el-button type="primary" class="import-btn">导入数据</el-button>
                </el-upload>
                <el-button plain type="primary" @click="exportData">下载数据</el-button>
            </div>
        </div>

        <div class="table-box">
            <hot-table
                ref="hotTableComponent" :settings="hotSettings"></hot-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, onMounted, watch,inject, defineProps } from 'vue'
import { HotTable } from '@handsontable/vue3'
import { registerAllModules } from 'handsontable/registry'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'
import 'handsontable/languages/zh-CN'
import emitter from '@/utils/emitter'
// @ts-ignore
import * as XLSX from 'xlsx/xlsx.mjs'
// @ts-ignore
import _ from 'loadsh'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ChartKey } from '@/utils/symbols'
import injectStrict from '@/utils/injectStrict'

registerAllModules()

// https://handsontable.com/docs/javascript-data-grid/configuration-options/

const hotTableComponent:any = ref(null)
const tableData = computed(() => CHART?.value.config?.data || null)

const CHART = injectStrict(ChartKey)

watch(() => tableData.value, () => {
    hotTableComponent.value.hotInstance.updateData(_.cloneDeep(tableData.value))
}, { deep: true } )

const updateData = () => {
    nextTick(() => {
        const sourceData = hotTableComponent.value.hotInstance.getSourceData()
        const datas = sourceData.map((arr:any) => {
            return arr.filter((v:any) => v !== null)
        }).filter((v:any) => v.length)
        console.log(JSON.stringify(datas))
        const isEqual = _.isEqual(datas, tableData.value)
        if (tableData.value && !isEqual && datas.length) {
            const current:any = _.cloneDeep(CHART?.value)
            current.config.data = datas
            emitter.emit('updateChart', current)
        }
    })
}

const beforeUpload = (file:any) => {
    try {
        const reader = new FileReader()
        reader.onload = (e:any) => {
            const data = e.target.result
            const workbook:any = XLSX.read(data, { type: 'binary' })
            const worksheet:any = workbook.Sheets[workbook.SheetNames[0]]
            const range = XLSX.utils.decode_range(worksheet['!ref'])
            var arr:any = []
            for (let row = range.s.r; row <= range.e.r; row++) {
                let i = arr.length
                arr.push([])
                for (let col = range.s.c; col <= range.e.c; col++) {
                    let cell:any = worksheet[XLSX.utils.encode_cell({ r: row, c: col })]
                    cell && arr[i].push(cell.v)
                }
            }
            hotTableComponent.value.hotInstance.updateData(arr)
            ElMessage.success('导出成功')
        }
        reader.readAsBinaryString(file)
    } catch (err) {
        console.log('err: ', err)
    }
    return false
}

const exportData = () => {
    const exportPlugin = hotTableComponent.value.hotInstance.getPlugin('exportFile')
    exportPlugin.downloadFile('csv', { filename: CHART?.value.name })
}

onMounted(() => {
    tableData.value && hotTableComponent.value.hotInstance.updateData(_.cloneDeep(tableData.value))
})

const hotSettings = computed(() => {
    return {
        language: 'zh-CN', // 语言设置
        licenseKey: 'non-commercial-and-evaluation', // 隐藏版权文字
        width: 'auto', // 表格宽度
        // height: 'auto', // 表格高度、设置以后才会出现scroll
        // data: Handsontable.helper.createSpreadsheetData(10, 26), // 列表初始化数据
        data: null, // 表格数据也可根据实际项目需要进行设置
        startRows: 30, // 初始化行数,无data属性时生效(该值小于minRows时,以minRows为准)
        startCols: 15, // 初始化列数,无data属性时生效(该值小于minCols时,以minCols为准)
        // minRows: 40, // 最少行数(当初始化数据小于该值时,以该值为准)
        // minCols: 30, // 最少列数(当初始化数据小于该值时,以该值为准)
        minSpareRows: 30, // 行的最小留白数
        minSpareCols: 15, // 列的最小留白数
        colHeaders: true, // 是否展示列表头,默认是A,B,C等字母,可以['列1','列2']进行自定义展示
        // colHeaders: ['V', 'Ti（NTM）', 'Ti（ETM）'],// 自定义表格的表头
        rowHeaders: true, // 是否展示行表头,默认是1,2,3等数据,可以['行1','行2']进行自定义展示
        colWidths: 100, // 列宽度
        dropdownMenu: false, // 表头展示下拉菜单,可以自定义展示
        // className: 'htCenter', // 单元格文字对齐方式(htLeft,htRight,htCenter)
        // currentRowClassName: 'my-selectRow', // 给选中行添加自定义class类名
        // currentColClassName: 'my-selectCol', // 给选中列添加自定义class类名
        autoWrapRow: true, // 文字是否自动换行(当没有设置colWidths时生效)
        fixedRowsTop: 0, // 列表内容从上面开始,固定定位的行数(不包含行表头)
        fixedColumnsLeft: 1, // 列表内容从左面开始,固定定位的列数(不包含列表头)
        fillHandle: true, // 是否开启拖拽复制操作(true,false,'horizontal'水平复制,'vertical'垂直复制)
        // filters: true,
        manualRowMove: true,
        afterChange () {
            updateData()
        },
        afterCreateCol () {
            updateData()
        },
        afterCreateRow () {
            updateData()
        },
        afterRemoveCol () {
            updateData()
        },
        afterRemoveRow () {
            updateData()
        },
        // dropdownMenu: true,
        contextMenu: {
            // 单元格右击展示菜单
            items: {
                row_above: {
                    name: '上面插入一行'
                },
                row_below: {
                    name: '下面插入一行'
                },
                col_left: {
                    name: '左侧插入一列'
                },
                col_right: {
                    name: '右侧插入一列'
                },
                remove_row: {
                    name: '移除本行'
                },
                remove_col: {
                    name: '移除本列'
                },
                alignment: {
                    name: '对齐方式'
                },
                make_read_only: {
                    name: '只读'
                },
                // 'borders':{
                //   name: '边框'
                // },
                copy: {
                    name: '复制'
                },
                cut: {
                    name: '剪切'
                },
                separator: Handsontable.plugins.ContextMenu.SEPARATOR,
                // clear_custom: {
                //     name: '清空所有单元格数据',
                //     callback: function () {
                //         // this.clear()
                //     }
                // }
            }
        }
    }
})

</script>

<style src="./dataTable.styl" lang="stylus" scoped></style>
