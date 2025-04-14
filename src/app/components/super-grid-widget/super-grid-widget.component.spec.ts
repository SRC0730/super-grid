import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridFilterField, GridOptions } from '@interfaces';
import { SuperGridWidgetComponent } from './super-grid-widget.component';

describe('SuperGridWidgetComponent', () => {
  let component: SuperGridWidgetComponent;
  let fixture: ComponentFixture<SuperGridWidgetComponent>;

  // 測試用的默認 options 數據
  const mockGridOptions: GridOptions = {
    headers: [
      { fieldId: 'name', displayText: '姓名' },
      { fieldId: 'age', displayText: '年齡' },
      { fieldId: 'email', displayText: '電子郵件' },
    ],
    data: [
      { name: '張三', age: 30, email: 'zhang@example.com' },
      { name: '李四', age: 25, email: 'li@example.com' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperGridWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperGridWidgetComponent);
    component = fixture.componentInstance;
    // 設置預設的 options
    component.options = mockGridOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept options input correctly', () => {
    expect(component.options).toBe(mockGridOptions);
    expect(component.options.headers.length).toBe(3);
    expect(component.options.data.length).toBe(2);
  });

  it('should update when options change', () => {
    const newMockOptions: GridOptions = {
      headers: [
        { fieldId: 'id', displayText: '編號' },
        { fieldId: 'title', displayText: '標題' },
      ],
      data: [
        { id: 1, title: '項目一' },
        { id: 2, title: '項目二' },
        { id: 3, title: '項目三' },
      ],
    };

    component.options = newMockOptions;
    fixture.detectChanges();

    expect(component.options).toBe(newMockOptions);
    expect(component.options.headers.length).toBe(2);
    expect(component.options.data.length).toBe(3);
  });

  it('should have headers with correct field IDs', () => {
    const headerIds = component.options.headers.map((h) => h.fieldId);
    expect(headerIds).toContain('name');
    expect(headerIds).toContain('age');
    expect(headerIds).toContain('email');
  });

  it('should have data with expected properties', () => {
    const firstDataItem = component.options.data[0];
    expect(firstDataItem.name).toBeDefined();
    expect(firstDataItem.age).toBeDefined();
    expect(firstDataItem.email).toBeDefined();
  });

  it('should have filterFields property with default empty array', () => {
    expect(component.filterFields).toBeDefined();
    expect(component.filterFields).toEqual([]);
  });

  it('should filter data when filterFields is set', () => {
    const mockFilterFields: GridFilterField[] = [
      { fieldId: 'name', value: '張' },
    ];

    component.filterFields = mockFilterFields;
    component.ngOnChanges({
      filterFields: new SimpleChange(null, mockFilterFields, true),
    });

    expect(component.data.length).toBe(1);
    expect(component.data[0].name).toBe('張三');
  });

  it('should handle multiple filter fields', () => {
    const mockFilterFields: GridFilterField[] = [
      { fieldId: 'age', value: 25 },
      { fieldId: 'name', value: '李' },
    ];

    component.filterFields = mockFilterFields;
    component.ngOnChanges({
      filterFields: new SimpleChange(null, mockFilterFields, true),
    });

    expect(component.data.length).toBe(1);
    expect(component.data[0].name).toBe('李四');
    expect(component.data[0].age).toBe(25);
  });

  it('should update data when options change', () => {
    const spy = spyOn<any>(component, 'updateData').and.callThrough();

    const newMockOptions: GridOptions = {
      headers: mockGridOptions.headers,
      data: [
        { name: '張三', age: 30, email: 'zhang@example.com' },
        { name: '李四', age: 25, email: 'li@example.com' },
        { name: '王五', age: 35, email: 'wang@example.com' },
      ],
    };

    component.ngOnChanges({
      options: new SimpleChange(mockGridOptions, newMockOptions, false),
    });

    expect(spy).toHaveBeenCalled();
    expect(component.data.length).toBe(2);
  });
});
