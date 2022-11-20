import React, { useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import { useLocale } from './hooks/useLocale';

function App() {
  const { t } = useLocale();
  const [wallpaper, setWallpaper] = useState('fusion');
  const [icon, setIcon] = useState('Tela-circle');
  const slideRef = useRef<Splide>(null);
  const moveNext = (key?: string, value?: string) => {
    if (key && value) {
      window.Main.setSettings(key, value);
    }
    const index = slideRef.current?.splide?.index || 0;
    slideRef.current?.go(index < 3 ? index + 1 : index);
  };
  const movePrev = () => {
    const index = slideRef.current?.splide?.index || 0;
    slideRef.current?.go(index > 0 ? index - 1 : 0);
  };
  return (
    <div className="bg-gray-100 rounded-lg relative">
      <div className="absolute top-0 h-10 w-full draggable"></div>
      <Splide aria-label="Instruction" options={{ arrows: false, pagination: false, drag: false }} ref={slideRef}>
        <SplideSlide id="welcome">
          <div className="relative flex h-screen justify-between items-center px-8">
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-4xl mb-4 font-semibold">{t.welcome.heading}</h1>
              <p className="mb-4">{t.welcome.body}</p>
              <button
                className="bg-white py-2 px-8 rounded duration-200 focus:outline-none hover:bg-gray-200"
                onClick={() => moveNext()}
              >
                {t.next}
              </button>
            </div>
            <div>
              <img src="img/logo.svg" className="h-40" />
            </div>
            <div className="absolute bottom-6 flex pr-16 w-full justify-between items-center">
              <button
                className="bg-white py-2 px-8 rounded duration-200 focus:outline-none hover:bg-gray-200"
                onClick={() => slideRef.current?.go(3)}
              >
                {t.skip}
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide id="wallpaper">
          <div className="relative flex h-screen justify-between items-start pt-10 px-8">
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-4xl mb-4 font-semibold">{t.wallpaper}</h1>
              <div className="grid grid-cols-3 gap-4 mt-12">
                <label htmlFor="fusion">
                  <img src="img/fusion.png" className="rounded-lg" />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      className="bg-white duration-200 checked:text-blue-800 focus:border-blue-800 focus:ring-blue-800"
                      type="radio"
                      name="wallpaper"
                      value="fusion"
                      id="fusion"
                      checked={wallpaper === 'fusion'}
                      onChange={(e) => setWallpaper(e.target.value)}
                    />
                    <span className="text-xl font-semibold">Fusion</span>
                  </div>
                </label>
                <label htmlFor="light">
                  <img src="img/light.png" className="rounded-lg" />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      className="bg-white duration-200 checked:text-blue-800 focus:border-blue-800 focus:ring-blue-800"
                      type="radio"
                      name="wallpaper"
                      value="light"
                      id="light"
                      checked={wallpaper === 'light'}
                      onChange={(e) => setWallpaper(e.target.value)}
                    />
                    <span className="text-xl font-semibold">Light</span>
                  </div>
                </label>
                <label htmlFor="dark">
                  <img src="img/dark.png" className="rounded-lg" />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      className="bg-white duration-200 checked:text-blue-800 focus:border-blue-800 focus:ring-blue-800"
                      type="radio"
                      name="wallpaper"
                      value="dark"
                      id="dark"
                      checked={wallpaper === 'dark'}
                      onChange={(e) => setWallpaper(e.target.value)}
                    />
                    <span className="text-xl font-semibold">Dark</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="absolute bottom-6 flex pr-16 w-full justify-between items-center">
              <button
                className="bg-white py-2 px-8 rounded duration-200 focus:outline-none hover:bg-gray-200"
                onClick={() => movePrev()}
              >
                {t.back}
              </button>
              <button
                className="bg-white py-2 px-8 rounded duration-200 focus:outline-none hover:bg-gray-200"
                onClick={() => moveNext('wallpaper', wallpaper)}
              >
                {t.next}
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide id="icon">
          <div className="relative flex h-screen justify-between items-start pt-10 px-8">
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-4xl mb-4 font-semibold">{t.icon}</h1>
              <div className="grid grid-cols-3 gap-4 mt-10">
                <label htmlFor="tela-circle">
                  <img src="img/tela-circle.png" className="rounded-lg" />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      className="bg-white duration-200 checked:text-blue-800 focus:border-blue-800 focus:ring-blue-800"
                      type="radio"
                      name="icon"
                      value="Tela-circle"
                      id="tela-circle"
                      checked={icon === 'Tela-circle'}
                      onChange={(e) => setIcon(e.target.value)}
                    />
                    <span className="text-xl font-semibold">Tela Circle</span>
                  </div>
                </label>
                <label htmlFor="breeze">
                  <img src="img/breeze.png" className="rounded-lg" />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      className="bg-white duration-200 checked:text-blue-800 focus:border-blue-800 focus:ring-blue-800"
                      type="radio"
                      name="icon"
                      value="Breeze"
                      id="breeze"
                      checked={icon === 'Breeze'}
                      onChange={(e) => setIcon(e.target.value)}
                    />
                    <span className="text-xl font-semibold">Breeze</span>
                  </div>
                </label>
                <label htmlFor="papirus">
                  <img src="img/papirus.png" className="rounded-lg" />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      className="bg-white duration-200 checked:text-blue-800 focus:border-blue-800 focus:ring-blue-800"
                      type="radio"
                      name="icon"
                      value="Papirus"
                      id="papirus"
                      checked={icon === 'Papirus'}
                      onChange={(e) => setIcon(e.target.value)}
                    />
                    <span className="text-xl font-semibold">Papirus</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="absolute bottom-6 flex pr-16 w-full justify-between items-center">
              <button
                className="bg-white py-2 px-8 rounded duration-200 focus:outline-none hover:bg-gray-200"
                onClick={() => movePrev()}
              >
                {t.back}
              </button>
              <button
                className="bg-white py-2 px-8 rounded duration-200 focus:outline-none hover:bg-gray-200"
                onClick={() => moveNext('icon', icon)}
              >
                {t.next}
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide id="end">
          <div className="relative flex flex-col h-screen w-full justify-center items-center px-8 gap-4">
            <h2 className="text-4xl font-semibold">{t.end.heading}</h2>
            <p className="text-lg">{t.end.body}</p>
            <button
              className="bg-white py-2 px-8 rounded duration-200 focus:outline-none hover:bg-gray-200"
              onClick={() => window.Main.exit()}
            >
              {t.close}
            </button>
            <div className="absolute bottom-6 px-8 flex w-full justify-between items-center">
              <button
                className="bg-white py-2 px-8 rounded duration-200 focus:outline-none hover:bg-gray-200"
                onClick={() => movePrev()}
              >
                {t.back}
              </button>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
}

export default App;
