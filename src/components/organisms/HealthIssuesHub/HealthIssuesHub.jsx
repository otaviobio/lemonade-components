import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { healthIssues } from "../../../data/healthIssuesData";
import { FormContext } from "../../../pages/InsuranceOnboarding";
import { useMultiSteps } from "../../../utils/useMultisteps";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import "swiper/css";
import "./HealthIssuesHub.scss";
import { chevronBack } from "ionicons/icons";

export function HealthIssuesHub({petName}) {
  const { formData, setFormData, next: parentNext } = useContext(FormContext);
  const [healthHubData, setHealthHubData] = useState(
    formData.healthHubData || {}
  );

  const handleChange = (e) => {
    console.table({ slug: e.target.name, data: e.target.value });
    const slug = e.target.name;
    const value = e.target.value;
    setHealthHubData((prev) => {
      const prevCopy = { ...prev };
      prevCopy[slug] = !prevCopy[slug]?.includes(value)
        ? [...(prevCopy[slug] ? prevCopy[slug] : []), value]
        : prevCopy[slug].filter((i) => i !== value);
      return prevCopy;
    });
  };

  function saveData() {
    setFormData((prev) => ({ ...prev, healthHubData }));
    parentNext();
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiSteps(
      healthIssues.map(({ slug, issues }) => {
        return (
          <div className="health-issues-options" key={slug}>
            {issues.map((issueName) => {
              return (
                <Input
                  key={issueName}
                  name={slug}
                  inputLabel={issueName}
                  type="checkbox"
                  onChange={handleChange}
                  value={issueName}
                  checked={healthHubData[slug]?.includes(issueName) ?? false}
                />
              );
            })}
          </div>
        );
      })
    );

  const currentStepPercentage = ((currentStepIndex + 1) / steps.length) * 100;
  const sliderMovementPercentage = () => {
    switch (currentStepIndex) {
      case 1:
        return 25;

      case 2:
        return 80;

      case 3:
        return 130;

      case 4:
        return 185;

      default:
        break;
    }
  };

  const progressBar = {
    height: "100%",
    width: `${currentStepPercentage}%`,
    backgroundColor: "#ff0083",
    borderRadius: "inherit",
    transition: "width 1s ease-in-out",
  };

  const carouselContainerSlide = {
    transform: `translateX(-${sliderMovementPercentage()}%)`,
  };

  const test = {
    transform: "translateX(25%)",
  };

  return (
    <article className="health-issues-hub">
      <h2>Has {petName} ever had any of these?</h2>
      <div className="health-issues-main-container">
        <header>
          <div className="carousel-parent">
            <div
              className={`
                      carousel-container
                      ${currentStepIndex === 0 && "first-slide"}
                    `}
              style={!isFirstStep ? carouselContainerSlide : test}
            >
              {healthIssues.map(({ type, slug }, index) => {
                return (
                  <div
                    key={slug}
                    className={`
                      carousel-slide
                      ${currentStepIndex === index ? "active" : ""}
                      ${currentStepIndex === index - 1 && "prev"}
                      ${currentStepIndex === index + 1 && "next"}
                    `}
                  >
                    <span>{type}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="progress-bar-container">
            <div style={progressBar}></div>
          </div>
        </header>
        <main>{step}</main>
        <footer>
          <Button
            // disabled={isButtonDisabled()}
            type="button"
            btnText={
              healthHubData[healthIssues[currentStepIndex].slug]?.length > 0
                ? "NEXT"
                : `NO ${healthIssues[currentStepIndex].type}`
            }
            onClick={isLastStep ? saveData : next}
            className="form-buttons"
          />
          <Button
            // disabled={isButtonDisabled()}
            type="button"
            btnText="I don't know"
            onClick={next}
            className="form-buttons dont-know-btn"
          />
          {!isFirstStep && (
            <div className="back-btn-container">
              <Button
                hasIcon={true}
                iconName={chevronBack}
                type="button"
                onClick={back}
                className="back-btn-health-issues"
              />
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}
