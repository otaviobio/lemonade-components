import "./InsuranceOnboarding.scss";
import {
  chevronBack,
  close,
} from "ionicons/icons";
import { createContext, useEffect, useState } from "react";
import { useMultiSteps } from "../utils/useMultisteps";
import { Button } from "../components/atoms/Button/Button";
import { Input } from "../components/atoms/Input/Input";
import { FilteredListInput } from "../components/atoms/FilteredListInput/FilteredListInput";
import { Map } from "../components/organisms/Map/Map";
import { useAutoComplete } from "../utils/useAutoComplete";
import { useDebounce } from "../utils/useDebounce";
import { CustomDogSvg } from "../assets/CustomSvg/CustomDogSvg";
import { CustomCatSvg } from "../assets/CustomSvg/CustomCatSvg";
import pin from "../assets/greyPin.svg";
import { petsAgeData } from "../data/petsAgeData";
import { mixedBreedPetsData } from "../data/mixedBreedPetsData";
import { pureBreedPetsData } from "../data/pureBreedPetsData";
import { HealthIssuesHub } from "../components/organisms/HealthIssuesHub/HealthIssuesHub";
import { Header } from "../components/molecules/Header/Header";

export const FormContext = createContext();

export function InsuranceOnboarding() {
  const { callAutoComplete, createGeoCoordinates } = useAutoComplete();

  const [formData, setFormData] = useState({});
  const [ageInputValue, setAgeInputValue] = useState("");
  const [breedTypeInputValue, setBreedTypeInputValue] = useState("");
  const [addressesList, setAddressesList] = useState([]);
  const [addressGeoCode, setAddressGeoCode] = useState(null);
  console.log(formData);
  console.log(formData.petBreed);

  const debouncedAddress = useDebounce(formData.address ?? "", 500);
  console.log(debouncedAddress);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickedItem = (name, value, setState) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setState(value);
  };

  const filteredPetsAgeData =
    ageInputValue.length > 0
      ? petsAgeData.filter((petsAge) =>
          petsAge.toLowerCase().includes(ageInputValue.toLowerCase())
        )
      : petsAgeData;

  const filteredMixedBreedData =
    breedTypeInputValue.length > 0
      ? mixedBreedPetsData.filter((petsBreed) =>
          petsBreed.toLowerCase().includes(breedTypeInputValue.toLowerCase())
        )
      : mixedBreedPetsData;

  const filteredPureBreedData =
    breedTypeInputValue.length > 0
      ? pureBreedPetsData.filter((petsBreed) =>
          petsBreed.toLowerCase().includes(breedTypeInputValue.toLowerCase())
        )
      : pureBreedPetsData;

  async function handleAddressListClick(place_id, address) {
    setFormData((prev) => ({ ...prev, address }));
    // setFormData(prev => ({...prev, address: ""}))
    const { location } = await createGeoCoordinates(place_id);
    setAddressGeoCode(location);
  }

  useEffect(() => {
    async function loadAsync() {
      const response = await callAutoComplete(debouncedAddress);
      setAddressesList(response);
    }
    loadAsync();
  }, [debouncedAddress]);

  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiSteps([
      <article className="step-container">
        <h2>Can't wait to meet your furry friend. What's their name?</h2>
        <Input
          floatingLabel={true}
          name="petsName"
          id="petsName"
          inputLabel="Pet's Name"
          type="text"
          onChange={handleChange}
          value={formData.petsName ?? ""}
        />
      </article>,
      <article>
        <h2 className="pet-type-h2">
          Cute! Hey {formData.petsName}, how's it going?
        </h2>
        <div className="custom-radio-button-container">
          <div className="with-svg">
            <div className="svg-container">
              <CustomDogSvg
                className={
                  formData.petType === "Dog"
                    ? "custom-svg-active"
                    : "custom-svg"
                }
              />
            </div>
            <Input
              name="petType"
              id="petType"
              inputLabel="WOOF WOOF!"
              type="radio"
              onChange={handleChange}
              value="Dog"
              checked={formData.petType === "Dog"}
            />
          </div>
          <div className="with-svg">
            <div className="svg-container">
              <CustomCatSvg
                className={
                  formData.petType === "Cat"
                    ? "custom-svg-active"
                    : "custom-svg"
                }
              />
            </div>
            <Input
              name="petType"
              id="petType"
              inputLabel="MEOW!"
              type="radio"
              onChange={handleChange}
              value="Cat"
              checked={formData.petType === "Cat"}
            />
          </div>
        </div>
      </article>,
      <article className="address-step-container">
        <h2>Where do you and {formData.petsName} live?</h2>
        {addressGeoCode &&
          <Map markerLocation={addressGeoCode} />
        }
        <div className="address-inputs-container">
          <div className="main-address">
            <div>
              <img className="pin" src={pin} alt="google map pin" />
            </div>
            <FilteredListInput
              floatingLabel={true}
              name="address"
              id="address"
              inputLabel="STREET ADDRESS, CITY, STATE"
              type="text"
              list={addressesList}
              inputValue={formData.address ?? ""}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, address: text }));
                // setInputValue(text)
              }}
              renderItem={(item) => (
                <li
                  onMouseDown={() =>
                    handleAddressListClick(item.place_id, item.description)
                  }
                >
                  {item.description}
                </li>
              )}
              keyExtractor={(item) => item.place_id}
            />
            <div className="close-button">
              <Button
                hasIcon={true}
                iconName={close}
                type="button"
                onClick={() => console.log("close this")}
              />
            </div>
          </div>
          <Input
            floatingLabel={true}
            name="unit"
            id="unit"
            inputLabel="APT/UNIT #"
            type="text"
            onChange={handleChange}
            value={formData.unit ?? ""}
          />
        </div>
      </article>,
      <article>
        <h2>Cool! Otavio, tell me more about {formData.petsName}...</h2>
        <div className="age-step-container">
          <FilteredListInput
            floatingLabel={true}
            name="petsAge"
            id="petsAge"
            inputLabel="AGE"
            type="text"
            list={filteredPetsAgeData}
            inputValue={ageInputValue ?? ""}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, petsAge: "" }));
              setAgeInputValue(text);
            }}
            renderItem={(item) => (
              <li
                onMouseDown={() =>
                  handleClickedItem("petsAge", item, setAgeInputValue)
                }
              >
                {item}
              </li>
            )}
            keyExtractor={(item) => item}
          />
          <div className="custom-radio-button-container">
            <Input
              name="petGender"
              id="petGender"
              inputLabel="BOY"
              type="radio"
              onChange={handleChange}
              value="Boy"
              checked={formData.petGender === "Boy"}
            />
            <Input
              name="petGender"
              id="petGender"
              inputLabel="GIRL"
              type="radio"
              onChange={handleChange}
              value="Girl"
              checked={formData.petGender === "Girl"}
            />
          </div>
        </div>
      </article>,
      <article>
        <h2>
          Thanks! What breed is {formData.petGender === "Girl" ? "she" : "he"}?
        </h2>
        <div className="pill-radio-button-container">
          <Input
            name="petBreed"
            id="petBreed"
            inputLabel="PURE BREED"
            type="radio"
            onChange={handleChange}
            onClick={() => setBreedTypeInputValue("")}
            value="Pure"
            checked={formData.petBreed === "Pure"}
            className={
              !formData.petBreed
                ? "pill-inactive"
                : formData.petBreed && formData.petBreed === "Mixed"
                ? "right-test"
                : "pill-active2"
            }
          />
          {!formData.petBreed && <div className="pill-divider">divider</div>}
          <Input
            name="petBreed"
            id="petBreed"
            inputLabel="MIXED/CROSSBREED"
            type="radio"
            onChange={handleChange}
            onClick={() => setBreedTypeInputValue("")}
            value="Mixed"
            checked={formData.petBreed === "Mixed"}
            className={
              !formData.petBreed
                ? "pill-inactive"
                : formData.petBreed && formData.petBreed === "Pure"
                ? "left-test"
                : "pill-active"
            }
          />
        </div>
        {formData.petBreed && (
          <div className="breed-step-container">
            <FilteredListInput
              floatingLabel={true}
              name="breedType"
              id="breedType"
              inputLabel={
                formData.petBreed === "Pure"
                  ? "SPECIFY BREED (BOXER, PUG...)"
                  : "SPECIFY MIX (LABRADOODLE...)"
              }
              type="text"
              list={
                formData.petBreed === "Pure"
                  ? filteredPureBreedData
                  : filteredMixedBreedData
              }
              inputValue={breedTypeInputValue ?? ""}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, breedType: "" }));
                setBreedTypeInputValue(text);
              }}
              renderItem={(item) => (
                <li
                  onMouseDown={() =>
                    handleClickedItem("breedType", item, setBreedTypeInputValue)
                  }
                >
                  {item}
                </li>
              )}
              keyExtractor={(item) => item}
            />
          </div>
        )}
      </article>,
      <HealthIssuesHub petName={formData.petsName} />,
      <article>
        <h2>Thanks! Here is a summary of {formData.petsName}'s information</h2>
        <div className="summary-container">
          <div className="summary-item">
            <div className="summary-item-label">Name</div>
            <div className="summary-item-value">{formData.petsName}</div>
          </div>
          <div className="summary-item">
            <div className="summary-item-label">Gender</div>
            <div className="summary-item-value">{formData.petGender}</div>
          </div>
          <div className="summary-item">
            <div className="summary-item-label">Age</div>
            <div className="summary-item-value">{formData.petsAge}</div>
          </div>
          <div className="summary-item">
            <div className="summary-item-label">Breed</div>
            <div className="summary-item-value">{formData.breedType}</div>
          </div>
          <div className="summary-item">
            <div className="summary-item-label">Medical History</div>
            <div className="summary-item-value">{formData.petsName}</div>
          </div>
        </div>
      </article>
    ]);

  const isButtonDisabled = () => {
    switch (currentStepIndex) {
      case 0:
        return (
          formData?.petsName === "" || !formData.hasOwnProperty("petsName")
        );

      case 1:
        const petType =
          formData?.petType === "" || !formData.hasOwnProperty("petType");
        if (petType) {
          return true;
        }
        return false;

      case 2:
        if (!addressGeoCode) {
          return true;
        }
        return false;

      case 3:
        const petsAge =
          formData?.petsAge === "" || !formData.hasOwnProperty("petsAge");
        const petGender =
          formData?.petGender === "" || !formData.hasOwnProperty("petGender");
        if (petsAge || petGender) {
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  console.log(formData.petsAge === "" && formData.petType === "");

  return (
    <FormContext.Provider value={{ formData, setFormData, next }}>
      <section className="insurance-onboarding-section">
        <div className="header-container">
          <Header />
          {!isFirstStep && (
            <div className="back-button">
              <Button
                hasIcon={true}
                iconName={chevronBack}
                type="button"
                onClick={back}
              />
            </div>
          )}
        </div>
        <form action="">{step}</form>
        {isLastStep && (
          <Button
            disabled={isButtonDisabled()}
            btnText="LOOKS GOOD"
            onClick={next}
            className="form-buttons"
          />
        )}
        {(!isLastStep) && (currentStepIndex !== 5) && (
          <Button
            disabled={isButtonDisabled()}
            btnText="NEXT"
            onClick={next}
            className="form-buttons"
          />
        )}
      </section>
    </FormContext.Provider>
  );
}
