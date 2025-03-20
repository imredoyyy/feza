import { GithubIcon } from "lucide-react";
import Link from "next/link";

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <div className="text-center my-14">
        <h2 className="text-3xl font-bold md:text-5xl text-primary">
          Feza Editor
        </h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto text-lg">
          A free and open source WYSIWYG editor built on Tiptap, Tailwind CSS
          and shadcn/ui.
        </p>

        <div className="mt-4 flex flex-col items-center md:flex-row md:justify-center gap-4">
          <Button asChild size="lg" className="min-w-35">
            <Link href="/docs">Get Started</Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="min-w-35">
            <Link href="https://github.com/imredoyyy/feza" target="_blank">
              <GithubIcon />
              <span>GitHub</span>
            </Link>
          </Button>
        </div>
      </div>

      <Editor />
    </div>
  );
};

export default Home;
