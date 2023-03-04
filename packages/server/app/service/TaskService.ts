import { Task } from '../entity/Task'
import { ExportQuery, ListQuery } from '../vo/Task'
import BaseService from './BaseService'
import { Style, Workbook } from 'exceljs'
import dayjs from 'dayjs'
import { align, allBorder, eachAllCell, fgColorFill, font } from '../util/excel'
import { flatten, merge } from 'lodash'
import { TaskParticipant } from '../entity/TaskParticipant'

export default class TaskService extends BaseService {

  private async updateParticipants(task: Task) {
    const list = task.participants || []
    const insertList: TaskParticipant[] = []
    const updateList: TaskParticipant[] = []
    list.forEach(o => {
      (o.id ? updateList : insertList).push(o)
    })

    // 删除全部
    await this.ctx.repo.TaskParticipant.createQueryBuilder()
      .delete()
      .from(TaskParticipant, 'p')
      .andWhere('task.id = :taskId', { taskId: task.id })
      .execute()

    // 新增
    if (list.length) {
      await this.ctx.repo.TaskParticipant.insert(list.map(p => ({
        ...p,
        task,
        gmtCreate: new Date()
      })))
    }
  }

  public async create(task: Task) {
    task.gmtCreate = new Date()
    const result = await this.ctx.repo.Task.insert(task)
    if (!result.identifiers || !result.identifiers.length) return result

    const taskId = result.identifiers[0].id
    task.id = taskId

    await this.updateParticipants(task)
    return result
  }

  public async remove(id: number) {
    return await this.ctx.repo.Task.remove(new Task(id))
  }

  public async update(task: Task) {
    task.gmtModify = new Date()
    await this.updateParticipants(task)
    task.participants = await this.ctx.repo.TaskParticipant.find({
      where: {
        task
      }
    })
    return await this.ctx.repo.Task.save(task)
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

  public createListQueryBuilder(query: Partial<ListQuery>, loadScheduleList?: boolean, loadParticipants?: boolean) {
    const qb = this.ctx.repo.Task.createQueryBuilder()
      .select('t')
      .from(Task, 't')
      .leftJoinAndSelect('t.category', 'c')
    if (loadScheduleList) {
      qb.leftJoinAndSelect('t.scheduleList', 's')
    }
    if (loadParticipants) {
      qb.leftJoinAndSelect('t.participants', 'p')
    }
    if (query.id) {
      qb.andWhere('t.id = :id', { id: query.id })
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
    if (query.orderBy) {
      qb.orderBy(`t.${query.orderBy}`, query.orderAsc ? 'ASC' : 'DESC')
    } else {
      qb.orderBy('t.endTime', 'DESC')
    }
    return qb
  }

  public async listByQuery(query: ListQuery, loadScheduleList?: boolean, loadParticipants?: boolean) {
    return await this.createListQueryBuilder(query, loadScheduleList, loadParticipants).getMany()
  }

  public async getById(id: number) {
    return await this.createListQueryBuilder({ id }, true, true).getOne()
  }

  public async exportByQuery(query: ExportQuery) {
    const list = await this.listByQuery({
      ...query,
      orderBy: 'startTime',
      orderAsc: true,
    }, true, true)
    const wb = new Workbook()
    const sheet = wb.addWorksheet(query.sheetName || '个人工作', {
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
      header: ['', '计划分解（WBS）'],
      key: 'wbs',
      width: 25.54,
    }, {
      header: ['', '优先级'],
      key: 'priorityText',
      width: 10.34,
    }, {
      header: ['', '责任人/协助人'],
      key: 'participantText',
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
    // 按照分类归类、重排
    const categoryTaskListMap = list.reduce((map, task) => {
      let subList = map[task.category.name]
      if (!subList) {
        map[task.category.name] = (subList = [])
      }
      subList.push(task)
      return map
    }, {} as Record<string, Task[]>)
    const sortedList = flatten(Object.values(categoryTaskListMap))

    sheet.addRows(sortedList.map((o, index) => ({
      order: index + 1,
      priorityText: o.priority,
      categoryName: o.category.name,
      participantText: (o.participants || []).map(o => o.name).join(' / '),
      progressText: o.scheduleList
        .map(o => `${dayjs(o.time).format('YYYY-MM-DD')}: ${o.description}`)
        .join('\n'),
      progress: o.scheduleList.length ? `${o.scheduleList[o.scheduleList.length - 1].percent}%` : '0%',
      ...o,
    })))

    // 表头：合并、背景色
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

    // 合并分类行
    Object.values(categoryTaskListMap).reduce((rowNumber, taskList) => {
      const toRowNumber = rowNumber + taskList.length - 1
      if (toRowNumber - rowNumber > 0) {
        sheet.mergeCells({
          left: 2,
          right: 2,
          top: rowNumber,
          bottom: toRowNumber,
        })
      }
      return toRowNumber + 1
    }, 3)

    // 默认行高
    sheet.getRows(3, sheet.rowCount - 2)?.forEach(row => {
      row.height = 50
    });
    // 进展列自动换行
    ['title', 'wbs', 'target', 'progressText']
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

    // 所有单元格垂直居中、边框黑色
    eachAllCell(sheet, (cell) => {
      merge(cell.style, {
        alignment: {
          vertical: 'middle'
        },
        border: allBorder('thin', 'FF000000'),
      } as Style)
    }, true);
    // 部分列内容水平居中
    ['order', 'categoryName', 'target', 'priorityText', 'weight', 'participantText', 'startTime', 'endTime', 'progress'].forEach(key => {
      sheet.getColumnKey(key).eachCell((cell, rowNumber) => {
        if (rowNumber <= 2) return
        merge(cell.style, {
          alignment: align('center')
        } as Style)
      })
    })

    return await wb.xlsx.writeBuffer()
  }

}
