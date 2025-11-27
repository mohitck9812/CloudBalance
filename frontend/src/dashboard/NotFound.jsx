import React from 'react'

const NotFound = () => {
  return (
    <>
      {/* Custom Tailwind Animations */}
      <style>
        {`
        @keyframes easyoutelastic {
          0% { transform: rotateX(0); }
          9% { transform: rotateX(210deg); }
          13% { transform: rotateX(150deg); }
          16% { transform: rotateX(200deg); }
          18% { transform: rotateX(170deg); }
          20% { transform: rotateX(180deg); }
          60% { transform: rotateX(180deg); }
          80% { transform: rotateX(0); }
          100% { transform: rotateX(0); }
        }

        @keyframes rotatedrop {
          0% { transform: rotate(0); }
          10% { transform: rotate(30deg); }
          15% { transform: rotate(90deg); }
          70% { transform: rotate(90deg); }
          80% { transform: rotate(0); }
          100% { transform: rotate(0); }
        }

        .animate-elastic {
          animation: easyoutelastic 8s infinite;
        }
        .animate-drop {
          animation: rotatedrop 8s infinite;
        }
      `}
      </style>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10">
        <h1 className="text-center text-4xl font-bold mb-4">
          404 Error Page
        </h1>

        <p className="text-center text-gray-700 max-w-md mb-10">
          <b>CSS</b> animations recreated in <b>TailwindCSS</b>.
        </p>

        <section className="text-center text-[150px] font-extrabold font-[Catamaran] leading-none">
          <span className="inline-block text-[#F0E395] perspective-[1000px]">
            <span className="inline-block animate-elastic">4</span>
          </span>

          <span className="inline-block text-[#FFB485]">0</span>

          <span className="inline-block text-[#D15C95]">
            <span className="inline-block animate-drop">4</span>
          </span>
        </section>

        <a
          href="/dashboard"
          className="mt-10 px-5 py-2 bg-gray-500 text-white text-sm uppercase tracking-wider hover:bg-gray-600"
        >
          Go Back Home
        </a>
      </div>
    </>
  );
};

export default NotFound
