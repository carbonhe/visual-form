import { Component } from '@angular/core';
import {
  FormControlTemplate,
  FormControlWrapperTemplate,
  FormGroupTemplate,
  VfFormControl,
  VfFormGroup
} from './types';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VfRendererModule } from './renderer.module';
import { By } from '@angular/platform-browser';
import { RenderErrors } from './renderer';
import { FormControl } from '@angular/forms';

describe('vf-renderer', () => {
  let fixture: ComponentFixture<TestVfRenderComponent>;

  let component: TestVfRenderComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VfRendererModule],
      declarations: [TestVfRenderComponent, TestInputControlComponent, TestDivGroupComponent, TestDivWrapperComponent]
    });
    fixture = TestBed.createComponent(TestVfRenderComponent);
    component = fixture.componentInstance;
  });

  describe('should throw error', () => {
    it('when group not an instance of VfFormGroup', () => {
      component.group = {} as any;
      expect(() => fixture.detectChanges()).toThrowError(RenderErrors.TYPE_MISMATCH);
    });

    it('when control not an instance of VfFormControl', () => {
      component.group = new VfFormGroup(TestDivGroupComponent, { t: new FormControl() });
      expect(() => fixture.detectChanges()).toThrowError(RenderErrors.TYPE_MISMATCH);
    });

    it('when group not associate component', () => {
      component.group = new VfFormGroup(null, { t: new VfFormControl(TestInputControlComponent) });
      expect(() => fixture.detectChanges()).toThrowError(RenderErrors.MISSING_COMPONENT);
    });

    it('when control not associate component', () => {
      component.group = new VfFormGroup(TestDivGroupComponent, { t: new VfFormControl(null) });
      expect(() => fixture.detectChanges()).toThrowError(RenderErrors.MISSING_COMPONENT);
    });
  });

  describe('should render', () => {
    it('single control with single group', () => {
      const control = new VfFormControl(TestInputControlComponent);
      component.group = new VfFormGroup(TestDivGroupComponent, { test: control });
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.group-div')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('.control-input')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('.group-div>.control-input')).length).toBe(1);
    });

    it('multi controls with single group', () => {
      const control1 = new VfFormControl(TestInputControlComponent);
      const control2 = new VfFormControl(TestInputControlComponent);
      component.group = new VfFormGroup(TestDivGroupComponent, { test1: control1, test2: control2 });
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.group-div')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('.control-input')).length).toBe(2);
      expect(fixture.debugElement.queryAll(By.css('.group-div>.control-input')).length).toBe(2);
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
      expect(fixture.debugElement.queryAll(By.css('.group-div>.group-div>.control-input')).length).toBe(4);
    });

    it('with wrapper component', () => {

      const props = { c: 3, p: 0 };

      const control = new VfFormControl(TestInputControlComponent, TestDivWrapperComponent, props);
      component.group = new VfFormGroup(TestDivGroupComponent, { test: control });
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.wrapper-div')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('.group-div>.wrapper-div>.control-input')).length).toBe(1);
      const wrapperDebugElement = fixture.debugElement.query(By.directive(TestDivWrapperComponent));
      expect(wrapperDebugElement.componentInstance.props).toBe(props);
    });
  });
});

@Component({
  template: `
    <div [vf]='group'></div> `
})
class TestVfRenderComponent {
  group: VfFormGroup<any>;
}

@Component({
  template: `<input class='control-input' />`
})
class TestInputControlComponent implements FormControlTemplate {
  readonly control: VfFormControl<any>;
}

@Component({
  template: `
    <div class='group-div'>
      <ng-content></ng-content>
    </div>
  `
})
class TestDivGroupComponent implements FormGroupTemplate {
  readonly group: VfFormGroup<any>;
}


@Component({
  template: `
    <div class='wrapper-div'>
      <ng-content></ng-content>
    </div>
  `
})
class TestDivWrapperComponent implements FormControlWrapperTemplate {
  props: any;
}
