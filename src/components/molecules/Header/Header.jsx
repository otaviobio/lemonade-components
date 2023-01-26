import { Button } from "../../atoms/Button/Button";
import lemonadeLogo from "../../../assets/lemonade-insurance-logo.svg";
import avatar from "../../../assets/avatar.jpg";
import {
  refreshOutline,
  helpCircleOutline,
  caretDownSharp,
  chevronBack,
} from "ionicons/icons";
import "./Header.scss";

export function Header() {
  return (
    <header>
      <div>
        <img className="logo-lemonade" src={lemonadeLogo} alt="Lemonade logo" />
      </div>
      <div className="header-right-buttons">
        <Button
          className="refresh-icon-reverse"
          hasIcon
          iconName={refreshOutline}
        />
        <Button hasIcon iconName={helpCircleOutline} />
        <Button
          className="header-menu"
          hasIcon
          btnText="OC"
          iconName={caretDownSharp}
        />
      </div>
      <img className="header-avatar" src={avatar} alt="woman avatar" />
    </header>
  );
}
