import Image from 'next/image'

import pessoas from '../../public/Pessoas.svg'

export default function Home() {
  return (      
      <div className='relative flex items-center gap-48'>
        <div className='w-1/2'>
          <h2 className='text-5xl tracking-tight font-semibold text-[#322153] mb-6'>Seu marketplace de coleta de resíduos.</h2>
          <p className='text-lg tracking-tight text-slate-600 mb-6'>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
          <a href="/colectoria" className="bg-green-500 inline-flex rounded-lg">
            <div className="bg-green-600 flex items-center px-2.5 rounded-l-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10 17L15 12L10 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <p className="p-3.5 text-white font-semibold">Cadastre um ponto de coleta</p></a>
        </div>
        <div className='w-1/2'>
          <Image src={pessoas} alt="" className='' />
        </div>
      </div>
  )
}
