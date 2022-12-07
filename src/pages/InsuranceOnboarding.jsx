import './InsuranceOnboarding.scss'
import lemonadeLogo from '../assets/lemonade-insurance-logo.svg'
import avatar from '../assets/avatar.jpg'
import { IonIcon } from '@ionic/react'
import { refreshOutline, helpCircleOutline, caretUpSharp, caretDownSharp } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useMultiSteps } from '../utils/useMultisteps';
import { Button } from '../components/atoms/Button/Button';
import { Input } from '../components/atoms/Input/Input';
import { FilteredListInput } from '../components/atoms/FilteredListInput/FilteredListInput';
import { Map } from '../components/organisms/Map/Map';
import { useAutoComplete } from '../utils/useAutoComplete';
import { useDebounce } from '../utils/useDebounce';

const petsAgeData = [
  "1 Week Old",
  "2 Week Old",
  "3 Week Old",
  "4 Week Old",
  "5 Week Old",
  "6 Week Old",
  "7 Week Old",
  "3 Month Old",
  "2 Month Old",
  "4 Month Old",
  "5 Month Old",
  "6 Month Old",
  "1 Year Old",
  "2 Year Old",
  "3 Year Old",
  "4 Year Old",
  "5 Year Old",
  "20+ Year Old",
]

export function InsuranceOnboarding() {
  const {callAutoComplete, createGeoCoordinates} = useAutoComplete()

  const [formData, setFormData] = useState({})
  const [inputValue, setInputValue] = useState("")
  const [addressesList, setAddressesList] = useState([])
  console.log(formData)

  const debouncedAddress = useDebounce(formData.address ?? '', 500)
  console.log(debouncedAddress)

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  const handleClickedItem = (name, value) => {
    setFormData(prev => ({...prev, [name] : value}))
    setInputValue(value)
  }

  const filteredPetsAgeData = inputValue.length > 0 ? petsAgeData.filter(petsAge => petsAge.toLowerCase().includes(inputValue.toLowerCase())) : petsAgeData


  useEffect(() => {
    async function loadAsync() {
      const response = await callAutoComplete(debouncedAddress)
      setAddressesList(response.map((prediction) => {
        return prediction.description
      }))
    }
    loadAsync()
  }, [debouncedAddress]);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, } = useMultiSteps([
    <article className="address-step-container">
      <h2>Where do you and Bruce Lee live?</h2>
      <Map />
      <div className="address-inputs-container">
        <FilteredListInput
          floatingLabel={true}
          name="address"
          id="address"
          inputLabel="STREET ADDRESS, CITY, STATE"
          type="text"
          // onChange={(value) => handleClickedItem("address", value)}
          list={addressesList}
          inputValue={formData.address ?? ''}
          onChangeText={(text) => {
            setFormData(prev => ({...prev, address: text}))
            // setInputValue(text)
          }}
        />
        <Input
          floatingLabel={true}
          name="unit"
          id="unit"
          inputLabel="APT/UNIT #"
          type="text"
          onChange={handleChange}
          value={formData.unit ?? ''}
        />
      </div>
    </article>,
    <article>
    <h2>Can't wait to meet your fury friend. What's their name?</h2>
    <Input
      floatingLabel={true}
      name="petsName"
      id="petsName"
      inputLabel="Pet's Name"
      type="text"
      onChange={handleChange}
      value={formData.petsName ?? ''}
    />
  </article>,
    <article>
    <h2>Cute! Hey {formData.petsName}, how's it going?</h2>
    <FilteredListInput
      floatingLabel={true}
      name="petsAge"
      id="petsAge"
      inputLabel="Pet's Age"
      type="text"
      onChange={(value) => handleClickedItem("petsAge", value)}
      list={filteredPetsAgeData}
      inputValue={inputValue ?? ''}
      onChangeText={(text) => {
        setFormData(prev => ({...prev, petsAge: ""}))
        setInputValue(text)
      }}
    />
    <div className="custom-radio-button-container">
      <Input
        name="petType"
        id="petType"
        inputLabel="Woof Woof!"
        type="radio"
        onChange={handleChange}
        value="Dog"
        checked={formData.petType === 'Dog'}
      />

      <Input
        name="petType"
        id="petType"
        inputLabel="Meow!"
        type="radio"
        onChange={handleChange}
        value="Cat"
        checked={formData.petType === 'Cat'}
      />
    </div>
  </article>
  ])

  const isButtonDisabled = () => {
    switch (currentStepIndex) {
      case 0:
        return formData?.petsName === "" || !formData.hasOwnProperty("petsName")

      case 1:
        const petsAge = formData?.petsAge === "" || !formData.hasOwnProperty("petsAge")
        const petType = formData?.petType === "" || !formData.hasOwnProperty("petType")
        if(petsAge || petType) {
          return true
        }
        return false;
      default:
        return false;
    }
  }

  console.log(formData.petsAge === "" && formData.petType === "")

  return (
    <section className="insurance-onboarding-section">
      <header>
        <div>
          <img className="logo-lemonade" src={lemonadeLogo} alt="Lemonade logo" />
        </div>
        <div  className="header-right-buttons">
          <Button className="refresh-icon-reverse" hasIcon iconName={refreshOutline} />
          <Button hasIcon iconName={helpCircleOutline} />
          <Button className="header-menu" hasIcon btnText="OTAVIO CARVALHO" iconName={caretDownSharp} />
        </div>
        <img className="header-avatar" src={avatar} alt="woman avatar" />
      </header>
      <form action="">
        {step}
      </form>
      {isLastStep ? <Button disabled={isButtonDisabled()} btnText="GET QUOTE" onClick={next} /> : <Button disabled={isButtonDisabled()} btnText="NEXT" onClick={next} />}
    </section>
  )
}