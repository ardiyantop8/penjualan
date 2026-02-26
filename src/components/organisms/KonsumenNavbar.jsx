import React from 'react'
import { useRouter } from 'next/router'
import useSessionStore from '@/stores/useSessionStore'
import HomeIcon from '@mui/icons-material/Home'
import CategoryIcon from '@mui/icons-material/Category'
import PhoneIcon from '@mui/icons-material/Phone'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';

const KonsumenNavbar = () => {
  const router = useRouter()
  const user = useSessionStore(state => state.user)
  const [openUser, setOpenUser] = React.useState(false)
  const [openMobile, setOpenMobile] = React.useState(false)

  const handleLogout = () => {
    useSessionStore.persist.clearStorage()
    router.replace('/login/login')
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        <h1 className="text-xl font-bold text-indigo-600">Clebee Fashion</h1>

        {/* desktop links */}
        <ul className="hidden md:flex gap-6 text-gray-600">
          <li className="hover:text-indigo-600 cursor-pointer flex items-center" onClick={() => router.push('/')}> 
            <span className="md:hidden"><HomeIcon className="text-lg" /></span>
            <span className="hidden md:block">Home</span>
          </li>
          <li className="hover:text-indigo-600 cursor-pointer flex items-center" onClick={() => router.push('/produk/produkKonsumen')}>
            <span className="md:hidden"><CategoryIcon className="text-lg" /></span>
            <span className="hidden md:block">Produk</span>
          </li>
          <li className="hover:text-indigo-600 cursor-pointer flex items-center" onClick={() => router.push('/keranjang')}>
            <span className="md:hidden"><ShoppingCartIcon className="text-lg" /></span>
            <span className="hidden md:block">Keranjang</span>
          </li>

          {user ? (
            <>
                <li className="hover:text-indigo-600 cursor-pointer flex items-center" onClick={() => router.push('/status/statusOrder')}>
                    <span className="md:hidden"><InfoIcon className="text-lg" /></span>
                    <span className="hidden md:block">Status</span>
                </li>
                <li className="relative">
                <button onClick={() => setOpenUser(!openUser)} className="hover:text-indigo-600 cursor-pointer">Profile</button>
                {openUser && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                    <ul className="py-2 text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-indigo-50 cursor-pointer" onClick={() => router.push('/profil/profilKonsumen')}>Lihat Profil</li>
                        <li className="px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer" onClick={handleLogout}>Keluar</li>
                    </ul>
                    </div>
                )}
                </li>
            </>
          ) : (
            <li className="hover:text-indigo-600 cursor-pointer" onClick={() => router.push('/login/login')}>Login</li>
          )}
        </ul>

        {/* mobile hamburger */}
        <button className="md:hidden text-2xl text-gray-700" onClick={() => setOpenMobile(!openMobile)}>
          {openMobile ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* mobile dropdown */}
        {openMobile && (
          <div className="md:hidden absolute right-1 top-full mt-2 w-56 bg-white border rounded-xl shadow-lg z-50">
            <ul className="flex flex-col text-gray-700">
              <li className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer" onClick={() => { router.push('/'); setOpenMobile(false); }}>
                <HomeIcon /> Home
              </li>
              <li className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer" onClick={() => { router.push('/produk/produkKonsumen'); setOpenMobile(false); }}>
                <CategoryIcon /> Produk
              </li>
              <li className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer" onClick={() => { router.push('/keranjang'); setOpenMobile(false); }}>
                <ShoppingCartIcon /> Keranjang
              </li>

              {user ? (
                <>
                    <li className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer" onClick={() => { router.push('/status/statusOrder'); setOpenMobile(false); }}>
                        <InfoIcon /> Status
                    </li>
                    <li className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer" onClick={() => { router.push('/profil/profilKonsumen'); setOpenMobile(false); }}>
                        <AccountCircleIcon /> Lihat Profil
                    </li>
                    <li className="px-4 py-3 hover:bg-red-50 text-red-500 flex items-center gap-3 cursor-pointer" onClick={() => { handleLogout(); setOpenMobile(false); }}>
                        <LogoutIcon /> Keluar
                    </li>
                </>
              ) : (
                <li className="px-4 py-3 hover:bg-indigo-50 flex items-center gap-3 cursor-pointer" onClick={() => { router.push('/login/login'); setOpenMobile(false); }}><LoginIcon/> Login</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default KonsumenNavbar
