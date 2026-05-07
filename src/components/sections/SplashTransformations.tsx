import Image from 'next/image';

const MOCK_SPLASHES = [
  { id: 1, src: '/images/dr-aouetta-action.webp', cls: 'splash-1' },
  { id: 2, src: '/media/gallery-5.webp', cls: 'splash-2' },
  { id: 3, src: '/media/gallery-6.webp', cls: 'splash-3' },
  { id: 4, src: '/media/slider-1-after.webp', cls: 'splash-4' },
  { id: 5, src: '/media/slider-2-after.webp', cls: 'splash-5' },
  { id: 6, src: '/media/slider-3-after.webp', cls: 'splash-6' },
];

export default function SplashTransformations() {
  return (
    <div className="transformations-splash">
      <div className="splash-gallery-container relative w-full min-h-[800px] mt-12 flex flex-col md:block">
        {MOCK_SPLASHES.map((splash) => (
          <div key={splash.id} className={`splash-item ${splash.cls}`}>
            <Image
              src={splash.src}
              alt="Smile Transformation"
              fill
              className="object-cover relative z-10"
              sizes="(max-width: 768px) 100vw, 400px"
              quality={50}
              decoding="async"
              loading="lazy"
            />
            <div className="splash-glow"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
