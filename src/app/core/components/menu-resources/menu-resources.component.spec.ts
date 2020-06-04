import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuResourcesComponent } from './menu-resources.component';

describe('MenuResourcesComponent', () => {
  let component: MenuResourcesComponent;
  let fixture: ComponentFixture<MenuResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
