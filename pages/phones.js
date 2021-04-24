import Head from 'next/head'

import PhoneList from '../components/PhoneList'
import HeaderCta from '../components/HeaderCta'
import Feature from '../components/Feature'

import superagent from 'superagent'
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getServerSideProps({ query }) {

  const page = query.page || 1
  // Call an external API endpoint to get posts
  const { body } = await superagent.get(`${apiBaseUrl}/phones?page=${page}&limit=9`)
  // const posts = await res.json()
  // console.log(body)

  // By returning {props: {posts} }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: body
  }
}

export default function Home(props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-0 sm:py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-0 text-center py-0 sm:px-10">
        <HeaderCta
          header='https://www.circles.life/sg/wp-content/uploads/2021/04/KV.png'
        >
        </HeaderCta>
        <Feature></Feature>

        <p className="mt-3 text-2xl py-0 sm:py-5">
          Get started by editing{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>

        {/* <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full"> */}
        <PhoneList
          phones={props.phones}
          meta={props._meta}
        >
        </PhoneList>
        {/* </div> */}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
