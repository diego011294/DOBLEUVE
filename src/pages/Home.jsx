
import ImageSlider from "../components/ImageSlider"
import { LatestPendants } from "../components/LatestPendants"
import { BannerInicio } from "../components/BannerInicio"
import { AboutInicio } from "../components/AboutInicio"
import TendenciasSlider from "../components/TendenciasSlider"
import { ServiciosInicio } from "../components/ServiciosInicio"
import { EventosInicio } from "../components/EventosInicio"


export const Home = () => {
  return (
    <div>
      <ImageSlider />
      <LatestPendants />
      <div className="pt-[80px]">
        <BannerInicio/>
      </div>
      <div className="transform -translate-y-16">
        <AboutInicio/>
      </div>
      <TendenciasSlider/>
      <ServiciosInicio/>
      <EventosInicio/>
    </div>
  )
}
