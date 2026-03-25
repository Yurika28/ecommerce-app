import { EmblaOptionsType } from 'embla-carousel'
import { EmblaCarousel } from './CarouselSlide'
import { Comment } from '../UI/type'

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true }

async function getComments(): Promise<Comment[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
  return res.json()
}

export default async function Home() {
  const comments = await getComments()

  return (
    <main className="p-2">
      <EmblaCarousel comments={comments} options={OPTIONS} />
    </main>
  )
}