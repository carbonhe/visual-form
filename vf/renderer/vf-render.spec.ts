import { Component } from '@angular/core';
import { FormControlTemplate, FormGroupTemplate, VfFormControl, VfFormGroup } from './types';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VfRendererModule } from './vf-renderer.module';
import { By } from '@angular/platform-browser';

describe('vf-render', () => {
  let fixture: ComponentFixture<TestVfRenderComponent>;

  let component: TestVfRenderComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VfRendererModule],
      declarations: [TestVfRenderComponent, TestInputControlComponent, TestDivGroupComponent],
    });
    fixture = TestBed.createComponent(TestVfRenderComponent);
    component = fixture.componentInstance;
  });

  describe('should render', () => {
    it('single control with single group', () => {
      const control = new VfFormControl(TestInputControlComponent);
      component.group = new VfFormGroup(TestDivGroupComponent, { test: control });
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.group-div')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('.control-input')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('.group-div .control-input')).length).toBe(1);
    });

    it('multi controls with single group', () => {
      const control1 = new VfFormControl(TestInputControlComponent);
      const control2 = new VfFormControl(TestInputControlComponent);
      component.group = new VfFormGroup(TestDivGroupComponent, { test1: control1, test2: control2 });
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.group-div')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('.control-input')).length).toBe(2);
      expect(fixture.debugElement.queryAll(By.css('.group-div .control-input')).length).toBe(2);
    });

    it('multi controls with multi groups', () => {
      const control1 = new VfFormControl(TestInputControlComponent);
      const control2 = new VfFormControl(TestInputControlComponent);
      const control3 = new VfFormControl(TestInputControlComponent);
      const control4 = new VfFormControl(TestInputControlComponent);

      const group1 = new VfFormGroup(TestDivGroupComponent, { test1: control1, test2: control2 });
      const group2 = new VfFormGroup(TestDivGroupComponent, { test3: control3, test4: control4 });
      component.group = new VfFormGroup(TestDivGroupComponent, { g1: group1, g2: group2 });
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.group-div')).length).toBe(3);
      expect(fixture.debugElement.queryAll(By.css('.control-input')).length).toBe(4);
      expect(fixture.debugElement.queryAll(By.css('.group-div .group-div .control-input')).length).toBe(4);
    });
  });
});

@Component({
  template: ` <div [vf]="group"></div> `,
})
class TestVfRenderComponent {
  group: VfFormGroup;
}

@Component({
  template: `<input class="control-input" />`,
})
class TestInputControlComponent implements FormControlTemplate {
  readonly control: VfFormControl;
}

@Component({
  template: `
    <div class="group-div">
      <ng-content></ng-content>
    </div>
  `,
})
class TestDivGroupComponent implements FormGroupTemplate {
  readonly group: VfFormGroup;
}
