import Head from "next/head"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/react"
import { Client } from "@notionhq/client"
import toast, { Toaster } from "react-hot-toast"

const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

const notion = new Client({ auth: NOTION_API_KEY })

const globalStyles = css`
  html,
  body {
    font-family: Helvetica, Arial, sans-serif;
    background-color: #f2f2f2;
    -moz-osx-font-smoothing: grayscale;
    color: #404040;
  }
`

const Root = styled.div`
  padding: 0 4rem;
  max-width: 1280px;
  margin: auto;
`

const Hero = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin: 2rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  background: #fff;
  min-height: 220px;
  max-height: 300px;
  height: 300px;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`

Hero.Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 300px;
  object-fit: cover;
  display: block;
`

const Header = styled.header`
  padding: 1rem 2rem;
`

Header.Heading = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  color: #bfbfbf;
`

Header.Heading.Strong = styled.strong`
  font-family: Monaco, "Andale Mono", "DejaVu Sans Mono", "Courier New", Courier,
    monospace;
  color: #332f;
  font-size: 0.9em;
  font-weight: 200;
`

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Aside = styled.aside`
  padding: 0 2rem;
  margin-bottom: 2rem;
  color: #737373;
  line-height: 1.5;
  font-style: italic;
`

const Item = styled.a`
  width: 100%;
  max-width: 300px;
  border-radius: 4px;
  background-color: #fff;
  margin: 1rem 2rem;
  transition: box-shadow 300ms ease;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.04),
    0 3px 1px -2px rgba(0, 0, 0, 0.04), 0 1px 5px 0 rgba(0, 0, 0, 0.04);
  text-decoration: none;
  color: #404040;

  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`

Item.Code = styled.span`
  color: #737373;
  padding: 2rem 2rem;
  display: block;
`

Item.Heading = styled.span`
  padding: 1rem 2rem;
  margin: 0;
  background-color: #fbfbfb;
  font-weight: 400;
  display: block;
  font-size: 1.5rem;
`

export const getStaticProps = async () => {
  const meta = {
    url: "https://sponsorships.kud.io/",
    title: "Get Sponsorships | _kud",
    description: "Get some vouchers for different platforms.",
    preview: "https://sponsorships.kud.io/preview.jpg",
    keywords:
      "sponsorships, discount, price, code, promo, voucher, vouchers, sponsorship, price, groslot, reduction, prix, partnership, offer, savings, coupon, deal, special, discount code, promotional offer, cashback, loyalty, rewards, clearance, sale, limited time, exclusive, online shopping, e-commerce, savings, budget-friendly, affordable, bargain, markdown, price drop, special offer, promotional code, discount voucher",
  }

  const database = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
  })

  const rawPages = database.results

  const pagePromises = rawPages.map(async ({ id }) => {
    const page = await notion.pages.retrieve({ page_id: id })

    return {
      name:
        page.properties.name[page.properties.name.type][0]?.plain_text || null,
      code:
        page.properties.code[page.properties.code.type][0]?.plain_text || null,
      url: page.properties.url[page.properties.url.type][0]?.plain_text || null,
    }
  })

  const items = await Promise.all(pagePromises)

  return {
    props: {
      items,
      meta,
    },
    revalidate: 1,
  }
}

const IndexPage = ({ items, meta }) => {
  const handleClick = async ({ name, code }) => {
    await navigator.clipboard.writeText(code)

    toast.success(`Code for ${name} copied to clipboard! 🎉`)
  }

  return (
    <>
      <Global styles={globalStyles} />

      <Head>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scalable=no"
        />
        <meta name="description" content={meta.description} key="description" />
        <meta name="keywords" content={meta.keywords} />

        <meta property="og:type" content="website" key="ogType" />
        <meta property="og:url" content={meta.url} key="ogUrl" />
        <meta property="og:title" content={meta.title} key="ogTitle" />
        <meta
          property="og:description"
          content={meta.description}
          key="ogDescription"
        />
        <meta property="og:image" content={meta.preview} key="ogImage" />

        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitterCard"
        />
        <meta name="twitter:url" content={meta.url} key="twitterUrl" />
        <meta name="twitter:title" content={meta.title} key="twitterTitle" />
        <meta
          name="twitter:description"
          content={meta.description}
          key="twitterDescription"
        />
        <meta name="twitter:image" content={meta.preview} key="twitterImage" />
      </Head>

      <Root>
        <Hero>
          <Hero.Image src="/hero.jpg" alt="Sponsorships Hero" />
        </Hero>

        <Header>
          <Header.Heading>
            Get <Header.Heading.Strong>sponsorships</Header.Heading.Strong>
          </Header.Heading>
        </Header>

        <Aside>
          <p>
            {`Hello and welcome to my sponsorship page. Each box represents a
            sponsorship.`}
          </p>
          <p>
            {`Just note that when you click on one, it'll open a new tab and -
            depending on the sponsorship - will also copy the code in the
            clipboard. Enjoy! 🙌`}
          </p>
        </Aside>

        <Main>
          {items.map(({ name, code, url }) => (
            <Item
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                handleClick({ name, code })
              }}
            >
              <Item.Code>{code ? code : "Direct link 🔗"}</Item.Code>

              <Item.Heading>{name}</Item.Heading>
            </Item>
          ))}
        </Main>

        <Toaster />
      </Root>
    </>
  )
}

export default IndexPage
