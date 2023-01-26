import { Header } from '../components/molecules/Header/Header'
import { GoodToKnow } from '../components/organisms/GoodToKnow/GoodToKnow'
import { PreventativeCarePackages } from '../components/organisms/PreventativeCarePackages/PreventativeCarePackages'
import './QuotePage.scss'

export function QuotePage() {
  return(
    <section className="quote-page-container">
      <Header />
      <main className="quote-page-main">
        <h1>Bruce Lee's Health Insurance</h1>
        <PreventativeCarePackages />
        <GoodToKnow />
      </main>
      <footer>
        Test Footer
      </footer>
    </section>
  )
}