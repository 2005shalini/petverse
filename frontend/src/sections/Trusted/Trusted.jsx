import {
  PawPrint,
  Hospital,
  Bot,
  HeartHandshake,
  Star,
} from "lucide-react";

import Container from "../../components/ui/Container";
import {
  Heading,
  Paragraph,
} from "../../components/ui/Typography";

import TrustCard from "./TrustCard";

const stats = [
  {
    icon: PawPrint,
    value: "20K+",
    label: "Pets Managed",
  },
  {
    icon: Hospital,
    value: "250+",
    label: "Veterinary Clinics",
  },
  {
    icon: Bot,
    value: "50K+",
    label: "AI Conversations",
  },
  {
    icon: HeartHandshake,
    value: "10K+",
    label: "Happy Pet Owners",
  },
];

const Trusted = () => {
  return (
    <section className="py-32">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 flex justify-center">

            <Star
              fill="#FACC15"
              color="#FACC15"
            />

            <Star
              fill="#FACC15"
              color="#FACC15"
            />

            <Star
              fill="#FACC15"
              color="#FACC15"
            />

            <Star
              fill="#FACC15"
              color="#FACC15"
            />

            <Star
              fill="#FACC15"
              color="#FACC15"
            />

          </div>

          <Heading>

            Trusted by Pet Owners Across India

          </Heading>

          <Paragraph className="mt-6">

            Thousands of pet parents rely on PetVerse
            to manage health records, AI guidance,
            shopping and veterinary care.

          </Paragraph>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => (

            <TrustCard
              key={item.label}
              {...item}
            />

          ))}

        </div>

      </Container>

    </section>
  );
};

export default Trusted;