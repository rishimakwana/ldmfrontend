import React from 'react';
import { Stepper, Step, StepLabel, StepIconProps } from '@mui/material';
import { FaUserCircle } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { style } from './CustomStepper.style';

type props = {
  activeStep: number,
  steps: string[]
}

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, icon } = props;

  let iconElement;
  switch (icon) {
    case 1:
      iconElement = <FaUserCircle />;
      break;
    case 2:
      iconElement = <MdBusinessCenter />;
      break;
    case 3:
      iconElement = <FaLock />;
      break;
    default:
      iconElement = icon;
  }

  return (
    <div className={`${style.iconWrapper} ${active || completed ? style.iconActive : style.iconInactive}`}
    >{iconElement}</div>
  );
};

const RegisterStepper = ({ activeStep, steps }: props) => {
  return (
    <Stepper activeStep={activeStep} sx={style.stepper}>
      {steps.map((label: string) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={CustomStepIcon}
          >{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default RegisterStepper;
