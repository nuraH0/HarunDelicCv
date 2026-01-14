import Header from '../../components/Header';


export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white">
      <Header />

      <main className="flex-grow p-10">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">O meni</h1>
        <p className="text-lg mb-4">
          Zovem se Harun Delić i ja sam programer sa iskustvom u izradi web i mobilnih aplikacija.
        </p>
        <p className="text-lg mb-4">
          Volim raditi moderne i responzivne web stranice koristeći tehnologije poput Next.js, React, Angular, kao i mobilne aplikacije na Androidu koristeći Kotlin.
        </p>
        <p className="text-lg">
          Uvijek sam spreman učiti nove tehnologije i rješavati izazovne probleme. Moja strast je stvarati projekte koji su korisni, efikasni i vizualno privlačni.
        </p>
      </main>
    </div>
  );
}
