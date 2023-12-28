import Logo from "./Logo";
import Menu from "./Menu";

export default function Header() {
  return (
    <header>
      <div className="flex min-w-full h-16">
        <Logo />
        <Menu />
      </div>
    </header>
  );
}
