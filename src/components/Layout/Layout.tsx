import { Suspense, ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <main>
          {children}
        </main>
      </Suspense>
      <Footer />
    </>
  );
}

export default Layout;
