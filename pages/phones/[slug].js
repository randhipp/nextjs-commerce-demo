// import { useRouter } from 'next/router'
import superagent from 'superagent'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

function Phones({ phone }) {
  // Render data...
  return (
          <div>
            <p>Phone Name: {phone.name}</p>
            <p>Phone Color: {phone.color}</p>
            <p>Phone ID: {phone.id}</p>
            <p>Phone Slug: {phone.slug}</p>
          </div>
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

// const getProductDetails = (slug) => {
//   return superagent.get(`${apiBaseUrl}/phones/${slug}`)
//     .end((err, res) => { 
//       console.log(res)
//       return res.body 
//     })
//     // .end((err, res) => {
//     //   console.log(res.body)
//     // });
  
//   // console.log(res.body)

//   // return res.body
// }

// const Phone = () => {
//   const router = useRouter()
//   const { slug } = router.query

//   const res = getProductDetails(slug)

//   console.log(res)

//   return (
//       <div>
//         <p>Phone Name: {res.name}</p>
//         <p>Phone Color: {res.color}</p>
//         <p>Phone ID: {res.id}</p>
//       </div>
//     )
// }

// export default Phone