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
  @Input({ required: true }) options!: GridOptions;

  data: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['filterFields']) {
      this.updateData();
    }
  }

  private updateData(): void {
    this.data = this.options?.data || [];

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
  }
}
