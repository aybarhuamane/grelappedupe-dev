// /* eslint-disable react-hooks/exhaustive-deps */
// 'use client'
// import { Key, Suspense, useEffect } from 'react'
// import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
// import { useDrelLocation, useFilterFromUrl } from '@/hooks'
// import { IDistrito, IDrel, IUgel } from '@/types'

// export const Localidades = () => {
//   const {
//     listGrel,
//     listUgel,
//     listDistrito,
//     getDrel,
//     getUgel,
//     loading,
//     getDistrito,
//   } = useDrelLocation()
//   const { getParams, updateFilter } = useFilterFromUrl()

//   const grelSelected = getParams('grel', 'Loreto')
//   const ugelSelected = getParams('ugel', '')
//   const distritoSelected = getParams('distrito', '')

//   function getData() {
//     getDrel()
//     getUgel(grelSelected)
//   }

//   useEffect(() => {
//     getData()
//   }, [])

//   useEffect(() => {
//     getDistrito(grelSelected, ugelSelected)
//   }, [ugelSelected])

//   const grelList: IDrel[] = listGrel ? listGrel : ([] as IDrel[])
//   const ugelList = listUgel ? listUgel : ([] as IUgel[])
//   const distritoList = listDistrito ? listDistrito : ([] as IDistrito[])

//   //list filtereds
//   const ugelFiltereds =
//     ugelSelected !== ''
//       ? ugelList.filter((item) => item.provincia === ugelSelected)
//       : ugelList

//   const distritoFiltereds =
//     distritoSelected !== ''
//       ? distritoList.filter((item) => item.distrito === distritoSelected)
//       : distritoList

//   const handleUgelChange = (value: Key | null) => {
//     if (value !== null) {
//       updateFilter('ugel', value as string)
//     } else {
//       updateFilter('ugel', '')
//     }
//   }

//   const handleDistritoChange = (value: Key | null) => {
//     if (value !== null) {
//       updateFilter('distrito', value as string)
//     } else {
//       updateFilter('distrito', '')
//     }
//   }

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <section className="flex flex-col gap-4 w-full">
//         {/* Grell */}
//         <Autocomplete
//           aria-label="Grel"
//           radius="sm"
//           variant="bordered"
//           label="Grel"
//           labelPlacement="outside"
//           placeholder="Selecciona una Grel"
//           items={grelList}
//           selectedKey={grelSelected}
//           isLoading={loading}
//         >
//           {(item) => (
//             <AutocompleteItem
//               key={item.region}
//               value={item.region}
//             >
//               {item.region}
//             </AutocompleteItem>
//           )}
//         </Autocomplete>
//         {/* Ugel */}
//         <Autocomplete
//           aria-label="Ugel"
//           radius="sm"
//           variant="bordered"
//           label="Ugel"
//           labelPlacement="outside"
//           placeholder="Selecciona una Ugel"
//           isLoading={loading}
//           selectedKey={ugelSelected}
//           onSelectionChange={handleUgelChange}
//           // defaultInputValue="Loreto"
//           isDisabled={distritoSelected !== '' ? true : false}
//         >
//           {ugelFiltereds.map((item) => (
//             <AutocompleteItem
//               key={item.provincia}
//               value={item.provincia}
//             >
//               {item.provincia}
//             </AutocompleteItem>
//           ))}
//         </Autocomplete>
//         {/* Distrito */}
//         <Autocomplete
//           aria-label="distrito"
//           radius="sm"
//           variant="bordered"
//           label="Distrito"
//           labelPlacement="outside"
//           placeholder="Selecciona un distrito"
//           isLoading={loading}
//           selectedKey={distritoSelected}
//           onSelectionChange={handleDistritoChange}
//           isDisabled={
//             ugelSelected !== '' ? false : distritoSelected !== '' ? false : true
//           }
//         >
//           {distritoFiltereds.map((item) => (
//             <AutocompleteItem
//               key={item.distrito}
//               value={item.distrito}
//             >
//               {item.distrito}
//             </AutocompleteItem>
//           ))}
//         </Autocomplete>
//       </section>
//     </Suspense>
//   )
// }
