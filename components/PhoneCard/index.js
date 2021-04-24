import Image from 'next/image'
import Link from 'next/link'

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

function PhoneCard({ phone }) {
  return (
    <div className="overflow-hidden shadow-lg rounded-lg h-full w-100 md:w-80 cursor-pointer m-auto py-2">
      <Link href={`/phones/${encodeURIComponent(phone.slug)}`} className="w-full block h-full">
        <a><Image
          className="max-h-40 w-full object-cover"
          loader={myLoader}
          src={phone.image}
          alt="Picture of the author"
          width={500}
          height={500}
        /></a>
      </Link>
      {/* <img alt="blog photo" src="{phone.image}" className="max-h-40 w-full object-cover"/> */}
      <div className="bg-white dark:bg-gray-800 w-full p-4">
        <p className="text-indigo-500 text-md font-medium">
        </p>
        <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
          New {phone.name} is here!
                </p>
        <p className="text-gray-400 dark:text-gray-300 font-light text-md">
          Only USD {phone.price}
        </p>
        <p className="text-gray-400 dark:text-gray-300 font-light text-md">
          With color available in {phone.color}
        </p>
      </div>

    </div>
  )
}

export default PhoneCard