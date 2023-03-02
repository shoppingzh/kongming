import { Task } from '../entity/Task'
import { ListQuery } from '../vo/Task'
import BaseService from './BaseService'
import { Style, Workbook } from 'exceljs'
import dayjs from 'dayjs'
import { align, eachAllCell, fgColorFill, font } from '../util/excel'
import { merge } from 'lodash'

export default class TaskService extends BaseService {

  public async create(task: Task) {
    task.gmtCreate = new Date()
    return await this.ctx.repo.Task.insert(task)
  }

  public async remove(id: number) {
    return await this.ctx.repo.Task.remove(new Task(id))
  }

  public async update(task: Task) {
    return await BaseService.update(this.ctx.repo.Task, task)
  }

  public async list(task: Task) {
    return await this.ctx.repo.Task.find({
      where: task,
      relations: {
        category: true,
        scheduleList: true,
      },
    })
  }

  public async listByQuery(query: ListQuery, loadScheduleList?: boolean) {
    const qb = this.ctx.repo.Task.createQueryBuilder()
      .select('t')
      .from(Task, 't')
      .leftJoinAndSelect('t.category', 'c')
    if (loadScheduleList) {
      qb.leftJoinAndSelect('t.scheduleList', 's')
    }
    if (query.keyword) {
      qb.andWhere('(t.title like :keyword or t.description like :keyword or t.target like :keyword)', { keyword: `%${query.keyword}%` })
    }
    if (query.startTime && query.endTime) {
      qb.andWhere('t.endTime >= :startTime', { startTime: query.startTime })
      qb.andWhere('t.startTime <= :endTime', { endTime: query.endTime })
    }
    if (query.categoryId) {
      qb.andWhere('c.id = :categoryId', { categoryId: query.categoryId })
    }
    qb.orderBy('t.endTime', 'DESC')
    return await qb.getMany()
  }

  public async getById(id: number) {
    return await this.ctx.repo.Task.findOne({
      where: {
        id,
      },
    })
  }

  public async exportByQuery(query: ListQuery) {
    const list = await this.listByQuery(query, true)
    const wb = new Workbook()
    const sheet = wb.addWorksheet('导出报', {
      properties: {
        defaultRowHeight: 35,
        defaultColWidth: 90
      }
    })
    sheet.columns = [{
      header: ['个人工作总结（请注意每列的批注）', '序号'],
      key: 'order',
      width: 8.42,
    }, {
      header: ['', '任务分类'],
      key: 'categoryName',
      width: 15.2,
    }, {
      header: ['', '任务简述'],
      key: 'title',
      width: 17.6
    }, {
      header: ['', '目标'],
      key: 'target',
      width: 28.3,
    }, {
      header: ['', '计划分解'],
      key: 'wbs',
      width: 25.54,
    }, {
      header: ['', '优先级'],
      key: 'priority',
      width: 10.34,
    }, {
      header: ['', '责任人/协助人'],
      key: 'author',
      width: 15.14,
    }, {
      header: ['', '任务权重'],
      key: 'weight',
      width: 12.1,
      alignment: {
        horizontal: 'center'
      },
    }, {
      header: ['', '计划开始时间'],
      key: 'startTime',
      width: 18.85,
    }, {
      header: ['', '要求完成时间'],
      key: 'endTime',
      width: 18.85,
    }, {
      header: ['', '进展及偏差说明'],
      key: 'progressText',
      width: 30,
    }, {
      header: ['', '完成率'],
      key: 'progress',
      width: 10.77,
    }]
    sheet.addRows(list.map((o, index) => ({
      order: index + 1,
      categoryName: o.category.name,
      progressText: o.scheduleList
        .map(o => `${dayjs(o.time).format('YYYY-MM-DD')}: ${o.description}`)
        .join('\n'),
      progress: o.scheduleList.length ? `${o.scheduleList[o.scheduleList.length - 1].percent}%` : 0,
      ...o,
    })))

    // 表头
    sheet.mergeCells({ top: 1, bottom: 1, left: 1, right: 9 });
    (sheet.getRows(1, 2) || []).forEach((row, index) => {
      row.height = 30
      row.eachCell(cell => {
        if (index === 0) {
          merge(cell.style, {
            font: font(11, 'FF000000', true),
            fill: fgColorFill('FF3DA9EB')
          })
        } else if (index === 1) {
          merge(cell.style, {
            font: merge(font(11, 'FF0070C0', true)),
            fill: fgColorFill('FFD9D9D9')
          })
        }
        merge(cell.style, {
          font: {
            name: '黑体'
          },
          alignment: align('center', 'middle')
        })
      })
    })

    // 默认行高
    sheet.getRows(3, sheet.rowCount - 2)?.forEach(row => {
      row.height = 35
    });
    // 进展列自动换行
    ['title', 'progressText']
      .forEach(key => {
        sheet.getColumnKey(key).eachCell(cell => {
          merge(cell.style, {
            alignment: {
              vertical: 'middle',
              wrapText: true,
              shrinkToFit: true,
            }
          } as Style)
        })
      })

    // 所有单元格垂直居中
    eachAllCell(sheet, (cell) => {
      merge(cell.style, {
        alignment: {
          vertical: 'middle'
        }
      } as Style)
    })

    return await wb.xlsx.writeBuffer()
  }

}
