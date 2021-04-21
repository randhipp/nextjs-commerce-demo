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
    <div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
        <a href="#" class="w-full block h-full">
            <Image
              class="max-h-40 w-full object-cover"
              loader={myLoader}
              src={phone.image}
              alt="Picture of the author"
              width={500}
              height={500}
            />
            {/* <img alt="blog photo" src="{phone.image}" class="max-h-40 w-full object-cover"/> */}
            <div class="bg-white dark:bg-gray-800 w-full p-4">
                <p class="text-indigo-500 text-md font-medium">
                </p>
                <p class="text-gray-800 dark:text-white text-xl font-medium mb-2">
                  New {phone.name} is here!
                </p>
                <p class="text-gray-400 dark:text-gray-300 font-light text-md">
                  Only USD {phone.price}
                </p>
                <p class="text-gray-400 dark:text-gray-300 font-light text-md">
                  With color available in {phone.color}
                </p>
            </div>
        </a>
    </div>
    </main>
    </div>
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    //   <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
    //     <h1 className="text-6xl font-bold">
    //     {phone.name}
    //     </h1>
    //     <div className="px-20">
    //       <img className="">
    //       </img>
    //       <p>Phone Name: {phone.name}</p>
    //       <p>Phone Color: {phone.color}</p>
    //       <p>Phone ID: {phone.id}</p>
    //       <p>Phone Slug: {phone.slug}</p>
    //       <p>Phone Price: USD {phone.price}</p>
    //     </div>
    //   </main>
    // </div>
  )
}

export async function getStaticPaths() {
  const { body } = await superagent.get(`${apiBaseUrl}/phones`)
  const paths = body.map((phone) => ({
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