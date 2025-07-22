import Image from 'next/image'
import Link from 'next/link'
interface IProps {
  src?: string
  href?: string
  name?: string
  description?: string
}

export const CardProgram = (props: IProps) => {
  const { src, href, name, description } = props
  return (
    <>
      <Link
        className="p-4 rounded-lg w-full max-w-[420px] flex flex-col gap-2 bg-black/30 backdrop-blur-lg hover:bg-black/40 transition-all"
        href={href || '#'}
      >
        <section className="flex items-center">
          <Image
            src={src || '/images/img-Login.webp'}
            alt={name || 'program'}
            width={150}
            height={70}
            // className="object-cover"
          />
          <div className="border-l pl-4 ml-4">
            <h2 className="text-xl font-bold text-white">
              {name || 'Programa'}
            </h2>
          </div>
        </section>
        <section>
          <p className="text-gray-200">
            {description ||
              'Descripción del programa que se está presentando en la tarjeta'}
          </p>
        </section>
        <section>
          <p className="text-gray-400 hover:text-gray-200 text-sm">Ver más</p>
        </section>
      </Link>
    </>
  )
}
