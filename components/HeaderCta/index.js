import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

import styles from '../../styles/HeaderCta.module.css'

function HeaderCta({ header }) {
  return (
    <div className={styles['background']} className="bg-red-400 dark:bg-gray-800 flex relative z-20 items-center overflow-hidden justify-center">
      <div className="container mx-auto px-6 flex relative py-0 my-0">
        <div className="row-start sm:flex py-0 my-4">
          <div className="sm:w-2/3 lg:w-2/5 md:flex md:flex-col relative z-20">
            <span className="w-20 h-2 bg-pink-500 dark:bg-white mb-12">
            </span>
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-white">
              Circles
                <span className="text-5xl sm:text-7xl">
                New Samsung S21 Combo Plan
                </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-200 dark:text-white">
              Dimension of reality that makes change possible and understandable. An indefinite and homogeneous environment in which natural events and human existence take place.
            </p>
            <div className="flex justify-center mt-8 mb-8 md:justify-left">
              <a href="#" className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400">
                Get started
                </a>
              <a href="#" className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md">
                Read more
                </a>
            </div>
          </div>
          {/* <div className="sm:block sm:w-1/3 lg:w-3/5 relative"> */}
          <Image
            className=" w-7/12 md:max-w-sm m-auto pt-4 pb-0"
            loader={myLoader}
            src={header}
            alt="Picture of the author"
            width={500}
            height={700}
          />
          {/* <img src="" className=" max-h-0.5 md:max-w-sm xl:max-w-md m-auto" /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default HeaderCta
