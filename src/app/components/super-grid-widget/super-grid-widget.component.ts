import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridFilterField, GridOptions } from '@interfaces';

@Component({
  selector: 'app-super-grid-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './super-grid-widget.component.html',
  styleUrls: ['./super-grid-widget.component.scss'],
})
export class SuperGridWidgetComponent implements OnChanges {
  @Input() filterFields: GridFilterField[] = [];
  @Input() options?: GridOptions;

  data: any[] = [];
  sortState: { [key: string]: 'asc' | 'desc' | null } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['filterFields']) {
      this.updateData();
      this.initSortState();
    }
  }

  private updateData(): void {
    this.data = this.options?.data || [];

    // 應用過濾
    if (this.filterFields?.length > 0) {
      this.data = this.data.filter((item) =>
        this.filterFields.every((filterField) => {
          const fieldValue: string | number | Date | boolean =
            item[filterField.fieldId];

          // 判斷值是否為 null 或 undefined，如果是則返回 true，表示不過濾該行。
          if (fieldValue == null) return true;

          // 判斷型別
          if (typeof fieldValue === 'string') {
            return fieldValue.includes(filterField.value.toString());
          } else {
            return fieldValue === filterField.value;
          }
        })
      );
    }

    // 應用排序
    this.applySorting();
  }

  private initSortState(): void {
    if (this.options?.sortColumns?.length) {
      // 初始化排序狀態
      this.sortState = {};
      this.options.sortColumns.forEach((col) => {
        this.sortState[col] = 'asc';
      });
    }
  }

  private applySorting(): void {
    if (!this.options?.sortColumns?.length) return;

    const sortColumns = Object.keys(this.sortState).filter(
      (col) => this.sortState[col] !== null
    );
    if (sortColumns.length === 0) return;

    this.data = [...this.data].sort((a, b) => {
      for (const colName of sortColumns) {
        const direction = this.sortState[colName] === 'asc' ? 1 : -1;
        const valueA = a[colName];
        const valueB = b[colName];

        // 處理 null 和 undefined
        if (valueA == null && valueB == null) continue;
        if (valueA == null) return -1 * direction;
        if (valueB == null) return 1 * direction;

        // 根據數據類型排序
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          const comparison = valueA.localeCompare(valueB) * direction;
          if (comparison !== 0) return comparison;
        } else if (valueA instanceof Date && valueB instanceof Date) {
          const comparison = (valueA.getTime() - valueB.getTime()) * direction;
          if (comparison !== 0) return comparison;
        } else {
          const comparison =
            (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) * direction;
          if (comparison !== 0) return comparison;
        }
      }
      return 0;
    });
  }

  /**
   * 切換欄位排序順序
   * @param fieldId 欄位名稱
   */
  onSortColumn(fieldId: string): void {
    // 如果該欄位當前未排序，設定為升序
    // 如果當前為升序，切換為降序
    // 如果當前為降序，取消排序
    if (!this.sortState[fieldId]) {
      this.sortState[fieldId] = 'asc';
    } else if (this.sortState[fieldId] === 'asc') {
      this.sortState[fieldId] = 'desc';
    } else {
      this.sortState[fieldId] = null;
    }

    this.applySorting();
  }

  /**
   * 檢查某個欄位是否為排序欄位
   * @param fieldId 欄位名稱
   * @returns 是否為排序欄位
   */
  isSortColumn(fieldId: string): boolean {
    return !!this.sortState[fieldId];
  }

  /**
   * 獲取排序圖標
   * @param fieldId 欄位名稱
   * @returns 排序方向圖標
   */
  getSortIcon(fieldId: string): string {
    return this.sortState[fieldId] === 'asc' ? '▲' : '▼';
  }
}
