import { FC } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { imgMap } from '../assets'

const galleryData = [
  {
    id: 1,
    img_url: imgMap['family'],
    src_url: 'https://jp.freepik.com/photos/baby',
    message: 'Pressfoto - jp.freepik.com によって作成された baby 写真',
    alt: 'family',
  },
  {
    id: 2,
    img_url: imgMap['colleagues'],
    src_url: 'https://jp.freepik.com/photos/business',
    message: 'Rawpixel.com - jp.freepik.com によって作成された business 写真',
    alt: 'business',
  },
  {
    id: 3,
    img_url: imgMap['global'],
    src_url: 'https://jp.freepik.com/photos/hand',
    message: 'Freepik - jp.freepik.com によって作成された hand 写真',
    alt: 'global',
  },
]

export const Gallery: FC = () => {
  return (
    <AliceCarousel
      autoPlay
      autoPlayInterval={1200}
      disableButtonsControls
      infinite
    >
      {galleryData.map(({ id, img_url, src_url, message, alt }) => (
        <div key={id} className="flex flex-col justify-center items-center">
          <img src={img_url} alt={alt} className="w-96" />
          <a href={src_url} className="text-xs text-gray-500">
            {message}
          </a>
        </div>
      ))}
    </AliceCarousel>
  )
}
