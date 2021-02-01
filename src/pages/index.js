import Head from "next/head"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/react"

const globalStyles = css`
  html,
  body {
    font-family: Helvetica, Arial, sans-serif;
    background-color: #f2f2f2;
    -moz-osx-font-smoothing: grayscale;
    color: #404040;
  }
`

const Header = styled.header`
  padding: 1rem 2rem;
`

Header.Heading = styled.h1`
  font-size: 2rem;
  font-weight: 400;
`

Header.Heading.Strong = styled.strong`
  font-family: Monaco, "Andale Mono", "DejaVu Sans Mono", "Courier New", Courier,
    monospace;
  color: #bfbfbf;
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

const Item = styled.article`
  width: 100%;
  max-width: 300px;
  border-radius: 4px;
  background-color: #fff;
  margin: 1rem 2rem;
  transition: box-shadow 300ms ease;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.04),
    0 3px 1px -2px rgba(0, 0, 0, 0.04), 0 1px 5px 0 rgba(0, 0, 0, 0.04);

  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`

Item.Code = styled.div`
  color: #737373;
  padding: 2rem 2rem;
`

Item.Heading = styled.h2`
  padding: 1rem 2rem;
  margin: 0;
  background-color: #fbfbfb;
  font-weight: 400;
`

export const getStaticProps = async () => {
  const meta = {
    url: "https://sponsorships.kud.io/",
    title: "Get Sponsorships | _kud",
    description: "Get some vouchers for different platforms.",
    previeww: "https://sponsorships.kud.io/preview.jpg",
    keywords:
      "sponsorships,discount,price,code,promo,voucher,vouchers,sponsorship,price,groslot,reduction,prix",
  }

  const items = [
    {
      name: "WeSave",
      code: "EM9A77",
      url: "https://www.wesave.fr/",
    },
    {
      name: "Yomoni",
      code: "ERWANN05",
      url: "https://www.yomoni.fr/",
    },
    {
      name: "Yespark",
      code: "PAR61113",
      url: "https://www.yespark.fr/",
    },
    {
      name: "FoodChéri",
      code: "333S0A",
      url: "https://www.foodcheri.com/",
    },
    {
      name: "Airbnb",
      code: "emest1",
      url: "https://www.airbnb.fr/",
    },
    {
      name: "Boursorama",
      url: "https://bour.so/JBcDsxX",
    },
    {
      name: "shadow.tech",
      code: "ERWPQXPP",
      url: "https://shadow.tech/frfr/",
    },
    {
      name: "Todoist",
      url: "https://todoist.com/r/kud_wjkice",
    },
    {
      name: "Alan",
      url: "https://love.alan.com/vevizibe",
    },
    {
      name: "Notion",
      url: "https://www.notion.so/?r=aaae4853920a4fdb9ec04ebb894cec06",
    },
    {
      name: "Sync.com",
      url: "http://www.sync.com/get-started?_sync_refer=67c2e60",
    },
  ]

  return {
    props: {
      items,
      meta,
    },
  }
}

const IndexPage = ({ items, meta }) => {
  const handleClick = async ({ code, url }) => {
    await navigator.clipboard.writeText(code)

    window.open(url)
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

      <Header>
        <Header.Heading>
          Get <Header.Heading.Strong>sponsorships</Header.Heading.Strong>
        </Header.Heading>
      </Header>

      <Aside>
        <p>
          Hello and welcome to my sponsorship page. Each box represents a
          sponsorship.
        </p>
        <p>
          Just note that when you click on one, it'll open a new tab and -
          depending on the sponsorship - will also copy the code in the
          clipboard. Enjoy! 🙌
        </p>
      </Aside>

      <Main>
        {items.map(({ name, code, url }) => (
          <Item
            key={name}
            onClick={() => {
              handleClick({ name, code, url })
            }}
          >
            <Item.Code>{code ? code : "Direct link 🔗"}</Item.Code>

            <Item.Heading>{name}</Item.Heading>
          </Item>
        ))}
      </Main>
    </>
  )
}

export default IndexPage
