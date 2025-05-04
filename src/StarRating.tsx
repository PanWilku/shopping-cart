import { StarIcon } from "@heroicons/react/24/solid"
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline"

type StarRatingProps = { rating: number; maxStars?: number }

export default function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  const fullStars = Math.round(rating)               // round instead of floor
  const emptyStars = maxStars - fullStars

  return (
    <div className="flex space-x-1 text-yellow-400">
      {Array.from({ length: fullStars }).map((_, i) => (
        <StarIcon key={`full-${i}`} className="h-5 w-5" />
      ))}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <StarOutlineIcon key={`empty-${i}`} className="h-5 w-5" />
      ))}
    </div>
  )
}
