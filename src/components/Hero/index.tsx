interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <div
      className="relative h-96 flex flex-col justify-center items-center text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-4 md:p-8 shadow-pixel">
        <h1 className="text-4xl font-bold text-black">{title}</h1>
        <p className="text-xl text-black mt-4">{subtitle}</p>
      </div>
    </div>
  );
};

export default Hero;