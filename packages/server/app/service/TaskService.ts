import { Task } from '../entity/Task'
import { ListQuery } from '../vo/Task'
import BaseService from './BaseService'
import { Workbook } from 'exceljs'
import dayjs from 'dayjs'

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
    const sheet = wb.addWorksheet('导出报', {})
    sheet.columns = [{
      header: ['个人工作总结（请注意每列的批注）', '序号2'],
      key: 'order',
      width: 5,
      alignment: {
        horizontal: 'center'
      },
      // style: {
      //   fill: {
      //     type: 'pattern',
      //     pattern: 'darkVertical',
      //     bgColor: {
      //       argb: 'F0FF0000'
      //     }
      //   }
      // },
    }, {
      header: ['', '任务分类'],
      key: 'categoryName',
      width: 10,
      alignment: {
        horizontal: 'center'
      },
    }, {
      header: ['', '任务简述'],
      key: 'title',
      width: 30
    }, {
      header: ['', '目标'],
      key: 'target',
      width: 40,
      alignment: {
        horizontal: 'center'
      },
    }, {
      header: ['', '任务权重'],
      key: 'weight',
      width: 10,
      alignment: {
        horizontal: 'center'
      },
    }, {
      header: ['', '计划开始时间'],
      key: 'startTime',
      width: 15,
      alignment: {
        horizontal: 'center'
      },
    }, {
      header: ['', '要求完成时间'],
      key: 'endTime',
      width: 15,
      alignment: {
        horizontal: 'center',
      },
    }, {
      header: ['', '进展及偏差说明'],
      key: 'progressText',
      width: 15,
      alignment: {
        wrapText: true,
      },
    }, {
      header: ['', '完成率'],
      key: 'progress',
      width: 10,
      alignment: {
        horizontal: 'center'
      },
    }]
    sheet.addRows(list.map((o, index) => ({
      order: index + 1,
      categoryName: o.category.name,
      progressText: o.scheduleList
        .map(o => `${dayjs(o.time).format('YYYY-MM-DD')}: ${o.description}`)
        .join('\n'),
      progress: o.scheduleList.length ? o.scheduleList[o.scheduleList.length - 1].percent : 0,
      ...o,
    })))

    sheet.mergeCells({ top: 1, bottom: 1, left: 1, right: 9 })
    sheet.getRow(1).getCell(1).style = {
      alignment: {
        horizontal: 'center'
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FF00FFFF'
        }
      }
    }
    sheet.getRow(2).eachCell(cell => {
      cell.style = {
        alignment: {
          horizontal: 'center'
        },
        font: {
          bold: true,
          color: {
            argb: 'FF0000FF',
          }
        },
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {
            argb: 'FFAAAAAA'
          }
        }
      }
    })
    sheet.getRows(1, 2)?.forEach(row => {
      row.height = 15
    })

    return await wb.xlsx.writeBuffer()
  }

}
