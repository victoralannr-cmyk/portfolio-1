import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Form from './components/Form';
import Footer from './components/Footer';
import BackgroundLogoOrbit from './components/BackgroundLogoOrbit';

export default function App() {
  return (
    <div className="min-h-screen text-brand-white font-sans overflow-x-hidden selection:bg-brand-gold/30 selection:text-brand-gold-light" id="top">
      {/* Background dynamic orbiting logo */}
      <BackgroundLogoOrbit />

      {/* Header element at top floating with rounded corners */}
      <Header />

      {/* Main Page Contents */}
      <main>
        {/* Contact/Hero Area - containing photo and right-side stats (250 clients, 1 year experience) */}
        <Hero />

        {/* Portfolio Area showcasing the 3 requested sites */}
        <Portfolio />

        {/* Services Area detailing "Landing pages, Sites e apps" */}
        <Services />

        {/* End Contact Form facilitating redirection to user WhatsApp */}
        <Form />
      </main>

      {/* Footer containing social handles and quick mail links */}
      <Footer />
    </div>
  );
}
