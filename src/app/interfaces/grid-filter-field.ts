/**
 * 過濾欄位
 *
 * @export
 * @interface FilterField
 */
export interface GridFilterField {
  /**
   * 欄位名稱
   *
   * @type {string}
   * @memberof FilterField
   */
  fieldId: string;

  /**
   * 過濾值
   *
   * @type {(string | number | Date | boolean)}
   * @memberof FilterField
   */
  value: string | number | Date | boolean;
}
