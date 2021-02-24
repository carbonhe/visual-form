import { Component, ViewContainerRef } from '@angular/core';
import {
  ControlComponent,
  GroupComponent,
  isInstanceOfControlComponent,
  isInstanceOfGroupComponent,
  isInstanceOfWrapperComponent,
  VfFormControl,
  VfFormGroup,
  WrapperComponent,
} from './types';
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

  describe('should emit event', () => {
    it('with correct count', () => {
      const control = new VfFormControl(TestInputControlComponent);
      const componentRenderedNext = jasmine.createSpy();
      const componentRenderedComplete = jasmine.createSpy();
      component.renderer.rendered$.subscribe({
        next(value) {
          componentRenderedNext(value);
        },
        complete() {
          componentRenderedComplete();
        },
      });
      component.render(new VfFormGroup(TestDivGroupComponent, { test: control }));
      expect(componentRenderedNext).toHaveBeenCalledTimes(2);
      expect(componentRenderedComplete).toHaveBeenCalledTimes(1);
      expect(componentRenderedNext).toHaveBeenCalledBefore(componentRenderedComplete);
    });
    it('with correct props', () => {
      const controlProps = { control: 'controlProps' };
      const groupProps = { group: 'groupProps' };
      let receivedControlProps;
      let receivedGroupProps;
      let receivedWrapperProps;
      const control = new VfFormControl(TestInputControlComponent, TestDivWrapperComponent, controlProps);
      component.renderer.rendered$.subscribe(r => {
        if (isInstanceOfControlComponent(r.instance)) {
          receivedControlProps = r.instance.control.props;
        }

        if (isInstanceOfGroupComponent(r.instance)) {
          receivedGroupProps = r.instance.group.props;
        }

        if (isInstanceOfWrapperComponent(r.instance)) {
          receivedWrapperProps = r.instance.props;
        }
      });
      component.render(new VfFormGroup(TestDivGroupComponent, { test: control }, groupProps));
      fixture.detectChanges();
      expect(receivedControlProps).toBe(controlProps);
      expect(receivedGroupProps).toBe(groupProps);
      expect(receivedWrapperProps).toBe(controlProps);
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
