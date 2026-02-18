import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Button, Tooltip, tooltipClasses, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#27AE60',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#27AE60',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: ownerState.completed ? '#27AE60' : ownerState.active ? '#00529C' : '#DDDBDB',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundColor: ownerState.completed ? '#27AE60' : '#00529C'
            },
        },
    ],
}));

function ColorlibStepIcon(props) {
    const { active, completed, className, index } = props;

    return (
        <ColorlibStepIconRoot ownerState={{ active, completed }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <Typography variant="h6" component="p">{index + 1}</Typography>
            )}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    index: PropTypes.number,
};

function countCompletedSteps(steps) {
    let completedCount = 0;
    steps?.forEach(step => {
        if (step?.is_done === 1) {
            completedCount++;
        }
    });
    return completedCount;
}

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 400,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    }
}));

const CustomCheckIcon = styled(CheckIcon)({
    backgroundColor: '#00871F',
    zIndex: 1,
    color: '#fff',
    width: 20,
    height: 20,
    padding: 1,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
})

const CustomProcessIcon = styled(CheckIcon)({
    backgroundColor: '#DDDBDB',
    zIndex: 1,
    color: '#fff',
    width: 20,
    height: 20,
    padding: 1,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
})

export default function StepperDashboard({ data }) {
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={countCompletedSteps(data)} connector={<ColorlibConnector />}>
                {data?.map((step, index) => (
                    <Step key={index}>
                        <StepLabel
                            StepIconComponent={(props) => <ColorlibStepIcon {...props} index={index} />}
                        >
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <Typography color="inherit">Status MAB</Typography>
                                        {
                                            step?.sublist?.map((list, index) => (
                                                <div className="grid gap-2 mt-5" key={index}>
                                                    <div className="flex gap-2 items-center">
                                                        {
                                                            list?.is_done === 1 ? (
                                                                <div className="items-center"><CustomCheckIcon></CustomCheckIcon></div>
                                                            ) : (
                                                                <div className="items-center"><CustomProcessIcon></CustomProcessIcon></div>
                                                            )
                                                        }
                                                        <div className="items-center">{list?.sublist_title}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </React.Fragment>
                                }
                            >
                                <Button className="text-black border-none cursor-pointer">
                                    {step?.title}
                                </Button>
                            </HtmlTooltip>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}
