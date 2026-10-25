import CreatePlanLink, { CreatePlanFine } from './CreatePlanLink'
import './funnel.css'

/** The hero's one button (same look as before; no sign-in on the page). */
export default function HeroPlanCTA({ campaign = 'web_hero', location = 'home_hero_create_plan', pageName = 'Home', situation }: { campaign?: string; location?: string; pageName?: string; situation?: string }) {
  return (
    <div className="yv" data-stage="intro">
      <div className="yv-intro">
        <CreatePlanLink className="btn-read-gita btn-read-gita-primary yv-go yv-cta" campaign={campaign} location={location} pageName={pageName} situation={situation}>
          Create my 7-day Gita plan · Week 1 free
        </CreatePlanLink>
        <CreatePlanFine className="yv-fine yv-intro-fine" />
      </div>
    </div>
  )
}
