import { Zap } from "lucide-react";

const Header = () => (
  <header className="text-center text-white mb-8">
    <h1 className="text-5xl font-bold mb-4 text-shadow-lg">
      <Zap className="inline-block mr-3 mb-2" size={48} />
      TypeSprint
    </h1>
    <p className="text-xl opacity-90">Test your typing speed and accuracy :)</p>
  </header>
);

export default Header;
