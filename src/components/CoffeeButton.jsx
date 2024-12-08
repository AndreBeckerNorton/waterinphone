import { Coffee } from 'lucide-react';

const BuyMeCoffeeButton = () => {
  return (
    <a
      href="https://buymeacoffee.com/waterinphone"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-[#FFDD00] text-black rounded-full shadow-lg hover:bg-[#FFED4A] transition-all transform hover:scale-105"
    >
      <Coffee size={20} />
      <span className="font-medium">Buy me a coffee</span>
    </a>
  );
};

export default BuyMeCoffeeButton;