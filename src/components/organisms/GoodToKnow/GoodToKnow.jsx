import { goodToKnowCardsData } from "../../../data/goodToKnowCardsData";
import "./GoodToKnow.scss";

export function GoodToKnow() {
  return (
    <article className="good-to-know-container">
      <h2>Good to know...</h2>
      <p>Here are a few important things to note about your pet health insurance.</p>
      <p>If you still have questions, our team will be happy to help!</p>
      <div className="good-to-know-cards">
        {goodToKnowCardsData.map(({ title, content }, index) => {
          return(
            <div className="good-to-know-card" key={index}>
              <h3>{title}</h3>
              <p>{content}</p>
            </div>
          )
        })}
      </div>
    </article>
  );
}
