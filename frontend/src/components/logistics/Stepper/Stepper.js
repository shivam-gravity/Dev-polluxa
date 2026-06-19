import { format } from "date-fns";
const statusToStepIndex = {
  "AY-0002": 1,
  "AY-0009": 2,
  "AY-0026": 3,
  "AY-0004": 4,
  "AY-0005": 5,
  "AY-0001": 1,
};

const getCurrentStepFromTrackingInfo = (trackingInfo) => {
  let highestStatusStep = 0;
  const stepDates = {};

  trackingInfo?.map((info) => {
    const stepIndex = statusToStepIndex[info.status_code];
    if (stepIndex) {
      if (stepIndex > highestStatusStep) {
        highestStatusStep = stepIndex + 1;
      }
      stepDates[stepIndex] = info.created_at;
    }
  });

  return { currentStep: highestStatusStep, stepDates };
};

const Stepper = ({ trackingInfo }) => {
  // const currentStep = statusToStepIndex[currentStatus] + 1 || 1;

  // const currentStep = getCurrentStepFromTrackingInfo(trackingInfo) + 1;
  const { currentStep, stepDates } =
    getCurrentStepFromTrackingInfo(trackingInfo);

  const isItemReturned = trackingInfo.some(
    (item) => item.status_code === "AY-0006"
  );

  const steps = [
    "Shipment Picked Up",
    "In Transit",
    "Received at City Warehouse",
    isItemReturned ? "Returned" : "Out For Delivery",
    "Delivered",
  ];

  return (
    <>
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item min-w-36 md:min-w-max ${currentStep === i + 1 && "active"} ${
              i + 1 < currentStep && "complete"
            } `}
          >
            <p className="dates min-h-10 md:min-h-12">
              {stepDates[i + 1] && (
                <span>
                  {format(new Date(stepDates[i + 1]), "dd/MM/yyyy hh:mm a")}
                </span>
              )}
            </p>
            <div className="step">{i + 1 < currentStep ? "✓" : ""}</div>
            <p className={`text-sm text-center min-h-[58px] mt-5 md:text-base`}>
              {step}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
