import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css'; // Import Polaris styles
import translations from '@shopify/polaris/locales/en.json'; // Import translations

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider i18n={translations}>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
