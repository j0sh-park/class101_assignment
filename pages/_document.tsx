import React from 'react'
import Document, {
  Html,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

export default class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
