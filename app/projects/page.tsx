import Header from '../../components/Header';

export default function Projects() {
  // Ovo je primjer projekata, kasnije možeš dodati svoje prave projekte
  const myProjects = [
    {
      title: 'Portfolio Web',
      description: 'Moj lični portfolio napravljen u Next.js i Tailwind CSS',
      link: '#',
    },
    {
      title: 'E-commerce App',
      description: 'Web shop aplikacija sa React i .NET backendom',
      link: '#',
    },
    {
      title: 'Mobile App',
      description: 'Android aplikacija napravljena u Kotlinu',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white">
      <Header />

      <main className="flex-grow p-10">
        <h1 className="text-4xl font-bold text-yellow-500 mb-8">Moji projekti</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProjects.map((project, index) => (
            <div key={index} className="bg-gray-900 p-5 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-bold text-yellow-500 mb-2">{project.title}</h2>
              <p className="mb-4">{project.description}</p>
              <a href={project.link} className="text-yellow-400 hover:underline">Pogledaj više</a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
