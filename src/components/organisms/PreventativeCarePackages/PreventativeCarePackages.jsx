import { IonIcon } from "@ionic/react";
import { checkmark, checkmarkCircle } from "ionicons/icons";
import { useState } from "react";
import { preventativeCarePackagesData } from "../../../data/preventativeCarePackagesData";
import { Input } from "../../atoms/Input/Input";
import "./PreventativeCarePackages.scss";

export function PreventativeCarePackages() {
  const [formData, setFormData] = useState({});
  console.log(formData)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="preventative-container">
      <h2>Keep Bruce Lee healthy with our preventative care packages</h2>
      <p>You'll be able to change this before paying</p>
      <div className="preventative-cards">
        {preventativeCarePackagesData.map(
          ({ title, covered, notCovered, addedPrice, tier }, index) => {
            return (
              <article
                className={formData.preventativePackage === tier ? "preventative-card selected" : "preventative-card"}
                key={index}
              >
                <h4>{title}</h4>
                <span>{addedPrice}</span>
                <ul>
                  {covered.map((item, index) => {
                    return (
                      <div className="covered-item-container base-item">
                        <div className="icon-container">
                          <IonIcon icon={checkmark} />
                        </div>
                        <li className="covered-item" key={index}>
                          {item}
                        </li>
                      </div>
                    );
                  })}
                  {notCovered?.map((item, index) => {
                    return (
                      <div className="not-covered-item-container base-item">
                        <div className="icon-container">
                          <IonIcon icon={checkmark} />
                        </div>
                        <li className="not-covered-item" key={index}>
                          {item}
                        </li>
                      </div>
                    );
                  })}
                </ul>
                <Input
                  name="preventativePackage"
                  id="preventativePackage"
                  type="radio"
                  onChange={handleChange}
                  value={tier}
                  checked={formData.preventativePackage === tier}
                />
              </article>
            );
          }
        )}
      </div>
    </div>
  );
}
