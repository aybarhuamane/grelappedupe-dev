import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BarChart3, BookOpen, Clock, FileSpreadsheet, LineChart, MenuIcon, MessageCircle, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage () {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 py-2 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/logoGrel.webp"
              alt="logo"
              width={140}
              height={100}
            />
          </div>
          {/* <nav className="hidden md:flex items-center space-x-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#beneficios">
              Beneficios
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#caracteristicas">
              Características
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonios">
              Testimonios
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contacto">
              Contacto
            </Link>
          </nav> */}
          <Link href="/login">
            <Button size='sm' className="hidden md:inline-flex">
              Iniciar Sesión
            </Button>
          </Link>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-4 w-4" />
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold pb-3 tracking-tighter sm:text-4xl md:text-5xl lg:text-4xl/none text-primary">
                  Aplicación de Evaluación Diagnóstica
                </h1>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                  Simplifica la Gestión de Evaluaciones Educativas
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Optimiza el proceso de carga y análisis de evaluaciones educativas para docentes y directores en toda la región.
                </p>
              </div>
              <Link href="/dashboard">
                <Button className="text-white" size='lg'>
                  Comienza Ahora
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="beneficios" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary">
              Beneficios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BookOpen, title: "Facilidad de Uso", description: "Interfaz intuitiva para una rápida adaptación" },
                { icon: LineChart, title: "Análisis en Tiempo Real", description: "Visualiza resultados instantáneamente" },
                { icon: FileSpreadsheet, title: "Accesibilidad Centralizada", description: "Toda la información en un solo lugar" },
                { icon: Clock, title: "Ahorro de Tiempo", description: "Automatiza procesos para enfocarte en lo importante" },
              ].map((benefit, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-2">
                  <benefit.icon className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-primary">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="caracteristicas" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary">
              Características Principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
              {[
                { icon: FileSpreadsheet, title: "Carga Sencilla", description: "Sube evaluaciones con pocos clics" },
                { icon: BarChart3, title: "Gráficos Interactivos", description: "Visualiza resultados de forma dinámica" },
                { icon: Search, title: "Filtros Avanzados", description: "Encuentra la información que necesitas rápidamente" },
                { icon: MessageCircle, title: "Alertas de Notificación", description: "Mantente informado sobre actualizaciones importantes" },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary">
              Demostración Visual
            </h2>
            <div className="aspect-video overflow-hidden rounded-xl border bg-gray-100 shadow-lg">
              <Image
                alt="Demostración de la aplicación"
                className="object-cover w-full h-full"
                height="720"
                src="/captura.png"
                width="1280"
              />
            </div>
          </div>
        </section>
        <section id="testimonios" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary">
              Testimonios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "María Sánchez", role: "Directora, Colegio San Juan", quote: "Eva ha transformado nuestra forma de gestionar las evaluaciones. Es una herramienta indispensable." },
                { name: "Carlos Ramírez", role: "Docente, I.E. Santa Rosa", quote: "La facilidad para cargar y analizar evaluaciones me permite dedicar más tiempo a mis estudiantes." },
                { name: "Ana López", role: "Coordinadora Académica, Colegio Amazonas", quote: "El análisis en tiempo real nos ayuda a tomar decisiones informadas rápidamente." },
              ].map((testimonial, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-2 p-6 bg-white rounded-lg shadow">
                  <p className="text-gray-600 italic">{testimonial.quote}</p>
                  <p className="font-bold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary">
              Preguntas Frecuentes
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {[
                { question: "¿Cómo puedo empezar a usar Eva?", answer: "Inicia sesión en nuestra plataforma, verifica tu cuenta institucional y comienza a cargar tus evaluaciones." },
                { question: "¿Es segura la información que subo?", answer: "Sí, utilizamos encriptación de punta a punta y cumplimos con todas las normativas de protección de datos." },
                { question: "¿Puedo acceder desde cualquier dispositivo?", answer: "Absolutamente, Eva es compatible con computadoras, tablets y smartphones." },
                { question: "¿Ofrecen capacitación para usar la plataforma?", answer: "Sí, proporcionamos tutoriales en video y sesiones de capacitación en vivo para todos nuestros usuarios." },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Únete a la Revolución Educativa
                </h2>
                <p className="mx-auto max-w-[700px] text-green-100 md:text-xl">
                  Optimiza tus procesos de evaluación y dedica más tiempo a lo que realmente importa: tus estudiantes.
                </p>
              </div>
              <Link href="/dashboard">
                <Button className="bg-white text-green-600 hover:bg-green-100" size='lg'>
                  Comienza Ahora
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer id="contacto" className="w-full py-6 bg-green-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Contacto</h3>
              <p>Email: info@Eva.pe</p>
              <p>Teléfono: +51 123 456 789</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
              <div className="flex space-x-4">
                <Link href="https://www.facebook.com/goreloretoperu/?locale=es_LA" className="hover:text-green-300">Facebook</Link>
                <Link href="https://x.com/GoreLoretoOf?t=AoLOY0WwvJ54kVJ1vyLIfA&s=09" className="hover:text-green-300">Twitter</Link>
                <Link href="https://pe.linkedin.com/company/gobierno-regional-de-loreto" className="hover:text-green-300">LinkedIn</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <Link href="https://regionloreto.gob.pe/" className="hover:text-green-300 block">Términos y Condiciones</Link>
              <Link href="https://regionloreto.gob.pe/" className="hover:text-green-300 block">Política de Privacidad</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            ©{new Date().getFullYear()} Eva. Todos los derechos reservados.
            
          </div>
        </div>
      </footer>
    </div>
  )
}