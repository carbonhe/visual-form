import { Component, ViewContainerRef } from '@angular/core';
import { ControlComponent, GroupComponent, VfFormControl, VfFormGroup, WrapperComponent } from './types';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VfRendererModule } from './renderer.module';
import { By } from '@angular/platform-browser';
import { VfRenderer } from './renderer';

describe('vf-renderer', () => {
  let fixture: ComponentFixture<TestVfRenderComponent>;

  let component: TestVfRenderComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VfRendererModule],
      declarations: [TestVfRenderComponent, TestInputControlComponent, TestDivGroupComponent, TestDivWrapperComponent],
      providers: [VfRenderer],
    });
    fixture = TestBed.createComponent(TestVfRenderComponent);
    component = fixture.componentInstance;
  });

  describe('should render', () => {
    it('single control with single group', () => {
      const control = new VfFormControl(TestInputControlComponent);
      component.render(new VfFormGroup(TestDivGroupComponent, { test: control }));
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.group-div')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('.control-input')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('.group-div .control-input')).length).toBe(1);
    });

    it('multi controls with single group', () => {
      const control1 = new VfFormControl(TestInputControlComponent);
      const control2 = new VfFormControl(TestInputControlComponent);
      component.render(new VfFormGroup(TestDivGroupComponent, { test1: control1, test2: control2 }));
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
      component.render(new VfFormGroup(TestDivGroupComponent, { g1: group1, g2: group2 }));
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.group-div')).length).toBe(3);
      expect(fixture.debugElement.queryAll(By.css('.control-input')).length).toBe(4);
      expect(fixture.debugElement.queryAll(By.css('.group-div .group-div .control-input')).length).toBe(4);
    });

    it('with wrapper component', () => {
      const props = { c: 3, p: 0 };

      const control = new VfFormControl(TestInputControlComponent, TestDivWrapperComponent, props);
      component.render(new VfFormGroup(TestDivGroupComponent, { test: control }));
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.wrapper-div')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('.group-div .wrapper-div .control-input')).length).toBe(1);
      const wrapperDebugElement = fixture.debugElement.query(By.directive(TestDivWrapperComponent));
      expect(wrapperDebugElement.componentInstance.props).toBe(props);
    });
  });
});

@Component({
  template: ``,
})
class TestVfRenderComponent {
  constructor(public renderer: VfRenderer, public viewContainer: ViewContainerRef) {}

  render(group: VfFormGroup<any>) {
    this.renderer.render(this.viewContainer, group);
  }
}

@Component({
  template: `<input class="control-input" />`,
})
class TestInputControlComponent implements ControlComponent {
  readonly control: VfFormControl<any>;
}

@Component({
  template: `
    <div class="group-div">
      <ng-content></ng-content>
    </div>
  `,
})
class TestDivGroupComponent implements GroupComponent {
  readonly group: VfFormGroup<any>;
}

@Component({
  template: `
    <div class="wrapper-div">
      <ng-content></ng-content>
    </div>
  `,
})
class TestDivWrapperComponent implements WrapperComponent {
  props: any;
}
