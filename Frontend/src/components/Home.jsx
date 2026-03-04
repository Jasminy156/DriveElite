import { useRef } from "react"
import { Link } from "react-router-dom"

function Home() {
  const imgRef = useRef(null)

  function handleMouseMove(e) {
    const img = imgRef.current
    if (!img) return

    const rect = img.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateY = (x / rect.width - 0.5) * 20
    const rotateX = (y / rect.height - 0.5) * -20

    img.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `
  }

  function handleMouseLeave() {
    const img = imgRef.current
    if (!img) return

    img.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
    `
  }

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden text-white">

      {/* BLURS */}
      <div className="absolute -top-40 -left-40 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-purple-600/30 rounded-full blur-[120px] sm:blur-[140px]" />
      
      <div className="absolute -bottom-40 -right-40 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-purple-400/30 rounded-full blur-[120px] sm:blur-[140px]" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] bg-purple-500/20 rounded-full blur-[140px] sm:blur-[160px]" />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-neutral-950/10 backdrop-blur-md z-50 border-b border-purple-900/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <img
            className="w-[90px] sm:w-[120px] lg:w-[140px]"
            src="/DriveEliteLogo.png"
            alt="Logo"
          />

          {/* Links */}
          <div className="flex items-center gap-3 sm:gap-6 font-poppins">

            <Link className="text-sm sm:text-base lg:text-lg text-purple-500 hover:text-purple-200 transition font-bold">
              Início
            </Link>

            <Link className="text-sm sm:text-base lg:text-lg text-purple-500 hover:text-purple-200 transition font-bold">
              Sobre nós
            </Link>

            <Link
              to="/veiculos"
              className="text-sm sm:text-base lg:text-lg text-purple-500 hover:text-purple-200 transition font-bold"
            >
              Veículos
            </Link>
          </div>

          {/* Busca */}
          <div className="flex items-center gap-3">

            <input
              type="search"
              placeholder="Buscar"
              className="
                w-24 sm:w-32 md:w-40 lg:w-60
                h-8 sm:h-9
                bg-purple-900/80
                border border-purple-800
                rounded-full
                px-3 sm:px-4
                text-xs sm:text-sm
                placeholder-purple-300
                focus:outline-none
                focus:ring-2 focus:ring-purple-600
                transition
              "
            />

            <img
              className="w-[30px] sm:w-[20px] lg:w-[35px]"
              src="ProfileUser.svg"
              alt="Perfil de Usuários"
            />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="flex justify-center lg:justify-end items-center w-full px-4 sm:px-10 pt-32">

        {/* Slogan */}
        <p className="
          text-lg sm:text-xl md:text-3xl lg:text-5xl
          
          font-garamond 
          font-semibold 
          tracking-wide
          leading-snug
          bg-gradient-to-b
          from-white
          via-purple-500
          to-purple-900
          bg-clip-text
          text-transparent
        ">
          O luxo não é apenas o que você dirige.
          <br />
          É o que você conquista.
        </p>

        {/* Carro */}
        <img
          ref={imgRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="
            w-[95%]
            max-w-[850px]
            h-auto
            transition-transform duration-200 ease-out
            will-change-transform
            [transform-style:preserve-3d]
          "
          src="CarroPoster.png"
          alt="Poster do carro"
        />
      </div>
    </section>
  )
}

export default Home