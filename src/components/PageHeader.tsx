interface PageHeaderProps {
  subtitle: string;
  title: string;
}

const PageHeader = ({ subtitle, title }: PageHeaderProps) => (
  <div className="bg-gradient-brown pt-28 pb-16">
    <div className="container mx-auto px-4 text-center">
      <p className="text-gold font-body tracking-widest uppercase text-sm mb-3 animate-fade-in-up">
        {subtitle}
      </p>
      <h1 className="font-heading text-3xl md:text-5xl font-bold text-cream animate-fade-in-up-delay-1">
        {title}
      </h1>
      <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full mt-6 animate-fade-in-up-delay-2" />
    </div>
  </div>
);

export default PageHeader;
