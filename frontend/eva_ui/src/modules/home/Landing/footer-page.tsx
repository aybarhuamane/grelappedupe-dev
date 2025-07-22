import Image from "next/image";
import Link from "next/link";

export const FooterPage = () => {
  return (
    <>
      <footer id="contacto" className="w-full py-6 bg-gray-600 text-white">
        <main className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="flex items-start space-x-4 mb-4">
              <Link
                href="https://greloreto.gob.pe/public/"
                className="hover:text-green-300"
                target="_blank"
              >
                <Image
                  src="/images/logogrel.png"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              </Link>

              <div className="flex flex-col max-w-md gap-2">
                <h3 className="text-lg font-semibold uppercase">
                  Gerencia Regional de Educación Loreto
                </h3>
                <p className="text-sm text-gray-300">
                  Dirección: Cal. Malecon Tarapaca Nro. 346 (Entre Morona y
                  Sargento Lores) Loreto - Maynas - Iquitos
                </p>
                <p className="text-sm text-gray-300">Teléfono: (065) 234572 </p>
                <p className="text-sm text-gray-300">
                  Horario: Lun - Vie 8:00 am - 15:00 pm
                </p>
              </div>
            </section>
            <section className="flex items-center space-x-4 mb-4 justify-end text-right">
              <div className="flex flex-col max-w-md gap-2">
                <h3 className="text-lg font-semibold uppercase">Enlaces</h3>
                <p className="text-sm text-gray-300">
                  <Link
                    href="https://regionloreto.gob.pe/"
                    className="hover:text-green-300"
                    target="_blank"
                  >
                    Gobierno Regional de Loreto
                  </Link>
                </p>
                <p className="text-sm text-gray-300">
                  <Link
                    href="https://www.transparencia.gob.pe/"
                    className="hover:text-green-300"
                    target="_blank"
                  >
                    Portal de Transparencia
                  </Link>
                </p>
                <p className="text-sm text-gray-300">
                  <Link
                    href="https://greloreto.gob.pe/public/"
                    className="hover:text-green-300"
                    target="_blank"
                  >
                    Portal de Servicios
                  </Link>
                </p>
              </div>
            </section>
          </div>
          <div className="text-center text-sm flex flex-col md:flex-row justify-center items-center gap-1">
            <p>
              ©{new Date().getFullYear()} Desarrollado por la{" "}
              <Link
                href="https://greloreto.gob.pe/public/"
                className="hover:text-green-300"
                target="_blank"
              >
                Dirección de Gestión Pedagógica - DGP GREL.
              </Link>
            </p>
            Todos los derechos reservados
          </div>
        </main>
      </footer>
    </>
  );
};

export const PreFooterPage = () => {
  return (
    <div className="bg-green-800 text-white py-4">
      <div className="flex justify-between items-center gap-8 container px-4 md:px-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Contacto</h3>
          <p>Email: info@Eva.pe</p>
          <p>Teléfono: +51 123 456 789</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/goreloretoperu/?locale=es_LA"
              className="hover:text-green-300"
            >
              Facebook
            </Link>
            <Link
              href="https://x.com/GoreLoretoOf?t=AoLOY0WwvJ54kVJ1vyLIfA&s=09"
              className="hover:text-green-300"
            >
              Twitter
            </Link>
            <Link
              href="https://pe.linkedin.com/company/gobierno-regional-de-loreto"
              className="hover:text-green-300"
            >
              LinkedIn
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Legal</h3>
          <Link
            href="https://regionloreto.gob.pe/"
            className="hover:text-green-300 block"
          >
            Términos y Condiciones
          </Link>
          <Link
            href="https://regionloreto.gob.pe/"
            className="hover:text-green-300 block"
          >
            Política de Privacidad
          </Link>
        </div>
      </div>
    </div>
  );
};
