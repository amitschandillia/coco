import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script>*/}
          <script src="/_f/scripts/materialize.min.js"></script>
        </body>
      </html>
    );
  }
}
