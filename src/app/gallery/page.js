import Image from "next/image";
import Link from "next/link";

// Sample artworks data
const artworks = [
  {
    id: 'starry-night',
    title: 'La Noche Estrellada',
    artist: 'Vincent van Gogh',
    year: 1889,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/640px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    description: 'Una de las obras más famosas de Van Gogh, pintada durante su estancia en el asilo de Saint-Paul-de-Mausole.',
  },
  {
    id: 'girl-with-pearl-earring',
    title: 'La Joven de la Perla',
    artist: 'Johannes Vermeer',
    year: 1665,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/640px-1665_Girl_with_a_Pearl_Earring.jpg',
    description: 'Retrato de una joven con un pendiente de perla, conocido por su luminosidad y misterio.',
  },
  {
    id: 'water-lilies',
    title: 'Ninfeas',
    artist: 'Claude Monet',
    year: 1919,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1919%2C_Mus%C3%A9e_Marmottan_Monet%2C_Paris.jpg/640px-Claude_Monet_-_Water_Lilies_-_1919%2C_Mus%C3%A9e_Marmottan_Monet%2C_Paris.jpg',
    description: 'Parte de la serie de Ninfeas que Monet pintó en su jardín de Giverny.',
  },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Galería de Obras Maestras
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explora obras clásicas y analiza su accesibilidad visual
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="relative h-64">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{artwork.title}</h3>
                <p className="text-sm text-gray-500">{artwork.artist}, {artwork.year}</p>
                <p className="mt-2 text-gray-600 text-sm">{artwork.description}</p>
                <div className="mt-4">
                  <Link
                    href={`/analysis/${artwork.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Analizar Accesibilidad
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}