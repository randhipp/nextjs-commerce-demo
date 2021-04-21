import superagent from 'superagent'
import Image from 'next/image'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

function Phones({ phone }) {
  // Render data...
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
        <a href="#" className="w-full block h-full">
            <Image
              className="max-h-40 w-full object-cover"
              loader={myLoader}
              src={phone.image}
              alt="Picture of the author"
              width={500}
              height={500}
            />
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
        </a>
    </div>
    </main>
    </div>
  )
}

export async function getStaticPaths() {
  const { body } = await superagent.get(`${apiBaseUrl}/phones`)
  const paths = body.phones.map((phone) => ({
    params: { slug: phone.slug },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { body } = await superagent.get(`${apiBaseUrl}/phones/${params.slug}`)

  return {
    props: {
      phone: body
    },
  }
}

export default Phones