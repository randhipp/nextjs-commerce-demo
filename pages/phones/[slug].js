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
            <p>Phone Price: USD {phone.price}</p>
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