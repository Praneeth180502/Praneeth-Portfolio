import { Github, Linkedin, Mail } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-heading font-bold gradient-text">Praneeth.dev</p>
        <p className="text-sm text-muted-foreground">© 2025 Ankey Praneeth Reddy. All rights reserved.</p>
        <div className="flex gap-3">
          {[
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/praneeth-reddy-ankey" },
            { icon: Mail, href: "mailto:apraneethreddy20891a0502@gmail.com" },
          ].map(({ icon: Icon, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
