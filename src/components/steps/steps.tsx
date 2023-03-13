import React, { useEffect, useState } from 'react';
import IonIcon from '../icons/icons';
import {
  CircleStyle,
  LineStyle,
  DetailsStyle,
  StepsContainerStyle,
  StepStyle,
  StepDrawStyle,
} from './styles';

export type StatusType = 'default' | 'selected' | 'checked' | 'error';

export interface StepType {
  label: string;
  description?: string;
  stepNumber: number;
  status?: StatusType;
}

export type LineType = 'before' | 'after';

export type StepConfig = {
  current?: number;
  disabled?: boolean;
  steps: StepType[];
  clickable?: boolean;
};

export type StepCircle = {
  status?: StatusType;
  stepNumber?: number;
  steps: StepType[];
};

export type StepLine = {
  status?: StatusType;
  stepNumber?: number;
  steps: StepType[];
  type: LineType;
};

type StepDetails = {
  label: string;
  description?: string;
  stepNumber?: number;
};

const Status = {
  default: 'default',
  selected: 'selected',
  checked: 'checked',
  error: 'error',
} as const;

const LineDraw = ({ type, status, stepNumber, steps }: StepLine) => {
  const beforeStepIsChecked = (stepNumber: number = 0): boolean => {
    return (
      steps[stepNumber - 2] && steps[stepNumber - 2].status === Status.checked
    );
  };

  const afterStepIsChecked = (stepNumber: number = 0): boolean => {
    if (status && status === Status.checked) return true;
    return (
      steps[stepNumber + 2] && steps[stepNumber + 2].status !== Status.default
    );
  };

  if (type === 'before' && stepNumber !== 1) {
    return <LineStyle bolded={beforeStepIsChecked(stepNumber)} />;
  }

  return (
    <>
      {type === 'after' && stepNumber !== steps.length && (
        <LineStyle bolded={afterStepIsChecked(stepNumber)} />
      )}
    </>
  );
};

const StepDraw = ({ status, stepNumber, steps }: StepCircle) => {
  return (
    <>
      <StepDrawStyle>
        <LineDraw
          type={'before'}
          status={status}
          stepNumber={stepNumber}
          steps={steps}
        />
        <CircleStyle>
          <span>
            {status === 'checked' ? <IonIcon type={'check'} /> : stepNumber}
          </span>
        </CircleStyle>
        <LineDraw
          type={'after'}
          status={status}
          stepNumber={stepNumber}
          steps={steps}
        />
      </StepDrawStyle>
    </>
  );
};

const Details = ({ label, description, stepNumber }: StepDetails) => {
  return (
    <DetailsStyle>
      <div className="label">{label}</div>
      {description && (
        <div className="description" data-testid={'description-' + stepNumber}>
          {description}
        </div>
      )}
    </DetailsStyle>
  );
};

const stepStatus = (step: StepType, currentIndex: number): StatusType => {
  if (step.stepNumber < currentIndex) return Status.checked;
  if (step.stepNumber === currentIndex) return Status.selected;
  return Status.default;
};

const checkStartedStatus = (
  step: StepType,
  currentIndex: number
): StatusType => {
  return step.status ? step.status : stepStatus(step, currentIndex);
};

const validateChangeOfStep = (currentIndex: number, limit: number): number => {
  if (currentIndex < 1) return 1;
  if (currentIndex > limit) return limit;
  return currentIndex;
};

const IonSteps = ({
  current = 1,
  steps,
  clickable = false,
  disabled = false,
}: StepConfig) => {
  const [stepsOriginals, setStepsOriginals] = useState<StepType[]>(steps);
  const [currentStep, setCurrentStep] = useState<number>(current);
  const [firstCatchStatus, setFirstCatchStatus] = useState(true);

  const handleClickGoesTo = (stepNumber: number) => {
    if (clickable && !disabled) setCurrentStep(stepNumber);
  };

  const changeStep = (currentIndex: number): void => {
    currentIndex = validateChangeOfStep(currentIndex, stepsOriginals.length);

    let stepsCopy = stepsOriginals.slice();
    stepsCopy = stepsCopy.map((step) => {
      return {
        ...step,
        status: firstCatchStatus
          ? checkStartedStatus(step, currentIndex)
          : stepStatus(step, currentIndex),
      };
    });
    setStepsOriginals(stepsCopy);
    setFirstCatchStatus(false);
  };

  const generateIndexsForStep = (): void => {
    let stepsCopy = stepsOriginals.slice();
    stepsCopy.forEach((step: StepType, index: number) => {
      step.stepNumber = index + 1;
    });
    setStepsOriginals(stepsCopy);
    changeStep(currentStep);
  };

  useEffect(() => {
    generateIndexsForStep();
  }, []);

  useEffect(() => {
    changeStep(currentStep);
  }, [currentStep]);

  return (
    <StepsContainerStyle data-testid="ion-step">
      {stepsOriginals &&
        stepsOriginals.map((step: StepType) => {
          return (
            <StepStyle
              key={step.stepNumber}
              status={step.status}
              disabled={disabled}
              clickable={clickable}
              data-testid={'step-' + step.stepNumber + '-' + step.status}
              onClick={() => handleClickGoesTo(step.stepNumber)}
            >
              <StepDraw
                status={step.status}
                stepNumber={step.stepNumber}
                steps={stepsOriginals}
              />
              <Details
                label={step.label}
                description={step.description}
                stepNumber={step.stepNumber}
              />
            </StepStyle>
          );
        })}
    </StepsContainerStyle>
  );
};

export default IonSteps;
