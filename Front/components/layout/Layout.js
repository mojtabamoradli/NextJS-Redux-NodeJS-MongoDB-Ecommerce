import dynamic from "next/dynamic"

const Header = dynamic(() => import ("./Header"), {ssr: false}) // This resolve hydration problem
const Footer = dynamic(() => import ("./Footer"), {ssr: false}) 

export default function Layout({ children }) {
  return (
    <div>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}
