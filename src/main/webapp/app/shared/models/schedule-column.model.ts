export interface IScheduleColumn {
  data: any;
  objects: any[];
  columnWidth: number;
  columnOffsetLeft: number;
}

export class ScheduleColumn implements IScheduleColumn {
  data: any;
  objects: any[];
  columnWidth: number;
  columnOffsetLeft: number;
  constructor(data: any, objects: any[], columnWidth: any, columnOffsetLeft: number) {
    this.data = data;
    this.objects = objects;
    this.columnWidth = columnWidth;
    this.columnOffsetLeft = columnOffsetLeft;
  }
}
