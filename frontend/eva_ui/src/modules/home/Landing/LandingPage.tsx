// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//   BarChart3,
//   BookOpen,
//   Clock,
//   FileSpreadsheet,
//   LineChart,
//   MenuIcon,
//   MessageCircle,
//   Search,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { FooterPage } from "./footer-page";

// export default function LandingPage() {
//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
//         <div className="container flex h-16 py-2 items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Image
//               src="/images/logoGrel.webp"
//               alt="logo"
//               width={140}
//               height={100}
//             />
//           </div>
//           <Link href="/login">
//             <Button size="sm" className="hidden md:inline-flex">
//               Iniciar Sesión
//             </Button>
//           </Link>
//           <Button variant="outline" size="icon" className="md:hidden">
//             <MenuIcon className="h-4 w-4" />
//           </Button>
//         </div>
//       </header>
//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-50">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold pb-3 tracking-tighter sm:text-4xl md:text-5xl lg:text-4xl/none text-primary">
//                   Aplicación de Evaluación Diagnóstica
//                 </h1>
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
//                   Simplifica la Gestión de Evaluaciones Educativas
//                 </h1>
//                 <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
//                   Optimiza el proceso de carga y análisis de evaluaciones
//                   educativas para docentes y directores en toda la región.
//                 </p>
//               </div>
//               <Link href="/dashboard">
//                 <Button className="text-white" size="lg">
//                   Comienza Ahora
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </section>
//         <section id="beneficios" className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary">
//               Beneficios
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 {
//                   icon: BookOpen,
//                   title: "Facilidad de Uso",
//                   description: "Interfaz intuitiva para una rápida adaptación",
//                 },
//                 {
//                   icon: LineChart,
//                   title: "Análisis en Tiempo Real",
//                   description: "Visualiza resultados instantáneamente",
//                 },
//                 {
//                   icon: FileSpreadsheet,
//                   title: "Accesibilidad Centralizada",
//                   description: "Toda la información en un solo lugar",
//                 },
//                 {
//                   icon: Clock,
//                   title: "Ahorro de Tiempo",
//                   description:
//                     "Automatiza procesos para enfocarte en lo importante",
//                 },
//               ].map((benefit, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center text-center space-y-2"
//                 >
//                   <benefit.icon className="h-12 w-12 text-green-600" />
//                   <h3 className="text-xl font-bold text-primary">
//                     {benefit.title}
//                   </h3>
//                   <p className="text-gray-600">{benefit.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//         <section
//           id="caracteristicas"
//           className="w-full py-12 md:py-24 lg:py-32 bg-green-50"
//         >
//           <div className="container px-4 md:px-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary">
//               Características Principales
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
//               {[
//                 {
//                   icon: FileSpreadsheet,
//                   title: "Carga Sencilla",
//                   description: "Sube evaluaciones con pocos clics",
//                 },
//                 {
//                   icon: BarChart3,
//                   title: "Gráficos Interactivos",
//                   description: "Visualiza resultados de forma dinámica",
//                 },
//                 {
//                   icon: Search,
//                   title: "Filtros Avanzados",
//                   description:
//                     "Encuentra la información que necesitas rápidamente",
//                 },
//                 {
//                   icon: MessageCircle,
//                   title: "Alertas de Notificación",
//                   description:
//                     "Mantente informado sobre actualizaciones importantes",
//                 },
//               ].map((feature, index) => (
//                 <div key={index} className="flex items-start space-x-4">
//                   <feature.icon className="h-8 w-8 text-green-600" />
//                   <div>
//                     <h3 className="text-xl font-bold text-primary">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-600">{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary">
//               Demostración Visual
//             </h2>
//             <div className="aspect-video overflow-hidden rounded-xl border bg-gray-100 shadow-lg">
//               <Image
//                 alt="Demostración de la aplicación"
//                 className="object-cover w-full h-full"
//                 height="720"
//                 src="/captura.png"
//                 width="1280"
//               />
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary">
//               Preguntas Frecuentes
//             </h2>
//             <Accordion
//               type="single"
//               collapsible
//               className="w-full max-w-3xl mx-auto"
//             >
//               {[
//                 {
//                   question: "¿Cómo puedo empezar a usar Eva?",
//                   answer:
//                     "Inicia sesión en nuestra plataforma, verifica tu cuenta institucional y comienza a cargar tus evaluaciones.",
//                 },
//                 {
//                   question: "¿Es segura la información que subo?",
//                   answer:
//                     "Sí, utilizamos encriptación de punta a punta y cumplimos con todas las normativas de protección de datos.",
//                 },
//                 {
//                   question: "¿Puedo acceder desde cualquier dispositivo?",
//                   answer:
//                     "Absolutamente, Eva es compatible con computadoras, tablets y smartphones.",
//                 },
//                 {
//                   question: "¿Ofrecen capacitación para usar la plataforma?",
//                   answer:
//                     "Sí, proporcionamos tutoriales en video y sesiones de capacitación en vivo para todos nuestros usuarios.",
//                 },
//               ].map((faq, index) => (
//                 <AccordionItem key={index} value={`item-${index}`}>
//                   <AccordionTrigger>{faq.question}</AccordionTrigger>
//                   <AccordionContent>{faq.answer}</AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
//                   Únete a la Revolución Educativa
//                 </h2>
//                 <p className="mx-auto max-w-[700px] text-green-100 md:text-xl">
//                   Optimiza tus procesos de evaluación y dedica más tiempo a lo
//                   que realmente importa: tus estudiantes.
//                 </p>
//               </div>
//               <Link href="/dashboard">
//                 <Button
//                   className="bg-white text-green-600 hover:bg-green-100"
//                   size="lg"
//                 >
//                   Comienza Ahora
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>
//       <FooterPage />
//     </div>
//   );
// }

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  BookOpen,
  Clock,
  FileSpreadsheet,
  LineChart,
  MenuIcon,
  MessageCircle,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FooterPage } from "./footer-page";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-lg shadow-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logoGrel.webp"
              alt="logo"
              width={140}
              height={100}
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 bg-gradient-to-b from-green-50 to-white text-center">
          <div className="container px-6 md:px-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-primary">
              Aplicación de Evaluación Diagnóstica
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Optimiza el proceso de carga y análisis de evaluaciones educativas
              para docentes y directores en toda la región.
            </p>
            <Link href="/dashboard">
              <Button className="mt-6 text-white" size="lg">
                Comienza Ahora
              </Button>
            </Link>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-24">
          <div className="container text-center">
            <h2 className="text-4xl font-bold text-primary mb-12">
              Beneficios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Facilidad de Uso",
                  desc: "Interfaz intuitiva para una rápida adaptación",
                },
                {
                  icon: LineChart,
                  title: "Análisis en Tiempo Real",
                  desc: "Visualiza resultados instantáneamente",
                },
                {
                  icon: FileSpreadsheet,
                  title: "Accesibilidad Centralizada",
                  desc: "Toda la información en un solo lugar",
                },
                {
                  icon: Clock,
                  title: "Ahorro de Tiempo",
                  desc: "Automatiza procesos para enfocarte en lo importante",
                },
              ].map(({ icon: Icon, title, desc }, index) => (
                <Card key={index} className="p-6 text-center shadow-lg">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-green-600 mx-auto" />
                    <CardTitle className="mt-4 text-xl">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="py-24 bg-muted">
          <div className="container text-center">
            <h2 className="text-4xl font-bold text-primary mb-12">
              Características Principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: FileSpreadsheet,
                  title: "Carga Sencilla",
                  desc: "Sube evaluaciones con pocos clics",
                },
                {
                  icon: BarChart3,
                  title: "Gráficos Interactivos",
                  desc: "Visualiza resultados de forma dinámica",
                },
                {
                  icon: Search,
                  title: "Filtros Avanzados",
                  desc: "Encuentra la información que necesitas rápidamente",
                },
                {
                  icon: MessageCircle,
                  title: "Alertas de Notificación",
                  desc: "Mantente informado sobre actualizaciones importantes",
                },
              ].map(({ icon: Icon, title, desc }, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Icon className="h-10 w-10 text-green-600" />
                  <div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="py-24">
          <div className="container text-center">
            <h2 className="text-4xl font-bold text-primary mb-12">
              Preguntas Frecuentes
            </h2>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {[
                {
                  question: "¿Cómo puedo empezar a usar Eva?",
                  answer:
                    "Inicia sesión en nuestra plataforma, verifica tu cuenta y comienza a cargar evaluaciones.",
                },
                {
                  question: "¿Es segura la información que subo?",
                  answer:
                    "Sí, utilizamos encriptación de punta a punta y cumplimos con normativas de protección de datos.",
                },
                {
                  question: "¿Puedo acceder desde cualquier dispositivo?",
                  answer:
                    "Sí, Eva es compatible con computadoras, tablets y smartphones.",
                },
                {
                  question: "¿Ofrecen capacitación?",
                  answer:
                    "Sí, proporcionamos tutoriales en video y sesiones de capacitación en vivo.",
                },
              ].map(({ question, answer }, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 bg-green-600 text-center text-white">
          <div className="container">
            <h2 className="text-4xl font-bold">
              Únete a la Revolución Educativa
            </h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Optimiza tus procesos de evaluación y dedica más tiempo a tus
              estudiantes.
            </p>
            <Link href="/dashboard">
              <Button
                className="mt-6 bg-white text-green-600 hover:bg-green-100"
                size="lg"
              >
                Comienza Ahora
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <FooterPage />
    </div>
  );
}
