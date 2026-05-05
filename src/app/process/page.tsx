import type { Metadata } from "next";
import ProcessClient from "./ProcessClient";

export const metadata: Metadata = {
  title: "Process · Ben Speedy",
  description:
    "A note on method. How I work through a project, from listening to handing over.",
};

export default function ProcessPage() {
  return <ProcessClient />;
}
