import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import IonSteps, { StepConfig, StepType } from './steps';

const sut = (props: StepConfig = defaultProps) => {
  return render(<IonSteps {...props} />);
};
const getStepById = (testId: string) => screen.getByTestId(testId);

const defaultValue: StepType[] = [
  {
    stepNumber: 1,
    label: 'Step 1',
  },
  {
    stepNumber: 2,
    label: 'Step 2',
  },
  {
    stepNumber: 3,
    label: 'Step 3',
  },
];

const defaultProps: StepConfig = {
  current: 1,
  steps: defaultValue,
};

describe('Static IonStepComponent', () => {
  const stepsLabels = ['Step 1', 'Step 2', 'Step 3'];
  it.each(stepsLabels)(
    'should render step component with 3 steps',
    async (label: string) => {
      sut();
      expect(screen.getByText(label)).toBeTruthy();
    }
  );
  it('should render first step checked', async () => {
    sut({
      current: defaultProps.current,
      steps: [
        {
          stepNumber: 1,
          label: 'Step 1',
          status: 'checked',
        },
        {
          stepNumber: 2,
          label: 'Step 2',
        },
        {
          stepNumber: 3,
          label: 'Step 3',
        },
      ],
    });
    expect(screen.getByTestId('step-1-checked')).toBeTruthy();
    expect(getStepById('step-1-checked').className).toContain(`${'checked'}`);
  });
  it('should render second step with error and description', async () => {
    sut({
      current: defaultProps.current,
      steps: [
        {
          stepNumber: 1,
          label: 'Step 1',
          status: 'checked',
        },
        {
          stepNumber: 2,
          label: 'Step 2',
          status: 'error',
          description: 'Error',
        },
        {
          stepNumber: 3,
          label: 'Step 3',
        },
      ],
    });
    expect(screen.getByTestId('step-2-error')).toBeTruthy();
    expect(getStepById('step-2-error').className).toContain(`${'error'}`);
    expect(screen.getByText('Error').getAttribute('class')).toMatch(
      /description/
    );
  });
  const checkedStepsIds = [
    'step-1-checked',
    'step-2-checked',
    'step-3-checked',
  ];
  it.each(checkedStepsIds)(
    'should render step with id %s',
    async (stepId: string) => {
      sut({
        current: defaultProps.current,
        steps: [
          {
            stepNumber: 1,
            label: 'Step 1',
            status: 'checked',
          },
          {
            stepNumber: 2,
            label: 'Step 2',
            status: 'checked',
          },
          {
            stepNumber: 3,
            label: 'Step 3',
            status: 'checked',
          },
        ],
      });
      expect(screen.getByTestId(stepId)).toBeTruthy();
      expect(getStepById(stepId).className).toContain(`${'checked'}`);
    }
  );
  const defaultStepsIds = [
    'step-1-selected',
    'step-2-default',
    'step-3-default',
  ];
  it.each(defaultStepsIds)(
    'should render all steps disabled when the step component is disabled',
    async (stepId: string) => {
      sut({ ...defaultProps, disabled: true });
      expect(screen.getByTestId(stepId)).toBeTruthy();
      expect(getStepById(stepId).className).toContain(`${'disabled-true'}`);
    }
  );
});

describe('Passing through the IonStepComponent', () => {
  it('should initiate from step 2', async () => {
    sut({ ...defaultProps, current: 2 });
    expect(getStepById('step-1-checked').className).toContain(`${'checked'}`);
    expect(getStepById('step-2-selected').className).toContain(`${'selected'}`);
  });
  it('should go to step 3 when it be clicked', async () => {
    sut({ ...defaultProps, clickable: true });
    await userEvent.click(screen.getByTestId('step-3-default'));
    expect(screen.getByTestId('step-3-selected')).toBeTruthy();
  });
  it('should to keep last step selected when try to pass forward', async () => {
    sut({ ...defaultProps, current: 8 });
    expect(await screen.getByTestId('step-3-selected')).toBeTruthy();
  });
  it('should to keep first step selected when try to rewind beyond the first', async () => {
    sut({ ...defaultProps, current: -3 });
    expect(screen.getByTestId('step-1-selected')).toBeTruthy();
  });
});
