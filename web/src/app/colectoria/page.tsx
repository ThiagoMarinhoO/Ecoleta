'use client'
import Link from "next/link"

import { FormEvent, useEffect, useState } from "react";

// import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";

import { api } from "@/lib/api";   

export default function Coletoria() {
    const [userLocation, setUserLocation] = useState<[number, number] | undefined>(undefined);
    const [selectedPosition, setSelectedPosition] = useState<L.LatLngExpression>()
    const [lat, setLat] = useState(0)
    const [lgn, setLgn] = useState(0)

    useEffect(() => {
        if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            },
            (error) => {
            console.error('Erro ao obter a localização do usuário:', error);
            }
        );
        } else {
        console.error('Geolocalização não suportada');
        }
    }, []);

    function LocationMarker() {
        const map = useMapEvents({
        click(e) {
            setLat(e.latlng.lat)
            setLgn(e.latlng.lng)
            
            setSelectedPosition([e.latlng.lat, e.latlng.lng])
        },
        })
    
        return selectedPosition ? (
        <Marker position={selectedPosition} >
            <Popup>You are here</Popup>
        </Marker>
        ) : null
    }

    async function handleCreateColectory(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        await api.post('/point',
            {
                name: formData.get('entityName'),
                email: formData.get('entityEmail'),
                whatsapp: formData.get('entityWhatsapp'),
                latitude: lat.toString(),
                longitude: lgn.toString(),
                city: formData.get('entityCity'),
                uf: formData.get('entityState')
            }
        )

        alert('Criado com sucesso')
    }
      
  return (
    <div className="relative container mx-auto max-w-4xl bg-white px-12 py-20 rounded-2xl">
        <Link href="/" className="absolute -top-20 right-0 flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8332 10H4.1665" stroke="#34CB79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.99984 15.8333L4.1665 10L9.99984 4.16667" stroke="#34CB79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-violet-950 font-medium">Voltar para a home</p>
        </Link>
        <form onSubmit={handleCreateColectory}>
            <h2 className='w-1/2 text-5xl tracking-tight font-semibold text-violet-950 mb-12'>Cadastro do ponto de coleta</h2>
            <div className="col-span-full p-5 bg-green-100 rounded-md mb-20">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-green-600/25 px-6 py-20">
                    <div className="space-y-5">
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#34CB79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17 8L12 3L7 8" stroke="#34CB79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 3V15" stroke="#34CB79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            <p className="text-gray-950">Imagem do estabelecimento</p>
                        </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-12 mb-20">
                <h2 className='w-1/2 text-4xl tracking-tight font-semibold text-violet-950 mb-12'>Dados</h2>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm leading-6 text-gray-500">
                                Nome da entidade
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="entityName"
                                    id="entityName"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 p-2.5 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm leading-6 text-gray-500">
                               E-mail
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="entityEmail"
                                    id="Email"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 p-2.5 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="first-name" className="block text-sm leading-6 text-gray-500">
                               Whatsapp
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="entityWhatsapp"
                                    id="whatsapp"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 p-2.5 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-12">
                <h2 className='w-1/2 text-4xl tracking-tight font-semibold text-violet-950 mb-12'>Endereço</h2>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                        <div className="sm:col-span-3 overflow-hidden h-96">
                            {userLocation && (
                                <MapContainer
                                    center={(userLocation as L.LatLngExpression) || [-12.04318, -77.02824]}
                                    zoom={userLocation ? 13 : 4}
                                    // scrollWheelZoom={false}
                                    className="h-full rounded-lg"
                                >
                                    <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {/* {center && <Marker position={center as L.LatLngExpression} />} */}
                                    <LocationMarker />
                                </MapContainer>
                            )}
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="entityNumber" className="block text-sm leading-6 text-gray-500">
                                Número
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="entityNumber"
                                    id="entityNumber"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 p-2.5 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="entityCity" className="block text-sm leading-6 text-gray-500">
                               Cidade
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="entityCity"
                                    id="entityCity"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 p-2.5 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="entityState" className="block text-sm leading-6 text-gray-500">
                               Estado
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="entityState"
                                    id="entityState"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 p-2.5 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                >
                    Cadastrar ponto de coleta
                </button>
            </div>
        </form>
    </div>
)}