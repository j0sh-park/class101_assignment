import React from 'react'
import { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import reduxStore from '@modules/redux'
import { initI18next } from '@modules/common/globalization'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'

initI18next().then()

const RootApp = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ReduxProvider store={reduxStore}>
        <Component {...pageProps} />
      </ReduxProvider>
    </>
  )
}

export default RootApp
